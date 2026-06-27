import { FiSearch, FiBell } from 'react-icons/fi'
import './Topbar.css'

function Topbar({ title }) {
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
          <div className="topbar-avatar">JP</div>
          <div className="topbar-user-info">
            <span className="topbar-user-name">Juan Pérez</span>
            <span className="topbar-user-role">Administrador</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Topbar
