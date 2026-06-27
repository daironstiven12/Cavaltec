import { FiMail, FiMapPin, FiPhone, FiGlobe, FiFileText } from 'react-icons/fi'
import PageHeader from '../../components/common/PageHeader'
import SectionCard from '../../components/common/SectionCard'
import InfoCard from '../../components/common/InfoCard'
import './MiEmpresa.css'

function MiEmpresa() {
  return (
    <>
      <PageHeader title="Mi empresa" subtitle="Información de tu empresa" />

      <div className="mi-empresa-summary">
        <InfoCard icon={<FiFileText size={20} />} label="NIT" value="901.123.456-7" />
        <InfoCard icon={<FiMapPin size={20} />} label="Ciudad" value="Bogotá, Colombia" />
        <InfoCard icon={<FiPhone size={20} />} label="Teléfono" value="+57 601 234 5678" />
        <InfoCard icon={<FiGlobe size={20} />} label="Sitio web" value="www.techcorp.com" />
      </div>

      <div className="mi-empresa-grid">
        <SectionCard title="Información general">
          <div className="mi-empresa-fields">
            <div className="mi-empresa-field">
              <span className="mi-empresa-field-label">Razón social</span>
              <span className="mi-empresa-field-value">TechCorp S.A.S.</span>
            </div>
            <div className="mi-empresa-field">
              <span className="mi-empresa-field-label">NIT</span>
              <span className="mi-empresa-field-value">901.123.456-7</span>
            </div>
            <div className="mi-empresa-field">
              <span className="mi-empresa-field-label">Dirección</span>
              <span className="mi-empresa-field-value">Carrera 15 # 88-64, Oficina 302</span>
            </div>
            <div className="mi-empresa-field">
              <span className="mi-empresa-field-label">Ciudad</span>
              <span className="mi-empresa-field-value">Bogotá, Colombia</span>
            </div>
            <div className="mi-empresa-field">
              <span className="mi-empresa-field-label">Teléfono</span>
              <span className="mi-empresa-field-value">+57 601 234 5678</span>
            </div>
            <div className="mi-empresa-field">
              <span className="mi-empresa-field-label">Correo</span>
              <span className="mi-empresa-field-value">contacto@techcorp.com</span>
            </div>
            <div className="mi-empresa-field">
              <span className="mi-empresa-field-label">Sitio web</span>
              <span className="mi-empresa-field-value">www.techcorp.com</span>
            </div>
            <div className="mi-empresa-field">
              <span className="mi-empresa-field-label">Sector</span>
              <span className="mi-empresa-field-value">Tecnología / SaaS</span>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Contacto principal">
          <div className="mi-empresa-contact">
            <div className="mi-empresa-avatar">JP</div>
            <div>
              <h3 className="mi-empresa-contact-name">Juan Pérez</h3>
              <div className="mi-empresa-contact-detail"><FiMail size={14} /> juan.perez@techcorp.com</div>
              <div className="mi-empresa-contact-detail"><FiPhone size={14} /> +57 300 123 4567</div>
            </div>
          </div>
        </SectionCard>
      </div>
    </>
  )
}

export default MiEmpresa
