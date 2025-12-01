// src/pages/NotFound.jsx

import PageWrapper from "../components/layout/PageWrapper";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <PageWrapper
      title="Page Not Found"
      description="The page you're looking for does not exist or has been moved."
      className="text-center"
    >
      <div className="flex flex-col items-center justify-center py-20">

        {/* Illustration or Emoji */}
        <div className="text-7xl mb-6">😕</div>

        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          404 – Page Not Found
        </h1>

        <p className="text-gray-600 max-w-md text-lg">
          Sorry! The page you're trying to reach doesn't exist or may have been moved.
        </p>

        <div className="mt-8 flex gap-4">
          <Link
            to="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Back to Home
          </Link>

          <Link
            to="/contact"
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition"
          >
            Contact Support
          </Link>
        </div>

        {/* Optional decorative text */}
        <p className="mt-10 text-sm text-gray-400">
          Error Code: <span className="font-mono">404</span>
        </p>
      </div>
    </PageWrapper>
  );
}
