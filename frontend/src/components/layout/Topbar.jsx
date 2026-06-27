import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiSearch, FiBell, FiSun, FiMoon, FiUser, FiSettings, FiLogOut, FiChevronDown } from 'react-icons/fi'
import { useAuth } from '../../services/auth'
import { useTheme } from '../../contexts/ThemeContext'
import './Topbar.css'

function Topbar({ title }) {
  const { user, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  const initials = user
    ? `${user.first_name?.[0] || ''}${user.last_name?.[0] || ''}`.toUpperCase()
    : 'U'
  const fullName = user ? `${user.first_name} ${user.last_name}` : 'Usuario'
  const roleName = user?.role?.name || 'Sin rol'

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleLogout = async () => {
    setMenuOpen(false)
    await logout()
    navigate('/login')
  }

  return (
    <header className="topbar">
      <h1 className="topbar-title">{title}</h1>

      <div className="topbar-right">
        <div className="topbar-search">
          <FiSearch size={18} className="topbar-search-icon" />
          <input
            type="text"
            className="topbar-search-input"
            placeholder="Buscar..."
            aria-label="Buscar"
          />
        </div>

        <button
          className="topbar-icon-btn"
          onClick={toggleTheme}
          aria-label={isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
          title={isDark ? 'Tema claro' : 'Tema oscuro'}
        >
          {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
        </button>

        <button className="topbar-icon-btn topbar-notification" aria-label="Notificaciones">
          <FiBell size={20} />
          <span className="topbar-notification-badge">3</span>
        </button>

        <div className="topbar-user-wrapper" ref={menuRef}>
          <button
            className="topbar-user"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-haspopup="true"
            aria-label="Menú de usuario"
          >
            <div className="topbar-avatar">{initials}</div>
            <div className="topbar-user-info">
              <span className="topbar-user-name">{fullName}</span>
              <span className="topbar-user-role">{roleName}</span>
            </div>
            <FiChevronDown size={14} className={`topbar-chevron ${menuOpen ? 'topbar-chevron--open' : ''}`} />
          </button>

          {menuOpen && (
            <div className="topbar-dropdown" role="menu">
              <div className="topbar-dropdown-header">
                <div className="topbar-avatar topbar-avatar--lg">{initials}</div>
                <div>
                  <div className="topbar-dropdown-name">{fullName}</div>
                  <div className="topbar-dropdown-email">{user?.email || ''}</div>
                </div>
              </div>
              <div className="topbar-dropdown-divider" />
              <button className="topbar-dropdown-item" role="menuitem" onClick={() => { setMenuOpen(false); navigate(user?.role?.name === 'Administrador Empresa' ? '/company/perfil' : '/admin/perfil') }}>
                <FiUser size={16} />
                <span>Mi perfil</span>
              </button>
              <button className="topbar-dropdown-item" role="menuitem" onClick={() => { setMenuOpen(false); navigate(user?.role?.name === 'Administrador Empresa' ? '/company/configuracion' : '/admin/configuracion') }}>
                <FiSettings size={16} />
                <span>Configuración</span>
              </button>
              <div className="topbar-dropdown-divider" />
              <button className="topbar-dropdown-item topbar-dropdown-item--danger" role="menuitem" onClick={handleLogout}>
                <FiLogOut size={16} />
                <span>Cerrar sesión</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Topbar
