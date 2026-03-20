import { useEffect, useState } from 'react';
import logo from '../assets/images/logo.png';

export default function Navbar({ t, lang, setLang, theme, setTheme }) {
  const [themeOpen, setThemeOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const closeAll = () => {
    setThemeOpen(false);
    setLangOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      const navbar = e.target.closest?.('.navbar');
      if (!navbar) closeAll();
    };

    document.addEventListener('pointerdown', handleOutsideClick);
    return () => document.removeEventListener('pointerdown', handleOutsideClick);
  }, []);

  return (
    <header className="navbar">
      <div className="container nav-content">
        <a href="#home" className="brand brand-box">
          <img src={logo} alt={`${t.brand} logo`} className="brand-logo" />
          <span className="brand-text">{t.brand}</span>
        </a>

        <nav className="nav-links">
          <a href="#home">{t.nav.home}</a>
          <a href="#services">{t.nav.services}</a>
          <a href="#about">{t.nav.about}</a>
          <a href="#gallery">{t.nav.gallery}</a>
          <a href="#contact">{t.nav.contact}</a>
        </nav>

        <div className="nav-actions">
          <div className="nav-dropdown">
            <button
              type="button"
              className="nav-dropdown-btn"
              onClick={(e) => {
                e.stopPropagation();
                setThemeOpen((prev) => !prev);
                setLangOpen(false);
              }}
              aria-expanded={themeOpen}
            >
              {t.nav.theme} ▾
            </button>

            {/* Desktop dropdown */}
            {themeOpen && (
              <div className="nav-dropdown-panel desktop-panel">
                <button
                  type="button"
                  className={theme === 'light' ? 'dropdown-option active' : 'dropdown-option'}
                  onClick={() => {
                    setTheme('light');
                    closeAll();
                  }}
                >
                  {t.theme.light}
                </button>

                <button
                  type="button"
                  className={theme === 'mixed' ? 'dropdown-option active' : 'dropdown-option'}
                  onClick={() => {
                    setTheme('mixed');
                    closeAll();
                  }}
                >
                  {t.theme.mixed}
                </button>

                <button
                  type="button"
                  className={theme === 'dark' ? 'dropdown-option active' : 'dropdown-option'}
                  onClick={() => {
                    setTheme('dark');
                    closeAll();
                  }}
                >
                  {t.theme.dark}
                </button>
              </div>
            )}
          </div>

          <div className="nav-dropdown">
            <button
              type="button"
              className="nav-dropdown-btn"
              onClick={(e) => {
                e.stopPropagation();
                setLangOpen((prev) => !prev);
                setThemeOpen(false);
              }}
              aria-expanded={langOpen}
            >
              {t.nav.language} ▾
            </button>

            {/* Desktop dropdown */}
            {langOpen && (
              <div className="nav-dropdown-panel desktop-panel">
                <button
                  type="button"
                  className={lang === 'en' ? 'dropdown-option active' : 'dropdown-option'}
                  onClick={() => {
                    setLang('en');
                    closeAll();
                  }}
                >
                  EN
                </button>

                <button
                  type="button"
                  className={lang === 'es' ? 'dropdown-option active' : 'dropdown-option'}
                  onClick={() => {
                    setLang('es');
                    closeAll();
                  }}
                >
                  ES
                </button>
              </div>
            )}
          </div>

          <a
            href="https://wa.me/16297720313?text=Hi%20BAROJAS%20REMODELING,%20I%20would%20like%20a%20free%20estimate."
            className="nav-cta"
            target="_blank"
            rel="noreferrer"
            onClick={closeAll}
          >
            {t.nav.freeEstimate}
          </a>
        </div>

        {/* Mobile dropdown panel BELOW the buttons */}
        {themeOpen && (
          <div className="nav-mobile-panel">
            <button
              type="button"
              className={theme === 'light' ? 'dropdown-option active' : 'dropdown-option'}
              onClick={() => {
                setTheme('light');
                closeAll();
              }}
            >
              {t.theme.light}
            </button>

            <button
              type="button"
              className={theme === 'mixed' ? 'dropdown-option active' : 'dropdown-option'}
              onClick={() => {
                setTheme('mixed');
                closeAll();
              }}
            >
              {t.theme.mixed}
            </button>

            <button
              type="button"
              className={theme === 'dark' ? 'dropdown-option active' : 'dropdown-option'}
              onClick={() => {
                setTheme('dark');
                closeAll();
              }}
            >
              {t.theme.dark}
            </button>
          </div>
        )}

        {langOpen && (
          <div className="nav-mobile-panel">
            <button
              type="button"
              className={lang === 'en' ? 'dropdown-option active' : 'dropdown-option'}
              onClick={() => {
                setLang('en');
                closeAll();
              }}
            >
              EN
            </button>

            <button
              type="button"
              className={lang === 'es' ? 'dropdown-option active' : 'dropdown-option'}
              onClick={() => {
                setLang('es');
                closeAll();
              }}
            >
              ES
            </button>
          </div>
        )}
      </div>
    </header>
  );
}