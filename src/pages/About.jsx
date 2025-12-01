// src/pages/About.jsx

import { useEffect, useRef, useState } from "react";
import PageWrapper from "../components/layout/PageWrapper";
import SectionTitle from "../components/ui/SectionTitle";

/**
 * Animated counter hook
 */
function useAnimatedCount(to, startWhen, duration = 1200) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!startWhen) return;
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutQuad
      const eased = 1 - (1 - progress) * (1 - progress);
      const current = Math.floor(to * eased);
      setValue(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setValue(to);
      }
    }
    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [to, startWhen, duration]);

  return value;
}

export default function About() {
  const statsRef = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!statsRef.current) return;
    const el = statsRef.current;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStarted(true);
            obs.disconnect(); // run once
          }
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const projectsCount = useAnimatedCount(40, started, 1200);
  const businessesCount = useAnimatedCount(20, started, 1200);
  const yearsCount = useAnimatedCount(2, started, 1000);
  const satisfactionCount = useAnimatedCount(100, started, 1400);

  return (
    <PageWrapper
      title="About"
      description="Learn more about VeeraTech — website development, digital marketing, automation bots, and advertising solutions."
    >
      {/* INTRO */}
      <SectionTitle
        title="About VeeraTech"
        subtitle="Your trusted partner for websites, marketing, automation, and growth."
      />

      {/* Who We Are */}
      <section className="py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Who We Are
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              VeeraTech is a modern freelance agency specializing in website
              development, digital marketing, WhatsApp & Telegram bots, Google &
              Meta Ads, and branding solutions. We help businesses create
              powerful online presence and generate real, measurable growth.
            </p>

            <p className="text-gray-700 leading-relaxed">
              Our approach is simple: quality, speed, and clear communication.
              We combine creativity with technical expertise — delivering
              results that help clients grow faster.
            </p>
          </div>

          {/* Image */}
          <div className="flex justify-center">
            <img
              src="/assets/images/about/about-team.jpg"
              alt="About VeeraTech"
              className="w-full max-w-md rounded-xl shadow-lg object-cover"
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-14 bg-gray-50 rounded-2xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900">Our Mission</h3>
            <p className="text-gray-700 mt-3 leading-relaxed">
              To empower small and medium businesses with modern digital
              solutions — high-performing websites, smart automations, and
              effective marketing strategies that drive growth.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-gray-900">Our Vision</h3>
            <p className="text-gray-700 mt-3 leading-relaxed">
              To become a trusted tech partner for businesses worldwide through
              exceptional service, innovation, and long-term support.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-14">
        <SectionTitle
          title="Our Core Values"
          subtitle="What makes us different — and why clients trust us."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h4 className="text-lg font-semibold text-gray-900">Quality</h4>
            <p className="text-gray-700 mt-2 text-sm">
              We deliver clean, scalable, and professional work — with full
              attention to details.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h4 className="text-lg font-semibold text-gray-900">Speed</h4>
            <p className="text-gray-700 mt-2 text-sm">
              Fast delivery without compromising quality. Clear communication
              throughout the project.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h4 className="text-lg font-semibold text-gray-900">Trust</h4>
            <p className="text-gray-700 mt-2 text-sm">
              Transparent pricing, honest guidance, and long-term support for
              every client.
            </p>
          </div>
        </div>
      </section>

      {/* Experience / Stats with counting animation; plus sign attached without gap */}
      <section className="py-14 bg-green-600 text-white rounded-xl px-6">
        <div className="max-w-6xl mx-auto">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center items-center"
            ref={statsRef}
          >
            {/* Each stat: number + tightly attached plus */}
            <div>
              <h3 className="text-4xl font-bold" aria-live="polite">
                {/* inline-flex with gap-0 to remove spacing between number and plus */}
                <span className="inline-flex items-baseline gap-0 justify-center">
                  <span className="leading-none">{projectsCount}</span>
                  {/* plus attached with no extra whitespace */}
                  <span
                    className="text-xl leading-none"
                    style={{ marginLeft: 0, transform: "translateY(-4px)" }}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </span>
              </h3>
              <p className="mt-2">Projects Completed</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold" aria-live="polite">
                <span className="inline-flex items-baseline gap-0 justify-center">
                  <span className="leading-none">{businessesCount}</span>
                  <span
                    className="text-xl leading-none"
                    style={{ marginLeft: 0, transform: "translateY(-4px)" }}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </span>
              </h3>
              <p className="mt-2">Businesses Helped</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold" aria-live="polite">
                <span className="inline-flex items-baseline gap-0 justify-center">
                  <span className="leading-none">{yearsCount}</span>
                  <span
                    className="text-xl leading-none"
                    style={{ marginLeft: 0, transform: "translateY(-4px)" }}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </span>
              </h3>
              <p className="mt-2">Years Experience</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold" aria-live="polite">
                <span className="inline-flex items-baseline gap-0 justify-center">
                  <span className="leading-none">{satisfactionCount}</span>
                  <span
                    className="text-xl leading-none"
                    style={{ marginLeft: 0, transform: "translateY(-2px)" }}
                    aria-hidden="true"
                  >
                    %
                  </span>
                </span>
              </h3>
              <p className="mt-2">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 text-center">
        <h3 className="text-3xl font-bold text-gray-900">
          Ready to work with us?
        </h3>
        <p className="text-gray-600 mt-2">
          Let’s build something amazing for your business.
        </p>

        <a
          href="/contact"
          className="inline-block mt-6 px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-blue-700 transition shadow"
        >
          Contact Us
        </a>
      </section>
    </PageWrapper>
  );
}
