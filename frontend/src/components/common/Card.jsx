import './Card.css'

function Card({ children, variant, padding, className = '' }) {
  const classes = [
    'card',
    variant === 'auth' ? 'card-auth' : '',
    padding === 'sm' ? 'card-sm' : '',
    padding === 'lg' ? 'card-lg' : '',
    className,
  ].filter(Boolean).join(' ')

  return <div className={classes}>{children}</div>
}

export default Card
