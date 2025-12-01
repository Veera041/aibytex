// src/components/ContactForm.jsx
import { useState } from "react";

/**
 * ContactForm
 *
 * Props:
 *  - endpoint (string) : API endpoint to send the contact request (default "/api/contact")
 *  - services (array)  : array of service options [{ value, label }]
 *  - onSuccess (fn)    : optional callback when form submission succeeds
 *
 * Example:
 * <ContactForm
 *   endpoint="/api/contact"
 *   services={[{value: "website", label: "Website Development"}, ...]}
 *   onSuccess={() => console.log("sent")}
 * />
 */

const defaultServices = [
  { value: "website-development", label: "Website Development" },
  { value: "digital-marketing", label: "Digital Marketing" },
  { value: "whatsapp-telegram-bots", label: "WhatsApp & Telegram Bots" },
  { value: "google-ads", label: "Google Ads" },
  { value: "meta-ads", label: "Meta Ads" },
  { value: "branding-ui-design", label: "Branding & UI Design" },
];

export default function ContactForm({
  endpoint = "/api/contact",
  services = defaultServices,
  onSuccess,
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: services[0]?.value || "",
    budget: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success'|'error', message: '' }

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else {
      // simple email check
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(form.email.trim())) e.email = "Enter a valid email.";
    }
    if (form.phone && !/^[0-9+\-\s()]{6,20}$/.test(form.phone.trim())) {
      e.phone = "Enter a valid phone number.";
    }
    if (!form.message.trim()) e.message = "Please describe your project.";
    if (!form.service) e.service = "Select a service.";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eObj = validate();
    if (Object.keys(eObj).length) {
      setErrors(eObj);
      window.scrollTo({ top: e.target.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "website_contact_form", createdAt: new Date().toISOString() }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Server error");
      }

      // assume success
      setStatus({ type: "success", message: "Thanks! We received your message. We’ll reply soon." });
      setForm({
        name: "",
        email: "",
        phone: "",
        service: services[0]?.value || "",
        budget: "",
        message: "",
      });
      setErrors({});
      if (typeof onSuccess === "function") onSuccess();
    } catch (err) {
      console.error("ContactForm error:", err);
      setStatus({ type: "error", message: "Something went wrong. Please try again or message on WhatsApp." });
    } finally {
      setLoading(false);
    }
  };

  // WhatsApp fallback quick link (URL-encoded message)
  const whatsappHref = `https://wa.me/919876543210?text=${encodeURIComponent(
    `Hi, I'm interested in ${services.find(s => s.value === form.service)?.label || "your services"}. My name is ${form.name || ""}.`
  )}`;

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl w-full bg-white rounded-2xl p-6 shadow-md border border-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <label className="flex flex-col">
          <span className="text-sm font-medium text-gray-700">Name</span>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className={`mt-2 px-3 py-2 rounded-md border ${errors.name ? "border-red-400" : "border-gray-200"} focus:outline-none focus:ring-2 focus:ring-blue-200`}
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
            value={form.email}
            onChange={handleChange}
            className={`mt-2 px-3 py-2 rounded-md border ${errors.email ? "border-red-400" : "border-gray-200"} focus:outline-none focus:ring-2 focus:ring-blue-200`}
            placeholder="you@domain.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "err-email" : undefined}
          />
          {errors.email && <span id="err-email" className="text-xs text-red-500 mt-1">{errors.email}</span>}
        </label>

        {/* Phone */}
        <label className="flex flex-col">
          <span className="text-sm font-medium text-gray-700">Phone (optional)</span>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className={`mt-2 px-3 py-2 rounded-md border ${errors.phone ? "border-red-400" : "border-gray-200"} focus:outline-none focus:ring-2 focus:ring-blue-200`}
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
            className={`mt-2 px-3 py-2 rounded-md border ${errors.service ? "border-red-400" : "border-gray-200"} focus:outline-none focus:ring-2 focus:ring-blue-200`}
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
          className="mt-2 px-3 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
          placeholder="e.g., ₹10,000 - ₹30,000"
        />
      </label>

      {/* Message */}
      <label className="flex flex-col mt-4">
        <span className="text-sm font-medium text-gray-700">Message</span>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          className={`mt-2 px-3 py-2 rounded-md border ${errors.message ? "border-red-400" : "border-gray-200"} focus:outline-none focus:ring-2 focus:ring-blue-200 min-h-[120px]`}
          placeholder="Tell me about your project, timeline and goals..."
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
          className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium shadow hover:bg-blue-700 transition disabled:opacity-60"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-lg text-sm bg-white hover:bg-gray-50 transition"
        >
          💬 Message on WhatsApp
        </a>

        <p className="text-xs text-gray-500 mt-2 sm:mt-0">Or call: <span className="font-medium text-gray-700">+91 98765 43210</span></p>
      </div>
    </form>
  );
}
