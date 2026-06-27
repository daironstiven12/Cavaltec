import './Button.css'

function Button({ children, variant = 'primary', size, href, fullWidth, className = '', ...props }) {
  const classes = [
    'btn',
    `btn-${variant}`,
    size === 'lg' ? 'btn-lg' : '',
    size === 'sm' ? 'btn-sm' : '',
    fullWidth ? 'btn-block' : '',
    className,
  ].filter(Boolean).join(' ')

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}

export default Button
