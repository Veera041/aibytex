// src/components/layout/Footer.jsx

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-10 border-t border-gray-800">
      <div className="container mx-auto px-4">

        {/* Top Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

          {/* Company Info */}
          <div>
            <h2 className="text-xl font-bold text-white mb-3">VeeraTech Solutions</h2>
            <p className="text-sm leading-relaxed">
              Freelance services for Web Development, Digital Marketing, Automation Bots,
              Google & Meta Ads. Delivering fast, clean and high-converting solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-white transition">Home</a></li>
              <li><a href="/services" className="hover:text-white transition">Services</a></li>
              <li><a href="/portfolio" className="hover:text-white transition">Portfolio</a></li>
              <li><a href="/about" className="hover:text-white transition">About</a></li>
              <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>Website Development</li>
              <li>Digital Marketing</li>
              <li>WhatsApp & Telegram Bots</li>
              <li>Google & Meta Ads</li>
              <li>Branding & SEO</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
            <p className="text-sm">📞 +91 98765 43210</p>
            <p className="text-sm">📧 info@veeratech.in</p>
            <div className="flex gap-4 mt-4">
              <a href="https://wa.me/919876543210" target="_blank" className="hover:text-white text-xl">
                🟢 WhatsApp
              </a>
              <a href="https://t.me/yourtelegram" target="_blank" className="hover:text-white text-xl">
                🔵 Telegram
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Footer */}
        <div className="text-center border-t border-gray-800 mt-8 pt-5 text-sm">
          © {currentYear} VeeraTech Solutions. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
