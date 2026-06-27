import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FiGrid, FiUsers, FiUserCheck, FiFileText, FiHelpCircle, FiLayers, FiCheckCircle, FiBarChart2, FiCpu, FiShield, FiSettings, FiUser, FiLogOut, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useAuth } from '../../services/auth'
import logoNegro from '../../assets/log_negro-s.png'
import './Sidebar.css'

const menuSections = [
  {
    label: 'Principal',
    items: [
      { to: '/admin/dashboard', icon: FiGrid, label: 'Dashboard' },
    ],
  },
  {
    label: 'Gestión',
    items: [
      { to: '/admin/empresas', icon: FiUsers, label: 'Empresas' },
      { to: '/admin/usuarios', icon: FiUserCheck, label: 'Usuarios' },
      { to: '/admin/evaluaciones', icon: FiCheckCircle, label: 'Evaluaciones' },
      { to: '/admin/reportes', icon: FiBarChart2, label: 'Reportes' },
    ],
  },
  {
    label: 'Cuestionarios',
    items: [
      { to: '/admin/cuestionarios', icon: FiHelpCircle, label: 'Cuestionarios' },
      { to: '/admin/preguntas', icon: FiFileText, label: 'Preguntas' },
      { to: '/admin/versiones', icon: FiLayers, label: 'Versiones' },
    ],
  },
  {
    label: 'Herramientas',
    items: [
      { to: '/admin/panel-ia', icon: FiCpu, label: 'Panel IA' },
      { to: '/admin/auditoria', icon: FiShield, label: 'Auditoría' },
    ],
  },
  {
    label: 'Cuenta',
    items: [
      { to: '/admin/configuracion', icon: FiSettings, label: 'Configuración' },
      { to: '/admin/perfil', icon: FiUser, label: 'Perfil' },
    ],
  },
]

function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <aside className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''}`} role="navigation" aria-label="Menú principal">
      <div className="sidebar-header">
        <NavLink to="/admin/dashboard" className="sidebar-logo">
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

export default AdminSidebar
