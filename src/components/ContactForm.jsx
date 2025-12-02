// src/components/ContactForm.jsx
import { useState } from "react";
import { validateContact } from "../utils/formValidation";
import { sendContactEmail } from "../services/emailService";

/**
 * ContactForm
 *
 * Props:
 *  - endpoint (string) : kept for backward compatibility (not used with EmailJS)
 *  - services (array)  : array of service options [{ value, label }]
 *  - onSuccess (fn)    : optional callback when form submission succeeds
 */

const defaultServices = [
  { value: "website-development", label: "Website Development" },
  { value: "app-development", label: "App Development" },
  { value: "digital-marketing", label: "Digital Marketing" },
  { value: "business-analytics", label: "Business Analytics" },
  { value: "document-digitization", label: "Document Digitization (Paper → Digital)" },
  { value: "whatsapp-telegram-bots", label: "WhatsApp & Telegram Bots" },
  { value: "google-ads", label: "Google Ads" },
  { value: "meta-ads", label: "Meta (Facebook & Instagram) Ads" },
  { value: "branding-ui-design", label: "Branding & UI Design" },
];

export default function ContactForm({
  endpoint = "/api/contact", // still accepted but EmailJS is used
  services = defaultServices,
  onSuccess,
}) {
  const initialForm = {
    name: "",
    email: "",
    phone: "",
    service: services[0]?.value || "",
    budget: "",
    message: "",
  };

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success'|'error', message: '' }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eObj = validateContact(form, services);
    if (Object.keys(eObj).length) {
      setErrors(eObj);
      // Scroll to first error field
      const firstKey = Object.keys(eObj)[0];
      const el = document.querySelector(`[name="${firstKey}"]`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      // --- EmailJS integration ---
      const result = await sendContactEmail(form);

      if (!result.success) {
        // EmailJS returned an error
        const errMsg =
          (result.error && (result.error.text || result.error.message)) ||
          "Failed to send message. Please try again.";
        throw new Error(errMsg);
      }

      // Success
      setStatus({ type: "success", message: "Thanks! We received your message. We’ll reply soon." });
      setForm(initialForm);
      setErrors({});
      if (typeof onSuccess === "function") onSuccess();
    } catch (err) {
      console.error("ContactForm error:", err);
      setStatus({
        type: "error",
        message:
          err?.message ||
          "Something went wrong while sending the message. Try again or message us on WhatsApp.",
      });
    } finally {
      setLoading(false);
    }
  };

  const whatsappHref = `https://wa.me/919876543210?text=${encodeURIComponent(
    `Hi, I'm interested in ${services.find((s) => s.value === form.service)?.label || "your services"}. My name is ${form.name || ""}.`
  )}`;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl w-full bg-gradient-to-b from-white to-slate-50 rounded-2xl p-6 shadow-2xl border border-gray-100 ring-1 ring-gray-100"
      aria-labelledby="contact-form-heading"
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-none w-12 h-12 rounded-xl bg-gradient-to-tr from-green-600 to-blue-500 flex items-center justify-center shadow-md">
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M2 12a10 10 0 1120 0 10 10 0 01-20 0zm7-1v6l5-3-5-3z" fill="currentColor" />
          </svg>
        </div>
        <div className="flex-1">
          <h2 id="contact-form-heading" className="text-lg font-semibold text-gray-800">Start your project</h2>
          <p className="text-sm text-gray-500 mt-1">
            Tell us about your idea — we’ll reply with a clear next step and estimated timeline.
          </p>
        </div>
        <div className="hidden sm:flex flex-col items-end text-right">
          <span className="text-xs text-gray-500">Or call</span>
          <a href="tel:+919876543210" className="text-sm font-medium text-gray-800">+91 98765 43210</a>
        </div>
      </div>

      {/* Form grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <label className="flex flex-col">
          <span className="text-sm font-medium text-gray-700">Name</span>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className={`mt-2 px-3 py-2 rounded-lg border ${errors.name ? "border-red-400" : "border-gray-200"} focus:outline-none focus:ring-2 focus:ring-green-200`}
            placeholder="Your full name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "err-name" : undefined}
          />
          {errors.name && <span id="err-name" className="text-xs text-red-500 mt-1">{errors.name}</span>}
        </label>

        {/* Email */}
        <label className="flex flex-col">
          <span className="text-sm font-medium text-gray-700">Email</span>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className={`mt-2 px-3 py-2 rounded-lg border ${errors.email ? "border-red-400" : "border-gray-200"} focus:outline-none focus:ring-2 focus:ring-green-200`}
            placeholder="you@company.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "err-email" : undefined}
          />
          {errors.email && <span id="err-email" className="text-xs text-red-500 mt-1">{errors.email}</span>}
        </label>

        {/* Phone */}
        <label className="flex flex-col">
          <span className="text-sm font-medium text-gray-700">Phone</span>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className={`mt-2 px-3 py-2 rounded-lg border ${errors.phone ? "border-red-400" : "border-gray-200"} focus:outline-none focus:ring-2 focus:ring-green-200`}
            placeholder="+91 98765 43210"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "err-phone" : undefined}
          />
          {errors.phone && <span id="err-phone" className="text-xs text-red-500 mt-1">{errors.phone}</span>}
        </label>

        {/* Service */}
        <label className="flex flex-col">
          <span className="text-sm font-medium text-gray-700">Service</span>
          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            className={`mt-2 px-3 py-2 rounded-lg border ${errors.service ? "border-red-400" : "border-gray-200"} focus:outline-none focus:ring-2 focus:ring-green-200`}
            aria-invalid={!!errors.service}
            aria-describedby={errors.service ? "err-service" : undefined}
          >
            {services.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
          {errors.service && <span id="err-service" className="text-xs text-red-500 mt-1">{errors.service}</span>}
        </label>
      </div>

      {/* Budget */}
      <label className="flex flex-col mt-4">
        <span className="text-sm font-medium text-gray-700">Estimated Budget (optional)</span>
        <input
          name="budget"
          value={form.budget}
          onChange={handleChange}
          className="mt-2 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-200"
          placeholder="e.g., ₹10,000 - ₹30,000"
        />
        {errors.budget && <span className="text-xs text-red-500 mt-1">{errors.budget}</span>}
      </label>

      {/* Message */}
      <label className="flex flex-col mt-4">
        <span className="text-sm font-medium text-gray-700">Message</span>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          className={`mt-2 px-3 py-3 rounded-lg border ${errors.message ? "border-red-400" : "border-gray-200"} focus:outline-none focus:ring-2 focus:ring-green-200 min-h-[140px]`}
          placeholder="Tell us about your goals, timeline and any references..."
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "err-message" : undefined}
        />
        {errors.message && <span id="err-message" className="text-xs text-red-500 mt-1">{errors.message}</span>}
      </label>

      {/* Status */}
      {status && (
        <div
          className={`mt-4 p-3 rounded-md text-sm ${status.type === "success" ? "bg-green-50 text-green-800 border border-green-100" : "bg-red-50 text-red-800 border border-red-100"}`}
          role="status"
        >
          {status.message}
        </div>
      )}

      {/* Actions */}
      <div className="mt-5 flex flex-col sm:flex-row items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg font-medium shadow hover:bg-green-700 transition disabled:opacity-60"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden>
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </button>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-lg text-sm bg-white hover:bg-gray-50 transition"
        >
          💬 Message on WhatsApp
        </a>

        <p className="text-xs text-gray-500 mt-2 sm:mt-0">Prefer a quick call? <a className="font-medium text-gray-800" href="tel:+919876543210">+91 98765 43210</a></p>
      </div>
    </form>
  );
}
