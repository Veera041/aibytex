// src/components/layout/PageWrapper.jsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

/**
 * PageWrapper
 *
 * Props:
 *  - title (string)        : page title (will append " — VeeraTech")
 *  - description (string)  : meta description (will create/update <meta name="description">)
 *  - className (string)    : extra UnoCSS/Tailwind classes for main wrapper
 *  - children              : page content
 *
 * Usage:
 *  <PageWrapper title="Home" description="VeeraTech - Web dev & ads">
 *    ...page content...
 *  </PageWrapper>
 */
export default function PageWrapper({ title, description, className = "", children }) {
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  // Scroll to top & update title/description on route change
  useEffect(() => {
    // Smooth scroll to top
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    // Update document title if provided
    if (title) {
      document.title = `${title} — VeeraTech`;
    }

    // Update (or create) meta description if provided
    if (description) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) {
        meta.setAttribute("content", description);
      } else {
        const m = document.createElement("meta");
        m.name = "description";
        m.content = description;
        document.head.appendChild(m);
      }
    }

    // simple fade-in: toggle visible after tiny delay to allow transition
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 15);
    return () => clearTimeout(t);
  }, [location.pathname, title, description]);

  return (
    <main className={`min-h-screen pt-20 pb-16 ${className}`}>
      <div className="container mx-auto px-4">
        {/* simple fade using opacity transition (UnoCSS/Tailwind style) */}
        <div className={`transition-opacity duration-500 ease-in-out ${visible ? "opacity-100" : "opacity-0"}`}>
          {children}
        </div>
      </div>
    </main>
  );
}
