import { FiGlobe, FiSun, FiBell, FiShield, FiUser } from 'react-icons/fi'
import { useState } from 'react'
import PageHeader from '../../components/common/PageHeader'
import Tabs from '../../components/common/Tabs'
import './Configuracion.css'

function PerfilTab() {
  const [editing, setEditing] = useState(false)
  const [fields, setFields] = useState({
    nombre: 'Juan Pérez',
    correo: 'juan.perez@techcorp.com',
    telefono: '+57 300 123 4567',
    cargo: 'Oficial de Cumplimiento',
    empresa: 'TechCorp S.A.S.',
  })

  const handleSave = () => {
    setEditing(false)
    window.dispatchEvent(new CustomEvent('toast', { detail: { type: 'success', message: 'Perfil actualizado correctamente' } }))
  }

  return (
    <div className="config-fields">
      {Object.entries(fields).map(([key, value]) => (
        <div key={key} className="config-field">
          <span className="config-field-label">{key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}</span>
          <div className="config-field-right">
            {editing ? (
              <input
                type="text"
                className="config-input"
                value={value}
                onChange={(e) => setFields(prev => ({ ...prev, [key]: e.target.value }))}
              />
            ) : (
              <span className="config-field-value">{value}</span>
            )}
            {key === 'correo' && <span className="config-field-badge">Verificado</span>}
          </div>
        </div>
      ))}
      {editing ? (
        <div className="config-btn-row">
          <button className="config-edit-btn" onClick={handleSave}>Guardar</button>
          <button className="config-cancel-btn" onClick={() => setEditing(false)}>Cancelar</button>
        </div>
      ) : (
        <button className="config-edit-btn" onClick={() => setEditing(true)}>Editar perfil</button>
      )}
    </div>
  )
}

function NotificacionesTab() {
  const [toggles, setToggles] = useState([
    { key: 'email', label: 'Notificaciones por correo', desc: 'Recibe alertas importantes en tu correo', value: true },
    { key: 'reminders', label: 'Recordatorios de evaluación', desc: 'Te avisamos cuando una evaluación está por vencer', value: true },
    { key: 'weekly', label: 'Informes semanales', desc: 'Resumen semanal de actividad', value: false },
    { key: 'breach', label: 'Alertas de brechas', desc: 'Notificación inmediata de nuevas brechas detectadas', value: true },
    { key: 'news', label: 'Novedades del producto', desc: 'Actualizaciones y nuevas funcionalidades', value: false },
  ])

  const toggle = (key) => {
    setToggles(prev => prev.map(t => t.key === key ? { ...t, value: !t.value } : t))
    window.dispatchEvent(new CustomEvent('toast', { detail: { type: 'success', message: 'Preferencia actualizada' } }))
  }

  return (
    <div className="config-fields config-fields--toggles">
      {toggles.map((n) => (
        <div key={n.key} className="config-toggle">
          <div className="config-toggle-body">
            <span className="config-field-label">{n.label}</span>
            <span className="config-toggle-desc">{n.desc}</span>
          </div>
          <button
            className={`config-toggle-switch ${n.value ? 'config-toggle-switch--on' : ''}`}
            onClick={() => toggle(n.key)}
            aria-label={n.label}
          >
            <div className="config-toggle-knob" />
          </button>
        </div>
      ))}
    </div>
  )
}

function AparienciaTab() {
  const [settings, setSettings] = useState({
    theme: 'Claro',
    compact: 'No',
    fontSize: 'Mediano',
  })

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }))
    window.dispatchEvent(new CustomEvent('toast', { detail: { type: 'success', message: 'Apariencia actualizada' } }))
  }

  return (
    <div className="config-fields">
      {[
        { key: 'theme', label: 'Tema', options: ['Claro', 'Oscuro'] },
        { key: 'compact', label: 'Modo compacto', options: ['Sí', 'No'] },
        { key: 'fontSize', label: 'Tamaño de fuente', options: ['Pequeño', 'Mediano', 'Grande'] },
      ].map((a) => (
        <div key={a.key} className="config-field">
          <span className="config-field-label">{a.label}</span>
          <div className="config-field-right">
            <select className="config-select" value={settings[a.key]} onChange={(e) => handleChange(a.key, e.target.value)}>
              {a.options.map((o) => (<option key={o} value={o}>{o}</option>))}
            </select>
          </div>
        </div>
      ))}
    </div>
  )
}

function SeguridadTab() {
  const handleChangePassword = () => {
    window.dispatchEvent(new CustomEvent('toast', { detail: { type: 'info', message: 'Se ha enviado un enlace de cambio de contraseña a tu correo' } }))
  }

  const handleLogoutAll = () => {
    window.dispatchEvent(new CustomEvent('toast', { detail: { type: 'success', message: 'Todas las sesiones han sido cerradas' } }))
  }

  return (
    <div className="config-fields">
      {[
        { label: 'Autenticación de dos factores', value: 'Activado', badge: 'Recomendado' },
        { label: 'Cambiar contraseña', value: 'Último cambio: 01/06/2026', action: 'Cambiar', onClick: handleChangePassword },
        { label: 'Sesiones activas', value: '2 dispositivos', action: 'Cerrar todas', onClick: handleLogoutAll },
        { label: 'Dispositivos confiables', value: '3 dispositivos' },
      ].map((s, i) => (
        <div key={i} className="config-field">
          <span className="config-field-label">{s.label}</span>
          <div className="config-field-right">
            <span className="config-field-value">{s.value}</span>
            {s.badge && <span className="config-field-badge config-field-badge--success">{s.badge}</span>}
            {s.action && <button className="config-action-btn" onClick={s.onClick}>{s.action}</button>}
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
