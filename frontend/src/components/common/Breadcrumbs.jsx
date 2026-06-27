import { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiChevronRight, FiHome } from 'react-icons/fi'
import './Breadcrumbs.css'

const routeLabels = {
  admin: 'Administración',
  company: 'Empresa',
  auditor: 'Auditoría',
  dashboard: 'Dashboard',
  empresas: 'Empresas',
  usuarios: 'Usuarios',
  cuestionarios: 'Cuestionarios',
  preguntas: 'Preguntas',
  versiones: 'Versiones',
  evaluaciones: 'Evaluaciones',
  reportes: 'Reportes',
  'panel-ia': 'Panel IA',
  auditoria: 'Auditoría',
  configuracion: 'Configuración',
  perfil: 'Perfil',
  'nueva-evaluacion': 'Nueva Evaluación',
  'mis-evaluaciones': 'Mis Evaluaciones',
  resultados: 'Resultados',
  'asistente-ia': 'Asistente IA',
  'mi-empresa': 'Mi Empresa',
}

function Breadcrumbs() {
  const location = useLocation()

  const crumbs = useMemo(() => {
    const parts = location.pathname.split('/').filter(Boolean)
    const result = [{ label: 'Inicio', path: '/', isHome: true }]

    let currentPath = ''
    parts.forEach((part) => {
      currentPath += `/${part}`
      const label = routeLabels[part] || part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' ')
      result.push({ label, path: currentPath })
    })

    return result
  }, [location.pathname])

  if (crumbs.length <= 1) return null

  return (
    <nav className="breadcrumbs" aria-label="Migas de pan">
      {crumbs.map((crumb, i) => {
        const isLast = i === crumbs.length - 1
        return (
          <span key={crumb.path} className="breadcrumb-item">
            {i === 0 && <FiHome size={14} className="breadcrumb-home-icon" />}
            {isLast ? (
              <span className="breadcrumb-current" aria-current="page">{crumb.label}</span>
            ) : (
              <Link to={crumb.path} className="breadcrumb-link">{crumb.label}</Link>
            )}
            {!isLast && <FiChevronRight size={12} className="breadcrumb-separator" />}
          </span>
        )
      })}
    </nav>
  )
}

export default Breadcrumbs
