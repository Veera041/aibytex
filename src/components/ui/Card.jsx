// src/components/ui/Card.jsx

/**
 * Card Component
 *
 * Props:
 * - children (JSX)         : inner content
 * - padding (string)       : p-classes like "p-4", "p-6"
 * - shadow (string)        : "sm" | "md" | "lg" | "none"
 * - rounded (string)       : "md" | "lg" | "xl" | "none"
 * - hover (boolean)        : enable hover shadow/scale
 * - className (string)     : extra classes
 *
 * Example:
 * <Card shadow="md" rounded="xl" hover>
 *   <h3>Title</h3>
 * </Card>
 */

export default function Card({
  children,
  padding = "p-5",
  shadow = "md",
  rounded = "xl",
  hover = true,
  className = "",
  ...props
}) {
  const shadowMap = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
  };

  const roundedMap = {
    none: "",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
  };

  return (
    <div
      className={`
        bg-white
        border border-gray-100
        ${padding}
        ${shadowMap[shadow]}
        ${roundedMap[rounded]}
        ${hover ? "hover:shadow-xl hover:-translate-y-1 transition-all duration-300" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}
