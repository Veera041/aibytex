// src/components/PortfolioCard.jsx

export default function PortfolioCard({
  id,
  title,
  image,
  category,
  shortDesc,
  tech = [],
  link = "#",
}) {
  return (
    <article
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100"
    >
      {/* Image */}
      <div className="w-full h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-green-600">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">{category}</p>

        <p className="text-sm text-gray-700 mt-3 leading-relaxed">{shortDesc}</p>

        {/* Tech Stack Badges */}
        {tech.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {tech.slice(0, 4).map((t, i) => (
              <span
                key={i}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md border border-gray-200"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-5 flex justify-between items-center">
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-green-600 hover:underline"
          >
            View Project →
          </a>

          <a
            href={`/portfolio/${id}`}
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Details
          </a>
        </div>
      </div>
    </article>
  );
}
