import { FiEye, FiDownload } from 'react-icons/fi'
import PageHeader from '../../components/common/PageHeader'
import DataTable from '../../components/common/DataTable'
import Badge from '../../components/common/Badge'
import Button from '../../components/common/Button'

const columns = [
  { label: 'Fecha', key: 'fecha', width: '120px' },
  { label: 'Empresa', key: 'empresa' },
  { label: 'Versión', key: 'version', width: '100px' },
  {
    label: 'Cumplimiento',
    key: 'cumplimiento',
    width: '140px',
    render: (row) => (
      <div className="historial-score">
        <div className="historial-score-bar">
          <div className="historial-score-fill" style={{ width: `${row.cumplimiento}%` }} />
        </div>
        <span>{row.cumplimiento}%</span>
      </div>
    ),
  },
  {
    label: 'Estado',
    key: 'estado',
    width: '120px',
    render: (row) => (
      <Badge variant={row.estado === 'Completada' ? 'success' : row.estado === 'En progreso' ? 'accent' : 'default'}>
        {row.estado}
      </Badge>
    ),
  },
]

const data = [
  { fecha: '15/06/2026', empresa: 'TechCorp S.A.S.', version: 'v2.4.1', cumplimiento: 76, estado: 'Completada' },
  { fecha: '10/06/2026', empresa: 'DataSmart Ltda.', version: 'v2.4.0', cumplimiento: 68, estado: 'Completada' },
  { fecha: '05/06/2026', empresa: 'CloudSecure S.A.', version: 'v2.4.0', cumplimiento: 82, estado: 'Completada' },
  { fecha: '28/05/2026', empresa: 'InnovaTech S.A.S.', version: 'v2.3.2', cumplimiento: 54, estado: 'Completada' },
  { fecha: '20/05/2026', empresa: 'GreenData Corp.', version: 'v2.3.2', cumplimiento: 71, estado: 'En progreso' },
  { fecha: '15/05/2026', empresa: 'TechCorp S.A.S.', version: 'v2.3.1', cumplimiento: 65, estado: 'Completada' },
  { fecha: '08/05/2026', empresa: 'DataSmart Ltda.', version: 'v2.3.0', cumplimiento: 59, estado: 'Borrador' },
  { fecha: '01/05/2026', empresa: 'CloudSecure S.A.', version: 'v2.3.0', cumplimiento: 77, estado: 'Completada' },
  { fecha: '25/04/2026', empresa: 'InnovaTech S.A.S.', version: 'v2.2.0', cumplimiento: 61, estado: 'Completada' },
  { fecha: '18/04/2026', empresa: 'GreenData Corp.', version: 'v2.2.0', cumplimiento: 70, estado: 'Borrador' },
  { fecha: '10/04/2026', empresa: 'TechCorp S.A.S.', version: 'v2.2.0', cumplimiento: 72, estado: 'Completada' },
  { fecha: '01/04/2026', empresa: 'DataSmart Ltda.', version: 'v2.1.0', cumplimiento: 55, estado: 'Completada' },
]

const rowActions = [
  { label: 'Ver detalle', icon: <FiEye size={14} />, onClick: (row) => {} },
  { label: 'Descargar', icon: <FiDownload size={14} />, onClick: (row) => {} },
]

const quickFilters = [
  { label: 'Completadas', value: 'Completada' },
  { label: 'En progreso', value: 'En progreso' },
  { label: 'Borrador', value: 'Borrador' },
]

function Historial() {
  return (
    <>
      <PageHeader
        title="Historial de evaluaciones"
        subtitle="Consulte todas las evaluaciones realizadas"
        actions={<Button variant="primary">Nueva evaluación</Button>}
      />
      <DataTable
        columns={columns}
        data={data}
        searchable
        searchPlaceholder="Buscar por empresa, versión..."
        filters={quickFilters}
        filterKey="estado"
        rowActions={rowActions}
      />
    </>
  )
}

export default Historial
