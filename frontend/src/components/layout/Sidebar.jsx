import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FiGrid, FiFilePlus, FiClock, FiBarChart2, FiUsers, FiFileText, FiUser, FiSettings, FiLogOut, FiChevronLeft, FiChevronRight, FiCpu, FiHelpCircle } from 'react-icons/fi'
import './Sidebar.css'

const menuItems = [
  { to: '/dashboard', icon: FiGrid, label: 'Dashboard' },
  { to: '/nueva-evaluacion', icon: FiFilePlus, label: 'Nueva evaluación' },
  { to: '/cuestionario', icon: FiHelpCircle, label: 'Cuestionario' },
  { to: '/historial', icon: FiClock, label: 'Historial' },
  { to: '/resultados', icon: FiBarChart2, label: 'Resultados' },
  { to: '/empresas', icon: FiUsers, label: 'Empresas' },
  { to: '/reportes', icon: FiFileText, label: 'Reportes' },
  { to: '/panel-ia', icon: FiCpu, label: 'Panel IA' },
  { to: '/perfil', icon: FiUser, label: 'Perfil' },
  { to: '/configuracion', icon: FiSettings, label: 'Configuración' },
]

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/')
  }

  return (
    <aside className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''}`}>
      <div className="sidebar-header">
        <NavLink to="/dashboard" className="sidebar-logo">
          <span className="sidebar-logo-icon">C</span>
          {!collapsed && <span className="sidebar-logo-text">CAVALTEC</span>}
        </NavLink>
        <button className="sidebar-collapse-btn" onClick={() => setCollapsed((c) => !c)} aria-label={collapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}>
          {collapsed ? <FiChevronRight size={18} /> : <FiChevronLeft size={18} />}
        </button>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink key={item.to} to={item.to} end className={({ isActive }) => `sidebar-item ${isActive ? 'sidebar-item--active' : ''}`}>
            <item.icon size={20} className="sidebar-item-icon" />
            {!collapsed && <span className="sidebar-item-label">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="sidebar-item sidebar-item--logout" onClick={handleLogout}>
          <FiLogOut size={20} className="sidebar-item-icon" />
          {!collapsed && <span className="sidebar-item-label">Cerrar sesión</span>}
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
