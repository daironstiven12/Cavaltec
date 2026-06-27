import './ProgressBar.css'

function ProgressBar({ value, max = 100, height = 'sm', label, showValue }) {
  const pct = Math.round((value / max) * 100)

  return (
    <div className="progress">
      {(label || showValue) && (
        <div className="progress-header">
          {label && <span className="progress-label">{label}</span>}
          {showValue && <span className="progress-value">{pct}%</span>}
        </div>
      )}
      <div className={`progress-track progress-track--${height}`}>
        <div
          className={`progress-fill progress-fill--${pct >= 100 ? 'done' : pct >= 60 ? 'high' : pct >= 30 ? 'mid' : 'low'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

export default ProgressBar
