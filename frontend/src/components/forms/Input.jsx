import { useState } from 'react'
import './Input.css'

function Input({ label, id, type = 'text', error, placeholder, showToggle, ...props }) {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword && showPassword ? 'text' : type

  return (
    <div className="form-group">
      {label && (
        <label className="form-label" htmlFor={id}>
          {label}
        </label>
      )}
      <div className={showToggle || isPassword ? 'form-input-wrapper' : ''}>
        <input
          id={id}
          className={`form-input ${error ? 'error' : ''}`}
          type={inputType}
          placeholder={placeholder}
          {...props}
        />
        {(showToggle || isPassword) && (
          <button
            type="button"
            className="form-input-toggle"
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <svg className="form-input-toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
                <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"/>
              </svg>
            ) : (
              <svg className="form-input-toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            )}
          </button>
        )}
      </div>
      {error && <p className="form-error">{error}</p>}
    </div>
  )
}

export default Input
