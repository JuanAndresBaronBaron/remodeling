import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import TopSlider from './components/TopSlider';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import About from './components/About';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import HammerCursorPro from './components/HammerCursorPro';
import { translations } from './data/translations';

export default function App() {
  const [lang, setLang] = useState('en');

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'mixed';
  });

  const t = translations[lang];

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div>
      <HammerCursorPro />
      <Navbar t={t} lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} />
      <TopSlider t={t} />
      <Services t={t} />
      <WhyChooseUs t={t} />
      <About t={t} />
      <Gallery t={t} />
      <Contact t={t} />
      <Footer t={t} />
      <FloatingWhatsApp />
    </div>
  );
}