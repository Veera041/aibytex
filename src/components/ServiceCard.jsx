// src/components/ServiceCard.jsx
import { Link } from "react-router-dom";

/**
 * ServiceCard
 *
 * Props:
 *  - id
 *  - icon (string | JSX)      : emoji or JSX icon
 *  - title (string)
 *  - shortDesc (string)
 *  - benefits (array)         : optional list of benefit strings
 *  - slug (string)            : link slug (e.g., "website-development")
 *  - className (string)       : extra classes
 *
 * Example:
 * <ServiceCard {...service} />
 */
export default function ServiceCard({
  id,
  icon = "🛠️",
  title,
  shortDesc,
  benefits = [],
  slug = "",
  className = "",
}) {
  return (
    <article
      aria-labelledby={`service-${id}-title`}
      className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 ${className}`}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className="flex items-center justify-center w-12 h-12 rounded-lg text-2xl bg-gray-50 border border-gray-100"
          aria-hidden="true"
        >
          {typeof icon === "string" ? <span>{icon}</span> : icon}
        </div>

        <div className="flex-1">
          {/* Title */}
          <h3 id={`service-${id}-title`} className="text-lg font-semibold text-gray-900">
            {title}
          </h3>

          {/* Short description */}
          <p className="text-sm text-gray-600 mt-2">{shortDesc}</p>
        </div>
      </div>

      {/* Benefits (optional) */}
      {benefits && benefits.length > 0 && (
        <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
          {benefits.slice(0, 4).map((b, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="text-green-500 text-base">✓</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}

      {/* CTA */}
      <div className="mt-6 flex items-center justify-between gap-4">
        <Link
          to={slug ? `/services/${slug}` : "/services"}
          className="text-sm font-medium text-blue-600 hover:underline"
          aria-label={`Learn more about ${title}`}
        >
          Learn more →
        </Link>

        <a
          href={`https://wa.me/919876543210?text=Hi%20I%27m%20interested%20in%20${encodeURIComponent(
            title
          )}`}
          target="_blank"
          rel="noreferrer"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold shadow-sm hover:bg-blue-700 transition"
        >
          Get Quote
        </a>
      </div>
    </article>
  );
}
