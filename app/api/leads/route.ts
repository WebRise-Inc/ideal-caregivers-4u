import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type LeadPayload = {
  care_for?: unknown;
  consent?: unknown;
  email?: unknown;
  first_name?: unknown;
  idempotencyKey?: unknown;
  last_name?: unknown;
  lead_source?: unknown;
  notes?: unknown;
  pageUrl?: unknown;
  phone?: unknown;
  support?: unknown;
  timeline?: unknown;
};

function readString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getConfiguredIntake() {
  const url = process.env.LEAD_INTAKE_URL?.trim();
  const apiKey = process.env.LEAD_INTAKE_API_KEY?.trim();
  const clientId = process.env.LEAD_INTAKE_CLIENT_ID?.trim();

  if (!url || !apiKey) {
    return undefined;
  }

  return {
    apiKey,
    clientId,
    url,
  };
}

export async function POST(request: Request) {
  const intake = getConfiguredIntake();

  if (!intake) {
    console.error("[leads] missing lead intake configuration");
    return NextResponse.json(
      { ok: false, error: "Lead intake is not configured" },
      { status: 500 },
    );
  }

  let payload: LeadPayload;

  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON payload" }, { status: 400 });
  }

  const firstName = readString(payload.first_name);
  const lastName = readString(payload.last_name);
  const phone = readString(payload.phone);
  const email = readString(payload.email);
  const careFor = readString(payload.care_for);
  const support = readString(payload.support);
  const timeline = readString(payload.timeline);
  const notes = readString(payload.notes);
  const leadSource = readString(payload.lead_source) || "PPC landing page";
  const pageUrl = readString(payload.pageUrl);

  if (
    !firstName ||
    !phone ||
    phone.replace(/\D/g, "").length < 10 ||
    (email && !isValidEmail(email)) ||
    !careFor ||
    !support ||
    !timeline ||
    payload.consent !== true
  ) {
    return NextResponse.json(
      { ok: false, error: "Lead is missing required fields" },
      { status: 400 },
    );
  }

  const idempotencyKey =
    readString(payload.idempotencyKey) || `ideal-caregivers-${crypto.randomUUID()}`;
  const submittedAt = new Date().toISOString();

  const upstreamPayload = {
    ...(intake.clientId ? { clientId: intake.clientId } : {}),
    externalLeadId: idempotencyKey,
    fields: {
      care_for: careFor,
      contact_consent: "Yes",
      email,
      first_name: firstName,
      full_name: [firstName, lastName].filter(Boolean).join(" "),
      last_name: lastName,
      notes,
      page_url: pageUrl,
      phone_number: phone,
      requested_support: support,
      start_timeline: timeline,
    },
    source: `Ideal Caregivers 4u ${leadSource}`,
    submittedAt,
  };

  try {
    const response = await fetch(intake.url, {
      body: JSON.stringify(upstreamPayload),
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${intake.apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": idempotencyKey,
      },
      method: "POST",
    });

    if (!response.ok) {
      const upstreamText = await response.text();

      console.error("[leads] lead intake rejected submission", {
        status: response.status,
        upstreamText: upstreamText.slice(0, 500),
      });

      return NextResponse.json(
        { ok: false, error: "Lead could not be sent" },
        { status: 502 },
      );
    }

    const result = (await response.json().catch(() => ({}))) as {
      leadId?: string;
      ok?: boolean;
      sourceLeadId?: string;
    };

    return NextResponse.json({
      leadId: result.leadId,
      ok: true,
      sourceLeadId: result.sourceLeadId,
    });
  } catch (error) {
    console.error("[leads] lead intake request failed", { error });

    return NextResponse.json(
      { ok: false, error: "Lead could not be sent" },
      { status: 502 },
    );
  }
}
