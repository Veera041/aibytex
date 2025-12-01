// src/components/ui/Button.jsx

/**
 * Button Component
 *
 * Props:
 * - children (string/JSX) : button label or content
 * - variant (string)      : "primary" | "secondary" | "outline" | "ghost"
 * - size (string)         : "sm" | "md" | "lg"
 * - fullWidth (boolean)   : makes button block-level
 * - loading (boolean)     : shows loading state
 * - className (string)    : extra utility classes
 * - onClick (function)
 * - type (string)         : "button" | "submit"
 */

export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  className = "",
  type = "button",
  onClick,
  ...props
}) {
  // Variant styles
  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 shadow-sm",
    secondary:
      "bg-gray-800 text-white hover:bg-gray-900 shadow-sm",
    outline:
      "border border-gray-300 text-gray-800 bg-white hover:bg-gray-50",
    ghost:
      "text-gray-700 hover:bg-gray-100",
  };

  // Size styles
  const sizes = {
    sm: "text-sm px-3 py-1.5 rounded-md",
    md: "text-base px-4 py-2 rounded-lg",
    lg: "text-lg px-6 py-3 rounded-xl",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        transition duration-200
        disabled:opacity-60 disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
