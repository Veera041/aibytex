// src/routes/AppRoutes.jsx
import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

/* Loading fallback shown while lazy pages are loading */
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

/* ScrollToTop component should be used inside Router */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    // smooth behavior only when route changes
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

/* ProtectedRoute — simple pattern to guard routes */
function ProtectedRoute({ isAllowed, children, redirectTo = "/contact" }) {
  if (!isAllowed) return <Navigate to={redirectTo} replace />;
  return children;
}

/* Redirect helper: /services/:slug -> /plans/:slug */
function ServicesSlugRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/plans/${slug}`} replace />;
}

/* Lazy pages */
const Home = lazy(() => import("../pages/Home"));
const Services = lazy(() => import("../pages/Services"));
const ServicePlans = lazy(() => import("../pages/ServicePlans")); // /plans/:slug
const Portfolio = lazy(() => import("../pages/Portfolio"));
const About = lazy(() => import("../pages/About"));
const Contact = lazy(() => import("../pages/Contact"));
// const Pricing = lazy(() => import("../pages/Pricing")); // keep if you have a pricing page
const NotFound = lazy(() => import("../pages/NotFound"));
/* Example protected page (uncomment & create if needed) */
// const Dashboard = lazy(() => import("../pages/Dashboard"));

/**
 * AppRoutes
 * - pass isLoggedIn prop to enable guarded routes
 */
export default function AppRoutes({ isLoggedIn = false }) {
  return (
    <BrowserRouter>
      {/* global header/nav */}
      <Navbar />

      {/* ensure scroll-to-top runs after route changes */}
      <ScrollToTop />

      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Public pages */}
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />

          {/* Redirect older/alternate service detail path to plans */}
          <Route path="/services/:slug" element={<ServicesSlugRedirect />} />

          {/* Service-specific plans page */}
          <Route path="/plans/:slug" element={<ServicePlans />} />

          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Pricing page (if you have one) */}
          {/* <Route path="/pricing" element={<Pricing />} /> */}

          {/* Example protected route (uncomment if you add Dashboard page) */}
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

      {/* global footer */}
      <Footer />
    </BrowserRouter>
  );
}
