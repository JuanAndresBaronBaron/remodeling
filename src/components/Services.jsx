import { motion } from 'framer-motion';
import {
  FaThLarge,
  FaShower,
  FaBuilding,
  FaGripLines,
  FaTh,
  FaTools,
  FaFillDrip,
  FaCheckCircle,
} from 'react-icons/fa';

export default function Services({ t }) {
  const icons = [
    <FaThLarge />, // Decorative ceramic floor installation
    <FaShower />, // Tile shower installation
    <FaBuilding />, // Commercial high-traffic flooring
    <FaGripLines />, // Wood-look tile
    <FaTh />, // Shower mosaic installation
    <FaTools />, // Tile repair and replacement
    <FaFillDrip />, // Regrouting and sealing
  ];

  const whatsappMessages = [
    'Hi BAROJAS REMODELING, I would like a free estimate for decorative ceramic floor installation.',
    'Hi BAROJAS REMODELING, I would like a free estimate for tile shower installation.',
    'Hi BAROJAS REMODELING, I would like a free estimate for commercial high-traffic tile flooring.',
    'Hi BAROJAS REMODELING, I would like a free estimate for wood-look tile installation.',
    'Hi BAROJAS REMODELING, I would like a free estimate for shower mosaic tile installation.',
    'Hi BAROJAS REMODELING, I would like a free estimate for tile repair and replacement.',
    'Hi BAROJAS REMODELING, I would like a free estimate for regrouting and sealing.',
  ];

  const getWhatsAppLink = (message) =>
    `https://wa.me/16297720313?text=${encodeURIComponent(message)}`;

  return (
    <section className="section section-band-light" id="services">
      <div className="container">
        <h2 className="section-title">{t.services.title}</h2>

        <div className="services-grid">
          {t.services.items.map((service, index) => (
            <motion.a
              key={index}
              href={getWhatsAppLink(whatsappMessages[index] || 'Hi BAROJAS REMODELING, I would like a free estimate.')}
              target="_blank"
              rel="noreferrer"
              className="service-card service-card-link"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
              aria-label={`Contact on WhatsApp about ${service}`}
              title={`Contact on WhatsApp about ${service}`}
            >
              <span className="icon">{icons[index] || <FaCheckCircle />}</span>
              <p>{service}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}