import { Outlet, useLocation } from 'react-router-dom'
import AdminSidebar from '../components/layout/AdminSidebar'
import Topbar from '../components/layout/Topbar'
import BottomNav from '../components/layout/BottomNav'
import PageTransition from '../components/common/PageTransition'
import './DashboardLayout.css'

const pageTitles = {
  '/admin/dashboard': 'Dashboard',
  '/admin/empresas': 'Empresas',
  '/admin/usuarios': 'Usuarios',
  '/admin/cuestionarios': 'Cuestionarios',
  '/admin/preguntas': 'Preguntas',
  '/admin/versiones': 'Versiones',
  '/admin/evaluaciones': 'Evaluaciones',
  '/admin/reportes': 'Reportes',
  '/admin/panel-ia': 'Panel IA',
  '/admin/auditoria': 'Auditoría',
  '/admin/configuracion': 'Configuración',
  '/admin/perfil': 'Mi Perfil',
}

function AdminLayout() {
  const location = useLocation()
  const title = pageTitles[location.pathname] || 'Panel'

  return (
    <div className="dashboard-layout">
      <AdminSidebar />
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

export default AdminLayout
