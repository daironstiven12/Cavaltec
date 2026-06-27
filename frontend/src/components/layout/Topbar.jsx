import { FiSearch, FiBell } from 'react-icons/fi'
import { useAuth } from '../../services/auth'
import './Topbar.css'

function Topbar({ title }) {
  const { user } = useAuth()
  const initials = user
    ? `${user.first_name?.[0] || ''}${user.last_name?.[0] || ''}`.toUpperCase()
    : 'U'
  const fullName = user ? `${user.first_name} ${user.last_name}` : 'Usuario'
  const roleName = user?.role?.name || 'Sin rol'

  return (
    <header className="topbar">
      <h1 className="topbar-title">{title}</h1>

      <div className="topbar-right">
        <div className="topbar-search">
          <FiSearch size={18} className="topbar-search-icon" />
          <input type="text" className="topbar-search-input" placeholder="Buscar..." readOnly />
        </div>

        <button className="topbar-notification" aria-label="Notificaciones">
          <FiBell size={20} />
          <span className="topbar-notification-dot" />
        </button>

        <div className="topbar-user">
          <div className="topbar-avatar">{initials}</div>
          <div className="topbar-user-info">
            <span className="topbar-user-name">{fullName}</span>
            <span className="topbar-user-role">{roleName}</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Topbar
