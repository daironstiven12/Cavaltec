import { FiArrowLeft, FiArrowRight, FiSave } from 'react-icons/fi'
import ProgressBar from '../../components/common/ProgressBar'
import Badge from '../../components/common/Badge'
import './Cuestionario.css'

const currentQuestion = {
  number: 7,
  total: 54,
  category: 'Política de Datos',
  weight: '35%',
  text: '¿La empresa cuenta con una política de privacidad publicada y accesible para todos los titulares de datos?',
  help: 'La política de privacidad debe estar disponible en un formato claro y accesible. Debe incluir información sobre el responsable del tratamiento, finalidades, base legal, derechos ARCO y procedimiento para ejercerlos.',
}

function Cuestionario() {
  return (
    <div className="cuestionario-layout">
      <div className="cuestionario-main">
        <div className="cuestionario-header">
          <div className="cuestionario-meta">
            <span className="cuestionario-category">{currentQuestion.category}</span>
            <Badge>Peso {currentQuestion.weight}</Badge>
          </div>
          <span className="cuestionario-counter">Pregunta {currentQuestion.number} de {currentQuestion.total}</span>
        </div>

        <ProgressBar
          value={currentQuestion.number}
          max={currentQuestion.total}
          height="md"
          showValue
        />

        <div className="cuestionario-question">
          <p className="cuestionario-text">{currentQuestion.text}</p>
        </div>

        <div className="cuestionario-options">
          {['Sí', 'No', 'Parcialmente', 'No aplica'].map((opt) => (
            <label key={opt} className="cuestionario-option">
              <input type="radio" name="respuesta" className="cuestionario-radio" />
              <span className="cuestionario-radio-label">{opt}</span>
            </label>
          ))}
        </div>

        <div className="cuestionario-actions">
          <button className="btn btn-secondary">
            <FiArrowLeft size={16} /> Anterior
          </button>
          <div className="cuestionario-actions-right">
            <button className="btn btn-ghost">
              <FiSave size={16} /> Guardar borrador
            </button>
            <button className="btn btn-primary">
              Siguiente <FiArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <aside className="cuestionario-help">
        <div className="cuestionario-help-header">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a4 4 0 0 1 4 4c0 2-2 3-4 5-2-2-4-3-4-5a4 4 0 0 1 4-4z"/>
            <path d="M12 22s4-4 4-7a4 4 0 0 0-8 0c0 3 4 7 4 7z"/>
          </svg>
          Ayuda de IA
        </div>
        <p className="cuestionario-help-text">{currentQuestion.help}</p>
        <div className="cuestionario-help-footer">
          <Badge variant="accent">Sugerencia IA</Badge>
        </div>
      </aside>
    </div>
  )
}

export default Cuestionario
