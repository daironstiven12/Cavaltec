import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FiGrid, FiCheckCircle, FiBarChart2, FiFileText, FiUser, FiLogOut, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import './Sidebar.css'

const menuItems = [
  { to: '/auditor/dashboard', icon: FiGrid, label: 'Dashboard' },
  { to: '/auditor/evaluaciones', icon: FiCheckCircle, label: 'Evaluaciones' },
  { to: '/auditor/resultados', icon: FiBarChart2, label: 'Resultados' },
  { to: '/auditor/reportes', icon: FiFileText, label: 'Reportes' },
  { to: '/auditor/perfil', icon: FiUser, label: 'Perfil' },
]

function AuditorSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()

  return (
    <aside className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''}`}>
      <div className="sidebar-header">
        <NavLink to="/auditor/dashboard" className="sidebar-logo">
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
        <button className="sidebar-item sidebar-item--logout" onClick={() => navigate('/')}>
          <FiLogOut size={20} className="sidebar-item-icon" />
          {!collapsed && <span className="sidebar-item-label">Cerrar sesión</span>}
        </button>
      </div>
    </aside>
  )
}

export default AuditorSidebar
