// src/routes/AppRoutes.jsx
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

/* Small helpers */
function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent"></div>
        <p className="mt-4 text-sm text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

/* ScrollToTop on route change */
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

/* ProtectedRoute — simple pattern to guard routes */
function ProtectedRoute({ isAllowed, children, redirectTo = "/contact" }) {
  if (!isAllowed) return <Navigate to={redirectTo} replace />;
  return children;
}

/* Lazy pages */
const Home = lazy(() => import("../pages/Home"));
const Services = lazy(() => import("../pages/Services"));
const Portfolio = lazy(() => import("../pages/Portfolio"));
const About = lazy(() => import("../pages/About"));
const Contact = lazy(() => import("../pages/Contact"));
const NotFound = lazy(() => import("../pages/NotFound"));
/* Example protected page (create if needed) */
// const Dashboard = lazy(() => import("../pages/Dashboard"));

/**
 * AppRoutes
 * - supply `isLoggedIn` prop if you want to enable protected routes
 * - you can wrap AppRoutes in a context/provider higher up if needed
 */
export default function AppRoutes({ isLoggedIn = false }) {
  return (
    <BrowserRouter>
      {/* Navbar sits outside Suspense so it shows during lazy loads */}
      <Navbar />

      {/* Scroll restoration */}
      <ScrollToTop />

      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Example dynamic route for project details (if implemented) */}
          <Route path="/portfolio/:id" element={<Portfolio />} />

          {/* Example protected route */}
          {/* <Route
            path="/dashboard"
            element={
              <ProtectedRoute isAllowed={isLoggedIn}>
                <Dashboard />
              </ProtectedRoute>
            }
          /> */}

          {/* Catch-all 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <Footer />
    </BrowserRouter>
  );
}
