import { FaWhatsapp, FaLinkedinIn } from 'react-icons/fa';

export default function Footer({ t }) {
  const whatsappUrl =
    'https://wa.me/573102377853?text=Hi%20Juan%20Andres,%20I%20want%20to%20build%20a%20website.';
  const linkedinUrl =
    'https://www.linkedin.com/in/juan-andres-baron-baron?utm_source=share_via&utm_content=profile&utm_medium=member_ios';

  return (
    <footer className="footer">
      <div className="container footer-content">
        <p className="footer-title">
          © {new Date().getFullYear()} {t.brand}. {t.footer.rights}
        </p>

        <p className="footer-subtitle">
          {t.footer.builtBy} Juan Andres Baron Baron
        </p>

        <div className="footer-actions">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="footer-mini-btn whatsapp"
            aria-label="Contact on WhatsApp"
            title="WhatsApp"
          >
            <FaWhatsapp />
          </a>

          <a
            href={linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="footer-mini-btn linkedin"
            aria-label="Contact on LinkedIn"
            title="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </footer>
  );
}