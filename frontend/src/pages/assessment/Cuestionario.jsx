import { useState, useRef, useEffect } from 'react'
import { FiArrowLeft, FiArrowRight, FiSave, FiCpu, FiSend, FiLoader } from 'react-icons/fi'
import ProgressBar from '../../components/common/ProgressBar'
import Badge from '../../components/common/Badge'
import { aiAPI } from '../../services/api'
import './Cuestionario.css'

const questions = [
  {
    number: 1,
    total: 54,
    category: 'Política de Datos',
    weight: '35%',
    text: '¿La empresa cuenta con una política de privacidad publicada y accesible para todos los titulares de datos?',
    help: 'La política de privacidad debe estar disponible en un formato claro y accesible. Debe incluir información sobre el responsable del tratamiento, finalidades, base legal, derechos ARCO y procedimiento para ejercerlos.',
  },
  {
    number: 2,
    total: 54,
    category: 'Política de Datos',
    weight: '35%',
    text: '¿La política de privacidad incluye la identidad del responsable del tratamiento y sus datos de contacto?',
    help: 'El responsable del tratamiento debe ser claramente identificado con su razón social, NIT, dirección, teléfono y correo electrónico de contacto.',
  },
  {
    number: 3,
    total: 54,
    category: 'Privacidad desde el Diseño',
    weight: '30%',
    text: '¿Se realizan evaluaciones de impacto en la protección de datos antes de nuevos proyectos?',
    help: 'Las evaluaciones de impacto deben realizarse antes de implementar nuevos sistemas o procesamiento de datos personales.',
  },
]

function Cuestionario() {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [aiHelp, setAiHelp] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [aiMessages, setAiMessages] = useState([])
  const [aiInput, setAiInput] = useState('')
  const [conversationId, setConversationId] = useState(null)
  const messagesEndRef = useRef(null)

  const currentQuestion = questions[currentIdx]

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [aiMessages])

  const handleAiHelp = async () => {
    if (aiLoading) return
    setAiLoading(true)
    try {
      const response = await aiAPI.chat({
        message: `Explica esta pregunta de cumplimiento normativo: "${currentQuestion.text}". Contexto: ${currentQuestion.help}`,
        conversation_id: conversationId,
      })
      setAiHelp(response.data.response)
      setConversationId(response.data.conversation_id)
    } catch (error) {
      setAiHelp('No se pudo obtener ayuda de la IA en este momento.')
    } finally {
      setAiLoading(false)
    }
  }

  const handleAiSend = async (message = aiInput) => {
    if (!message.trim() || aiLoading) return

    const userMessage = { role: 'user', content: message.trim() }
    setAiMessages(prev => [...prev, userMessage])
    setAiInput('')
    setAiLoading(true)

    try {
      const response = await aiAPI.chat({
        message: `Sobre la pregunta actual de cumplimiento: "${currentQuestion.text}". ${message.trim()}`,
        conversation_id: conversationId,
      })

      const aiMessage = {
        role: 'assistant',
        content: response.data.response,
      }
      setAiMessages(prev => [...prev, aiMessage])
      setConversationId(response.data.conversation_id)
    } catch (error) {
      setAiMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Error al conectar con la IA.',
        isError: true,
      }])
    } finally {
      setAiLoading(false)
    }
  }

  const handleAiKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleAiSend()
    }
  }

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1)
      setSelectedOption(null)
      setAiHelp('')
      setAiMessages([])
    }
  }

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(prev => prev - 1)
      setSelectedOption(null)
      setAiHelp('')
      setAiMessages([])
    }
  }

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
              <input
                type="radio"
                name="respuesta"
                className="cuestionario-radio"
                checked={selectedOption === opt}
                onChange={() => setSelectedOption(opt)}
              />
              <span className="cuestionario-radio-label">{opt}</span>
            </label>
          ))}
        </div>

        <div className="cuestionario-actions">
          <button className="btn btn-secondary" onClick={handlePrev} disabled={currentIdx === 0}>
            <FiArrowLeft size={16} /> Anterior
          </button>
          <div className="cuestionario-actions-right">
            <button className="btn btn-ghost">
              <FiSave size={16} /> Guardar borrador
            </button>
            <button className="btn btn-primary" onClick={handleNext} disabled={currentIdx === questions.length - 1}>
              Siguiente <FiArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <aside className="cuestionario-help">
        <div className="cuestionario-help-header">
          <FiCpu size={18} />
          Ayuda de IA
        </div>

        <div className="cuestionario-help-content">
          {!aiHelp && aiMessages.length === 0 ? (
            <div className="cuestionario-help-text">
              <p>{currentQuestion.help}</p>
              <button
                className="cuestionario-help-btn"
                onClick={handleAiHelp}
                disabled={aiLoading}
              >
                {aiLoading ? <FiLoader size={14} className="spin" /> : <FiCpu size={14} />}
                Obtener explicación de IA
              </button>
            </div>
          ) : (
            <div className="cuestionario-ai-chat">
              {aiHelp && (
                <div className="cuestionario-ai-msg cuestionario-ai-msg--ai">
                  <div className="cuestionario-ai-avatar">
                    <FiCpu size={12} />
                  </div>
                  <div className="cuestionario-ai-bubble">{aiHelp}</div>
                </div>
              )}
              {aiMessages.map((msg, i) => (
                <div key={i} className={`cuestionario-ai-msg cuestionario-ai-msg--${msg.role === 'user' ? 'user' : 'ai'}`}>
                  {msg.role === 'assistant' && (
                    <div className="cuestionario-ai-avatar">
                      <FiCpu size={12} />
                    </div>
                  )}
                  <div className={`cuestionario-ai-bubble ${msg.isError ? 'cuestionario-ai-bubble--error' : ''}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {aiLoading && (
                <div className="cuestionario-ai-msg cuestionario-ai-msg--ai">
                  <div className="cuestionario-ai-avatar">
                    <FiCpu size={12} />
                  </div>
                  <div className="cuestionario-ai-bubble cuestionario-ai-bubble--loading">
                    <div className="chat-typing"><span></span><span></span><span></span></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <div className="cuestionario-help-input">
          <input
            type="text"
            placeholder="Pregunta sobre esta pregunta..."
            value={aiInput}
            onChange={(e) => setAiInput(e.target.value)}
            onKeyPress={handleAiKeyPress}
            disabled={aiLoading}
          />
          <button onClick={() => handleAiSend()} disabled={aiLoading || !aiInput.trim()}>
            {aiLoading ? <FiLoader size={14} className="spin" /> : <FiSend size={14} />}
          </button>
        </div>

        <div className="cuestionario-help-footer">
          <Badge variant="accent">Sugerencia IA</Badge>
        </div>
      </aside>
    </div>
  )
}

export default Cuestionario
