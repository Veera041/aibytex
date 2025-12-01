// src/pages/Home.jsx
import PageWrapper from "../components/layout/PageWrapper";
import ServiceCard from "../components/ServiceCard";
import PortfolioCard from "../components/PortfolioCard";
import TestimonialCard from "../components/TestimonialCard";
import TestimonialsCarousel from "../components/TestimonialsCarousel";


// Data
import servicesData from "../data/servicesData";
import portfolioData from "../data/portfolioData";
import testimonialsData from "../data/testimonialsData";

export default function Home() {
  return (
    <PageWrapper
      title="Home"
      description="QuadCore provides professional website development, digital marketing, automation bots, Google & Meta ads, and branding solutions."
    >
      {/* HERO SECTION with responsive background image */}
      <section
        className="relative"
        aria-label="Hero"
        style={{
          // put your hero image at public/images/hero-bg.jpg or change the path
          backgroundImage: `url('src/assets/images/hero-bg.jpeg')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          // fallback color while image loads or if missing
          backgroundColor: "#f8fafc",
        }}
      >
        {/* dark overlay for readability */}
        <div className="absolute inset-0 bg-black/40 md:bg-black/30" />

        <div className="relative max-w-3xl mx-auto px-6 py-20 md:py-28 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight drop-shadow-md">
            Build Stunning Websites & High-Converting Digital Solutions
          </h1>
          <p className="text-gray-100/90 mt-4 max-w-2xl mx-auto text-base md:text-lg">
            We help businesses grow with modern websites, digital marketing, automation bots,
            Google & Meta ads — everything you need to stand out online.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <a
              href="/contact"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Get a Free Quote
            </a>
            <a
              href="/portfolio"
              className="px-6 py-3 bg-white/90 text-gray-900 rounded-lg hover:bg-white transition"
            >
              View Portfolio
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION with its own background image */}
      <section
        className="py-16"
        aria-label="Services"
        style={{
          // place a softer/texture image at public/images/services-bg.jpg
          backgroundImage: `url('/images/services-bg.jpg')`,
          backgroundPosition: "center top",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#fafafa",
        }}
      >
        {/* soft light overlay so cards stay readable */}
        <div className="absolute inset-0 pointer-events-none bg-white/40 md:bg-white/30" />

        <div className="relative max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center mb-10">Our Services</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {servicesData.slice(0, 3).map((service, idx) => (
              <ServiceCard key={idx} {...service} />
            ))}
          </div>

          <div className="text-center mt-8">
            <a href="/services" className="text-green-600 font-medium hover:underline">
              View all services →
            </a>
          </div>
        </div>
      </section>

      {/* PORTFOLIO SECTION */}
      <section className="py-16 bg-gray-50">
        <h2 className="text-3xl font-semibold text-center mb-10">Recent Projects</h2>

        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {portfolioData.slice(0, 3).map((project, idx) => (
            <PortfolioCard key={idx} {...project} />
          ))}
        </div>

        <div className="text-center mt-8">
          <a href="/portfolio" className="text-green-600 font-medium hover:underline">
            View complete portfolio →
          </a>
        </div>
      </section>

      {/* TESTIMONIALS SECTION - responsive carousel showing ALL testimonials */}
<section className="py-16">
  <h2 className="text-3xl font-semibold text-center mb-10">What Clients Say</h2>

  <TestimonialsCarousel
    testimonials={testimonialsData}
    Card={TestimonialCard}
  />
</section>


{/* Put this component inside the same file above or import from a small file */}


      {/* CTA Banner */}
      <section className="py-14 bg-green-600 text-white text-center rounded-xl shadow-md mb-8 mx-6 md:mx-auto">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold">Ready to grow your business?</h2>
          <p className="mt-3 text-lg">Let’s build something amazing together.</p>

          <a
            href="/contact"
            className="inline-block mt-6 px-8 py-3 bg-white text-green-700 font-semibold rounded-lg shadow hover:bg-gray-100 transition"
          >
            Contact Us Now
          </a>
        </div>
      </section>
    </PageWrapper>
  );
}
