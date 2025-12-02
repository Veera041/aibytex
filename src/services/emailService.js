// src/services/emailService.js
import emailjs from "@emailjs/browser";

/**
 * sendContactEmail(formData)
 *
 * formData: {
 *   name, email, phone, service, budget, message
 * }
 *
 * Returns: { success: boolean, response?: any, error?: any }
 */
export async function sendContactEmail(formData) {
  try {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      throw new Error("EmailJS env vars are missing. Check VITE_EMAILJS_* variables.");
    }

    // Template params must match the EmailJS template variables you created
    const templateParams = {
      from_name: formData.name || "Anonymous",
      from_email: formData.email || "",
      phone: formData.phone || "",
      service: formData.service || "",
      budget: formData.budget || "",
      message: formData.message || "",
      submitted_at: new Date().toISOString(),
    };

    const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
    return { success: true, response: result };
  } catch (error) {
    console.error("sendContactEmail error:", error);
    return { success: false, error };
  }
}
