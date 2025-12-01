// src/pages/Services.jsx
import { useMemo, useState } from "react";
import PageWrapper from "../components/layout/PageWrapper";
import SectionTitle from "../components/ui/SectionTitle";
import ServiceCard from "../components/ServiceCard";
import servicesData from "../data/servicesData";

export default function Services() {
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // derive categories
  const categories = useMemo(() => {
    const set = new Set(servicesData.map((s) => s.category || "Other"));
    return ["All", ...Array.from(set)];
  }, []);

  // filtered services
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return servicesData.filter((s) => {
      const inCategory = categoryFilter === "All" ? true : s.category === categoryFilter;
      if (!inCategory) return false;
      if (!q) return true;
      return (
        s.title.toLowerCase().includes(q) ||
        (s.shortDesc || "").toLowerCase().includes(q) ||
        (s.longDesc || "").toLowerCase().includes(q)
      );
    });
  }, [query, categoryFilter]);

  return (
    <PageWrapper
      title="Services"
      description="Professional services: Website Development, Digital Marketing, WhatsApp & Telegram Bots, Google & Meta Ads, Branding and UI."
    >
      <SectionTitle
        title="Services"
        subtitle="What we do — clear packages and practical outcomes. Choose a service to learn more or get a quote."
      />

      {/* Controls */}
      <div className="flex flex-col lg:flex-row items-center gap-4 mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 text-sm rounded-full transition ${
                categoryFilter === cat
                  ? "bg-blue-600 text-white shadow"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="ml-auto w-full lg:w-80">
          <label className="relative block">
            <span className="sr-only">Search services</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search services, e.g., website, ads, bot..."
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔎</span>
          </label>
        </div>
      </div>

      {/* Services grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-600">No services match your search.</p>
          <div className="mt-6">
            <button
              onClick={() => {
                setQuery("");
                setCategoryFilter("All");
              }}
              className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Reset filters
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((s) => (
            <ServiceCard key={s.id} {...s} />
          ))}
        </div>
      )}

      {/* CTA */}
      <section className="mt-12 bg-green-50 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-green-800">Not sure which service fits?</h3>
          <p className="text-sm text-green-700 mt-1">Book a free 30-minute consultation and we'll suggest the best plan.</p>
        </div>

        <div className="flex gap-3">
          <a
            href="/contact"
            className="px-5 py-3 bg-green-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Request a Quote
          </a>

          <a
            href="https://wa.me/919876543210?text=Hi%20VeeraTech%2C%20I%27d%20like%20a%20consultation"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-3 border border-gray-200 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition"
          >
            Message on WhatsApp
          </a>
        </div>
      </section>
    </PageWrapper>
  );
}
