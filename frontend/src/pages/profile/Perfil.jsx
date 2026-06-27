import { FiMail, FiBriefcase, FiShield, FiMapPin } from 'react-icons/fi'
import PageHeader from '../../components/common/PageHeader'
import SectionCard from '../../components/common/SectionCard'
import './Perfil.css'

function Perfil() {
  return (
    <>
      <PageHeader
        title="Perfil"
        subtitle="Información personal y de la cuenta"
      />

      <div className="perfil-grid">
        <SectionCard className="perfil-card-main">
          <div className="perfil-avatar-section">
            <div className="perfil-avatar">JP</div>
            <div>
              <h2 className="perfil-name">Juan Pérez</h2>
              <p className="perfil-role">Administrador de cumplimiento</p>
            </div>
          </div>

          <div className="perfil-details">
            <div className="perfil-field">
              <FiMail size={18} className="perfil-field-icon" />
              <div>
                <span className="perfil-field-label">Correo electrónico</span>
                <span className="perfil-field-value">juan.perez@techcorp.com</span>
              </div>
            </div>
            <div className="perfil-field">
              <FiBriefcase size={18} className="perfil-field-icon" />
              <div>
                <span className="perfil-field-label">Empresa</span>
                <span className="perfil-field-value">TechCorp S.A.S.</span>
              </div>
            </div>
            <div className="perfil-field">
              <FiShield size={18} className="perfil-field-icon" />
              <div>
                <span className="perfil-field-label">Rol</span>
                <span className="perfil-field-value">Administrador</span>
              </div>
            </div>
            <div className="perfil-field">
              <FiMapPin size={18} className="perfil-field-icon" />
              <div>
                <span className="perfil-field-label">Ubicación</span>
                <span className="perfil-field-value">Bogotá, Colombia</span>
              </div>
            </div>
          </div>
        </SectionCard>

        <div className="perfil-side">
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

          <SectionCard title="Seguridad">
            <div className="perfil-security">
              <div className="perfil-security-item">
                <span className="perfil-security-label">Autenticación de dos factores</span>
                <span className="perfil-security-value">Activado</span>
              </div>
              <div className="perfil-security-item">
                <span className="perfil-security-label">Último cambio de contraseña</span>
                <span className="perfil-security-value">Hace 30 días</span>
              </div>
              <div className="perfil-security-item">
                <span className="perfil-security-label">Sesiones activas</span>
                <span className="perfil-security-value">2</span>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </>
  )
}

export default Perfil
