import { FiFileText, FiTrendingUp, FiUsers, FiAlertTriangle, FiClock, FiCheckCircle, FiBarChart2 } from 'react-icons/fi'
import StatCard from '../../components/common/StatCard'
import GaugeCard from '../../components/common/GaugeCard'
import SectionCard from '../../components/common/SectionCard'
import Badge from '../../components/common/Badge'
import './Dashboard.css'

const stats = [
  { icon: <FiFileText size={22} />, value: '128', label: 'Evaluaciones realizadas', trend: 12 },
  { icon: <FiTrendingUp size={22} />, value: '76%', label: 'Cumplimiento promedio', trend: 8, color: 'var(--color-success)' },
  { icon: <FiUsers size={22} />, value: '24', label: 'Empresas registradas', trend: 3, color: 'var(--color-accent)' },
  { icon: <FiAlertTriangle size={22} />, value: '43', label: 'Brechas detectadas', trend: -5, color: 'var(--color-error)' },
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

const evaluationsByCompany = [
  { company: 'TechCorp', count: 15, change: '+3' },
  { company: 'CloudSecure', count: 12, change: '+2' },
  { company: 'GreenData', count: 10, change: '+1' },
  { company: 'DataSmart', count: 8, change: '+2' },
  { company: 'InnovaTech', count: 4, change: '0' },
]

function Dashboard() {
  return (
    <>
      <div className="dashboard-stats">
        {stats.map((s, i) => (
          <StatCard key={i} icon={s.icon} value={s.value} label={s.label} trend={s.trend} color={s.color} />
        ))}
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
            <GaugeCard value={76} label="Nivel de cumplimiento general" size="lg" />
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
