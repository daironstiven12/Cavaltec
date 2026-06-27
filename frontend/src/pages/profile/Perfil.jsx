import { useState } from 'react'
import { FiMail, FiBriefcase, FiShield, FiMapPin, FiEdit2, FiSave, FiX, FiEye, FiEyeOff } from 'react-icons/fi'
import { useAuth } from '../../services/auth'
import { useToast } from '../../contexts/ToastContext'
import PageHeader from '../../components/common/PageHeader'
import SectionCard from '../../components/common/SectionCard'
import Breadcrumbs from '../../components/common/Breadcrumbs'
import './Perfil.css'

function Perfil() {
  const { user } = useAuth()
  const toast = useToast()
  const [editing, setEditing] = useState(false)
  const [changingPassword, setChangingPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
  })
  const [passwordData, setPasswordData] = useState({
    current: '',
    new_password: '',
    confirm: '',
  })

  const initials = user
    ? `${user.first_name?.[0] || ''}${user.last_name?.[0] || ''}`.toUpperCase()
    : 'U'
  const fullName = user ? `${user.first_name} ${user.last_name}` : 'Usuario'
  const roleName = user?.role?.name || 'Sin rol'
  const companyName = user?.company?.business_name || 'Sin empresa'

  const handleSave = () => {
    setEditing(false)
    toast.success('Perfil actualizado correctamente')
  }

  const handlePasswordChange = () => {
    if (passwordData.new_password !== passwordData.confirm) {
      toast.error('Las contraseñas no coinciden')
      return
    }
    if (passwordData.new_password.length < 8) {
      toast.error('La contraseña debe tener al menos 8 caracteres')
      return
    }
    setChangingPassword(false)
    setPasswordData({ current: '', new_password: '', confirm: '' })
    toast.success('Contraseña actualizada correctamente')
  }

  return (
    <>
      <Breadcrumbs />
      <PageHeader
        title="Perfil"
        subtitle="Información personal y de la cuenta"
      />

      <div className="perfil-grid">
        <SectionCard className="perfil-card-main">
          <div className="perfil-avatar-section">
            <div className="perfil-avatar perfil-avatar--lg">{initials}</div>
            <div className="perfil-avatar-info">
              <h2 className="perfil-name">{fullName}</h2>
              <p className="perfil-role">{roleName}</p>
            </div>
            {!editing && (
              <button className="perfil-edit-btn" onClick={() => setEditing(true)} aria-label="Editar perfil">
                <FiEdit2 size={16} /> Editar
              </button>
            )}
          </div>

          {editing ? (
            <div className="perfil-edit-form">
              <div className="perfil-form-row">
                <label className="perfil-form-label">
                  Nombre
                  <input
                    type="text"
                    className="perfil-form-input"
                    value={formData.first_name}
                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                  />
                </label>
                <label className="perfil-form-label">
                  Apellido
                  <input
                    type="text"
                    className="perfil-form-input"
                    value={formData.last_name}
                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                  />
                </label>
              </div>
              <label className="perfil-form-label">
                Correo electrónico
                <input
                  type="email"
                  className="perfil-form-input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </label>
              <div className="perfil-form-actions">
                <button className="btn btn-secondary" onClick={() => setEditing(false)}>
                  <FiX size={14} /> Cancelar
                </button>
                <button className="btn btn-primary" onClick={handleSave}>
                  <FiSave size={14} /> Guardar
                </button>
              </div>
            </div>
          ) : (
            <div className="perfil-details">
              <div className="perfil-field">
                <FiMail size={18} className="perfil-field-icon" />
                <div>
                  <span className="perfil-field-label">Correo electrónico</span>
                  <span className="perfil-field-value">{user?.email || '—'}</span>
                </div>
              </div>
              <div className="perfil-field">
                <FiBriefcase size={18} className="perfil-field-icon" />
                <div>
                  <span className="perfil-field-label">Empresa</span>
                  <span className="perfil-field-value">{companyName}</span>
                </div>
              </div>
              <div className="perfil-field">
                <FiShield size={18} className="perfil-field-icon" />
                <div>
                  <span className="perfil-field-label">Rol</span>
                  <span className="perfil-field-value">{roleName}</span>
                </div>
              </div>
              <div className="perfil-field">
                <FiMapPin size={18} className="perfil-field-icon" />
                <div>
                  <span className="perfil-field-label">Ubicación</span>
                  <span className="perfil-field-value">Medellín, Colombia</span>
                </div>
              </div>
            </div>
          )}
        </SectionCard>

        <div className="perfil-side">
          <SectionCard title="Cambiar contraseña">
            {changingPassword ? (
              <div className="perfil-password-form">
                <label className="perfil-form-label">
                  Contraseña actual
                  <div className="perfil-password-field">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="perfil-form-input"
                      value={passwordData.current}
                      onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                    />
                    <button className="perfil-password-toggle" onClick={() => setShowPassword(!showPassword)} aria-label="Mostrar contraseña">
                      {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                    </button>
                  </div>
                </label>
                <label className="perfil-form-label">
                  Nueva contraseña
                  <input
                    type="password"
                    className="perfil-form-input"
                    value={passwordData.new_password}
                    onChange={(e) => setPasswordData({ ...passwordData, new_password: e.target.value })}
                  />
                </label>
                <label className="perfil-form-label">
                  Confirmar contraseña
                  <input
                    type="password"
                    className="perfil-form-input"
                    value={passwordData.confirm}
                    onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                  />
                </label>
                <div className="perfil-form-actions">
                  <button className="btn btn-secondary" onClick={() => setChangingPassword(false)}>
                    <FiX size={14} /> Cancelar
                  </button>
                  <button className="btn btn-primary" onClick={handlePasswordChange}>
                    <FiSave size={14} /> Actualizar
                  </button>
                </div>
              </div>
            ) : (
              <button className="btn btn-secondary w-full" onClick={() => setChangingPassword(true)}>
                Cambiar contraseña
              </button>
            )}
          </SectionCard>

          <SectionCard title="Seguridad">
            <div className="perfil-security">
              <div className="perfil-security-item">
                <span className="perfil-security-label">Autenticación de dos factores</span>
                <span className="perfil-security-badge perfil-security-badge--active">Activado</span>
              </div>
              <div className="perfil-security-item">
                <span className="perfil-security-label">Último cambio de contraseña</span>
                <span className="perfil-security-value">Hace 30 días</span>
              </div>
              <div className="perfil-security-item">
                <span className="perfil-security-label">Sesiones activas</span>
                <span className="perfil-security-value">1</span>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Actividad reciente">
            <div className="perfil-activity-list">
              {[
                { action: 'Inicio de sesión', time: 'Hoy 8:30 AM' },
                { action: 'Evaluación completada', time: 'Ayer 4:15 PM' },
                { action: 'Reporte descargado', time: 'Ayer 11:20 AM' },
                { action: 'Perfil actualizado', time: '15 jun 2026' },
              ].map((a, i) => (
                <div key={i} className="perfil-activity-item">
                  <div className="perfil-activity-dot" />
                  <div>
                    <p className="perfil-activity-action">{a.action}</p>
                    <p className="perfil-activity-time">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </>
  )
}

export default Perfil
