import { FiDownload, FiFileText, FiBarChart2, FiUsers, FiShield, FiEye } from 'react-icons/fi'
import PageHeader from '../../components/common/PageHeader'
import DataTable from '../../components/common/DataTable'
import Badge from '../../components/common/Badge'
import Button from '../../components/common/Button'
import './Reportes.css'

const reports = [
  { name: 'Informe de cumplimiento general', company: 'TechCorp S.A.S.', type: 'Cumplimiento', date: '15/06/2026', status: 'Completado' },
  { name: 'Análisis de brechas de seguridad', company: 'DataSmart Ltda.', type: 'Seguridad', date: '10/06/2026', status: 'Completado' },
  { name: 'Reporte de evaluación v2.4.1', company: 'CloudSecure S.A.', type: 'Evaluación', date: '05/06/2026', status: 'Completado' },
  { name: 'Resumen ejecutivo Q2 2026', company: 'TechCorp S.A.S.', type: 'Ejecutivo', date: '01/06/2026', status: 'Completado' },
  { name: 'Plan de acción recomendado', company: 'InnovaTech S.A.S.', type: 'Plan', date: '28/05/2026', status: 'Pendiente' },
  { name: 'Informe de cumplimiento general', company: 'GreenData Corp.', type: 'Cumplimiento', date: '25/05/2026', status: 'Completado' },
  { name: 'Auditoría de seguridad', company: 'TechCorp S.A.S.', type: 'Seguridad', date: '20/05/2026', status: 'Completado' },
]

const typeIcons = {
  Cumplimiento: <FiShield size={16} />,
  Seguridad: <FiShield size={16} />,
  Evaluación: <FiFileText size={16} />,
  Ejecutivo: <FiBarChart2 size={16} />,
  Plan: <FiUsers size={16} />,
}

const columns = [
  { label: 'Reporte', key: 'name' },
  { label: 'Empresa', key: 'company' },
  {
    label: 'Tipo', key: 'type', width: '130px',
    render: (row) => (
      <span className="report-type">
        {typeIcons[row.type]} {row.type}
      </span>
    ),
  },
  { label: 'Fecha', key: 'date', width: '120px' },
  {
    label: 'Estado', key: 'status', width: '120px',
    render: (row) => (
      <Badge variant={row.status === 'Completado' ? 'success' : 'warning'}>{row.status}</Badge>
    ),
  },
]

const rowActions = [
  { label: 'Ver reporte', icon: <FiEye size={14} />, onClick: (row) => {} },
  { label: 'Descargar', icon: <FiDownload size={14} />, onClick: (row) => {} },
]

const quickFilters = [
  { label: 'Completados', value: 'Completado' },
  { label: 'Pendientes', value: 'Pendiente' },
]

function Reportes() {
  return (
    <>
      <PageHeader
        title="Reportes"
        subtitle="Descarga y gestiona los reportes generados"
        actions={
          <Button variant="primary">
            <FiFileText size={16} /> Generar reporte
          </Button>
        }
      />

      <div className="reportes-summary">
        {[
          { label: 'Reportes generados', value: '24', color: 'var(--color-accent)' },
          { label: 'Descargados este mes', value: '8', color: 'var(--color-success)' },
          { label: 'Pendientes', value: '3', color: 'var(--color-warning)' },
        ].map((r, i) => (
          <div key={i} className="reporte-stat">
            <div className="reporte-stat-value" style={{ color: r.color }}>{r.value}</div>
            <div className="reporte-stat-label">{r.label}</div>
          </div>
        ))}
      </div>

      <DataTable
        columns={columns}
        data={reports}
        searchable
        searchPlaceholder="Buscar reporte..."
        filters={quickFilters}
        filterKey="status"
        rowActions={rowActions}
      />
    </>
  )
}

export default Reportes
