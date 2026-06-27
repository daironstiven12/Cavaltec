import './SectionCard.css'

function SectionCard({ title, action, children, className = '' }) {
  return (
    <section className={`section-card ${className}`}>
      {(title || action) && (
        <div className="section-card-header">
          {title && <h2 className="section-card-title">{title}</h2>}
          {action && <div className="section-card-action">{action}</div>}
        </div>
      )}
      {children}
    </section>
  )
}

export default SectionCard
