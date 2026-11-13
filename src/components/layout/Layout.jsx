import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className="app-wrapper">
      <Navbar />
      <main className="container main-content">
        <Outlet />
      </main>
      <footer className="footer">
        <p>© 2026 LinguaFlow — SPA для вивчення іноземних слів (React Course Project)</p>
      </footer>
    </div>
  );
}