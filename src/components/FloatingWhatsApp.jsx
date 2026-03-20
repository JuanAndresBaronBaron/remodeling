import { FaWhatsapp } from 'react-icons/fa';

export default function FloatingWhatsApp() {
  const phone = '16297720313'; // client number
  const message = 'Hi BAROJAS REMODELING, I want a free estimate.';
  const link = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-wa"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
    >
      <FaWhatsapp />
    </a>
  );
}