import { FaWhatsapp } from 'react-icons/fa';

export default function Contact({ t }) {
  const whatsappLink =
    'https://wa.me/16297720313?text=Hi%20BAROJAS%20REMODELING,%20I%20want%20information%20about%20tile%20services.';

  return (
    <section className="section section-band-light" id="contact">
      <div className="container contact-cta">
        <h2 className="section-title">{t.contact.title}</h2>
        <p className="contact-subtitle">{t.contact.subtitle}</p>

        <div className="contact-actions">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="btn whatsapp-btn"
          >
            <FaWhatsapp />
            {t.contact.button}
          </a>
        </div>

        <p className="contact-info">{t.contact.info}</p>
      </div>
    </section>
  );
}