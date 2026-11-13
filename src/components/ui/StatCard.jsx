export default function StatCard({ title, value, subtitle, highlight = false }) {
  return (
    <div className={`stat-card ${highlight ? 'stat-highlight' : ''}`}>
      <h4 className="stat-title">{title}</h4>
      <div className="stat-value">{value}</div>
      {subtitle && <p className="stat-subtitle">{subtitle}</p>}
    </div>
  );
}