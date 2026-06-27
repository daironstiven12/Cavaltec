import { FiDownload, FiCheckCircle, FiAlertTriangle, FiThumbsUp, FiTarget, FiArrowRight, FiFileText, FiTrendingUp, FiInfo } from 'react-icons/fi'
import PageHeader from '../../components/common/PageHeader'
import GaugeCard from '../../components/common/GaugeCard'
import SectionCard from '../../components/common/SectionCard'
import Badge from '../../components/common/Badge'
import Button from '../../components/common/Button'
import './Resultados.css'

const brechas = [
  { area: 'Política de Datos', severity: 'Media', desc: 'La política de privacidad no incluye todos los derechos ARBO exigidos por la normativa vigente.' },
  { area: 'Privacidad desde el Diseño', severity: 'Alta', desc: 'No se implementan controles de privacidad en la fase de diseño de nuevos productos o servicios.' },
  { area: 'Gobernanza', severity: 'Alta', desc: 'No existe un comité de privacidad formal ni reuniones periódicas de seguimiento.' },
]

const fortalezas = [
  'Procedimientos de notificación de brechas establecidos y operativos.',
  'Personal capacitado en protección de datos personales.',
  'Sistema de gestión de consentimientos implementado correctamente.',
]

const recomendaciones = [
  'Establecer un comité de privacidad con reuniones mensuales y reportes directos a la dirección.',
  'Implementar controles de privacidad en el ciclo de vida de desarrollo de productos (PbD).',
  'Actualizar la política de privacidad para incluir todos los derechos ARBO y el procedimiento para ejercerlos.',
  'Realizar una auditoría externa de cumplimiento antes del próximo ciclo de evaluación.',
]

const categoryScores = [
  { label: 'Política de Datos', value: 82, trend: '+5%' },
  { label: 'Privacidad desde el Diseño', value: 71, trend: '+3%' },
  { label: 'Gobernanza', value: 68, trend: '+8%' },
  { label: 'Seguridad', value: 85, trend: '+2%' },
]

function Resultados() {
  return (
    <>
      <PageHeader
        title="Resultados de evaluación"
        subtitle="TechCorp S.A.S. · Evaluación v2.4.1 · 15 de junio, 2026"
        actions={
          <Button variant="secondary">
            <FiDownload size={16} /> Exportar reporte
          </Button>
        }
      />

      <div className="resultados-executive">
        <SectionCard className="resultados-exec-card">
          <div className="resultados-exec-header">
            <FiFileText size={18} />
            <span>Resumen ejecutivo</span>
          </div>
          <p className="resultados-exec-text">
            TechCorp S.A.S. ha completado la evaluación de cumplimiento v2.4.1 con un puntaje general del <strong>76%</strong>, 
            lo que representa una mejora del <strong>8%</strong> respecto a la evaluación anterior. La categoría de Seguridad 
            (85%) es la más fuerte, mientras que Gobernanza (68%) requiere atención prioritaria. Se identificaron 
            <strong> 3 brechas</strong> y <strong>3 fortalezas</strong>, con <strong>4 recomendaciones</strong> para el plan de acción.
          </p>
        </SectionCard>
      </div>

      <div className="resultados-summary">
        <SectionCard className="resultados-gauge">
          <div className="gauge-wrapper">
            <GaugeCard value={76} label="Cumplimiento general" size="lg" subtitle="Nivel" />
          </div>
        </SectionCard>

        <div className="resultados-metrics">
          <SectionCard>
            <div className="metric-card">
              <div className="metric-icon metric-icon--warning">
                <FiAlertTriangle size={22} />
              </div>
              <div className="metric-body">
                <span className="metric-value">Medio</span>
                <span className="metric-label">Nivel de riesgo</span>
              </div>
            </div>
          </SectionCard>
          <SectionCard>
            <div className="metric-card">
              <div className="metric-icon metric-icon--success">
                <FiCheckCircle size={22} />
              </div>
              <div className="metric-body">
                <span className="metric-value">3</span>
                <span className="metric-label">Fortalezas identificadas</span>
              </div>
            </div>
          </SectionCard>
          <SectionCard>
            <div className="metric-card">
              <div className="metric-icon metric-icon--danger">
                <FiAlertTriangle size={22} />
              </div>
              <div className="metric-body">
                <span className="metric-value">3</span>
                <span className="metric-label">Brechas detectadas</span>
              </div>
            </div>
          </SectionCard>
          <SectionCard>
            <div className="metric-card">
              <div className="metric-icon metric-icon--accent">
                <FiTarget size={22} />
              </div>
              <div className="metric-body">
                <span className="metric-value">4</span>
                <span className="metric-label">Recomendaciones</span>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>

      <div className="resultados-trends">
        <SectionCard title="Puntaje por categoría">
          <div className="resultados-category-grid">
            {categoryScores.map((c, i) => (
              <div key={i} className="resultados-category-item">
                <div className="resultados-category-header">
                  <span className="resultados-category-label">{c.label}</span>
                  <span className="resultados-category-trend" style={{ color: c.trend.startsWith('+') ? 'var(--color-success)' : 'var(--color-error)' }}>{c.trend}</span>
                </div>
                <div className="resultados-category-value">{c.value}%</div>
                <div className="resultados-category-track">
                  <div className="resultados-category-fill" style={{ width: `${c.value}%`, background: c.value >= 75 ? 'var(--color-success)' : c.value >= 60 ? 'var(--color-warning)' : 'var(--color-error)' }} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="resultados-grid">
        <SectionCard title="Brechas detectadas">
          <div className="brechas-list">
            {brechas.map((b, i) => (
              <div key={i} className="brecha-item">
                <div className="brecha-header">
                  <span className="brecha-area">{b.area}</span>
                  <Badge variant={b.severity === 'Alta' ? 'warning' : 'default'}>{b.severity}</Badge>
                </div>
                <p className="brecha-desc">{b.desc}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <div className="resultados-side">
          <SectionCard title="Fortalezas">
            <div className="fortalezas-list">
              {fortalezas.map((f, i) => (
                <div key={i} className="fortaleza-item">
                  <FiThumbsUp size={16} className="fortaleza-icon" />
                  <p className="fortaleza-text">{f}</p>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Plan de acción">
            <div className="plan-list">
              {recomendaciones.slice(0, 2).map((r, i) => (
                <div key={i} className="plan-item">
                  <div className="plan-step">{i + 1}</div>
                  <p className="plan-text">{r}</p>
                </div>
              ))}
              <button className="plan-view-all">
                Ver plan completo <FiArrowRight size={14} />
              </button>
            </div>
          </SectionCard>
        </div>
      </div>

      <SectionCard title="Recomendaciones detalladas">
        <div className="recomendaciones-list">
          {recomendaciones.map((r, i) => (
            <div key={i} className="recomendacion-item">
              <div className="recomendacion-number">{i + 1}</div>
              <div>
                <p className="recomendacion-text">{r}</p>
                <span className="recomendacion-priority">
                  Prioridad: {i < 2 ? 'Alta' : 'Media'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </>
  )
}

export default Resultados
