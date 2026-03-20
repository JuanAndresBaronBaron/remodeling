export default function LanguageToggle({ lang, setLang }) {
  return (
    <div className="lang-toggle">
      <button
        className={lang === 'en' ? 'active' : ''}
        onClick={() => setLang('en')}
      >
        EN
      </button>
      <button
        className={lang === 'es' ? 'active' : ''}
        onClick={() => setLang('es')}
      >
        ES
      </button>
    </div>
  );
}