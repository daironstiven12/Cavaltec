import { FiFileText, FiTrendingUp, FiAlertTriangle, FiCheckCircle, FiClock, FiBarChart2 } from 'react-icons/fi'
import StatCard from '../../components/common/StatCard'
import GaugeCard from '../../components/common/GaugeCard'
import SectionCard from '../../components/common/SectionCard'
import Badge from '../../components/common/Badge'
import './CompanyDashboard.css'

const stats = [
  { icon: <FiFileText size={22} />, value: '12', label: 'Evaluaciones realizadas', trend: 4 },
  { icon: <FiTrendingUp size={22} />, value: '76%', label: 'Cumplimiento general', trend: 8, color: 'var(--color-success)' },
  { icon: <FiCheckCircle size={22} />, value: '3', label: 'Evaluaciones pendientes', trend: 0, color: 'var(--color-accent)' },
  { icon: <FiAlertTriangle size={22} />, value: '7', label: 'Brechas detectadas', trend: -2, color: 'var(--color-error)' },
]

const recentActivity = [
  { event: 'Evaluación de cumplimiento completada', score: '82%', time: 'Hace 2 días' },
  { event: 'Reporte de brechas generado', score: '—', time: 'Hace 5 días' },
  { event: 'Nueva evaluación iniciada', score: '—', time: 'Hace 7 días' },
  { event: 'Recomendaciones de IA recibidas', score: '—', time: 'Hace 8 días' },
]

const pendingItems = [
  { task: 'Completar evaluación de seguridad', deadline: 'En 2 días', badge: 'warning' },
  { task: 'Revisar recomendaciones IA', deadline: 'En 5 días', badge: 'accent' },
  { task: 'Actualizar política de privacidad', deadline: 'En 7 días', badge: 'default' },
]

const evolution = [
  { label: 'Última evaluación', value: '76%' },
  { label: 'Anterior', value: '71%' },
  { label: 'Hace 6 meses', value: '65%' },
  { label: 'Hace 12 meses', value: '58%' },
]

function CompanyDashboard() {
  return (
    <>
      <div className="company-dashboard-stats">
        {stats.map((s, i) => (
          <StatCard key={i} icon={s.icon} value={s.value} label={s.label} trend={s.trend} color={s.color} />
        ))}
      </div>

      <div className="company-widgets-row">
        <SectionCard title="Evolución del cumplimiento" className="company-evolution">
          <div className="company-evolution-content">
            {evolution.map((e, i) => (
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
        <SectionCard title="Resumen de cumplimiento">
          <div className="company-compliance">
            <GaugeCard value={76} label="Nivel de cumplimiento" size="lg" />
            <div className="company-compliance-bars">
              {[
                { label: 'Política de Datos', value: 82 },
                { label: 'Privacidad desde el Diseño', value: 71 },
                { label: 'Gobernanza', value: 68 },
              ].map((item) => (
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
        <div className="company-ai">
          <div className="company-ai-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a4 4 0 0 1 4 4c0 2-2 3-4 5-2-2-4-3-4-5a4 4 0 0 1 4-4z"/>
              <path d="M12 22s4-4 4-7a4 4 0 0 0-8 0c0 3 4 7 4 7z"/>
            </svg>
          </div>
          <p className="company-ai-text">
            Tu nivel de cumplimiento general es del 76%. La categoría con mayor oportunidad de mejora es Gobernanza (68%). Te recomendamos revisar las recomendaciones disponibles en el Asistente IA.
          </p>
          <Badge variant="accent">Analizado por IA</Badge>
        </div>
      </SectionCard>
    </>
  )
}

export default CompanyDashboard
