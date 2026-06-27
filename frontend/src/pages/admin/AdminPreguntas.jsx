import { FiPlus } from 'react-icons/fi'
import PageHeader from '../../components/common/PageHeader'
import SectionCard from '../../components/common/SectionCard'
import Badge from '../../components/common/Badge'
import Button from '../../components/common/Button'
import './AdminPreguntas.css'

const preguntas = [
  { text: '¿La empresa cuenta con una política de privacidad publicada?', category: 'Política de Datos', weight: 'Alta', status: 'Activa' },
  { text: '¿Se realiza evaluación de impacto a la privacidad?', category: 'Privacidad desde el Diseño', weight: 'Alta', status: 'Activa' },
  { text: '¿Existe un comité de privacidad formal?', category: 'Gobernanza', weight: 'Media', status: 'Activa' },
  { text: '¿Los datos sensibles cuentan con cifrado?', category: 'Seguridad', weight: 'Alta', status: 'Activa' },
  { text: '¿Se realizan auditorías de acceso periódicas?', category: 'Seguridad', weight: 'Media', status: 'Inactiva' },
]

function AdminPreguntas() {
  return (
    <>
      <PageHeader
        title="Preguntas"
        subtitle="Banco de preguntas para cuestionarios"
        actions={<Button variant="primary"><FiPlus size={16} /> Nueva pregunta</Button>}
      />
      <div className="preguntas-list">
        {preguntas.map((p, i) => (
          <SectionCard key={i}>
            <div className="pregunta-item">
              <div className="pregunta-header">
                <Badge variant={p.status === 'Activa' ? 'success' : 'default'}>{p.status}</Badge>
                <Badge>{p.category}</Badge>
              </div>
              <p className="pregunta-text">{p.text}</p>
              <span className="pregunta-weight">Peso: {p.weight}</span>
            </div>
          </SectionCard>
        ))}
      </div>
    </>
  )
}

export default AdminPreguntas
