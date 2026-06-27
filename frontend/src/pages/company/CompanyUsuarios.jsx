import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi'
import PageHeader from '../../components/common/PageHeader'
import DataTable from '../../components/common/DataTable'
import Badge from '../../components/common/Badge'
import Button from '../../components/common/Button'

const users = [
  { name: 'Juan Pérez', email: 'juan.perez@techcorp.com', role: 'Administrador', status: 'Activo', lastAccess: 'Hoy 8:30 AM', initials: 'JP' },
  { name: 'María García', email: 'maria.garcia@techcorp.com', role: 'Editor', status: 'Activo', lastAccess: 'Hoy 9:15 AM', initials: 'MG' },
  { name: 'Carlos López', email: 'carlos.lopez@techcorp.com', role: 'Auditor', status: 'Activo', lastAccess: 'Ayer 4:20 PM', initials: 'CL' },
  { name: 'Ana Martínez', email: 'ana.martinez@techcorp.com', role: 'Editor', status: 'Inactivo', lastAccess: '15/06/2026', initials: 'AM' },
  { name: 'Pedro Ramírez', email: 'pedro.ramirez@techcorp.com', role: 'Auditor', status: 'Activo', lastAccess: '14/06/2026', initials: 'PR' },
]

const columns = [
  {
    label: 'Usuario',
    key: 'name',
    render: (row) => (
      <div className="user-cell">
        <div className="user-avatar">{row.initials}</div>
        <div>
          <div className="user-name">{row.name}</div>
          <div className="user-email">{row.email}</div>
        </div>
      </div>
    ),
  },
  { label: 'Rol', key: 'role', width: '140px' },
  {
    label: 'Estado',
    key: 'status',
    width: '100px',
    render: (row) => (
      <Badge variant={row.status === 'Activo' ? 'success' : 'default'}>{row.status}</Badge>
    ),
  },
  { label: 'Último acceso', key: 'lastAccess', width: '140px' },
]

const rowActions = [
  { label: 'Editar', icon: <FiEdit2 size={14} />, onClick: (row) => {} },
  { label: 'Eliminar', icon: <FiTrash2 size={14} />, onClick: (row) => {} },
]

const quickFilters = [
  { label: 'Activos', value: 'Activo' },
  { label: 'Inactivos', value: 'Inactivo' },
]

function CompanyUsuarios() {
  return (
    <>
      <PageHeader
        title="Usuarios"
        subtitle="Gestiona los usuarios de tu empresa"
        actions={<Button variant="primary"><FiPlus size={16} /> Invitar usuario</Button>}
      />
      <DataTable
        columns={columns}
        data={users}
        searchable
        searchPlaceholder="Buscar por nombre o correo..."
        filters={quickFilters}
        filterKey="status"
        rowActions={rowActions}
      />
    </>
  )
}

export default CompanyUsuarios
