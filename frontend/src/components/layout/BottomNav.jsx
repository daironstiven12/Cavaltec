import { NavLink } from 'react-router-dom'
import { FiGrid, FiFilePlus, FiClock, FiBarChart2, FiCpu, FiUser } from 'react-icons/fi'
import { useAuth } from '../../services/auth'
import './BottomNav.css'

const companyNav = [
  { to: '/company/dashboard', icon: FiGrid, label: 'Inicio' },
  { to: '/company/nueva-evaluacion', icon: FiFilePlus, label: 'Evaluar' },
  { to: '/company/mis-evaluaciones', icon: FiClock, label: 'Historial' },
  { to: '/company/asistente-ia', icon: FiCpu, label: 'IA' },
  { to: '/company/perfil', icon: FiUser, label: 'Perfil' },
]

const adminNav = [
  { to: '/admin/dashboard', icon: FiGrid, label: 'Inicio' },
  { to: '/admin/empresas', icon: FiGrid, label: 'Empresas' },
  { to: '/admin/evaluaciones', icon: FiClock, label: 'Evals' },
  { to: '/admin/panel-ia', icon: FiCpu, label: 'IA' },
  { to: '/admin/perfil', icon: FiUser, label: 'Perfil' },
]

function BottomNav() {
  const { user } = useAuth()
  const isAdmin = user?.role?.name === 'Administrador' || user?.role?.name === 'Administrador Empresa'
  const navItems = user?.role?.name === 'Administrador Empresa' ? companyNav :
                   isAdmin ? adminNav : companyNav

  return (
    <nav className="bottom-nav" aria-label="Navegación móvil">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => `bottom-nav-item ${isActive ? 'bottom-nav-item--active' : ''}`}
        >
          <item.icon size={20} />
          <span className="bottom-nav-label">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}

export default BottomNav
