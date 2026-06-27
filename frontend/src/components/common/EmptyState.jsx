import './EmptyState.css'

function EmptyState({ icon, title, text, action }) {
  return (
    <div className="empty-state">
      {icon && <div className="empty-state-icon">{icon}</div>}
      <h3 className="empty-state-title">{title}</h3>
      {text && <p className="empty-state-text">{text}</p>}
      {action && <div className="empty-state-action">{action}</div>}
    </div>
  )
}

export default EmptyState
