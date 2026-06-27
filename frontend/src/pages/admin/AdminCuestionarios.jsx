import { FiPlus, FiEdit2, FiCopy, FiArchive } from 'react-icons/fi'
import PageHeader from '../../components/common/PageHeader'
import DataTable from '../../components/common/DataTable'
import Badge from '../../components/common/Badge'
import Button from '../../components/common/Button'

const cuestionarios = [
  { name: 'Evaluación de cumplimiento general', version: 'v2.4.1', questions: 54, categories: 4, status: 'Activo' },
  { name: 'Evaluación rápida de privacidad', version: 'v2.3.0', questions: 24, categories: 2, status: 'Activo' },
  { name: 'Auditoría de seguridad de datos', version: 'v2.2.0', questions: 36, categories: 3, status: 'Borrador' },
  { name: 'Evaluación sector financiero', version: 'v1.0.0', questions: 48, categories: 4, status: 'Inactivo' },
]

const columns = [
  { label: 'Cuestionario', key: 'name' },
  { label: 'Versión', key: 'version', width: '100px' },
  { label: 'Preguntas', key: 'questions', width: '100px' },
  { label: 'Categorías', key: 'categories', width: '100px' },
  {
    label: 'Estado',
    key: 'status',
    width: '100px',
    render: (row) => (
      <Badge variant={row.status === 'Activo' ? 'success' : row.status === 'Borrador' ? 'accent' : 'default'}>{row.status}</Badge>
    ),
  },
]

function AdminCuestionarios() {
  const notify = (msg) => window.dispatchEvent(new CustomEvent('toast', { detail: { type: 'info', message: msg } }))

  const rowActions = [
    { label: 'Editar', icon: <FiEdit2 size={14} />, onClick: (row) => notify(`Editando cuestionario "${row.name}"...`) },
    { label: 'Duplicar', icon: <FiCopy size={14} />, onClick: (row) => notify(`Duplicando cuestionario "${row.name}"...`) },
    { label: 'Archivar', icon: <FiArchive size={14} />, onClick: (row) => notify(`Archivando cuestionario "${row.name}"...`) },
  ]

  return (
    <>
      <PageHeader
        title="Cuestionarios"
        subtitle="Administración de cuestionarios de evaluación"
        actions={<Button variant="primary" onClick={() => notify('Abriendo formulario de nuevo cuestionario...')}><FiPlus size={16} /> Nuevo cuestionario</Button>}
      />
      <DataTable
        columns={columns}
        data={cuestionarios}
        searchable
        searchPlaceholder="Buscar cuestionario..."
        rowActions={rowActions}
      />
    </>
  )
}

export default AdminCuestionarios
