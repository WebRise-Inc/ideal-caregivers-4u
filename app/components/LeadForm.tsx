"use client";

import { useState } from "react";

const supportOptions = [
  "",
  "Dementia and Alzheimer's care",
  "Personal care",
  "Companionship",
  "24-hour care",
  "Awake overnight care",
  "Meal planning",
  "Short-notice care",
  "Palliative care",
];

const timelineOptions = ["", "Today or tomorrow", "This week", "This month", "Planning ahead"];

export function LeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (submitted) {
    return (
      <div className="form-card form-card--success" id="assessment">
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
    <form
      id="assessment"
      className="form-card"
      onSubmit={async (event) => {
        event.preventDefault();
        setError("");
        setIsSubmitting(true);

        const formData = new FormData(event.currentTarget);
        const payload = {
          first_name: String(formData.get("first_name") || ""),
          last_name: String(formData.get("last_name") || ""),
          phone: String(formData.get("phone") || ""),
          email: String(formData.get("email") || ""),
          support: String(formData.get("support") || ""),
          timeline: String(formData.get("timeline") || ""),
          consent: formData.get("consent") === "on",
          lead_source: String(formData.get("lead_source") || "PPC landing page"),
        };

        try {
          const response = await fetch("/api/leads", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(payload),
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
      }}
    >
      <div className="form-heading">
        <p className="eyebrow">Free care assessment</p>
        <h2>Request a callback.</h2>
        <p>
          No obligation. Required fields are marked{" "}
          <span className="required-mark">*</span>
        </p>
      </div>

      <label>
        <span>
          Your name <span className="required-mark">*</span>
        </span>
        <input name="first_name" type="text" autoComplete="name" required />
      </label>

      <label>
        <span>
          Phone <span className="required-mark">*</span>
        </span>
        <input name="phone" type="tel" autoComplete="tel" required />
      </label>

      <label>
        <span>
          Main care need <span className="required-mark">*</span>
        </span>
        <select name="support" required defaultValue="">
          {supportOptions.map((option) => (
            <option key={option} disabled={option === ""} value={option}>
              {option === "" ? "Choose one..." : option}
            </option>
          ))}
        </select>
      </label>

      <details className="optional-details">
        <summary>Add email or timing <span>(optional)</span></summary>
        <div className="field-grid">
          <label>
            <span>Email</span>
            <input name="email" type="email" autoComplete="email" />
          </label>
          <label>
            <span>Care timeline</span>
            <select name="timeline" defaultValue="">
              {timelineOptions.map((option) => (
                <option key={option} value={option}>
                  {option === "" ? "Not sure yet" : option}
                </option>
              ))}
            </select>
          </label>
        </div>
      </details>

      <label className="check-option check-option--consent">
        <input name="consent" type="checkbox" required />
        <span>
          I agree to be contacted about care services.{" "}
          <span className="required-mark">*</span>
        </span>
      </label>

      <input name="lead_source" type="hidden" value="PPC landing page" />

      {error ? <p className="form-error">{error}</p> : null}

      <button
        className="primary-button primary-button--full"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending Request..." : "Request a Callback"}
      </button>

      <p className="privacy-note">We respond within 2 hours during intake hours.</p>
    </form>
  );
}
