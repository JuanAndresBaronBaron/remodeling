import { useState } from 'react';
import logo from '../assets/images/logo.png';

export default function Navbar({ t, lang, setLang, theme, setTheme }) {
  const [themeOpen, setThemeOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

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
          {/* Theme dropdown */}
          <div className="nav-dropdown">
            <button
              type="button"
              className="nav-dropdown-btn"
              onClick={() => {
                setThemeOpen((prev) => !prev);
                setLangOpen(false);
              }}
              aria-expanded={themeOpen}
            >
              Theme ▾
            </button>

            {themeOpen && (
              <div className="nav-dropdown-panel">
                <button
                  type="button"
                  className={theme === 'light' ? 'dropdown-option active' : 'dropdown-option'}
                  onClick={() => {
                    setTheme('light');
                    setThemeOpen(false);
                  }}
                >
                  Light
                </button>

                <button
                  type="button"
                  className={theme === 'mixed' ? 'dropdown-option active' : 'dropdown-option'}
                  onClick={() => {
                    setTheme('mixed');
                    setThemeOpen(false);
                  }}
                >
                  Mixed
                </button>

                <button
                  type="button"
                  className={theme === 'dark' ? 'dropdown-option active' : 'dropdown-option'}
                  onClick={() => {
                    setTheme('dark');
                    setThemeOpen(false);
                  }}
                >
                  Dark
                </button>
              </div>
            )}
          </div>

          {/* Language dropdown */}
          <div className="nav-dropdown">
            <button
              type="button"
              className="nav-dropdown-btn"
              onClick={() => {
                setLangOpen((prev) => !prev);
                setThemeOpen(false);
              }}
              aria-expanded={langOpen}
            >
              Lang ▾
            </button>

            {langOpen && (
              <div className="nav-dropdown-panel">
                <button
                  type="button"
                  className={lang === 'en' ? 'dropdown-option active' : 'dropdown-option'}
                  onClick={() => {
                    setLang('en');
                    setLangOpen(false);
                  }}
                >
                  EN
                </button>

                <button
                  type="button"
                  className={lang === 'es' ? 'dropdown-option active' : 'dropdown-option'}
                  onClick={() => {
                    setLang('es');
                    setLangOpen(false);
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
          >
            Free Estimate
          </a>
        </div>
      </div>
    </header>
  );
}