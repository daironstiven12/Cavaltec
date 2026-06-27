import { FiGlobe, FiSun, FiBell, FiShield, FiUser } from 'react-icons/fi'
import { useState } from 'react'
import PageHeader from '../../components/common/PageHeader'
import Tabs from '../../components/common/Tabs'
import './Configuracion.css'

function PerfilTab() {
  return (
    <div className="config-fields">
      {[
        { label: 'Nombre', value: 'Juan Pérez' },
        { label: 'Correo', value: 'juan.perez@techcorp.com', badge: 'Verificado' },
        { label: 'Teléfono', value: '+57 300 123 4567' },
        { label: 'Cargo', value: 'Oficial de Cumplimiento' },
        { label: 'Empresa', value: 'TechCorp S.A.S.' },
      ].map((f, i) => (
        <div key={i} className="config-field">
          <span className="config-field-label">{f.label}</span>
          <div className="config-field-right">
            <span className="config-field-value">{f.value}</span>
            {f.badge && <span className="config-field-badge">{f.badge}</span>}
          </div>
        </div>
      ))}
      <button className="config-edit-btn">Editar perfil</button>
    </div>
  )
}

function NotificacionesTab() {
  return (
    <div className="config-fields config-fields--toggles">
      {[
        { label: 'Notificaciones por correo', desc: 'Recibe alertas importantes en tu correo', value: true },
        { label: 'Recordatorios de evaluación', desc: 'Te avisamos cuando una evaluación está por vencer', value: true },
        { label: 'Informes semanales', desc: 'Resumen semanal de actividad', value: false },
        { label: 'Alertas de brechas', desc: 'Notificación inmediata de nuevas brechas detectadas', value: true },
        { label: 'Novedades del producto', desc: 'Actualizaciones y nuevas funcionalidades', value: false },
      ].map((n, i) => (
        <div key={i} className="config-toggle">
          <div className="config-toggle-body">
            <span className="config-field-label">{n.label}</span>
            <span className="config-toggle-desc">{n.desc}</span>
          </div>
          <div className={`config-toggle-switch ${n.value ? 'config-toggle-switch--on' : ''}`}>
            <div className="config-toggle-knob" />
          </div>
        </div>
      ))}
    </div>
  )
}

function AparienciaTab() {
  return (
    <div className="config-fields">
      {[
        { label: 'Tema', value: 'Claro', type: 'select', options: ['Claro', 'Oscuro'] },
        { label: 'Modo compacto', value: 'No', type: 'select', options: ['Sí', 'No'] },
        { label: 'Tamaño de fuente', value: 'Mediano', type: 'select', options: ['Pequeño', 'Mediano', 'Grande'] },
      ].map((a, i) => (
        <div key={i} className="config-field">
          <span className="config-field-label">{a.label}</span>
          <div className="config-field-right">
            <select className="config-select" defaultValue={a.value}>
              {a.options.map((o) => (<option key={o} value={o}>{o}</option>))}
            </select>
          </div>
        </div>
      ))}
    </div>
  )
}

function SeguridadTab() {
  return (
    <div className="config-fields">
      {[
        { label: 'Autenticación de dos factores', value: 'Activado', badge: 'Recomendado' },
        { label: 'Cambiar contraseña', value: 'Último cambio: 01/06/2026', action: 'Cambiar' },
        { label: 'Sesiones activas', value: '2 dispositivos', action: 'Cerrar todas' },
        { label: 'Dispositivos confiables', value: '3 dispositivos' },
      ].map((s, i) => (
        <div key={i} className="config-field">
          <span className="config-field-label">{s.label}</span>
          <div className="config-field-right">
            <span className="config-field-value">{s.value}</span>
            {s.badge && <span className="config-field-badge config-field-badge--success">{s.badge}</span>}
            {s.action && <button className="config-action-btn">{s.action}</button>}
          </div>
        </div>
      ))}
    </div>
  )
}

function Configuracion() {
  const [activeTab, setActiveTab] = useState('perfil')

  const tabs = [
    { id: 'perfil', label: 'Perfil', icon: <FiUser size={16} />, content: <PerfilTab /> },
    { id: 'notificaciones', label: 'Notificaciones', icon: <FiBell size={16} />, content: <NotificacionesTab /> },
    { id: 'apariencia', label: 'Apariencia', icon: <FiSun size={16} />, content: <AparienciaTab /> },
    { id: 'seguridad', label: 'Seguridad', icon: <FiShield size={16} />, content: <SeguridadTab /> },
  ]

  return (
    <>
      <PageHeader
        title="Configuración"
        subtitle="Personaliza tu experiencia en la plataforma"
      />

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
    </>
  )
}

export default Configuracion
