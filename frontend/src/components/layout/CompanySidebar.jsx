import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FiGrid, FiFilePlus, FiClock, FiBarChart2, FiFileText, FiCpu, FiBriefcase, FiUsers, FiUser, FiSettings, FiLogOut, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import './Sidebar.css'

const menuItems = [
  { to: '/company/dashboard', icon: FiGrid, label: 'Dashboard' },
  { to: '/company/nueva-evaluacion', icon: FiFilePlus, label: 'Nueva evaluación' },
  { to: '/company/mis-evaluaciones', icon: FiClock, label: 'Mis evaluaciones' },
  { to: '/company/resultados', icon: FiBarChart2, label: 'Resultados' },
  { to: '/company/reportes', icon: FiFileText, label: 'Reportes' },
  { to: '/company/asistente-ia', icon: FiCpu, label: 'Asistente IA' },
  { to: '/company/mi-empresa', icon: FiBriefcase, label: 'Mi empresa' },
  { to: '/company/usuarios', icon: FiUsers, label: 'Usuarios' },
  { to: '/company/perfil', icon: FiUser, label: 'Perfil' },
  { to: '/company/configuracion', icon: FiSettings, label: 'Configuración' },
]

function CompanySidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()

  return (
    <aside className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''}`}>
      <div className="sidebar-header">
        <NavLink to="/company/dashboard" className="sidebar-logo">
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

export default CompanySidebar
