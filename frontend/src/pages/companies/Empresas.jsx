import { FiPlus, FiEdit2, FiMail, FiMapPin, FiUsers, FiGrid, FiList, FiEye } from 'react-icons/fi'
import { useState } from 'react'
import PageHeader from '../../components/common/PageHeader'
import DataTable from '../../components/common/DataTable'
import Badge from '../../components/common/Badge'
import Button from '../../components/common/Button'
import './Empresas.css'

const companies = [
  { name: 'TechCorp S.A.S.', nit: '901.123.456-7', email: 'contacto@techcorp.com', city: 'Bogotá', employees: 120, status: 'Activa', evaluations: 15, compliance: 82 },
  { name: 'DataSmart Ltda.', nit: '901.234.567-8', email: 'info@datasmart.co', city: 'Medellín', employees: 45, status: 'Activa', evaluations: 8, compliance: 68 },
  { name: 'CloudSecure S.A.', nit: '901.345.678-9', email: 'ventas@cloudsecure.com', city: 'Cali', employees: 78, status: 'Activa', evaluations: 12, compliance: 77 },
  { name: 'InnovaTech S.A.S.', nit: '901.456.789-0', email: 'hola@innovatech.co', city: 'Barranquilla', employees: 32, status: 'Inactiva', evaluations: 4, compliance: 54 },
  { name: 'GreenData Corp.', nit: '901.567.890-1', email: 'info@greendata.com', city: 'Bogotá', employees: 56, status: 'Activa', evaluations: 10, compliance: 71 },
]

const columns = [
  {
    label: 'Empresa',
    key: 'name',
    render: (row) => (
      <div className="company-cell">
        <div className="company-cell-avatar">{row.name.charAt(0)}</div>
        <div>
          <div className="company-cell-name">{row.name}</div>
          <div className="company-cell-nit">NIT {row.nit}</div>
        </div>
      </div>
    ),
  },
  { label: 'Ciudad', key: 'city', width: '120px' },
  { label: 'Colaboradores', key: 'employees', width: '110px' },
  { label: 'Evaluaciones', key: 'evaluations', width: '110px' },
  {
    label: 'Cumplimiento',
    key: 'compliance',
    width: '120px',
    render: (row) => (
      <div className="compliance-cell">
        <div className="compliance-bar">
          <div className="compliance-bar-fill" style={{ width: `${row.compliance}%`, background: row.compliance >= 70 ? 'var(--color-success)' : row.compliance >= 55 ? 'var(--color-warning)' : 'var(--color-error)' }} />
        </div>
        <span>{row.compliance}%</span>
      </div>
    ),
  },
  {
    label: 'Estado',
    key: 'status',
    width: '100px',
    render: (row) => (
      <Badge variant={row.status === 'Activa' ? 'success' : 'default'}>{row.status}</Badge>
    ),
  },
]

const rowActions = [
  { label: 'Ver detalle', icon: <FiEye size={14} />, onClick: (row) => {} },
  { label: 'Editar', icon: <FiEdit2 size={14} />, onClick: (row) => {} },
]

const quickFilters = [
  { label: 'Activas', value: 'Activa' },
  { label: 'Inactivas', value: 'Inactiva' },
]

function Empresas() {
  const [viewMode, setViewMode] = useState('table')

  return (
    <>
      <PageHeader
        title="Empresas"
        subtitle="Gestión de empresas registradas en la plataforma"
        actions={
          <Button variant="primary">
            <FiPlus size={16} /> Nueva empresa
          </Button>
        }
      />

      <div className="empresas-summary">
        <div className="empresa-summary-card">
          <span className="empresa-summary-value">5</span>
          <span className="empresa-summary-label">Empresas registradas</span>
        </div>
        <div className="empresa-summary-card">
          <span className="empresa-summary-value" style={{ color: 'var(--color-success)' }}>4</span>
          <span className="empresa-summary-label">Empresas activas</span>
        </div>
        <div className="empresa-summary-card">
          <span className="empresa-summary-value" style={{ color: 'var(--color-accent)' }}>331</span>
          <span className="empresa-summary-label">Total colaboradores</span>
        </div>
        <div className="empresa-summary-card">
          <span className="empresa-summary-value" style={{ color: 'var(--color-warning)' }}>72%</span>
          <span className="empresa-summary-label">Cumplimiento promedio</span>
        </div>
      </div>

      <div className="empresas-view-toggle">
        <button className={`empresas-toggle-btn ${viewMode === 'table' ? 'empresas-toggle-btn--active' : ''}`} onClick={() => setViewMode('table')}>
          <FiList size={16} /> Tabla
        </button>
        <button className={`empresas-toggle-btn ${viewMode === 'cards' ? 'empresas-toggle-btn--active' : ''}`} onClick={() => setViewMode('cards')}>
          <FiGrid size={16} /> Tarjetas
        </button>
      </div>

      {viewMode === 'cards' ? (
        <div className="empresas-cards">
          {companies.map((c, i) => (
            <div key={i} className="empresa-card">
              <div className="empresa-card-header">
                <div className="empresa-card-avatar">{c.name.charAt(0)}</div>
                <Badge variant={c.status === 'Activa' ? 'success' : 'default'}>{c.status}</Badge>
              </div>
              <h3 className="empresa-card-name">{c.name}</h3>
              <p className="empresa-card-nit">NIT {c.nit}</p>
              <div className="empresa-card-meta">
                <span><FiMapPin size={14} /> {c.city}</span>
                <span><FiUsers size={14} /> {c.employees}</span>
              </div>
              <div className="empresa-card-email">
                <FiMail size={14} /> {c.email}
              </div>
              <div className="empresa-card-compliance">
                <span className="empresa-card-compliance-label">Cumplimiento</span>
                <div className="compliance-bar">
                  <div className="compliance-bar-fill" style={{ width: `${c.compliance}%`, background: c.compliance >= 70 ? 'var(--color-success)' : c.compliance >= 55 ? 'var(--color-warning)' : 'var(--color-error)' }} />
                </div>
                <span className="empresa-card-compliance-value">{c.compliance}%</span>
              </div>
              <div className="empresa-card-footer">
                <span className="empresa-card-evals">{c.evaluations} evaluaciones</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={companies}
          searchable
          searchPlaceholder="Buscar empresa..."
          filters={quickFilters}
          filterKey="status"
          rowActions={rowActions}
        />
      )}
    </>
  )
}

export default Empresas
