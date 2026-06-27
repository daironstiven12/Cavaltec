import { FiPlus, FiEdit2, FiLock, FiTrash2 } from 'react-icons/fi'
import PageHeader from '../../components/common/PageHeader'
import DataTable from '../../components/common/DataTable'
import Badge from '../../components/common/Badge'
import Button from '../../components/common/Button'

const users = [
  { name: 'Juan Pérez', email: 'juan.perez@techcorp.com', company: 'TechCorp S.A.S.', role: 'Admin Empresa', status: 'Activo', lastAccess: 'Hoy 8:30 AM', initials: 'JP' },
  { name: 'María García', email: 'maria.garcia@techcorp.com', company: 'TechCorp S.A.S.', role: 'Auditor', status: 'Activo', lastAccess: 'Hoy 9:15 AM', initials: 'MG' },
  { name: 'Carlos López', email: 'carlos.lopez@datasmart.co', company: 'DataSmart Ltda.', role: 'Admin Empresa', status: 'Activo', lastAccess: 'Ayer 4:20 PM', initials: 'CL' },
  { name: 'Ana Martínez', email: 'ana.martinez@cloudsecure.com', company: 'CloudSecure S.A.', role: 'Auditor', status: 'Activo', lastAccess: 'Ayer 2:10 PM', initials: 'AM' },
  { name: 'Pedro Ramírez', email: 'pedro@innovatech.co', company: 'InnovaTech S.A.S.', role: 'Admin Empresa', status: 'Inactivo', lastAccess: '15/06/2026', initials: 'PR' },
  { name: 'Laura Gómez', email: 'laura@greendata.com', company: 'GreenData Corp.', role: 'Auditor', status: 'Activo', lastAccess: '14/06/2026', initials: 'LG' },
  { name: 'Sofía Torres', email: 'sofia@techcorp.com', company: 'TechCorp S.A.S.', role: 'Editor', status: 'Activo', lastAccess: '14/06/2026', initials: 'ST' },
  { name: 'Diego Hernández', email: 'diego@cloudsecure.com', company: 'CloudSecure S.A.', role: 'Auditor', status: 'Inactivo', lastAccess: '10/06/2026', initials: 'DH' },
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
  { label: 'Empresa', key: 'company' },
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
  { label: 'Cambiar contraseña', icon: <FiLock size={14} />, onClick: (row) => {} },
  { label: 'Eliminar', icon: <FiTrash2 size={14} />, onClick: (row) => {} },
]

const quickFilters = [
  { label: 'Activos', value: 'Activo' },
  { label: 'Inactivos', value: 'Inactivo' },
]

function AdminUsuarios() {
  return (
    <>
      <PageHeader
        title="Usuarios"
        subtitle="Gestión de usuarios de la plataforma"
        actions={<Button variant="primary"><FiPlus size={16} /> Nuevo usuario</Button>}
      />
      <DataTable
        columns={columns}
        data={users}
        searchable
        searchPlaceholder="Buscar por nombre, correo o empresa..."
        filters={quickFilters}
        filterKey="status"
        rowActions={rowActions}
      />
    </>
  )
}

export default AdminUsuarios
