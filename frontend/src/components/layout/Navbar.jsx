import { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../common/Logo'
import './Navbar.css'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="container">
        <Logo />
        <div className={`navbar-links ${menuOpen ? 'navbar-links--open' : ''}`}>
          <a href="#features" className="navbar-link" onClick={() => setMenuOpen(false)}>Solución</a>
          <a href="#how-it-works" className="navbar-link" onClick={() => setMenuOpen(false)}>Cómo funciona</a>
          <a href="#questionnaire" className="navbar-link" onClick={() => setMenuOpen(false)}>Cuestionario</a>
          <a href="#benefits" className="navbar-link" onClick={() => setMenuOpen(false)}>Resultados</a>
        </div>
        <div className="navbar-actions">
          <Link to="/login" className="btn btn-ghost">Iniciar sesión</Link>
          <Link to="/register" className="btn btn-primary">Comenzar</Link>
          <button className="navbar-toggle" aria-label="Menú" onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="navbar-toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen ? (
                <>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                  <line x1="6" y1="18" x2="18" y2="6"/>
                </>
              ) : (
                <>
                  <line x1="4" y1="6" x2="20" y2="6"/>
                  <line x1="4" y1="12" x2="20" y2="12"/>
                  <line x1="4" y1="18" x2="20" y2="18"/>
                </>
              )}
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
