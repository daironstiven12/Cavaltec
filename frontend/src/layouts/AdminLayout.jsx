import { Outlet } from 'react-router-dom'
import AdminSidebar from '../components/layout/AdminSidebar'
import Topbar from '../components/layout/Topbar'
import './DashboardLayout.css'

function AdminLayout() {
  return (
    <div className="dashboard-layout">
      <AdminSidebar />
      <div className="dashboard-main">
        <Topbar />
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
