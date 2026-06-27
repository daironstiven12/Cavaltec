import Badge from './Badge'
import './SectionTitle.css'

function SectionTitle({ badge, title, subtitle, center = true }) {
  return (
    <div className={`section-title ${center ? 'text-center' : ''}`}>
      {badge && (
        <div className="section-title-badge">
          <Badge variant="primary">{badge}</Badge>
        </div>
      )}
      {title && <h2 className="section-title-heading">{title}</h2>}
      {subtitle && <p className="section-title-subtitle">{subtitle}</p>}
    </div>
  )
}

export default SectionTitle
