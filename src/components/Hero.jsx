import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';

export default function Hero({ t }) {
  const whatsappLink =
    'https://wa.me/16297720313?text=Hi%20BAROJAS%20REMODELING,%20I%20would%20like%20a%20free%20estimate.';

  const cols = 14;
  const rows = 10;
  const total = cols * rows;

  const tiles = useMemo(() => Array.from({ length: total }, (_, i) => i), [total]);
  const [activeIndex, setActiveIndex] = useState(-1);

  const getDistance = (index) => {
    if (activeIndex < 0) return 999;
    const x1 = index % cols;
    const y1 = Math.floor(index / cols);
    const x2 = activeIndex % cols;
    const y2 = Math.floor(activeIndex / cols);
    return Math.hypot(x1 - x2, y1 - y2);
  };

  const getLevelClass = (distance) => {
    if (distance <= 0.01) return 'lvl-0'; // exact tile under mouse
    if (distance <= 1.2) return 'lvl-1';
    if (distance <= 2.2) return 'lvl-2';
    if (distance <= 3.2) return 'lvl-3';
    return '';
  };

  return (
    <section className="hero" id="home">
      <div className="hero-tile-effect">
        {tiles.map((tile) => {
          const distance = getDistance(tile);
          const level = getLevelClass(distance);
          return (
            <span
              key={tile}
              className={`hero-tile-cell ${level}`}
              style={{ transitionDelay: `${Math.min(distance * 18, 140)}ms` }}
              onMouseEnter={() => setActiveIndex(tile)}
              onMouseMove={() => setActiveIndex(tile)}
            />
          );
        })}
      </div>

      <div className="container hero-content">
        <motion.h1 initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7 }}>
          {t.hero.title}
        </motion.h1>
        <motion.p initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9 }}>
          {t.hero.subtitle}
        </motion.p>
        <motion.div className="hero-buttons" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <a href={whatsappLink} target="_blank" rel="noreferrer" className="btn primary">
            {t.hero.cta1}
          </a>
          <a href="#services" className="btn secondary">{t.hero.cta2}</a>
        </motion.div>
      </div>
    </section>
  );
}