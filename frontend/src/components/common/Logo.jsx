import { Link } from 'react-router-dom'
import './Logo.css'
// 1. Importas la imagen dándole un nombre
import logoBlanco from '../../assets/log_negro-s.png' 

function Logo({ showText = true, size = 'md' }) {
  const iconSize = size === 'lg' ? 3 : 3
  const fontSize = size === 'lg' ? 2 : 2

  return (
    <Link to="/" className="logo">
      {showText && (
        <span className="logo-text" style={{ fontSize }}>
          {/* 2. Usas la variable en el src */}
          <img src={logoBlanco} alt="logo" /> 
        </span>
      )}
    </Link>
  )
}

export default Logo