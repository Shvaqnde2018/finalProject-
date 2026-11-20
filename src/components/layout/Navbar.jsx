import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <header className="navbar">
      <div className="container nav-container">
        <div className="logo">Lingua<span>Flow</span></div>
        <nav className="nav-links">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Дашборд
          </NavLink>
          <NavLink to="/dictionary" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Словник
          </NavLink>
          <NavLink to="/flashcards" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Картки
          </NavLink>
          <NavLink to="/quiz" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Тест
          </NavLink>
          <button onClick={toggleTheme} className="btn-theme" title="Змінити тему">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </nav>
      </div>
    </header>
  );
}