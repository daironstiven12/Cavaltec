import { FiFileText, FiTrendingUp, FiCheckCircle, FiBarChart2, FiAlertTriangle, FiClock } from 'react-icons/fi'
import StatCard from '../../components/common/StatCard'
import GaugeCard from '../../components/common/GaugeCard'
import SectionCard from '../../components/common/SectionCard'
import Badge from '../../components/common/Badge'
import './AuditorDashboard.css'

const stats = [
  { icon: <FiFileText size={22} />, value: '48', label: 'Evaluaciones auditadas', trend: 5 },
  { icon: <FiTrendingUp size={22} />, value: '72%', label: 'Cumplimiento promedio', trend: 6, color: 'var(--color-success)' },
  { icon: <FiCheckCircle size={22} />, value: '24', label: 'Empresas auditadas', trend: 2, color: 'var(--color-accent)' },
  { icon: <FiBarChart2 size={22} />, value: '15', label: 'Reportes emitidos', trend: 4, color: 'var(--color-accent)' },
]

const latestAudits = [
  { company: 'TechCorp S.A.S.', score: '76%', date: '15/06/2026', status: 'Completada' },
  { company: 'DataSmart Ltda.', score: '68%', date: '10/06/2026', status: 'Completada' },
  { company: 'CloudSecure S.A.', score: '82%', date: '05/06/2026', status: 'Completada' },
  { company: 'GreenData Corp.', score: '71%', date: '28/05/2026', status: 'En proceso' },
]

const complianceByCompany = [
  { company: 'TechCorp S.A.S.', compliance: 82, color: 'var(--color-success)' },
  { company: 'CloudSecure S.A.', compliance: 77, color: 'var(--color-success)' },
  { company: 'GreenData Corp.', compliance: 71, color: 'var(--color-warning)' },
  { company: 'DataSmart Ltda.', compliance: 68, color: 'var(--color-warning)' },
  { company: 'InnovaTech S.A.S.', compliance: 54, color: 'var(--color-error)' },
]

const pendingAudits = [
  { company: 'GreenData Corp.', due: '28/06/2026', type: 'Completa' },
  { company: 'DataSmart Ltda.', due: '05/07/2026', type: 'Seguimiento' },
  { company: 'InnovaTech S.A.S.', due: '12/07/2026', type: 'Completa' },
]

function AuditorDashboard() {
  return (
    <>
      <div className="auditor-stats">
        {stats.map((s, i) => (
          <StatCard key={i} icon={s.icon} value={s.value} label={s.label} trend={s.trend} color={s.color} />
        ))}
      </div>

      <div className="auditor-widgets-row">
        <SectionCard title="Cumplimiento por empresa" className="auditor-company-chart">
          <div className="auditor-company-list">
            {complianceByCompany.map((c, i) => (
              <div key={i} className="auditor-company-bar-row">
                <span className="auditor-company-label">{c.company}</span>
                <div className="auditor-company-bar-wrapper">
                  <div className="auditor-company-bar" style={{ width: `${c.compliance}%`, background: c.color }}>
                    <span className="auditor-company-bar-text">{c.compliance}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Auditorías pendientes" className="auditor-pending-card">
          <div className="auditor-pending-list">
            {pendingAudits.map((a, i) => (
              <div key={i} className="auditor-pending-item">
                <div className="auditor-pending-dot" />
                <div className="auditor-pending-body">
                  <span className="auditor-pending-company">{a.company}</span>
                  <span className="auditor-pending-meta">
                    <FiClock size={12} /> {a.due} · {a.type}
                  </span>
                </div>
                <Badge variant="accent">Programada</Badge>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="auditor-grid">
        <SectionCard title="Resumen global de cumplimiento">
          <div className="auditor-compliance">
            <GaugeCard value={72} label="Cumplimiento promedio general" size="lg" />
            <div className="auditor-bars">
              {[
                { label: 'Política de Datos', value: 78 },
                { label: 'Privacidad desde el Diseño', value: 69 },
                { label: 'Gobernanza', value: 65 },
                { label: 'Seguridad', value: 80 },
              ].map((item) => (
                <div key={item.label} className="auditor-bar">
                  <div className="auditor-bar-header">
                    <span>{item.label}</span>
                    <span className="auditor-bar-value">{item.value}%</span>
                  </div>
                  <div className="auditor-bar-track">
                    <div className="auditor-bar-fill" style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Últimas auditorías">
          <div className="auditor-list">
            {latestAudits.map((a, i) => (
              <div key={i} className="auditor-item">
                <div className="auditor-item-dot" />
                <div className="auditor-item-body">
                  <div className="auditor-item-header">
                    <span className="auditor-item-company">{a.company}</span>
                    <span className="auditor-item-date">{a.date}</span>
                  </div>
                  <div className="auditor-item-meta">
                    <span className="auditor-item-score">{a.score}</span>
                    <Badge variant={a.status === 'Completada' ? 'success' : 'accent'}>{a.status}</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </>
  )
}

export default AuditorDashboard
