import './InfoCard.css'

function InfoCard({ label, value, icon }) {
  return (
    <div className="info-card">
      {icon && <div className="info-card-icon">{icon}</div>}
      <div className="info-card-body">
        <span className="info-card-label">{label}</span>
        <span className="info-card-value">{value}</span>
      </div>
    </div>
  )
}

export default InfoCard
