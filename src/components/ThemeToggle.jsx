export default function ThemeToggle({ theme, setTheme }) {
  return (
    <div className="theme-toggle-group" aria-label="Theme selector">
      <button
        className={theme === 'light' ? 'theme-toggle-btn active' : 'theme-toggle-btn'}
        onClick={() => setTheme('light')}
        type="button"
      >
        Light
      </button>

      <button
        className={theme === 'mixed' ? 'theme-toggle-btn active' : 'theme-toggle-btn'}
        onClick={() => setTheme('mixed')}
        type="button"
      >
        Mixed
      </button>

      <button
        className={theme === 'dark' ? 'theme-toggle-btn active' : 'theme-toggle-btn'}
        onClick={() => setTheme('dark')}
        type="button"
      >
        Dark
      </button>
    </div>
  );
}