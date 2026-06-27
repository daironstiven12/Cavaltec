import { useState, useEffect } from 'react'
import { FiFileText, FiTrendingUp, FiUsers, FiAlertTriangle, FiClock, FiCheckCircle, FiBarChart2 } from 'react-icons/fi'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts'
import StatCard from '../../components/common/StatCard'
import GaugeCard from '../../components/common/GaugeCard'
import SectionCard from '../../components/common/SectionCard'
import Badge from '../../components/common/Badge'
import Breadcrumbs from '../../components/common/Breadcrumbs'
import { dashboardAPI } from '../../services/api'
import './Dashboard.css'

const complianceTrend = [
  { month: 'Ene', value: 62 },
  { month: 'Feb', value: 65 },
  { month: 'Mar', value: 68 },
  { month: 'Abr', value: 71 },
  { month: 'May', value: 73 },
  { month: 'Jun', value: 76 },
  { month: 'Jul', value: 79 },
]

const evaluationsByCompany = [
  { company: 'TechCorp', count: 15, change: '+3' },
  { company: 'CloudSecure', count: 12, change: '+2' },
  { company: 'GreenData', count: 10, change: '+1' },
  { company: 'DataSmart', count: 8, change: '+2' },
  { company: 'InnovaTech', count: 4, change: '0' },
]

const recentActivity = [
  { company: 'TechCorp S.A.S.', event: 'Evaluación completada', score: '82%', time: 'Hace 15 min' },
  { company: 'DataSmart Ltda.', event: 'Nueva evaluación iniciada', score: '—', time: 'Hace 1 h' },
  { company: 'CloudSecure S.A.', event: 'Reporte generado', score: '—', time: 'Hace 2 h' },
  { company: 'InnovaTech S.A.S.', event: 'Evaluación completada', score: '67%', time: 'Hace 3 h' },
  { company: 'GreenData Corp.', event: 'Empresa registrada', score: '—', time: 'Hace 5 h' },
]

const recommendations = [
  { text: 'Actualizar política de retención de datos', priority: 'Alta', category: 'Política de Datos' },
  { text: 'Implementar consentimiento granular en formularios', priority: 'Alta', category: 'Privacidad' },
  { text: 'Revisar acuerdos de procesamiento con terceros', priority: 'Media', category: 'Gobernanza' },
  { text: 'Realizar auditoría de acceso a datos sensibles', priority: 'Media', category: 'Seguridad' },
]

const pendingTasks = [
  { task: 'Completar evaluación de DataSmart', due: 'Hoy', priority: 'Alta' },
  { task: 'Revisar reportes pendientes', due: 'Mañana', priority: 'Media' },
  { task: 'Actualizar cuestionario v2.5.0', due: 'En 3 días', priority: 'Media' },
  { task: 'Auditar cumplimiento de GreenData', due: 'En 5 días', priority: 'Baja' },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <p className="chart-tooltip-label">{label}</p>
        <p className="chart-tooltip-value">{payload[0].value}%</p>
      </div>
    )
  }
  return null
}

function Dashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await dashboardAPI.getAdminStats()
        setStats(response.data)
      } catch {
        // Use fallback data
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  const statCards = [
    { icon: <FiFileText size={22} />, value: stats?.total_evaluations || '128', label: 'Evaluaciones realizadas', trend: 12 },
    { icon: <FiTrendingUp size={22} />, value: `${stats?.average_compliance || 76}%`, label: 'Cumplimiento promedio', trend: 8, color: 'var(--color-success)' },
    { icon: <FiUsers size={22} />, value: stats?.total_companies || '24', label: 'Empresas registradas', trend: 3, color: 'var(--color-accent)' },
    { icon: <FiAlertTriangle size={22} />, value: stats?.total_breaches || '43', label: 'Brechas detectadas', trend: -5, color: 'var(--color-error)' },
  ]

  return (
    <>
      <Breadcrumbs />

      <div className="dashboard-stats">
        {statCards.map((s, i) => (
          <StatCard key={i} icon={s.icon} value={s.value} label={s.label} trend={s.trend} color={s.color} />
        ))}
      </div>

      <div className="dashboard-chart-section">
        <SectionCard title="Evolución del cumplimiento">
          <div className="dashboard-chart-container">
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={complianceTrend} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCompliance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-light)" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--color-text-tertiary)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: 'var(--color-text-tertiary)' }} axisLine={false} tickLine={false} domain={[50, 100]} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="value" stroke="var(--color-accent)" strokeWidth={2.5} fill="url(#colorCompliance)" dot={{ r: 4, fill: 'var(--color-accent)', strokeWidth: 2, stroke: 'var(--color-bg)' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      <div className="dashboard-widgets">
        <div className="dashboard-widget">
          <SectionCard title="Tareas pendientes" className="widget-card widget-tasks">
            <div className="tasks-list">
              {pendingTasks.map((t, i) => (
                <div key={i} className="task-item">
                  <div className="task-check">
                    <FiCheckCircle size={16} className="task-check-icon" />
                  </div>
                  <div className="task-body">
                    <span className="task-text">{t.task}</span>
                    <span className="task-meta">
                      <FiClock size={12} /> {t.due}
                    </span>
                  </div>
                  <Badge variant={t.priority === 'Alta' ? 'warning' : t.priority === 'Media' ? 'accent' : 'default'}>{t.priority}</Badge>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        <div className="dashboard-widget">
          <SectionCard title="Evaluaciones por empresa" className="widget-card widget-evals">
            <div className="evals-chart">
              {evaluationsByCompany.map((e, i) => (
                <div key={i} className="eval-bar-row">
                  <span className="eval-bar-label">{e.company}</span>
                  <div className="eval-bar-wrapper">
                    <div className="eval-bar" style={{ width: `${(e.count / 15) * 100}%` }}>
                      <span className="eval-bar-text">{e.count}</span>
                    </div>
                  </div>
                  <span className="eval-bar-change" style={{ color: e.change.startsWith('+') ? 'var(--color-success)' : 'var(--color-text-tertiary)' }}>{e.change}</span>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>

      <div className="dashboard-grid">
        <SectionCard title="Cumplimiento general" className="dashboard-compliance">
          <div className="compliance-content">
            <GaugeCard value={stats?.average_compliance || 76} label="Nivel de cumplimiento general" size="lg" subtitle="General" />
            <div className="compliance-breakdown">
              <h4 className="compliance-breakdown-title">Por categoría</h4>
              {[
                { label: 'Política de Datos', value: 82 },
                { label: 'Privacidad desde el Diseño', value: 71 },
                { label: 'Gobernanza', value: 68 },
                { label: 'Seguridad', value: 85 },
              ].map((item) => (
                <div key={item.label} className="compliance-category">
                  <div className="compliance-category-header">
                    <span className="compliance-category-label">{item.label}</span>
                    <span className="compliance-category-value">{item.value}%</span>
                  </div>
                  <div className="compliance-category-bar">
                    <div className="compliance-category-fill" style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>

        <div className="dashboard-side">
          <SectionCard title="Actividad reciente">
            <div className="activity-list">
              {recentActivity.map((a, i) => (
                <div key={i} className="activity-item">
                  <div className="activity-dot" />
                  <div className="activity-body">
                    <div className="activity-header">
                      <span className="activity-company">{a.company}</span>
                      <span className="activity-time">{a.time}</span>
                    </div>
                    <div className="activity-event">
                      {a.event}
                      {a.score !== '—' && <span className="activity-score">{a.score}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Recomendaciones IA">
            <div className="rec-list">
              {recommendations.map((r, i) => (
                <div key={i} className="rec-item">
                  <div className="rec-header">
                    <Badge variant={r.priority === 'Alta' ? 'warning' : 'default'}>{r.priority}</Badge>
                    <span className="rec-category">{r.category}</span>
                  </div>
                  <p className="rec-text">{r.text}</p>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>

      <SectionCard title="Panel de IA" className="dashboard-ai">
        <div className="ai-panel">
          <div className="ai-panel-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a4 4 0 0 1 4 4c0 2-2 3-4 5-2-2-4-3-4-5a4 4 0 0 1 4-4z"/>
              <path d="M12 22s4-4 4-7a4 4 0 0 0-8 0c0 3 4 7 4 7z"/>
            </svg>
          </div>
          <div className="ai-panel-content">
            <p className="ai-panel-text">
              Basado en los resultados de las últimas evaluaciones, se detectó una tendencia de mejora del 12% en la categoría de Gobernanza. Se recomienda priorizar las acciones correctivas en Privacidad desde el Diseño para equilibrar el cumplimiento general.
            </p>
          </div>
          <Badge variant="accent">Analizado por IA</Badge>
        </div>
      </SectionCard>
    </>
  )
}

export default Dashboard
