import PageHeader from '../../components/common/PageHeader'
import DataTable from '../../components/common/DataTable'
import Badge from '../../components/common/Badge'

const logs = [
  { user: 'Juan Pérez', action: 'Inicio de sesión', detail: 'Desde IP 192.168.1.1', date: 'Hoy 8:30 AM' },
  { user: 'María García', action: 'Evaluación creada', detail: 'TechCorp S.A.S. - v2.4.1', date: 'Hoy 9:15 AM' },
  { user: 'Carlos López', action: 'Reporte descargado', detail: 'Informe de cumplimiento - CloudSecure', date: 'Ayer 4:20 PM' },
  { user: 'Ana Martínez', action: 'Usuario invitado', detail: 'pedro@innovatech.co', date: 'Ayer 2:10 PM' },
  { user: 'Admin', action: 'Cuestionario actualizado', detail: 'v2.4.1 publicado', date: 'Ayer 11:00 AM' },
  { user: 'Juan Pérez', action: 'Perfil actualizado', detail: 'Cambio de contraseña', date: '15/06/2026' },
  { user: 'María García', action: 'Evaluación completada', detail: 'TechCorp S.A.S. - 82%', date: '15/06/2026' },
  { user: 'Carlos López', action: 'Evaluación iniciada', detail: 'DataSmart Ltda. - v2.4.0', date: '14/06/2026' },
]

const columns = [
  { label: 'Usuario', key: 'user', width: '140px' },
  { label: 'Acción', key: 'action', width: '160px' },
  { label: 'Detalle', key: 'detail' },
  { label: 'Fecha', key: 'date', width: '150px' },
]

function AdminAuditoria() {
  return (
    <>
      <PageHeader title="Auditoría" subtitle="Registro de actividad de la plataforma" />
      <DataTable
        columns={columns}
        data={logs}
        searchable
        searchPlaceholder="Buscar usuario o acción..."
      />
    </>
  )
}

export default AdminAuditoria
