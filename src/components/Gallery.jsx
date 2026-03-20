import { motion } from 'framer-motion';

const images = [
  '/src/assets/images/service-ceramic.png',
  '/src/assets/images/service-shower.png',
  '/src/assets/images/service-commercial.png',
  '/src/assets/images/service-wood.png',
];

export default function Gallery({ t }) {
  return (
    <section className="section section-band-dark" id="gallery">
      <div className="container">
        <h2 className="section-title">{t.gallery.title}</h2>
        <div className="gallery-grid">
          {images.map((img, i) => (
            <motion.img
              key={i}
              src={img}
              alt={`Project ${i + 1}`}
              className="gallery-item"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}