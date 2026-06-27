import { FiSend, FiCpu, FiClock, FiMessageSquare, FiStar, FiZap, FiInfo, FiCheckCircle, FiTarget, FiArrowRight } from 'react-icons/fi'
import PageHeader from '../../components/common/PageHeader'
import SectionCard from '../../components/common/SectionCard'
import Badge from '../../components/common/Badge'
import './PanelIA.css'

const quickPrompts = [
  '¿Qué dice la Ley 1581 sobre el consentimiento?',
  'Recomendaciones para mejorar cumplimiento',
  'Analizar brechas de seguridad',
  'Generar plan de acción prioritario',
  'Explicar derechos ARCO',
]

const chatHistory = [
  { type: 'user', text: '¿Qué dice la Ley 1581 sobre el consentimiento del titular?' },
  {
    type: 'ai',
    text: 'La Ley 1581 de 2012 establece que el consentimiento del titular debe ser expreso, informado y previo al tratamiento de datos personales. El responsable debe obtener una autorización clara e inequívoca, informando al titular sobre:',
    items: [
      'El tratamiento al que serán sometidos sus datos',
      'La finalidad del tratamiento',
      'Los derechos que le asisten como titular (ARCO)',
      'La identidad y datos de contacto del responsable',
    ],
  },
  { type: 'user', text: '¿Qué recomendaciones tienes para mejorar nuestro nivel de cumplimiento?' },
  {
    type: 'ai',
    text: 'Basado en los resultados de tu última evaluación (76% de cumplimiento), estas son mis recomendaciones prioritarias:',
    recommendations: [
      { text: 'Implementar un comité de privacidad formal', priority: 'Alta', category: 'Gobernanza' },
      { text: 'Actualizar la política de tratamiento de datos', priority: 'Alta', category: 'Política de Datos' },
      { text: 'Establecer controles de privacidad en el diseño de productos', priority: 'Media', category: 'Privacidad' },
    ],
  },
]

function PanelIA() {
  return (
    <>
      <PageHeader
        title="Panel IA"
        subtitle="Asistente inteligente para cumplimiento normativo"
      />

      <div className="panel-ia-layout">
        <div className="panel-ia-sidebar">
          <SectionCard title="Modelo activo">
            <div className="panel-ia-model">
              <div className="panel-ia-model-icon">
                <FiZap size={20} />
              </div>
              <div className="panel-ia-model-body">
                <span className="panel-ia-model-name">CAVALTEC AI v2.4</span>
                <span className="panel-ia-model-status">
                  <span className="panel-ia-model-dot" />
                  En línea
                </span>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Conversaciones fijadas">
            <div className="panel-ia-pinned">
              {[
                { title: 'Análisis de brechas Q2', date: '15/06/2026' },
                { title: 'Plan de acción priorizado', date: '10/06/2026' },
                { title: 'Consulta Ley 1581 completa', date: '05/06/2026' },
              ].map((p, i) => (
                <button key={i} className="panel-ia-pinned-item">
                  <FiStar size={14} className="panel-ia-pinned-icon" />
                  <div className="panel-ia-pinned-body">
                    <span className="panel-ia-pinned-title">{p.title}</span>
                    <span className="panel-ia-pinned-date">{p.date}</span>
                  </div>
                </button>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Historial">
            <div className="panel-ia-history-list">
              {[
                'Consulta sobre Ley 1581',
                'Análisis de brechas',
                'Recomendaciones generales',
                'Plan de acción Q3',
                'Derechos ARCO explicación',
              ].map((h, i) => (
                <button key={i} className="panel-ia-history-item">
                  <FiClock size={14} />
                  {h}
                </button>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Prompts rápidos">
            <div className="panel-ia-prompts">
              {quickPrompts.map((p, i) => (
                <button key={i} className="panel-ia-prompt">
                  <FiMessageSquare size={14} />
                  {p}
                </button>
              ))}
            </div>
          </SectionCard>
        </div>

        <div className="panel-ia-chat">
          <SectionCard className="panel-ia-messages">
            <div className="chat-messages">
              {chatHistory.map((msg, i) => (
                <div key={i}>
                  {msg.type === 'user' && (
                    <div className="chat-message chat-message--user">
                      <div className="chat-bubble chat-bubble--user">
                        <p>{msg.text}</p>
                      </div>
                    </div>
                  )}
                  {msg.type === 'ai' && (
                    <div className="chat-message chat-message--ai">
                      <div className="chat-avatar-ai">
                        <FiCpu size={18} />
                      </div>
                      <div className="chat-bubble chat-bubble--ai">
                        <p>{msg.text}</p>
                        {msg.items && (
                          <ul className="chat-list">
                            {msg.items.map((item, j) => (
                              <li key={j}>{item}</li>
                            ))}
                          </ul>
                        )}
                        {msg.recommendations && (
                          <div className="chat-recs">
                            {msg.recommendations.map((r, j) => (
                              <div key={j} className="chat-rec-item">
                                <div className="chat-rec-header">
                                  <Badge variant={r.priority === 'Alta' ? 'warning' : 'default'}>{r.priority}</Badge>
                                  <span className="chat-rec-category">{r.category}</span>
                                </div>
                                <p className="chat-rec-text">{r.text}</p>
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="chat-bubble-footer">
                          <Badge variant="accent">Analizado por IA</Badge>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </SectionCard>

          <div className="panel-ia-suggestions">
            <span className="panel-ia-suggestions-title">Preguntas sugeridas:</span>
            {[
              '¿Cómo implementar PbD en mi organización?',
              'Explicar el procedimiento para notificar brechas',
              '¿Qué sanciones establece la Ley 1581?',
            ].map((s, i) => (
              <button key={i} className="panel-ia-suggestion-chip">
                {s}
              </button>
            ))}
          </div>

          <div className="panel-ia-input">
            <input type="text" className="panel-ia-input-field" placeholder="Escribe tu consulta sobre cumplimiento normativo..." readOnly />
            <button className="panel-ia-input-btn" aria-label="Enviar mensaje">
              <FiSend size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default PanelIA
