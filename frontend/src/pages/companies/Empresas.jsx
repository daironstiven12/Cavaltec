import { FiPlus, FiEdit2, FiMail, FiMapPin, FiUsers, FiGrid, FiList, FiEye } from 'react-icons/fi'
import { useState, useEffect } from 'react'
import PageHeader from '../../components/common/PageHeader'
import DataTable from '../../components/common/DataTable'
import Badge from '../../components/common/Badge'
import Button from '../../components/common/Button'
import SkeletonTable from '../../components/common/Skeleton'
import Breadcrumbs from '../../components/common/Breadcrumbs'
import { companiesAPI } from '../../services/api'
import './Empresas.css'

const fallbackCompanies = [
  { business_name: 'TechCorp S.A.S.', nit: '901.123.456-7', email: 'contacto@techcorp.com', city: 'Bogotá', status: 'Activa' },
  { business_name: 'DataSmart Ltda.', nit: '901.234.567-8', email: 'info@datasmart.co', city: 'Medellín', status: 'Activa' },
  { business_name: 'CloudSecure S.A.', nit: '901.345.678-9', email: 'ventas@cloudsecure.com', city: 'Cali', status: 'Activa' },
  { business_name: 'InnovaTech S.A.S.', nit: '901.456.789-0', email: 'hola@innovatech.co', city: 'Barranquilla', status: 'Inactiva' },
  { business_name: 'GreenData Corp.', nit: '901.567.890-1', email: 'info@greendata.com', city: 'Bogotá', status: 'Activa' },
]

const columns = [
  {
    label: 'Empresa',
    key: 'business_name',
    render: (row) => (
      <div className="company-cell">
        <div className="company-cell-avatar">{(row.business_name || 'E').charAt(0)}</div>
        <div>
          <div className="company-cell-name">{row.business_name}</div>
          <div className="company-cell-nit">NIT {row.nit || '—'}</div>
        </div>
      </div>
    ),
  },
  { label: 'Ciudad', key: 'city', width: '120px', render: (row) => row.city || '—' },
  {
    label: 'Estado',
    key: 'status',
    width: '100px',
    render: (row) => (
      <Badge variant={row.status === 'Activa' ? 'success' : 'default'}>{row.status || 'Activa'}</Badge>
    ),
  },
  {
    label: 'Email',
    key: 'email',
    width: '180px',
    render: (row) => (
      <span className="empresa-email-cell"><FiMail size={13} /> {row.email}</span>
    ),
  },
]

const quickFilters = [
  { label: 'Activas', value: 'Activa' },
  { label: 'Inactivas', value: 'Inactiva' },
]

function Empresas() {
  const [viewMode, setViewMode] = useState('table')
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)

  const notify = (msg) => window.dispatchEvent(new CustomEvent('toast', { detail: { type: 'info', message: msg } }))

  const rowActions = [
    { label: 'Ver detalle', icon: <FiEye size={14} />, onClick: (row) => notify(`Abriendo detalle de ${row.business_name}...`) },
    { label: 'Editar', icon: <FiEdit2 size={14} />, onClick: (row) => notify(`Editando empresa ${row.business_name}...`) },
  ]

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await companiesAPI.getAll()
        const data = res.data?.items || res.data || []
        setCompanies(data.length > 0 ? data : fallbackCompanies)
      } catch {
        setCompanies(fallbackCompanies)
      } finally {
        setLoading(false)
      }
    }
    fetchCompanies()
  }, [])

  const activeCount = companies.filter((c) => c.status === 'Activa').length

  return (
    <>
      <Breadcrumbs />
      <PageHeader
        title="Empresas"
        subtitle="Gestión de empresas registradas en la plataforma"
        actions={
          <Button variant="primary" onClick={() => notify('Abriendo formulario de nueva empresa...')}>
            <FiPlus size={16} /> Nueva empresa
          </Button>
        }
      />

      <div className="empresas-summary">
        <div className="empresa-summary-card">
          <span className="empresa-summary-value">{companies.length}</span>
          <span className="empresa-summary-label">Empresas registradas</span>
        </div>
        <div className="empresa-summary-card">
          <span className="empresa-summary-value" style={{ color: 'var(--color-success)' }}>{activeCount}</span>
          <span className="empresa-summary-label">Empresas activas</span>
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

      {loading ? (
        <SkeletonTable rows={5} cols={4} />
      ) : viewMode === 'cards' ? (
        <div className="empresas-cards">
          {companies.map((c, i) => (
            <div key={c.id || i} className="empresa-card" onClick={() => notify(`Abriendo detalle de ${c.business_name}...`)} style={{ cursor: 'pointer' }}>
              <div className="empresa-card-header">
                <div className="empresa-card-avatar">{(c.business_name || 'E').charAt(0)}</div>
                <Badge variant={c.status === 'Activa' ? 'success' : 'default'}>{c.status || 'Activa'}</Badge>
              </div>
              <h3 className="empresa-card-name">{c.business_name}</h3>
              <p className="empresa-card-nit">NIT {c.nit || '—'}</p>
              <div className="empresa-card-meta">
                <span><FiMapPin size={14} /> {c.city || '—'}</span>
              </div>
              <div className="empresa-card-email">
                <FiMail size={14} /> {c.email || '—'}
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
