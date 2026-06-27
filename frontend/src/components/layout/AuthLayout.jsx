import { Link } from 'react-router-dom'
import './AuthLayout.css'

function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <Link to="/" className="auth-logo">
            <span className="auth-logo-icon">C</span>
            CAVALTEC
          </Link>
          <h1 className="auth-title">{title}</h1>
          {subtitle && <p className="auth-subtitle">{subtitle}</p>}
        </div>
        <div className="card card-auth">
          {children}
          {footer && <p className="form-footer-text">{footer}</p>}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
