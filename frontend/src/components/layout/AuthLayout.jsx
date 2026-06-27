import { Link } from 'react-router-dom'
import './AuthLayout.css'
import logoBlanco from '../../assets/log_negro-s.png' 

function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <Link to="/" className="auth-logo">
              <span className="logo-text">
                <img src={logoBlanco} alt="logo" /> 
              </span>
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