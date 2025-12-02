// src/routes/AppRoutes.jsx
import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

// analytics helpers (from src/utils/analytics.js)
import { trackPageView, trackTimeSpent } from "../utils/analytics";

/* -------------------------
   Loading fallback component
   ------------------------- */
function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent" />
        <p className="mt-4 text-sm text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

/* -------------------------
   ScrollToTop (must be used *inside* Router)
   ------------------------- */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    // smooth behavior when route changes
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [pathname]);
  return null;
}

/* -------------------------
   Focus main content for accessibility after navigation
   (Ensure your PageWrapper or pages render an element with id="main-content")
   ------------------------- */
function FocusOnRoute() {
  const { pathname } = useLocation();
  useEffect(() => {
    const el = document.getElementById("main-content");
    if (el) {
      // small timeout to wait for route render, then focus
      setTimeout(() => {
        el.tabIndex = -1;
        el.focus({ preventScroll: true });
      }, 80);
    }
  }, [pathname]);
  return null;
}

/* -------------------------
   Analytics tracker (tracks page view + time spent)
   - call trackTimeSpent() for previous page, then trackPageView() for new page
   ------------------------- */
function AnalyticsTracker() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Save time spent for previous page (if any)
    try {
      trackTimeSpent();
    } catch (err) {
      // ignore analytics failures silently
      // console.warn("trackTimeSpent failed", err);
    }

    // Track current page view
    try {
      trackPageView(pathname);
    } catch (err) {
      // console.warn("trackPageView failed", err);
    }

    // Optional: you could also sync to server periodically or on unload
  }, [pathname]);

  // on unmount (or before unload) we can push last page time
  useEffect(() => {
    const handler = () => {
      try {
        trackTimeSpent();
      } catch {}
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, []);

  return null;
}

/* -------------------------
   ProtectedRoute — simple pattern to guard routes
   ------------------------- */
function ProtectedRoute({ isAllowed, children, redirectTo = "/contact" }) {
  if (!isAllowed) return <Navigate to={redirectTo} replace />;
  return children;
}

/* -------------------------
   Redirect helper: /services/:slug -> /plans/:slug
   ------------------------- */
function ServicesSlugRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/plans/${slug}`} replace />;
}

/* -------------------------
   Lazy-loaded pages
   ------------------------- */
const Home = lazy(() => import("../pages/Home"));
const Services = lazy(() => import("../pages/Services"));
const ServicePlans = lazy(() => import("../pages/ServicePlans")); // /plans/:slug
const Portfolio = lazy(() => import("../pages/Portfolio"));
const About = lazy(() => import("../pages/About"));
const Contact = lazy(() => import("../pages/Contact"));
const NotFound = lazy(() => import("../pages/NotFound"));
// const Dashboard = lazy(() => import("../pages/Dashboard")); // optional

/**
 * AppRoutes
 * - pass isLoggedIn prop to enable guarded routes (ProtectedRoute)
 */
export default function AppRoutes({ isLoggedIn = false }) {
  return (
    <BrowserRouter>
      {/* Global header */}
      <Navbar />

      {/* Utilities that rely on Router context */}
      <ScrollToTop />
      <FocusOnRoute />
      <AnalyticsTracker />

      {/* Main routes */}
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Public pages */}
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />

          {/* Redirect older /services/:slug to the new /plans/:slug pattern */}
          <Route path="/services/:slug" element={<ServicesSlugRedirect />} />

          {/* Service-specific plans/details */}
          <Route path="/plans/:slug" element={<ServicePlans />} />

          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Example protected route (uncomment when you create Dashboard) */}
          {/*
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isAllowed={isLoggedIn}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          */}

          {/* Catch-all 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      {/* Global footer */}
      <Footer />
    </BrowserRouter>
  );
}
