import { Routes, Route } from 'react-router-dom'
import Landing from '../pages/landing/Landing'
import Login from '../pages/login/Login'
import Register from '../pages/register/Register'
import ForgotPassword from '../pages/forgot-password/ForgotPassword'

import AdminLayout from '../layouts/AdminLayout'
import AdminDashboard from '../pages/dashboard/Dashboard'
import AdminEmpresas from '../pages/companies/Empresas'
import AdminUsuarios from '../pages/admin/AdminUsuarios'
import AdminCuestionarios from '../pages/admin/AdminCuestionarios'
import AdminPreguntas from '../pages/admin/AdminPreguntas'
import AdminVersiones from '../pages/admin/AdminVersiones'
import AdminEvaluaciones from '../pages/history/Historial'
import AdminReportes from '../pages/reports/Reportes'
import AdminPanelIA from '../pages/ai/PanelIA'
import AdminAuditoria from '../pages/admin/AdminAuditoria'
import AdminConfiguracion from '../pages/settings/Configuracion'
import AdminPerfil from '../pages/profile/Perfil'

import CompanyLayout from '../layouts/CompanyLayout'
import CompanyDashboard from '../pages/company/CompanyDashboard'
import CompanyNuevaEvaluacion from '../pages/assessment/NuevaEvaluacion'
import CompanyMisEvaluaciones from '../pages/assessment/Cuestionario'
import CompanyResultados from '../pages/results/Resultados'
import CompanyReportes from '../pages/reports/Reportes'
import CompanyAsistenteIA from '../pages/ai/PanelIA'
import CompanyMiEmpresa from '../pages/company/MiEmpresa'
import CompanyUsuarios from '../pages/company/CompanyUsuarios'
import CompanyPerfil from '../pages/profile/Perfil'
import CompanyConfiguracion from '../pages/settings/Configuracion'

import AuditorLayout from '../layouts/AuditorLayout'
import AuditorDashboard from '../pages/auditor/AuditorDashboard'
import AuditorEvaluaciones from '../pages/history/Historial'
import AuditorResultados from '../pages/results/Resultados'
import AuditorReportes from '../pages/reports/Reportes'
import AuditorPerfil from '../pages/profile/Perfil'

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route element={<AdminLayout />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/empresas" element={<AdminEmpresas />} />
        <Route path="/admin/usuarios" element={<AdminUsuarios />} />
        <Route path="/admin/cuestionarios" element={<AdminCuestionarios />} />
        <Route path="/admin/preguntas" element={<AdminPreguntas />} />
        <Route path="/admin/versiones" element={<AdminVersiones />} />
        <Route path="/admin/evaluaciones" element={<AdminEvaluaciones />} />
        <Route path="/admin/reportes" element={<AdminReportes />} />
        <Route path="/admin/panel-ia" element={<AdminPanelIA />} />
        <Route path="/admin/auditoria" element={<AdminAuditoria />} />
        <Route path="/admin/configuracion" element={<AdminConfiguracion />} />
        <Route path="/admin/perfil" element={<AdminPerfil />} />
      </Route>

      <Route element={<CompanyLayout />}>
        <Route path="/company/dashboard" element={<CompanyDashboard />} />
        <Route path="/company/nueva-evaluacion" element={<CompanyNuevaEvaluacion />} />
        <Route path="/company/mis-evaluaciones" element={<CompanyMisEvaluaciones />} />
        <Route path="/company/resultados" element={<CompanyResultados />} />
        <Route path="/company/reportes" element={<CompanyReportes />} />
        <Route path="/company/asistente-ia" element={<CompanyAsistenteIA />} />
        <Route path="/company/mi-empresa" element={<CompanyMiEmpresa />} />
        <Route path="/company/usuarios" element={<CompanyUsuarios />} />
        <Route path="/company/perfil" element={<CompanyPerfil />} />
        <Route path="/company/configuracion" element={<CompanyConfiguracion />} />
      </Route>

      <Route element={<AuditorLayout />}>
        <Route path="/auditor/dashboard" element={<AuditorDashboard />} />
        <Route path="/auditor/evaluaciones" element={<AuditorEvaluaciones />} />
        <Route path="/auditor/resultados" element={<AuditorResultados />} />
        <Route path="/auditor/reportes" element={<AuditorReportes />} />
        <Route path="/auditor/perfil" element={<AuditorPerfil />} />
      </Route>
    </Routes>
  )
}

export default AppRouter
