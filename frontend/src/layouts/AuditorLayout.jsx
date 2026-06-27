import { Outlet } from 'react-router-dom'
import AuditorSidebar from '../components/layout/AuditorSidebar'
import Topbar from '../components/layout/Topbar'
import './DashboardLayout.css'

function AuditorLayout() {
  return (
    <div className="dashboard-layout">
      <AuditorSidebar />
      <div className="dashboard-main">
        <Topbar />
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AuditorLayout
