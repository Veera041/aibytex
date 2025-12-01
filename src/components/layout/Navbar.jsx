// src/components/layout/Navbar.jsx
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

/**
 * Navbar.jsx
 * - Button is positioned INSIDE the centered container so it stays attached to the card/header
 * - Button is absolute inside the container and vertically centered in the nav
 * - No SVG; three span bars with inline styles for robustness
 * - Desktop links: no bullets; hover/focus -> light green
 * - Mobile drawer: slide+fade; closes on escape/outside click/route change
 */

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);
  const btnRef = useRef(null);

  // close when route changes
  useEffect(() => setOpen(false), [location.pathname]);

  // escape + outside click
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    function onDocClick(e) {
      if (!menuRef.current || !btnRef.current) return;
      if (open && !menuRef.current.contains(e.target) && !btnRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDocClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDocClick);
    };
  }, [open]);

  // BAR VISUALS (inline to avoid global css conflicts)
  const BAR_WIDTH = 28; // px
  const BAR_HEIGHT = 3; // px
  const GAP = 7; // px
  const inactiveColor = "#1f2937";
  const activeColor = "#16a34a";

  const topBarStyle = {
    width: `${BAR_WIDTH}px`,
    height: `${BAR_HEIGHT}px`,
    borderRadius: 9999,
    background: open ? activeColor : inactiveColor,
    position: "absolute",
    left: 0,
    transform: open ? `translateY(${GAP}px) rotate(45deg)` : `translateY(-${GAP}px) rotate(0deg)`,
    transition: "transform 220ms ease, background-color 160ms ease",
    boxSizing: "border-box",
  };
  const middleBarStyle = {
    width: `${BAR_WIDTH}px`,
    height: `${BAR_HEIGHT}px`,
    borderRadius: 9999,
    background: open ? activeColor : inactiveColor,
    position: "absolute",
    left: 0,
    transform: open ? "scaleX(0.05)" : "scaleX(1)",
    opacity: open ? 0 : 1,
    transition: "transform 180ms ease, opacity 180ms ease, background-color 160ms ease",
    boxSizing: "border-box",
  };
  const bottomBarStyle = {
    width: `${BAR_WIDTH}px`,
    height: `${BAR_HEIGHT}px`,
    borderRadius: 9999,
    background: open ? activeColor : inactiveColor,
    position: "absolute",
    left: 0,
    transform: open ? `translateY(-${GAP}px) rotate(-45deg)` : `translateY(${GAP}px) rotate(0deg)`,
    transition: "transform 220ms ease, background-color 160ms ease",
    boxSizing: "border-box",
  };
  const wrapperStyle = {
    width: `${BAR_WIDTH}px`,
    height: `${BAR_HEIGHT * 3 + GAP * 2}px`,
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <>
      <header className="w-full fixed top-0 left-0 z-40 bg-white/95 backdrop-blur-md shadow-sm">
        {/* IMPORTANT: keep the centered container as the positioning context */}
        <nav className="relative">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center relative">
            {/* Logo */}
            <Link to="/" className="text-xl font-bold text-gray-900">
              QuadCore
            </Link>

            {/* Desktop links (md+) */}
            <ul className="hidden md:flex gap-8 text-gray-700 font-medium list-none marker:hidden m-0 p-0">
              {[
                ["Home", "/"],
                ["Services", "/services"],
                ["Portfolio", "/portfolio"],
                ["About Us", "/about"],
                ["Contact", "/contact"],
              ].map(([label, to]) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="hover:text-green-500 focus:text-green-500 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-green-200 rounded"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* MOBILE BUTTON: ABSOLUTE inside the CENTERED container (so it aligns to card) */}
            {/* vertical center inside the nav: top-1/2 -translate-y-1/2 */}
            <button
              ref={btnRef}
              onClick={() => setOpen((s) => !s)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              type="button"
              className="md:hidden absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded cursor-pointer
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-green-200 focus-visible:ring-offset-2
                         bg-white/90 hover:bg-white z-50"
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              <span style={wrapperStyle}>
                <span style={topBarStyle} />
                <span style={middleBarStyle} />
                <span style={bottomBarStyle} />
              </span>
            </button>
          </div>

          {/* Mobile drawer sits directly under the centered container */}
          <div
            ref={menuRef}
            className={`md:hidden bg-white shadow-md absolute w-full left-0 overflow-hidden border-t border-gray-100 transition-[max-height,opacity,transform] duration-300 ease-in-out
              ${open ? "max-h-[520px] opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"}`}
            aria-hidden={!open}
          >
            <ul className="flex flex-col px-6 py-4 gap-4 text-gray-700 font-medium list-none marker:hidden m-0 p-0">
              <li><Link to="/" onClick={() => setOpen(false)} className="block py-2 hover:text-green-500 focus:text-green-500 cursor-pointer">Home</Link></li>
              <li><Link to="/services" onClick={() => setOpen(false)} className="block py-2 hover:text-green-500 focus:text-green-500 cursor-pointer">Services</Link></li>
              <li><Link to="/portfolio" onClick={() => setOpen(false)} className="block py-2 hover:text-green-500 focus:text-green-500 cursor-pointer">Portfolio</Link></li>
              <li><Link to="/about" onClick={() => setOpen(false)} className="block py-2 hover:text-green-500 focus:text-green-500 cursor-pointer">About Us</Link></li>
              <li><Link to="/contact" onClick={() => setOpen(false)} className="block py-2 hover:text-green-500 focus:text-green-500 cursor-pointer">Contact</Link></li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
}
