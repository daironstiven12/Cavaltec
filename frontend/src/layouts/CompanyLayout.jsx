import { Outlet, useLocation } from 'react-router-dom'
import CompanySidebar from '../components/layout/CompanySidebar'
import Topbar from '../components/layout/Topbar'
import BottomNav from '../components/layout/BottomNav'
import PageTransition from '../components/common/PageTransition'
import './DashboardLayout.css'

const pageTitles = {
  '/company/dashboard': 'Dashboard',
  '/company/nueva-evaluacion': 'Nueva Evaluación',
  '/company/mis-evaluaciones': 'Mis Evaluaciones',
  '/company/resultados': 'Resultados',
  '/company/reportes': 'Reportes',
  '/company/asistente-ia': 'Asistente IA',
  '/company/mi-empresa': 'Mi Empresa',
  '/company/usuarios': 'Usuarios',
  '/company/configuracion': 'Configuración',
  '/company/perfil': 'Mi Perfil',
}

function CompanyLayout() {
  const location = useLocation()
  const title = pageTitles[location.pathname] || 'Panel'

  return (
    <div className="dashboard-layout">
      <CompanySidebar />
      <div className="dashboard-main">
        <Topbar title={title} />
        <main className="dashboard-content" id="main-content" tabIndex={-1}>
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
      </div>
      <BottomNav />
    </div>
  )
}

export default CompanyLayout
