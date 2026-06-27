import './GaugeCard.css'

function GaugeCard({ value, label, subtitle, size = 'md' }) {
  const radius = size === 'lg' ? 80 : 64
  const strokeWidth = size === 'lg' ? 12 : 10
  const normalizedRadius = radius - strokeWidth / 2
  const circumference = normalizedRadius * 2 * Math.PI
  const offset = circumference - (value / 100) * circumference

  const getColor = (v) => {
    if (v >= 80) return 'var(--color-success)'
    if (v >= 50) return 'var(--color-warning)'
    return 'var(--color-error)'
  }

  const color = getColor(value)

  return (
    <div className={`gauge-card gauge-card--${size}`}>
      <svg height={radius * 2} width={radius * 2} className="gauge-svg">
        <circle
          stroke="var(--color-bg-tertiary)"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          transform={`rotate(-90 ${radius} ${radius})`}
          className="gauge-circle"
        />
        <text x={radius} y={radius - 4} textAnchor="middle" className="gauge-value" fill="var(--color-text-primary)">
          {value}%
        </text>
        {subtitle && (
          <text x={radius} y={radius + 16} textAnchor="middle" className="gauge-subtitle" fill="var(--color-text-tertiary)">
            {subtitle}
          </text>
        )}
      </svg>
      {label && <p className="gauge-label">{label}</p>}
    </div>
  )
}

export default GaugeCard
