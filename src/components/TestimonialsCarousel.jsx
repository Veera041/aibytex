import { useEffect, useRef, useState } from "react";

export default function TestimonialsCarousel({ testimonials = [], Card }) {
  const containerRef = useRef(null);
  const autoplayRef = useRef(null);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // responsive items per slide
  useEffect(() => {
    function calc() {
      const w = window.innerWidth;
      if (w < 768) setItemsPerSlide(1);
      else if (w < 1024) setItemsPerSlide(2);
      else setItemsPerSlide(3);
    }
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  // chunk testimonials
  const slides = [];
  for (let i = 0; i < testimonials.length; i += itemsPerSlide) {
    slides.push(testimonials.slice(i, i + itemsPerSlide));
  }
  const totalSlides = slides.length;

  // autoplay
  useEffect(() => {
    if (isPaused) return;
    autoplayRef.current = setInterval(() => {
      setCurrentSlide((s) => (s + 1) % totalSlides);
    }, 3500);
    return () => clearInterval(autoplayRef.current);
  }, [isPaused, totalSlides]);

  // keyboard support
  useEffect(() => {
    function onKey(e) {
      if (e.key === "ArrowLeft")
        setCurrentSlide((s) => (s - 1 + totalSlides) % totalSlides);
      if (e.key === "ArrowRight")
        setCurrentSlide((s) => (s + 1) % totalSlides);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [totalSlides]);

  useEffect(() => {
    setCurrentSlide(0);
  }, [itemsPerSlide]);

  return (
    <div
      className="max-w-6xl mx-auto px-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="relative overflow-hidden">
        {/* track */}
        <div
          ref={containerRef}
          className="flex transition-transform duration-600 ease-in-out"
          style={{
            width: `${100 * totalSlides}%`,
            transform: `translateX(-${(100 / totalSlides) * currentSlide}%)`,
          }}
        >
          {slides.map((chunk, slideIndex) => (
            <div
              key={slideIndex}
              className="flex gap-8 items-stretch"
              style={{
                width: `${100 / totalSlides}%`,
                padding: "0.5rem 0",
              }}
            >
              {chunk.map((item, i) => (
                <div
                  key={i}
                  className="flex-1 min-w-0"
                  style={{ maxWidth: `${100 / itemsPerSlide}%` }}
                >
                  <Card {...item} />
                </div>
              ))}

              {chunk.length < itemsPerSlide &&
                Array.from({ length: itemsPerSlide - chunk.length }).map(
                  (_, k) => <div key={k} className="flex-1 min-w-0" />
                )}
            </div>
          ))}
        </div>

        {/* next/prev */}
        <button
          onClick={() =>
            setCurrentSlide((s) => (s - 1 + totalSlides) % totalSlides)
          }
          className="hidden md:flex items-center justify-center absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 text-gray-800 shadow hover:bg-white z-10"
        >
          ‹
        </button>

        <button
          onClick={() => setCurrentSlide((s) => (s + 1) % totalSlides)}
          className="hidden md:flex items-center justify-center absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 text-gray-800 shadow hover:bg-white z-10"
        >
          ›
        </button>
      </div>

      {/* dots */}
      <div className="flex justify-center gap-3 mt-6">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === currentSlide ? "bg-green-600 w-6" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
