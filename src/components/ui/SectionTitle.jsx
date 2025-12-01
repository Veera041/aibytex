// src/components/ui/SectionTitle.jsx

/**
 * SectionTitle Component
 *
 * Props:
 * - title (string)         : main heading
 * - subtitle (string)      : optional small description
 * - align (string)         : "left" | "center" | "right"
 * - className (string)     : extra classes
 *
 * Example:
 * <SectionTitle
 *    title="Our Services"
 *    subtitle="What we offer to help your business grow"
 * />
 */

export default function SectionTitle({
  title,
  subtitle = "",
  align = "center",
  className = "",
}) {
  const alignment = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <div className={`mb-10 ${alignment[align]} ${className}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
          {subtitle}
        </p>
      )}

      {/* Decorative underline (optional) */}
      <div className="mt-4 flex justify-center">
        <span className="w-20 h-1 bg-green-600 rounded-full"></span>
      </div>
    </div>
  );
}
