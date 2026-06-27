import './Skeleton.css'

function Skeleton({ variant = 'text', width, height, className = '', count = 1 }) {
  const items = Array.from({ length: count }, (_, i) => (
    <div
      key={i}
      className={`skeleton skeleton--${variant} ${className}`}
      style={{
        width: width || undefined,
        height: height || undefined,
      }}
    />
  ))

  return count === 1 ? items[0] : <>{items}</>
}

export function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-card-header">
        <Skeleton variant="circle" width={40} height={40} />
        <div className="skeleton-card-header-text">
          <Skeleton variant="text" width="60%" height={16} />
          <Skeleton variant="text" width="40%" height={12} />
        </div>
      </div>
      <Skeleton variant="text" width="100%" height={14} />
      <Skeleton variant="text" width="85%" height={14} />
      <Skeleton variant="text" width="70%" height={14} />
    </div>
  )
}

export function SkeletonTable({ rows = 5 }) {
  return (
    <div className="skeleton-table">
      <div className="skeleton-table-header">
        <Skeleton variant="text" width="15%" height={14} />
        <Skeleton variant="text" width="25%" height={14} />
        <Skeleton variant="text" width="20%" height={14} />
        <Skeleton variant="text" width="15%" height={14} />
        <Skeleton variant="text" width="10%" height={14} />
      </div>
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="skeleton-table-row">
          <Skeleton variant="text" width="15%" height={14} />
          <Skeleton variant="text" width="25%" height={14} />
          <Skeleton variant="text" width="20%" height={14} />
          <Skeleton variant="text" width="15%" height={14} />
          <Skeleton variant="text" width="10%" height={14} />
        </div>
      ))}
    </div>
  )
}

export function SkeletonStat() {
  return (
    <div className="skeleton-stat">
      <Skeleton variant="circle" width={44} height={44} />
      <Skeleton variant="text" width="60%" height={28} />
      <Skeleton variant="text" width="80%" height={12} />
    </div>
  )
}

export default Skeleton
