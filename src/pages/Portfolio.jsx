// src/pages/Portfolio.jsx
import { useMemo, useState } from "react";
import PageWrapper from "../components/layout/PageWrapper";
import SectionTitle from "../components/ui/SectionTitle";
import PortfolioCard from "../components/PortfolioCard";
import portfolioData from "../data/portfolioData";

/**
 * Portfolio Page
 *
 * Features:
 * - Dynamic category filters (derived from portfolioData)
 * - Search (title + shortDesc + longDesc)
 * - Responsive grid
 * - "Load more" pagination
 */

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(6); // number of cards initially visible

  // derive categories from data
  const categories = useMemo(() => {
    const set = new Set(portfolioData.map((p) => p.category || "Other"));
    return ["All", ...Array.from(set)];
  }, []);

  // filtered results based on category and search query
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return portfolioData.filter((p) => {
      const inCategory = activeCategory === "All" ? true : p.category === activeCategory;
      if (!inCategory) return false;
      if (!q) return true;
      const hay = `${p.title} ${p.shortDesc} ${p.longDesc || ""}`.toLowerCase();
      return hay.includes(q);
    });
  }, [activeCategory, query]);

  const visibleItems = filtered.slice(0, visibleCount);
  const canLoadMore = visibleCount < filtered.length;

  return (
    <PageWrapper
      title="Portfolio"
      description="View recent projects and case studies — websites, landing pages, automation bots, and more."
    >
      <SectionTitle
        title="Our Portfolio"
        subtitle="Selected projects that show our design, development, and marketing work."
      />

      {/* Controls: filters + search */}
      <div className="mb-8 flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
        {/* Category pills */}
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setVisibleCount(6); // reset visible on category change
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                activeCategory === cat
                  ? "bg-blue-600 text-white shadow"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              aria-pressed={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="ml-auto w-full lg:w-96">
          <label className="relative block">
            <span className="sr-only">Search projects</span>
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setVisibleCount(6); // reset visible when search changes
              }}
              placeholder="Search projects, e.g., restaurant, ecommerce..."
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔎</span>
          </label>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-600">No projects found for your search.</p>
          <div className="mt-6">
            <button
              onClick={() => {
                setQuery("");
                setActiveCategory("All");
                setVisibleCount(6);
              }}
              className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Reset filters
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleItems.map((proj) => (
              <PortfolioCard key={proj.id} {...proj} />
            ))}
          </div>

          {/* Load more */}
          {canLoadMore && (
            <div className="mt-8 text-center">
              <button
                onClick={() => setVisibleCount((c) => c + 6)}
                className="px-6 py-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md"
              >
                Load more
              </button>
            </div>
          )}

          {/* Results info */}
          <div className="mt-4 text-sm text-gray-500 text-center">
            Showing {visibleItems.length} of {filtered.length} project{filtered.length > 1 ? "s" : ""}
            {activeCategory !== "All" && ` — category: ${activeCategory}`}
          </div>
        </>
      )}
    </PageWrapper>
  );
}
