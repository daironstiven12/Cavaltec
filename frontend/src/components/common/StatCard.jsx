import './StatCard.css'

function StatCard({ icon, value, label, trend, color }) {
  return (
    <div className="stat-card" style={color ? { '--stat-accent': color } : {}}>
      <div className="stat-card-header">
        <div className={`stat-card-icon ${color ? 'stat-card-icon--custom' : ''}`} style={color ? { background: `${color}15`, color } : {}}>
          {icon}
        </div>
        {trend !== undefined && (
          <span className={`stat-card-trend ${trend >= 0 ? 'stat-card-trend--up' : 'stat-card-trend--down'}`}>
            {trend >= 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <div className="stat-card-value">{value}</div>
      <div className="stat-card-label">{label}</div>
    </div>
  )
}

export default StatCard
