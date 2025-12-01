// src/pages/Contact.jsx
import PageWrapper from "../components/layout/PageWrapper";
import SectionTitle from "../components/ui/SectionTitle";
import ContactForm from "../components/ContactForm";

export default function Contact() {
  return (
    <PageWrapper
      title="Contact"
      description="Contact VeeraTech for website development, marketing, automation bots, Google & Meta Ads. Get a free quote or book a call."
    >
      {/* Page title */}
      <SectionTitle
        title="Get in touch"
        subtitle="Have a project or question? Fill the form, message on WhatsApp, or book a call — we’ll reply within 24 hours."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Left column: Contact details + quick actions */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
            <p className="mt-3 text-sm text-gray-600">
              Reach out for project quotes, support, or partnerships. Prefer WhatsApp? Click the green button.
            </p>

            <ul className="mt-4 space-y-3 text-sm text-gray-700">
              <li><strong>Phone:</strong> <a href="tel:+919876543210" className="text-blue-600">+91 98765 43210</a></li>
              <li><strong>Email:</strong> <a href="mailto:info@veeratech.in" className="text-blue-600">info@veeratech.in</a></li>
              <li><strong>Working hours:</strong> Mon — Sat, 9:30 AM — 6:30 PM IST</li>
              <li><strong>Location:</strong> Chennai, Tamil Nadu, India</li>
            </ul>

            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/919876543210?text=Hi%20VeeraTech%2C%20I%20want%20a%20quote"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg font-medium shadow hover:bg-green-700 transition"
              >
                💬 Message on WhatsApp
              </a>

              <a
                href="https://t.me/yourtelegram"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-lg text-gray-800 bg-white hover:bg-gray-50 transition"
              >
                🔵 Telegram
              </a>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h4 className="text-md font-semibold text-gray-900">Quick links</h4>
            <div className="mt-4 grid grid-cols-1 gap-3">
              <a href="/services" className="text-bold text-green-600 hover:underline">View Services →</a>
              <a href="/portfolio" className="text-bold text-green-600 hover:underline">See Portfolio →</a>
              <a href="/about" className="text-bold text-green-600 hover:underline">About Us →</a>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h4 className="text-md font-semibold text-gray-900">Working Hours</h4>
            <ul className="mt-3 text-sm text-gray-700 space-y-1">
              <li>Mon — Fri: 9:30 AM — 6:30 PM</li>
              <li>Sat: 10:00 AM — 3:00 PM</li>
              <li>Sun: Closed</li>
            </ul>
            <p className="text-xs text-gray-500 mt-3">If you message outside hours, we’ll reply next working day.</p>
          </div>
        </div>

        {/* Middle column: Contact form */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Send a message</h3>
            <p className="mt-2 text-sm text-gray-600">Complete the form below and we’ll get back within 24 hours.</p>

            <div className="mt-6">
              {/* Provide endpoint prop if you set up a serverless handler */}
              <ContactForm endpoint="/api/contact" />
            </div>
          </div>

          {/* Optional: Map */}
          <div className="mt-6 bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
            <div className="p-4">
              <h4 className="text-sm font-medium text-gray-900">Our Location</h4>
              <p className="text-xs text-gray-500 mt-1">Chennai, Tamil Nadu, India</p>
            </div>

            {/* Replace src with your actual Google Maps embed link */}
            <div className="w-full h-64">
              <iframe
                title="VeeraTech location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31508.000000000000!2d80.0000000!3d13.0000000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267d000000001%3A0x0000000000000000!2sChennai!5e0!3m2!1sen!2sin!4v0000000000000"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Small CTA */}
      <section className="mt-12 text-center">
        <div className="inline-block bg-green-100 px-6 py-4 rounded-xl">
          <h4 className="text-lg font-semibold text-green-700">Prefer a quick call?</h4>
          <p className="text-sm text-green-600 mt-1">Schedule a 30-minute free consultation and we’ll discuss your project.</p>
          <a
            href="https://calendly.com/your-calendly"
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-4 px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Book a free consultation
          </a>
        </div>
      </section>
    </PageWrapper>
  );
}
