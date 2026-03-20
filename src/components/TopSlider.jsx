import { useEffect, useState } from 'react';

export default function TopSlider({ t }) {
  const AUTO_PLAY_MS = 4000; // change image every 3 seconds
  const TRANSITION_MS = 500; // faster slide animation

  const slides = [
    {
      img: '/src/assets/images/service-ceramic.png',
      title: t?.slides?.[0]?.title ?? 'Premium Tile Installation',
      subtitle: t?.slides?.[0]?.subtitle ?? 'Clean lines, perfect leveling, long-lasting results.',
    },
    {
      img: '/src/assets/images/service-shower.png',
      title: t?.slides?.[1]?.title ?? 'Luxury Shower Transformations',
      subtitle: t?.slides?.[1]?.subtitle ?? 'Waterproof, modern, and built to impress.',
    },
    {
      img: '/src/assets/images/service-commercial.png',
      title: t?.slides?.[2]?.title ?? 'Commercial Tile Solutions',
      subtitle: t?.slides?.[2]?.subtitle ?? 'Durable floors for high-traffic spaces.',
    },
    {
      img: '/src/assets/images/service-wood.png',
      title: t?.slides?.[3]?.title ?? 'Wood-Look Elegance',
      subtitle: t?.slides?.[3]?.subtitle ?? 'Warm aesthetics with tile durability.',
    },
  ];

  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, AUTO_PLAY_MS);
    return () => clearInterval(id);
  }, [paused, slides.length]);

  return (
    <section
      className="top-slider"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      id="home"
    >
      <div
        className="top-slider-track"
        style={{
          transform: `translateX(-${current * 100}%)`,
          transitionDuration: `${TRANSITION_MS}ms`,
        }}
      >
        {slides.map((slide, i) => (
          <article className="top-slide" key={i}>
            <img src={slide.img} alt={slide.title} />
            <div className="top-slide-overlay" />
            <div className="top-slide-content container">
              <h1>{slide.title}</h1>
              <p>{slide.subtitle}</p>
              <div className="hero-buttons">
                <a
                  href="https://wa.me/16297720313?text=Hi%20BAROJAS%20REMODELING,%20I%20would%20like%20a%20free%20estimate."
                  target="_blank"
                  rel="noreferrer"
                  className="btn primary"
                >
                  {t?.hero?.cta1 || 'Free Estimate'}
                </a>
                <a href="#services" className="btn secondary">
                  {t?.hero?.cta2 || 'View Services'}
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      <button className="slider-arrow left" onClick={prev} aria-label="Previous slide">
        ‹
      </button>
      <button className="slider-arrow right" onClick={next} aria-label="Next slide">
        ›
      </button>

      <div className="top-slider-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={i === current ? 'active' : ''}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}