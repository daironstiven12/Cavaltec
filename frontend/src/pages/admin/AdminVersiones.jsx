import { FiPlus, FiRotateCcw, FiArchive } from 'react-icons/fi'
import PageHeader from '../../components/common/PageHeader'
import DataTable from '../../components/common/DataTable'
import Badge from '../../components/common/Badge'
import Button from '../../components/common/Button'

const versiones = [
  { version: 'v2.4.1', date: '01/06/2026', changes: 'Actualización de preguntas de Gobernanza', status: 'Actual' },
  { version: 'v2.4.0', date: '15/05/2026', changes: 'Nuevo módulo de Seguridad', status: 'Anterior' },
  { version: 'v2.3.2', date: '30/04/2026', changes: 'Correcciones menores', status: 'Anterior' },
  { version: 'v2.3.0', date: '01/04/2026', changes: 'Reestructuración de categorías', status: 'Anterior' },
]

const columns = [
  { label: 'Versión', key: 'version', width: '100px' },
  { label: 'Fecha', key: 'date', width: '120px' },
  { label: 'Cambios', key: 'changes' },
  {
    label: 'Estado',
    key: 'status',
    width: '100px',
    render: (row) => (
      <Badge variant={row.status === 'Actual' ? 'success' : 'default'}>{row.status}</Badge>
    ),
  },
]

const rowActions = [
  { label: 'Restaurar', icon: <FiRotateCcw size={14} />, onClick: (row) => {} },
  { label: 'Archivar', icon: <FiArchive size={14} />, onClick: (row) => {} },
]

function AdminVersiones() {
  return (
    <>
      <PageHeader
        title="Versiones"
        subtitle="Historial de versiones de cuestionarios"
        actions={<Button variant="primary"><FiPlus size={16} /> Nueva versión</Button>}
      />
      <DataTable
        columns={columns}
        data={versiones}
        searchable
        searchPlaceholder="Buscar versión..."
        rowActions={rowActions}
      />
    </>
  )
}

export default AdminVersiones
