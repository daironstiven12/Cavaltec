import { Link } from 'react-router-dom'
import { FiClock, FiFileText, FiLayers, FiCheckCircle } from 'react-icons/fi'
import PageHeader from '../../components/common/PageHeader'
import InfoCard from '../../components/common/InfoCard'
import SectionCard from '../../components/common/SectionCard'
import Badge from '../../components/common/Badge'
import './NuevaEvaluacion.css'

const categories = [
  { name: 'Política de Datos', questions: 18, weight: '35%' },
  { name: 'Privacidad desde el Diseño', questions: 14, weight: '30%' },
  { name: 'Gobernanza', questions: 12, weight: '25%' },
  { name: 'Seguridad de la Información', questions: 10, weight: '10%' },
]

function NuevaEvaluacion() {
  return (
    <>
      <PageHeader
        title="Nueva evaluación"
        subtitle="Configure los parámetros de la evaluación de cumplimiento"
      />

      <div className="evaluacion-summary">
        <InfoCard icon={<FiFileText size={20} />} label="Empresa" value="TechCorp S.A.S." />
        <InfoCard icon={<FiLayers size={20} />} label="Versión" value="v2.4.1" />
        <InfoCard icon={<FiCheckCircle size={20} />} label="Preguntas" value="54" />
        <InfoCard icon={<FiClock size={20} />} label="Tiempo estimado" value="45 min" />
      </div>

      <SectionCard title="Categorías de evaluación">
        <div className="categorias-list">
          {categories.map((cat) => (
            <div key={cat.name} className="categoria-item">
              <div className="categoria-info">
                <h3 className="categoria-name">{cat.name}</h3>
                <p className="categoria-detail">{cat.questions} preguntas · Peso {cat.weight}</p>
              </div>
              <Badge>{cat.weight}</Badge>
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="evaluacion-actions">
        <Link to="/cuestionario" className="btn btn-primary btn-lg">
          Comenzar evaluación
        </Link>
      </div>
    </>
  )
}

export default NuevaEvaluacion
