import { motion } from 'framer-motion';
import ceramicImg from '../assets/images/service-ceramic.png';
import showerImg from '../assets/images/service-shower.png';
import commercialImg from '../assets/images/service-commercial.png';
import woodImg from '../assets/images/service-wood.png';

const images = [ceramicImg, showerImg, commercialImg, woodImg];

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