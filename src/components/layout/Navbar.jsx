import { NavLink } from 'react-router-dom';

export default function Navbar() {
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
        </nav>
      </div>
    </header>
  );
}