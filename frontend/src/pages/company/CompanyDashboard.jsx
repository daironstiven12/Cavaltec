import { useState, useRef, useEffect } from 'react'
import { FiFileText, FiTrendingUp, FiAlertTriangle, FiCheckCircle, FiClock, FiCpu, FiSend, FiLoader } from 'react-icons/fi'
import StatCard from '../../components/common/StatCard'
import GaugeCard from '../../components/common/GaugeCard'
import SectionCard from '../../components/common/SectionCard'
import Badge from '../../components/common/Badge'
import SkeletonCard from '../../components/common/Skeleton'
import Breadcrumbs from '../../components/common/Breadcrumbs'
import { useAuth } from '../../services/auth'
import { dashboardAPI, aiAPI } from '../../services/api'
import './CompanyDashboard.css'

function CompanyDashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [aiMessages, setAiMessages] = useState([])
  const [aiInput, setAiInput] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [conversationId, setConversationId] = useState(null)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [aiMessages])

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const companyId = user?.company_id
        if (companyId) {
          const res = await dashboardAPI.getCompanyStats(companyId)
          setStats(res.data)
        }
      } catch {
        // Use fallback
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [user?.company_id])

  const companyName = user?.company?.business_name || 'tu empresa'

  const statCards = [
    { icon: <FiFileText size={22} />, value: stats?.total_evaluations || '12', label: 'Evaluaciones realizadas', trend: stats?.evaluations_trend || 4 },
    { icon: <FiTrendingUp size={22} />, value: `${stats?.average_compliance || 76}%`, label: 'Cumplimiento general', trend: stats?.compliance_trend || 8, color: 'var(--color-success)' },
    { icon: <FiCheckCircle size={22} />, value: stats?.pending_evaluations || '3', label: 'Evaluaciones pendientes', trend: 0, color: 'var(--color-accent)' },
    { icon: <FiAlertTriangle size={22} />, value: stats?.total_breaches || '7', label: 'Brechas detectadas', trend: stats?.breaches_trend || -2, color: 'var(--color-error)' },
  ]

  const recentActivity = stats?.recent_activity || [
    { event: 'Evaluación de cumplimiento completada', score: '82%', time: 'Hace 2 días' },
    { event: 'Reporte de brechas generado', score: '—', time: 'Hace 5 días' },
    { event: 'Nueva evaluación iniciada', score: '—', time: 'Hace 7 días' },
    { event: 'Recomendaciones de IA recibidas', score: '—', time: 'Hace 8 días' },
  ]

  const pendingItems = stats?.pending_tasks || [
    { task: 'Completar evaluación de seguridad', deadline: 'En 2 días', badge: 'warning' },
    { task: 'Revisar recomendaciones IA', deadline: 'En 5 días', badge: 'accent' },
    { task: 'Actualizar política de privacidad', deadline: 'En 7 días', badge: 'default' },
  ]

  const categories = stats?.categories || [
    { label: 'Política de Datos', value: 82 },
    { label: 'Privacidad desde el Diseño', value: 71 },
    { label: 'Gobernanza', value: 68 },
    { label: 'Seguridad', value: 85 },
  ]

  const handleAiSend = async (message = aiInput) => {
    if (!message.trim() || aiLoading) return

    const userMessage = { role: 'user', content: message.trim() }
    setAiMessages(prev => [...prev, userMessage])
    setAiInput('')
    setAiLoading(true)

    try {
      const response = await aiAPI.chat({
        message: message.trim(),
        conversation_id: conversationId,
      })

      setAiMessages(prev => [...prev, {
        role: 'assistant',
        content: response.data.response,
      }])
      setConversationId(response.data.conversation_id)
    } catch {
      setAiMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Error al conectar con el asistente. Intenta de nuevo.',
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

  if (loading) {
    return (
      <>
        <Breadcrumbs />
        <div className="company-dashboard-stats">
          {[1, 2, 3, 4].map(i => <SkeletonCard key={i} />)}
        </div>
      </>
    )
  }

  return (
    <>
      <Breadcrumbs />
      <div className="company-dashboard-stats">
        {statCards.map((s, i) => (
          <StatCard key={i} icon={s.icon} value={s.value} label={s.label} trend={s.trend} color={s.color} />
        ))}
      </div>

      <div className="company-widgets-row">
        <SectionCard title="Evolución del cumplimiento" className="company-evolution">
          <div className="company-evolution-content">
            {[
              { label: 'Última evaluación', value: `${stats?.average_compliance || 76}%` },
              { label: 'Anterior', value: `${(stats?.average_compliance || 76) - 5}%` },
              { label: 'Hace 6 meses', value: `${(stats?.average_compliance || 76) - 11}%` },
              { label: 'Hace 12 meses', value: `${(stats?.average_compliance || 76) - 18}%` },
            ].map((e, i) => (
              <div key={i} className="company-evo-item">
                <div className="company-evo-value" style={{ color: i === 0 ? 'var(--color-success)' : 'var(--color-text-primary)' }}>{e.value}</div>
                <div className="company-evo-label">{e.label}</div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Pendientes" className="company-pending">
          <div className="company-pending-list">
            {pendingItems.map((p, i) => (
              <div key={i} className="company-pending-item">
                <FiClock size={14} className="company-pending-icon" />
                <div className="company-pending-body">
                  <span className="company-pending-text">{p.task}</span>
                  <span className="company-pending-deadline">{p.deadline}</span>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="company-dashboard-grid">
        <SectionCard title={`Cumplimiento de ${companyName}`}>
          <div className="company-compliance">
            <GaugeCard value={stats?.average_compliance || 76} label="Nivel de cumplimiento" size="lg" />
            <div className="company-compliance-bars">
              {categories.map((item) => (
                <div key={item.label} className="company-bar">
                  <div className="company-bar-header">
                    <span>{item.label}</span>
                    <span className="company-bar-value">{item.value}%</span>
                  </div>
                  <div className="company-bar-track">
                    <div className="company-bar-fill" style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Actividad reciente">
          <div className="company-activity">
            {recentActivity.map((a, i) => (
              <div key={i} className="company-activity-item">
                <div className="company-activity-dot" />
                <div className="company-activity-body">
                  <p className="company-activity-text">{a.event}</p>
                  <span className="company-activity-time">{a.time}</span>
                </div>
                {a.score !== '—' && <Badge variant="success">{a.score}</Badge>}
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Asistente IA">
        <div className="company-ai-chat">
          <div className="company-ai-messages">
            {aiMessages.length === 0 ? (
              <div className="company-ai-empty">
                <FiCpu size={32} />
                <p>Pregunta sobre cumplimiento normativo, Ley 1581 o derechos ARCO</p>
              </div>
            ) : (
              aiMessages.map((msg, i) => (
                <div key={i} className={`company-ai-msg company-ai-msg--${msg.role}`}>
                  {msg.role === 'assistant' && (
                    <div className="company-ai-avatar">
                      <FiCpu size={14} />
                    </div>
                  )}
                  <div className={`company-ai-bubble ${msg.isError ? 'company-ai-bubble--error' : ''}`}>
                    {msg.content}
                  </div>
                </div>
              ))
            )}
            {aiLoading && (
              <div className="company-ai-msg company-ai-msg--assistant">
                <div className="company-ai-avatar">
                  <FiCpu size={14} />
                </div>
                <div className="company-ai-bubble company-ai-bubble--loading">
                  <div className="chat-typing">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="company-ai-input">
            <input
              type="text"
              placeholder="Pregúntale a la IA..."
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              onKeyDown={handleAiKeyPress}
              disabled={aiLoading}
            />
            <button onClick={() => handleAiSend()} disabled={aiLoading || !aiInput.trim()}>
              {aiLoading ? <FiLoader size={16} className="spin" /> : <FiSend size={16} />}
            </button>
          </div>
        </div>
      </SectionCard>
    </>
  )
}

export default CompanyDashboard
