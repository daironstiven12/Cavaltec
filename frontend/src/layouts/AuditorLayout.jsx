import { Outlet, useLocation } from 'react-router-dom'
import AuditorSidebar from '../components/layout/AuditorSidebar'
import Topbar from '../components/layout/Topbar'
import BottomNav from '../components/layout/BottomNav'
import PageTransition from '../components/common/PageTransition'
import './DashboardLayout.css'

const pageTitles = {
  '/auditor/dashboard': 'Dashboard',
  '/auditor/evaluaciones': 'Evaluaciones',
  '/auditor/resultados': 'Resultados',
  '/auditor/reportes': 'Reportes',
  '/auditor/perfil': 'Mi Perfil',
}

function AuditorLayout() {
  const location = useLocation()
  const title = pageTitles[location.pathname] || 'Panel'

  return (
    <div className="dashboard-layout">
      <AuditorSidebar />
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

export default AuditorLayout
