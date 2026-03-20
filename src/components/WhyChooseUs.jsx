import { motion } from 'framer-motion';
import { FaAward, FaClock, FaShieldAlt, FaTools } from 'react-icons/fa';

export default function WhyChooseUs({ t }) {
  const icons = [
    <FaAward />,
    <FaClock />,
    <FaShieldAlt />,
    <FaTools />,
  ];

  return (
    <section className="section section-band-dark why" id="why">
      <div className="container">
        <h2 className="section-title">{t.why.title}</h2>

        <div className="why-grid">
          {t.why.items.map((item, i) => (
            <motion.div
              key={i}
              className="why-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <span className="why-icon">{icons[i]}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}