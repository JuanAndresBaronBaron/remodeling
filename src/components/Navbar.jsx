import { useEffect, useRef, useState } from 'react';
import logo from '../assets/images/logo.png';

export default function Navbar({ t, lang, setLang, theme, setTheme }) {
  const navRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(null); // 'theme' | 'lang' | null

  const closeMenu = () => setOpenMenu(null);

  useEffect(() => {
    const handleOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        closeMenu();
      }
    };

    document.addEventListener('pointerdown', handleOutside);
    return () => document.removeEventListener('pointerdown', handleOutside);
  }, []);

  const handleThemeSelect = (value) => {
    setTheme(value);
    closeMenu();
  };

  const handleLangSelect = (value) => {
    setLang(value);
    closeMenu();
  };

  return (
    <header className="navbar" ref={navRef}>
      <div className="container nav-content">
        <button
          type="button"
          className="brand brand-box nav-home-btn"
          onClick={closeMenu}
        >
          <img src={logo} alt={`${t.brand} logo`} className="brand-logo" />
          <span className="brand-text">{t.brand}</span>
        </button>

        <nav className="nav-links">
          <a href="#home" className="nav-link-btn" onClick={closeMenu}>
            {t.nav.home}
          </a>

          <a href="#services" className="nav-link-btn" onClick={closeMenu}>
            {t.nav.services}
          </a>

          <a href="#about" className="nav-link-btn" onClick={closeMenu}>
            {t.nav.about}
          </a>

          <a href="#gallery" className="nav-link-btn" onClick={closeMenu}>
            {t.nav.gallery}
          </a>

          <a href="#contact" className="nav-link-btn" onClick={closeMenu}>
            {t.nav.contact}
          </a>
        </nav>

        <div className="nav-actions">
          <div className="nav-dropdown">
            <button
              type="button"
              className="nav-dropdown-btn"
              onPointerDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setOpenMenu((prev) => (prev === 'theme' ? null : 'theme'));
              }}
              aria-expanded={openMenu === 'theme'}
            >
              {t.nav.theme} ▾
            </button>

            {openMenu === 'theme' && (
              <div className="nav-dropdown-panel desktop-panel">
                <button
                  type="button"
                  className={theme === 'light' ? 'dropdown-option active' : 'dropdown-option'}
                  onPointerDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleThemeSelect('light');
                  }}
                >
                  {t.theme.light}
                </button>

                <button
                  type="button"
                  className={theme === 'mixed' ? 'dropdown-option active' : 'dropdown-option'}
                  onPointerDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleThemeSelect('mixed');
                  }}
                >
                  {t.theme.mixed}
                </button>

                <button
                  type="button"
                  className={theme === 'dark' ? 'dropdown-option active' : 'dropdown-option'}
                  onPointerDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleThemeSelect('dark');
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
              onPointerDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setOpenMenu((prev) => (prev === 'lang' ? null : 'lang'));
              }}
              aria-expanded={openMenu === 'lang'}
            >
              {t.nav.language} ▾
            </button>

            {openMenu === 'lang' && (
              <div className="nav-dropdown-panel desktop-panel">
                <button
                  type="button"
                  className={lang === 'en' ? 'dropdown-option active' : 'dropdown-option'}
                  onPointerDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleLangSelect('en');
                  }}
                >
                  EN
                </button>

                <button
                  type="button"
                  className={lang === 'es' ? 'dropdown-option active' : 'dropdown-option'}
                  onPointerDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleLangSelect('es');
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
            onPointerDown={closeMenu}
          >
            {t.nav.freeEstimate}
          </a>
        </div>

        {openMenu === 'theme' && (
          <div className="nav-mobile-panel">
            <button
              type="button"
              className={theme === 'light' ? 'dropdown-option active' : 'dropdown-option'}
              onPointerDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleThemeSelect('light');
              }}
            >
              {t.theme.light}
            </button>

            <button
              type="button"
              className={theme === 'mixed' ? 'dropdown-option active' : 'dropdown-option'}
              onPointerDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleThemeSelect('mixed');
              }}
            >
              {t.theme.mixed}
            </button>

            <button
              type="button"
              className={theme === 'dark' ? 'dropdown-option active' : 'dropdown-option'}
              onPointerDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleThemeSelect('dark');
              }}
            >
              {t.theme.dark}
            </button>
          </div>
        )}

        {openMenu === 'lang' && (
          <div className="nav-mobile-panel">
            <button
              type="button"
              className={lang === 'en' ? 'dropdown-option active' : 'dropdown-option'}
              onPointerDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleLangSelect('en');
              }}
            >
              EN
            </button>

            <button
              type="button"
              className={lang === 'es' ? 'dropdown-option active' : 'dropdown-option'}
              onPointerDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleLangSelect('es');
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