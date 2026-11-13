import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="page" style={{ textAlign: 'center', padding: '60px 20px' }}>
      <h1>404 — Сторінку не знайдено</h1>
      <p style={{ margin: '16px 0 24px' }}>Схоже, ви перейшли за неіснуючим маршрутом.</p>
      <Link to="/" className="btn-primary">Повернутися на головну</Link>
    </div>
  );
}