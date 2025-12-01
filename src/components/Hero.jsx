// src/components/Hero.jsx
import { Link } from "react-router-dom";

/**
 * Hero
 *
 * Props:
 *  - title (string)        : main heading (supports simple markup)
 *  - subtitle (string)     : supporting paragraph
 *  - ctaText (string)      : primary CTA text
 *  - ctaLink (string)      : primary CTA link (internal route)
 *  - secondaryText (string): secondary CTA text
 *  - secondaryLink (string): secondary CTA link
 *  - image (string)        : optional image path (renders on the right on wide screens)
 *  - eyebrow (string)      : small text above the title (optional)
 *
 * Example:
 * <Hero
 *   title="Websites that convert visitors into customers"
 *   subtitle="I build fast, SEO-friendly websites, automation bots and ad campaigns for small businesses."
 *   ctaText="Get a Free Quote"
 *   ctaLink="/contact"
 *   secondaryText="View Portfolio"
 *   secondaryLink="/portfolio"
 *   image="/assets/images/hero/hero-1.png"
 * />
 */

export default function Hero({
  title = "Build beautiful websites & digital campaigns",
  subtitle = "I craft modern websites, automation bots and ad campaigns that turn visitors into customers.",
  ctaText = "Get a Free Quote",
  ctaLink = "/contact",
  secondaryText = "View Portfolio",
  secondaryLink = "/portfolio",
  image = "/assets/images/hero/hero-illustration.png",
  eyebrow,
}) {
  return (
    <section
      className="pt-24 pb-12"
      aria-labelledby="hero-heading"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Left: Text */}
          <div className="lg:col-span-7">
            {eyebrow && (
              <p className="text-sm text-blue-600 font-medium mb-3">{eyebrow}</p>
            )}

            <h1
              id="hero-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-gray-900"
            >
              {title}
            </h1>

            <p className="mt-4 text-gray-600 max-w-2xl text-lg">
              {subtitle}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center">
              <Link
                to={ctaLink}
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium shadow hover:bg-blue-700 transition"
                aria-label={ctaText}
              >
                {ctaText}
              </Link>

              <Link
                to={secondaryLink}
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-200 rounded-lg text-gray-800 bg-white hover:bg-gray-50 transition"
                aria-label={secondaryText}
              >
                {secondaryText}
              </Link>
            </div>

            {/* Trust badges / small features */}
            <div className="mt-6 flex flex-wrap gap-4 items-center text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <span className="text-sm">✅</span>
                <span>30 days free support</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">⚡</span>
                <span>Fast & SEO-friendly</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">🔒</span>
                <span>Secure & reliable</span>
              </div>
            </div>
          </div>

          {/* Right: Visual */}
          <div className="lg:col-span-5">
            <div className="w-full flex justify-center lg:justify-end">
              {/* Decorative container with soft background */}
              <div className="max-w-md w-full bg-gradient-to-tr from-white to-gray-50 rounded-2xl p-4 shadow-lg">
                {image ? (
                  <img
                    src={image}
                    alt="Hero visual"
                    className="w-full h-64 object-contain rounded-lg"
                    loading="lazy"
                    width="600"
                    height="400"
                  />
                ) : (
                  // Fallback SVG illustration (simple)
                  <svg
                    viewBox="0 0 600 400"
                    className="w-full h-64"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <defs>
                      <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
                        <stop offset="0" stopColor="#60a5fa" stopOpacity="0.9" />
                        <stop offset="1" stopColor="#7c3aed" stopOpacity="0.9" />
                      </linearGradient>
                    </defs>
                    <rect rx="20" width="100%" height="100%" fill="#f8fafc" />
                    <g transform="translate(60,40)">
                      <rect width="220" height="120" rx="12" fill="url(#g)" opacity="0.95" />
                      <rect y="140" width="320" height="180" rx="12" fill="#fff" stroke="#e6eefb" />
                      <circle cx="260" cy="80" r="36" fill="#fde68a" />
                    </g>
                  </svg>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
