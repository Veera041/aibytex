// src/pages/ServicePlans.jsx
import { useEffect, useRef } from "react";
import { useParams, Link, useLocation } from "react-router-dom";

import ServicePlansData from "../data/ServicePlansData";
import services from "../data/servicesData";

/**
 * ServicePlans (animated + fully responsive)
 * - fixed duplicate JSX attribute error
 * - staggered entrance animation for cards
 * - accessible (respects prefers-reduced-motion)
 * - featured card styling retained
 */
export default function ServicePlans() {
  const { slug } = useParams();
  const location = useLocation();
  const scrollTargetRef = useRef(null);

  const svcFromPlansData = ServicePlansData?.[slug];
  const svcFromServicesArray = services?.find((s) => s.slug === slug || s.id === slug);

  const service = svcFromPlansData
    ? {
        title: svcFromPlansData.title,
        shortDesc: svcFromPlansData.description || svcFromPlansData.shortDesc || "",
        plans: svcFromPlansData.plans || [],
      }
    : svcFromServicesArray
    ? {
        title: svcFromServicesArray.title,
        shortDesc: svcFromServicesArray.shortDesc || svcFromServicesArray.description || "",
        plans: svcFromServicesArray.plans || [],
      }
    : null;

  const query = new URLSearchParams(location.search);
  const highlightPlanId = query.get("plan");

  useEffect(() => {
    if (highlightPlanId && scrollTargetRef.current) {
      setTimeout(() => {
        try {
          scrollTargetRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
          scrollTargetRef.current.animate(
            [
              { boxShadow: "0 0 0 0 rgba(59,130,246,0)" },
              { boxShadow: "0 14px 50px -22px rgba(59,130,246,0.18)" },
              { boxShadow: "0 0 0 0 rgba(59,130,246,0)" },
            ],
            { duration: 900 }
          );
        } catch (e) {
          /* ignore */
        }
      }, 120);
    }
  }, [highlightPlanId, service]);

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-lg md:text-2xl font-semibold">Service not found</h2>
          <p className="mt-3 text-gray-600">
            We couldn't find the service you requested. Go back to{" "}
            <Link to="/services" className="text-green-600 underline">
              Services
            </Link>
            .
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* page-level animations + prefers-reduced-motion safe checks */}
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @keyframes cardEntrance {
            0% { opacity: 0; transform: translateY(10px) scale(.997); }
            60% { opacity: 1; transform: translateY(-4px) scale(1.002); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }

          .animate-card {
            animation-name: cardEntrance;
            animation-duration: 520ms;
            animation-timing-function: cubic-bezier(.2,.9,.2,1);
            animation-fill-mode: both;
          }

          /* subtle floating hover on desktop */
          @media (min-width: 768px) {
            .card-hoverable:hover {
              transform: translateY(-8px) scale(1.01);
              box-shadow: 0 18px 40px -18px rgba(15,23,42,0.18);
            }
            .card-hoverable:focus-within {
              transform: translateY(-6px) scale(1.005);
              box-shadow: 0 14px 34px -16px rgba(15,23,42,0.14);
            }
          }
        }

        /* fallback for reduced motion users */
        @media (prefers-reduced-motion: reduce) {
          .animate-card, .card-hoverable { animation: none !important; transition: none !important; transform: none !important; }
        }

        /* small-touch tweak: smaller shadow and no large transform */
        @media (max-width: 767px) {
          .card-hoverable { transition: box-shadow 180ms ease, transform 180ms ease; }
        }

        /* featured shimmer (very subtle) */
        .featured-shimmer {
          background-image: linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.02) 100%);
          background-size: 200% 100%;
          animation: shimmer 3.5s linear infinite;
        }
        @keyframes shimmer {
          from { background-position: 200% 0; }
          to { background-position: -200% 0; }
        }
      `}</style>

      <main className="min-h-screen bg-[linear-gradient(180deg,#faf9ff,white)] py-8 px-3 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb + header */}
          <nav className="text-xs text-gray-500 mb-3" aria-label="Breadcrumb">
            <Link to="/" className="hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/services" className="hover:underline">Services</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800">{service.title}</span>
          </nav>

          <header className="mb-6 text-center">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900">{service.title}</h1>
            {service.shortDesc && <p className="mt-1 text-gray-600 text-xs sm:text-sm max-w-2xl mx-auto">{service.shortDesc}</p>}
          </header>

          {/* card container */}
          <section className="relative">
            {/* subtle rounded background */}
            <div className="absolute inset-x-0 -top-4 pointer-events-none">
              <div className="mx-auto max-w-7xl rounded-2xl bg-purple-50/60 h-14 md:h-20" style={{ filter: "blur(0.3px)" }} />
            </div>

            <div className="relative grid gap-4 sm:gap-5 md:gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch">
              {service.plans.map((plan, idx) => {
                const isFeatured = plan.highlight || plan.popular || (service.plans.length === 3 && idx === 1);
                const isHighlightedQuery = highlightPlanId && highlightPlanId === plan.id;
                const refProps = isHighlightedQuery ? { ref: scrollTargetRef } : {};

                // stagger delay (increasing with index)
                const delayMs = Math.min(400, idx * 90);

                // Build single className (no duplicates)
                const baseClasses = "card-hoverable animate-card relative z-10 bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-sm md:shadow-md border border-gray-100 transition-transform transform";
                const featuredClasses = isFeatured ? " featured-shimmer" : "";
                const finalClassName = `${baseClasses}${featuredClasses}`;

                return (
                  <article
                    key={plan.id}
                    {...refProps}
                    aria-labelledby={`plan-${plan.id}-title`}
                    className={finalClassName}
                    style={{
                      background: isFeatured ? "linear-gradient(180deg,#0f1724,#111827)" : undefined,
                      color: isFeatured ? "#ffffff" : undefined,
                      animationDelay: `${delayMs}ms`,
                    }}
                  >
                    {/* Badge */}
                    {isFeatured && (
                      <div className="absolute -top-3 left-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-400 text-amber-900">
                          {plan.popularLabel || "Popular"}
                        </span>
                      </div>
                    )}

                    {/* Header row */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="pr-2">
                        <h3 id={`plan-${plan.id}-title`} className={`text-lg sm:text-[18px] md:text-xl font-semibold ${isFeatured ? "text-white" : "text-gray-900"}`}>
                          {plan.name}
                        </h3>
                        {plan.subtitle && <p className={`mt-1 ${isFeatured ? "text-gray-200" : "text-gray-500"} text-xs`}>{plan.subtitle}</p>}
                      </div>

                      <div className="text-right flex-shrink-0">
                        <div className={`text-2xl sm:text-[28px] md:text-3xl font-extrabold ${isFeatured ? "text-white" : "text-gray-900"}`}>{plan.price}</div>
                        <div className={`text-[11px] mt-1 ${isFeatured ? "text-gray-300" : "text-gray-400"}`}>{plan.period || "one-time"}</div>
                      </div>
                    </div>

                    {/* feature list */}
                    <div className="mt-4">
                      <ul className="space-y-2">
                        {(plan.features || []).slice(0, 8).map((f, i) => (
                          <li key={i} className="flex items-center gap-3">
                            <span className={`flex-none inline-flex items-center justify-center w-6 h-6 rounded-full ${isFeatured ? "bg-white/12 text-white" : "bg-green-50 text-green-600"} text-[12px]`}>
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 111.414-1.414L8.414 12.172l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </span>
                            <span className={`${isFeatured ? "text-gray-100" : "text-gray-700"} text-sm`}>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Steps */}
                    {plan.steps && plan.steps.length > 0 && (
                      <div className={`mt-4 ${isFeatured ? "text-gray-100/90" : "text-gray-700"}`}>
                        <div className="text-sm font-medium mb-1">Steps</div>
                        <ol className="list-decimal list-inside text-xs sm:text-sm space-y-0.5">
                          {plan.steps.map((s, i) => (
                            <li key={i} className="py-0.5">{s}</li>
                          ))}
                        </ol>
                      </div>
                    )}

                    {/* CTAs */}
                    <div className="mt-4 flex gap-2 items-center">
                      <a
                        href={`https://wa.me/919876543210?text=${encodeURIComponent(`Hi, I want the ${plan.name} plan for ${service.title}. Please share next steps.`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className={`inline-flex items-center justify-center px-3 py-1.5 rounded-full font-semibold text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${isFeatured ? "bg-white text-gray-900 hover:bg-white/90" : "bg-green-600 text-white hover:bg-green-700"}`}
                        aria-label={`Contact for ${plan.name}`}
                      >
                        Contact
                      </a>

                      <button
                        onClick={() =>
                          window.location.assign(`/contact?service=${encodeURIComponent(service.title)}&plan=${encodeURIComponent(plan.id)}`)
                        }
                        className={`px-3 py-1.5 rounded-lg border text-sm ${isFeatured ? "border-white/20 text-white bg-white/6 hover:bg-white/10" : "border-gray-200 text-gray-800 bg-white hover:bg-gray-50"}`}
                      >
                        Start Now
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
