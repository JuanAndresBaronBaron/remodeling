import { motion } from 'framer-motion';

export default function About({ t }) {
  return (
    <section className="section section-band-soft" id="about">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {t.about.title}
        </motion.h2>

        <motion.p
          className="about-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t.about.text}
        </motion.p>
      </div>
    </section>
  );
}