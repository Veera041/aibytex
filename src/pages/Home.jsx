// src/pages/Home.jsx
import PageWrapper from "../components/layout/PageWrapper";
import ServiceCard from "../components/ServiceCard";
import PortfolioCard from "../components/PortfolioCard";
import TestimonialCard from "../components/TestimonialCard";

// Data
import servicesData from "../data/servicesData";
import portfolioData from "../data/portfolioData";
import testimonialsData from "../data/testimonialsData";

export default function Home() {
  return (
    <PageWrapper
      title="Home"
      description="VeeraTech provides professional website development, digital marketing, automation bots, Google & Meta ads, and branding solutions."
    >
      {/* HERO SECTION */}
      <section className="py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Build Stunning Websites & High-Converting Digital Solutions
          </h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
            We help businesses grow with modern websites, digital marketing, automation bots,
            Google & Meta ads — everything you need to stand out online.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <a
              href="/contact"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Get a Free Quote
            </a>
            <a
              href="/portfolio"
              className="px-6 py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition"
            >
              View Portfolio
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="py-16">
        <h2 className="text-3xl font-semibold text-center mb-10">Our Services</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {servicesData.slice(0, 3).map((service, idx) => (
            <ServiceCard key={idx} {...service} />
          ))}
        </div>

        <div className="text-center mt-8">
          <a href="/services" className="text-blue-600 font-medium hover:underline">
            View all services →
          </a>
        </div>
      </section>

      {/* PORTFOLIO SECTION */}
      <section className="py-16 bg-gray-50">
        <h2 className="text-3xl font-semibold text-center mb-10">Recent Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {portfolioData.slice(0, 3).map((project, idx) => (
            <PortfolioCard key={idx} {...project} />
          ))}
        </div>

        <div className="text-center mt-8">
          <a href="/portfolio" className="text-blue-600 font-medium hover:underline">
            View complete portfolio →
          </a>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-16">
        <h2 className="text-3xl font-semibold text-center mb-10">What Clients Say</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.slice(0, 3).map((review, idx) => (
            <TestimonialCard key={idx} {...review} />
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-14 bg-blue-600 text-white text-center rounded-xl shadow-md mb-8">
        <h2 className="text-3xl font-bold">Ready to grow your business?</h2>
        <p className="mt-3 text-lg">Let’s build something amazing together.</p>

        <a
          href="/contact"
          className="inline-block mt-6 px-8 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow hover:bg-gray-100 transition"
        >
          Contact Us Now
        </a>
      </section>
    </PageWrapper>
  );
}
