import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FiGrid, FiFilePlus, FiClock, FiBarChart2, FiFileText, FiCpu, FiBriefcase, FiUsers, FiUser, FiSettings, FiLogOut, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useAuth } from '../../services/auth'
import logoNegro from '../../assets/log_negro-s.png'
import './Sidebar.css'

const menuSections = [
  {
    label: 'Principal',
    items: [
      { to: '/company/dashboard', icon: FiGrid, label: 'Dashboard' },
    ],
  },
  {
    label: 'Evaluaciones',
    items: [
      { to: '/company/nueva-evaluacion', icon: FiFilePlus, label: 'Nueva evaluación' },
      { to: '/company/mis-evaluaciones', icon: FiClock, label: 'Mis evaluaciones' },
      { to: '/company/resultados', icon: FiBarChart2, label: 'Resultados' },
      { to: '/company/reportes', icon: FiFileText, label: 'Reportes' },
    ],
  },
  {
    label: 'Herramientas',
    items: [
      { to: '/company/asistente-ia', icon: FiCpu, label: 'Asistente IA' },
    ],
  },
  {
    label: 'Empresa',
    items: [
      { to: '/company/mi-empresa', icon: FiBriefcase, label: 'Mi empresa' },
      { to: '/company/usuarios', icon: FiUsers, label: 'Usuarios' },
    ],
  },
  {
    label: 'Cuenta',
    items: [
      { to: '/company/configuracion', icon: FiSettings, label: 'Configuración' },
      { to: '/company/perfil', icon: FiUser, label: 'Perfil' },
    ],
  },
]

function CompanySidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <aside className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''}`} role="navigation" aria-label="Menú de empresa">
      <div className="sidebar-header">
        <NavLink to="/company/dashboard" className="sidebar-logo">
          <img src={logoNegro} alt="CavalcTec" className="sidebar-logo-img" />
          {!collapsed && <span className="sidebar-logo-text">CAVALTEC</span>}
        </NavLink>
        <button
          className="sidebar-collapse-btn"
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
        >
          {collapsed ? <FiChevronRight size={18} /> : <FiChevronLeft size={18} />}
        </button>
      </div>
      <nav className="sidebar-nav">
        {menuSections.map((section) => (
          <div key={section.label}>
            {!collapsed && <div className="sidebar-section-label">{section.label}</div>}
            {section.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end
                className={({ isActive }) => `sidebar-item ${isActive ? 'sidebar-item--active' : ''}`}
              >
                <item.icon size={20} className="sidebar-item-icon" />
                {!collapsed && <span className="sidebar-item-label">{item.label}</span>}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>
      <div className="sidebar-footer">
        <button className="sidebar-item sidebar-item--logout" onClick={handleLogout} aria-label="Cerrar sesión">
          <FiLogOut size={20} className="sidebar-item-icon" />
          {!collapsed && <span className="sidebar-item-label">Cerrar sesión</span>}
        </button>
      </div>
    </aside>
  )
}

export default CompanySidebar
