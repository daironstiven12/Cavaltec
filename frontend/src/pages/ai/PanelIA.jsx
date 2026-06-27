import { useState, useEffect, useRef } from 'react'
import { FiSend, FiCpu, FiClock, FiMessageSquare, FiStar, FiZap, FiTrash2, FiLoader } from 'react-icons/fi'
import PageHeader from '../../components/common/PageHeader'
import SectionCard from '../../components/common/SectionCard'
import Badge from '../../components/common/Badge'
import { aiAPI } from '../../services/api'
import './PanelIA.css'

const quickPrompts = [
  '¿Qué dice la Ley 1581 sobre el consentimiento?',
  'Recomendaciones para mejorar cumplimiento',
  'Analizar brechas de seguridad',
  'Generar plan de acción prioritario',
  'Explicar derechos ARCO',
]

const suggestions = [
  '¿Cómo implementar PbD en mi organización?',
  'Explicar el procedimiento para notificar brechas',
  '¿Qué sanciones establece la Ley 1581?',
]

function PanelIA() {
  const [conversations, setConversations] = useState([])
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [activeConversation, setActiveConversation] = useState(null)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    loadConversations()
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const loadConversations = async () => {
    try {
      const response = await aiAPI.getConversations()
      const data = response.data
      setConversations(data?.value || data || [])
    } catch (error) {
      console.error('Error loading conversations:', error)
    }
  }

  const handleSend = async (message = inputValue) => {
    if (!message.trim() || loading) return

    const userMessage = { role: 'user', content: message.trim() }
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setLoading(true)

    try {
      const response = await aiAPI.chat({
        message: message.trim(),
        conversation_id: activeConversation,
      })

      const aiMessage = {
        role: 'assistant',
        content: response.data.response,
        model: response.data.model,
        tokens_used: response.data.tokens_used,
      }
      setMessages(prev => [...prev, aiMessage])
      setActiveConversation(response.data.conversation_id)
      loadConversations()
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage = {
        role: 'assistant',
        content: 'Lo siento, hubo un error al procesar tu consulta. Por favor, intenta de nuevo.',
        isError: true,
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleQuickPrompt = (prompt) => {
    handleSend(prompt)
  }

  const handleSuggestion = (suggestion) => {
    handleSend(suggestion)
  }

  const handleNewChat = () => {
    setMessages([])
    setActiveConversation(null)
  }

  const handleDeleteConversation = async (id, e) => {
    e.stopPropagation()
    try {
      await aiAPI.deleteConversation(id)
      if (activeConversation === id) {
        setMessages([])
        setActiveConversation(null)
      }
      loadConversations()
    } catch (error) {
      console.error('Error deleting conversation:', error)
    }
  }

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
                <span className="panel-ia-model-name">CAVALTEC AI</span>
                <span className="panel-ia-model-status">
                  <span className="panel-ia-model-dot" />
                  En línea
                </span>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Nueva conversación">
            <button className="panel-ia-new-chat" onClick={handleNewChat}>
              <FiMessageSquare size={16} />
              Nueva conversación
            </button>
          </SectionCard>

          <SectionCard title="Historial">
            <div className="panel-ia-history-list">
              {conversations.length === 0 ? (
                <span className="panel-ia-empty">Sin conversaciones</span>
              ) : (
                conversations.map((conv) => (
                  <div
                    key={conv.id}
                    className={`panel-ia-history-item ${activeConversation === conv.id ? 'panel-ia-history-item--active' : ''}`}
                  >
                    <button
                      className="panel-ia-history-btn"
                      onClick={() => {
                        setActiveConversation(conv.id)
                        setMessages([
                          { role: 'user', content: conv.prompt },
                          { role: 'assistant', content: conv.response },
                        ])
                      }}
                    >
                      <FiClock size={14} />
                      <span className="panel-ia-history-text">
                        {conv.prompt.substring(0, 40)}...
                      </span>
                    </button>
                    <button
                      className="panel-ia-history-delete"
                      onClick={(e) => handleDeleteConversation(conv.id, e)}
                      title="Eliminar conversación"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </SectionCard>

          <SectionCard title="Prompts rápidos">
            <div className="panel-ia-prompts">
              {quickPrompts.map((p, i) => (
                <button
                  key={i}
                  className="panel-ia-prompt"
                  onClick={() => handleQuickPrompt(p)}
                  disabled={loading}
                >
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
              {messages.length === 0 ? (
                <div className="chat-empty">
                  <FiCpu size={48} className="chat-empty-icon" />
                  <h3>CAVALTEC AI</h3>
                  <p>Asistente experto en cumplimiento normativo de protección de datos</p>
                  <p className="chat-empty-hint">
                    Haz una pregunta sobre Ley 1581, derechos ARCO, privacidad o seguridad
                  </p>
                </div>
              ) : (
                messages.map((msg, i) => {
                  if (msg.role === 'user') {
                    return (
                      <div key={i}>
                        <div className="chat-message chat-message--user">
                          <div className="chat-bubble chat-bubble--user">
                            <p>{msg.content}</p>
                          </div>
                        </div>
                      </div>
                    )
                  }

                  if (msg.role === 'assistant') {
                    return (
                      <div key={i}>
                        <div className="chat-message chat-message--ai">
                          <div className="chat-avatar-ai">
                            <FiCpu size={18} />
                          </div>
                          <div className={`chat-bubble chat-bubble--ai ${msg.isError ? 'chat-bubble--error' : ''}`}>
                            <p>{msg.content}</p>
                            {msg.model && (
                              <div className="chat-bubble-footer">
                                <Badge variant="accent">Analizado por IA</Badge>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  }

                  return null
                })
              )}
              {loading && (
                <div className="chat-message chat-message--ai">
                  <div className="chat-avatar-ai">
                    <FiCpu size={18} />
                  </div>
                  <div className="chat-bubble chat-bubble--ai chat-bubble--loading">
                    <div className="chat-typing">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </SectionCard>

          <div className="panel-ia-suggestions">
            <span className="panel-ia-suggestions-title">Sugerencias:</span>
            {suggestions.map((s, i) => (
              <button
                key={i}
                className="panel-ia-suggestion-chip"
                onClick={() => handleSuggestion(s)}
                disabled={loading}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="panel-ia-input">
            <input
              type="text"
              className="panel-ia-input-field"
              placeholder="Escribe tu consulta sobre cumplimiento normativo..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
            />
            <button
              className="panel-ia-input-btn"
              onClick={() => handleSend()}
              disabled={loading || !inputValue.trim()}
              aria-label="Enviar mensaje"
            >
              {loading ? <FiLoader size={18} className="spin" /> : <FiSend size={18} />}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default PanelIA
