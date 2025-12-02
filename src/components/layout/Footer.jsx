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
            <h2 className="text-xl font-bold text-white mb-3">Gidorha</h2>
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

          {/* Services (updated list) */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>Website Development</li>
              <li>App Development</li>
              <li>Digital Marketing</li>
              <li>WhatsApp & Telegram Bots</li>
              <li>Google & Meta Ads</li>
              <li>Branding & UI Design</li>
              <li>Business Analytics</li>
              <li>Document Digitization</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
            <p className="text-sm">📞 +91 --</p>
            <p className="text-sm">📧 info@gidorha.com</p>

            <div className="flex items-center gap-4 mt-4">

  {/* WhatsApp */}
  <a
    href="https://wa.me/919876543210"
    target="_blank"
    rel="noreferrer"
    className="text-green-400 hover:text-green-300 transition"
    aria-label="WhatsApp"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.149-.67.15-.198.297-.768.967-.94 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.148-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.298-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004A9.87 9.87 0 0 1 2.17 12.004c0-1.813.5-3.58 1.448-5.116L2.003 2l5.069 1.601A9.87 9.87 0 0 1 12.004 2c5.464 0 9.877 4.413 9.877 9.877a9.82 9.82 0 0 1-2.905 6.973 9.82 9.82 0 0 1-6.925 2.935" />
    </svg>
  </a>

  {/* Telegram */}
  <a
    href="https://t.me/gidorha"
    target="_blank"
    rel="noreferrer"
    className="text-blue-400 hover:text-blue-300 transition"
    aria-label="Telegram"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9.036 15.082l-.396 5.598c.568 0 .815-.243 1.113-.533l2.665-2.55 5.517 4.044c1.012.558 1.723.265 1.992-.932l3.612-16.85c.331-1.596-.58-2.237-1.588-1.844L1.674 9.358c-1.56.608-1.548 1.48-.284 1.868l5.906 1.844 13.708-8.63-11.968 9.86z"/>
    </svg>
  </a>
  {/* Instagram */}
<a
  href="https://instagram.com/gidorha"
  target="_blank"
  rel="noreferrer"
  className="text-pink-500 hover:text-pink-400 transition"
  aria-label="Instagram"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-3a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
  </svg>
</a>


</div>

          </div>

        </div>

        {/* Bottom Footer */}
        <div className="text-center border-t border-gray-800 mt-8 pt-5 text-sm">
          © {currentYear} Gidorha. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
