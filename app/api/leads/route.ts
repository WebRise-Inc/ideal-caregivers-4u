import { NextResponse } from "next/server";

type LeadPayload = {
  first_name?: string;
  last_name?: string;
  phone?: string;
  email?: string;
  support?: string;
  timeline?: string;
  consent?: boolean;
  lead_source?: string;
};

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let payload: LeadPayload;

  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const lead = {
    first_name: clean(payload.first_name),
    last_name: clean(payload.last_name),
    phone: clean(payload.phone),
    email: clean(payload.email),
    support: clean(payload.support),
    timeline: clean(payload.timeline),
    consent: Boolean(payload.consent),
    lead_source: clean(payload.lead_source) || "PPC landing page",
    submitted_at: new Date().toISOString(),
  };

  if (!lead.first_name || !lead.phone || !lead.support || !lead.consent) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields" },
      { status: 400 },
    );
  }

  const webhookUrl = process.env.LEAD_WEBHOOK_URL;

  if (webhookUrl) {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(lead),
    });

    if (!response.ok) {
      return NextResponse.json(
        { ok: false, error: "Lead forwarding failed" },
        { status: 502 },
      );
    }
  }

  return NextResponse.json({ ok: true });
}
