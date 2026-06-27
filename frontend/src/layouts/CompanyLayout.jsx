import { Outlet } from 'react-router-dom'
import CompanySidebar from '../components/layout/CompanySidebar'
import Topbar from '../components/layout/Topbar'
import './DashboardLayout.css'

function CompanyLayout() {
  return (
    <div className="dashboard-layout">
      <CompanySidebar />
      <div className="dashboard-main">
        <Topbar />
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default CompanyLayout
