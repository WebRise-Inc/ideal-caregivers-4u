"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Phone, ShieldCheck } from "lucide-react";

const careForOptions = [
  "A parent",
  "A spouse or partner",
  "Another family member",
  "Myself",
  "Not sure yet",
];

const supportOptions = [
  "Dementia and Alzheimer's care",
  "Personal care",
  "Companionship",
  "24-hour care",
  "Awake overnight care",
  "Meal planning",
  "Short-notice care",
  "Palliative care",
];

const timelineOptions = ["Today or tomorrow", "This week", "This month", "Planning ahead"];

const stepLabels = ["Person", "Care", "Timing", "Contact", "Notes"];

type FormValues = {
  first_name: string;
  phone: string;
  email: string;
  care_for: string;
  support: string;
  timeline: string;
  notes: string;
  consent: boolean;
};

const initialValues: FormValues = {
  first_name: "",
  phone: "",
  email: "",
  care_for: "",
  support: "",
  timeline: "",
  notes: "",
  consent: false,
};

export function LeadForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateValue = <Key extends keyof FormValues>(key: Key, value: FormValues[Key]) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  const chooseAndAdvance = <Key extends keyof FormValues>(key: Key, value: FormValues[Key]) => {
    setError("");
    setValues((current) => ({ ...current, [key]: value }));
    window.setTimeout(() => {
      setStep((current) => Math.min(current + 1, stepLabels.length - 1));
    }, 120);
  };

  const isStepComplete = (() => {
    if (step === 0) return Boolean(values.care_for);
    if (step === 1) return Boolean(values.support);
    if (step === 2) return Boolean(values.timeline);
    if (step === 3) return Boolean(values.first_name.trim() && values.phone.trim());
    return values.consent;
  })();

  const submitLead = async () => {
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          idempotencyKey: `ideal-caregivers-${crypto.randomUUID()}`,
          last_name: "",
          lead_source: "PPC landing page",
          pageUrl: window.location.href,
        }),
      });

      if (!response.ok) {
        throw new Error("Lead submission failed");
      }

      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please call 613-769-1669 for help.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isStepComplete) {
      setError("Please answer this question before continuing.");
      return;
    }

    if (step < stepLabels.length - 1) {
      setError("");
      setStep((current) => current + 1);
      return;
    }

    await submitLead();
  };

  if (submitted) {
    return (
      <div className="form-card form-card--success" id="assessment">
        <CheckCircle2 aria-hidden="true" size={36} />
        <p className="eyebrow">Request received</p>
        <h2>Thank you. The care team will follow up shortly.</h2>
        <p>
          For urgent support, call{" "}
          <a href="tel:6137691669">613-769-1669</a> now.
        </p>
      </div>
    );
  }

  return (
    <form id="assessment" className="form-card form-card--flow" onSubmit={handleSubmit}>
      <div className="form-flow-top">
        <p className="form-badge">
          <ShieldCheck aria-hidden="true" size={16} />
          Free care assessment
        </p>
        <span className="step-counter">
          {step + 1}/{stepLabels.length}
        </span>
      </div>

      <div className="flow-progress" aria-hidden="true">
        <span style={{ width: `${((step + 1) / stepLabels.length) * 100}%` }} />
      </div>

      <div className="flow-step">
        {step === 0 ? (
          <>
            <p className="question-kicker">First question</p>
            <h2>Who needs care?</h2>
            <p>Start with the person this care plan is for.</p>
            <div className="choice-list">
              {careForOptions.map((option) => (
                <button
                  className={`choice-button${values.care_for === option ? " choice-button--active" : ""}`}
                  key={option}
                  type="button"
                  aria-pressed={values.care_for === option}
                  onClick={() => chooseAndAdvance("care_for", option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        ) : null}

        {step === 1 ? (
          <>
            <p className="question-kicker">Care need</p>
            <h2>What kind of support is needed?</h2>
            <p>Choose the closest fit. The coordinator can adjust this on the call.</p>
            <div className="choice-list choice-list--compact">
              {supportOptions.map((option) => (
                <button
                  className={`choice-button${values.support === option ? " choice-button--active" : ""}`}
                  key={option}
                  type="button"
                  aria-pressed={values.support === option}
                  onClick={() => chooseAndAdvance("support", option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        ) : null}

        {step === 2 ? (
          <>
            <p className="question-kicker">Timing</p>
            <h2>When should care start?</h2>
            <p>This helps the team understand urgency before they call.</p>
            <div className="choice-list">
              {timelineOptions.map((option) => (
                <button
                  className={`choice-button${values.timeline === option ? " choice-button--active" : ""}`}
                  key={option}
                  type="button"
                  aria-pressed={values.timeline === option}
                  onClick={() => chooseAndAdvance("timeline", option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        ) : null}

        {step === 3 ? (
          <>
            <p className="question-kicker">Contact</p>
            <h2>Who should we call back?</h2>
            <p>Phone is required. Email is optional.</p>
            <div className="contact-stack">
              <label className="form-field">
                <span>
                  Your name <span className="required-mark">*</span>
                </span>
                <input
                  name="first_name"
                  type="text"
                  autoComplete="name"
                  placeholder="Jane Smith"
                  required
                  value={values.first_name}
                  onChange={(event) => updateValue("first_name", event.target.value)}
                />
              </label>
              <label className="form-field">
                <span>
                  Phone number <span className="required-mark">*</span>
                </span>
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="613-555-0123"
                  required
                  value={values.phone}
                  onChange={(event) => updateValue("phone", event.target.value)}
                />
              </label>
              <label className="form-field">
                <span>
                  Email address <em>Optional</em>
                </span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="name@example.com"
                  value={values.email}
                  onChange={(event) => updateValue("email", event.target.value)}
                />
              </label>
            </div>
          </>
        ) : null}

        {step === 4 ? (
          <>
            <p className="question-kicker">Last step</p>
            <h2>Anything else the care team should know?</h2>
            <p>Add context if it helps. You can leave this blank.</p>
            <label className="form-field">
              <span>
                Details <em>Optional</em>
              </span>
              <textarea
                name="notes"
                rows={4}
                placeholder="Example: my mom needs overnight help after a hospital discharge."
                value={values.notes}
                onChange={(event) => updateValue("notes", event.target.value)}
              />
            </label>
            <label className="check-option check-option--consent">
              <input
                name="consent"
                type="checkbox"
                required
                checked={values.consent}
                onChange={(event) => updateValue("consent", event.target.checked)}
              />
              <span>
                I agree to be contacted about care services.{" "}
                <span className="required-mark">*</span>
              </span>
            </label>
          </>
        ) : null}
      </div>

      {error ? <p className="form-error">{error}</p> : null}

      <div className={`flow-nav${step < 3 ? " flow-nav--choice" : ""}`}>
        <button
          className="secondary-button back-button"
          type="button"
          disabled={step === 0 || isSubmitting}
          onClick={() => {
            setError("");
            setStep((current) => Math.max(0, current - 1));
          }}
        >
          <ArrowLeft aria-hidden="true" size={17} />
          Back
        </button>
        {step < 3 ? (
          <p className="flow-hint">Choose an answer to continue</p>
        ) : (
          <button
            className="primary-button primary-button--full"
            type="submit"
            disabled={!isStepComplete || isSubmitting}
          >
            {step === stepLabels.length - 1 ? (
              <>
                <Phone aria-hidden="true" size={18} />
                {isSubmitting ? "Sending..." : "Request callback"}
              </>
            ) : (
              <>
                Continue
                <ArrowRight aria-hidden="true" size={18} />
              </>
            )}
          </button>
        )}
      </div>

      <p className="privacy-note">Required fields are marked <span>*</span>.</p>
    </form>
  );
}
