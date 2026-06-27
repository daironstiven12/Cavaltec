import { Link } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import SectionTitle from '../../components/common/SectionTitle'
import Card from '../../components/common/Card'
import dashboardPreview from '../../assets/dashboard-preview.svg'
import benefitAi from '../../assets/benefit-ai.svg'
import benefitReports from '../../assets/benefit-reports.svg'
import benefitCompliance from '../../assets/benefit-compliance.svg'
import './Landing.css'

// ============================================
// ICONOS
// ============================================
const Icons = {
  Shield: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  Zap: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  Eye: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  Lock: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  Users: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Brain: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4a4 4 0 0 1 3.5 6.1 4 4 0 0 1-7 0A4 4 0 0 1 12 4z"/>
      <path d="M12 10v8"/><path d="M9 16l6-2"/><path d="M15 16l-6-2"/>
    </svg>
  ),
  ArrowRight: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  Dot: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="10"/>
    </svg>
  ),
  Check: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  Gauge: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M12 12l-3-5"/><path d="M12 12l5 3"/><path d="M12 12v8"/>
    </svg>
  ),
  Document: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
  ),
  Step1: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4"/><path d="M12 18v4"/><path d="M4.93 4.93l2.83 2.83"/><path d="M16.24 16.24l2.83 2.83"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="M4.93 19.07l2.83-2.83"/><path d="M16.24 7.76l2.83-2.83"/>
    </svg>
  ),
  Step2: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
  ),
  Step3: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  ),
  Chat: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
}

// ============================================
// DATOS - ESTRUCTURADOS POR EL RETO
// ============================================

// Características de la solución
const features = [
  {
    icon: <Icons.Shield />,
    iconStyle: { background: 'var(--color-accent-subtle)', color: 'var(--color-accent)' },
    title: 'Autodiagnóstico Ley 1581',
    text: 'Cuestionario estructurado basado en la normativa colombiana de protección de datos, enfocado en la fase de diseño.'
  },
  {
    icon: <Icons.Brain />,
    iconStyle: { background: '#ecfdf5', color: '#10b981' },
    title: 'Asistente con IA',
    text: 'La IA traduce términos legales a lenguaje sencillo, orienta respuestas y genera recomendaciones personalizadas.'
  },
  {
    icon: <Icons.Gauge />,
    iconStyle: { background: '#fffbeb', color: '#f59e0b' },
    title: 'Resultados en tiempo real',
    text: 'Visualiza tu nivel de cumplimiento con un medidor tipo velocímetro, identifica brechas y recibe un plan de acción.'
  },
  {
    icon: <Icons.Lock />,
    iconStyle: { background: 'var(--color-accent-subtle)', color: 'var(--color-accent)' },
    title: 'Seguridad y privacidad',
    text: 'Cumplimos con OWASP Top 10, validación de entradas y cifrado de datos. Protegemos tu información empresarial.'
  },
  {
    icon: <Icons.Users />,
    iconStyle: { background: '#ecfdf5', color: '#10b981' },
    title: 'Multiempresa con roles',
    text: 'Administrador, evaluador y auditor. Cada empresa gestiona sus propias evaluaciones con control de acceso.'
  },
  {
    icon: <Icons.Document />,
    iconStyle: { background: '#fffbeb', color: '#f59e0b' },
    title: 'Reportes descargables',
    text: 'Exporta tus resultados en PDF con análisis detallados, gráficos y recomendaciones priorizadas para cerrar brechas.'
  }
]

// Pasos del flujo de diagnóstico
const steps = [
  {
    number: 1,
    icon: <Icons.Step1 />,
    title: 'Registro y autenticación',
    text: 'Crea tu cuenta con OAuth (Google o Microsoft) y configura el perfil de tu empresa en menos de 2 minutos.'
  },
  {
    number: 2,
    icon: <Icons.Step2 />,
    title: 'Cuestionario fase diseño',
    text: 'Responde preguntas estructuradas sobre política de datos, privacidad desde el diseño y gobernanza.'
  },
  {
    number: 3,
    icon: <Icons.Step3 />,
    title: 'Diagnóstico y recomendaciones',
    text: 'Obtén tu porcentaje de cumplimiento, identifica brechas y recibe un plan de acción con IA.'
  }
]

// Bloques del cuestionario
const questionBlocks = [
  {
    label: 'Política de datos personales',
    weight: '40%',
    questions: [
      '¿Cuenta con una política de tratamiento de datos personales?',
      '¿La política está documentada y publicada?',
      '¿Define las finalidades del tratamiento?',
      '¿Incluye los derechos de los titulares?',
      '¿Menciona cómo ejercer los derechos?'
    ]
  },
  {
    label: 'Privacidad desde el diseño',
    weight: '36%',
    questions: [
      '¿Incorpora evaluaciones de impacto (PIA)?',
      '¿Aplica técnicas de minimización de datos?',
      '¿Configura sistemas para recopilar el mínimo de datos por defecto?'
    ]
  },
  {
    label: 'Gobernanza',
    weight: '24%',
    questions: [
      '¿Cuenta con un sistema de administración de riesgos?',
      '¿Cuenta con un oficial de protección de datos?'
    ]
  }
]

// Beneficios / Resultados
const benefits = [
  {
    label: 'Diagnóstico automatizado',
    title: 'Nivel de cumplimiento al instante',
    text: 'El sistema calcula automáticamente tu porcentaje de cumplimiento basado en las respuestas positivas del cuestionario, con un medidor visual tipo gauge.',
    image: benefitAi,
    reverse: false
  },
  {
    label: 'Inteligencia Artificial',
    title: 'Recomendaciones personalizadas',
    text: 'La IA analiza tus respuestas, identifica brechas y genera un plan de acción priorizado con estrategias prácticas para cerrar cada brecha.',
    image: benefitReports,
    reverse: true
  },
  {
    label: 'Cumplimiento normativo',
    title: 'Alineación con Ley 1581',
    text: 'Todo el diagnóstico está basado en la normativa colombiana de protección de datos, asegurando que tu organización cumpla con los estándares legales.',
    image: benefitCompliance,
    reverse: false
  }
]

// ============================================
// COMPONENTE PRINCIPAL
// ============================================
function Landing() {
  return (
    <>
      <Navbar />
      <main>
        {/* ---------- HERO: EL RETO ---------- */}
        <section className="hero">
          <div className="hero-bg">
            <div className="hero-bg-glow" />
          </div>
          <div className="container">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              <span>Reto CAVALTEC 2026</span>
              <Icons.ArrowRight />
            </div>
            <h1 className="hero-title">
              Autodiagnóstico de<br />
              <span className="hero-title-accent">cumplimiento Ley 1581</span>
            </h1>
            <p className="hero-subtitle">
              Evalúa el nivel de cumplimiento de tu organización en la fase de diseño de protección de datos.
              Identifica brechas y recibe recomendaciones con IA para cerrarlas.
            </p>
            <div className="hero-actions">
              <Link to="/register" className="btn btn-primary btn-lg">
                Comenzar diagnóstico
              </Link>
              <a href="#how-it-works" className="btn btn-secondary btn-lg">
                Cómo funciona
              </a>
            </div>
          </div>
        </section>

        {/* ---------- CARACTERÍSTICAS: SOLUCIÓN ---------- */}
        <section id="features" className="section">
          <div className="container">
            <SectionTitle
              badge="Nuestra solución"
              title="Todo lo que necesitas para evaluar tu cumplimiento"
              subtitle="Una plataforma completa que combina regulación, IA y seguridad para un autodiagnóstico efectivo."
            />
            <div className="features-grid">
              {features.map((f, i) => (
                <Card key={i} padding="sm">
                  <div className="card-icon" style={f.iconStyle}>{f.icon}</div>
                  <h3 className="card-title">{f.title}</h3>
                  <p className="card-text">{f.text}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- CÓMO FUNCIONA: FLUJO ---------- */}
        <section id="how-it-works" className="section steps">
          <div className="container">
            <SectionTitle
              badge="Cómo funciona"
              title="Tres pasos para tu diagnóstico"
              subtitle="Regístrate, responde el cuestionario y obtén tu nivel de cumplimiento con recomendaciones."
            />
            <div className="steps-grid">
              {steps.map((s) => (
                <div className="step-card" key={s.number}>
                  <div className="step-icon">{s.icon}</div>
                  <div className="step-number">{s.number}</div>
                  <h3 className="step-title">{s.title}</h3>
                  <p className="step-text">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- CUESTIONARIO: FASE DISEÑO ---------- */}
        <section id="questionnaire" className="section">
          <div className="container">
            <SectionTitle
              badge="Fase de diseño"
              title="Estructura del cuestionario"
              subtitle="Evaluación basada en la Ley 1581 de 2012, enfocada en los tres pilares del cumplimiento."
            />
            <div className="questionnaire-grid">
              {questionBlocks.map((block, i) => (
                <div className="questionnaire-block" key={i}>
                  <div className="questionnaire-block-header">
                    <span className="questionnaire-block-label">{block.label}</span>
                    <span className="questionnaire-block-weight">Peso: {block.weight}</span>
                  </div>
                  <ul className="questionnaire-block-list">
                    {block.questions.map((q, j) => (
                      <li key={j} className="questionnaire-block-item">
                        <Icons.Check />
                        <span>{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="questionnaire-total">
              <span className="questionnaire-total-label">Total máximo alcanzable</span>
              <span className="questionnaire-total-value">100%</span>
            </div>
          </div>
        </section>

        {/* ---------- RESULTADOS: BENEFICIOS ---------- */}
        <section id="benefits" className="section">
          <div className="container">
            <SectionTitle
              badge="Resultados"
              title="Qué obtienes al finalizar"
              subtitle="Un diagnóstico completo que te permite entender tu situación y tomar acción."
            />
            <div className="benefits-list">
              {benefits.map((b, i) => (
                <div className={`benefit-item ${b.reverse ? 'reverse' : ''}`} key={i}>
                  <div className="benefit-content">
                    <div className="benefit-label">
                      <Icons.Dot />
                      {b.label}
                    </div>
                    <h3 className="benefit-title">{b.title}</h3>
                    <p className="benefit-text">{b.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- SEGURIDAD ---------- */}
        <section className="section dashboard-preview">
          <div className="container">
            <SectionTitle
              badge="Seguridad"
              title="Cumplimos con los estándares de seguridad"
              subtitle="La aplicación está diseñada siguiendo las mejores prácticas de OWASP y privacidad por diseño."
            />
            <div className="security-grid">
              <div className="security-item">
                <Icons.Lock />
                <h4>Validación de entradas</h4>
                <p>Prevención de ataques mediante validación de todos los datos de entrada.</p>
              </div>
              <div className="security-item">
                <Icons.Shield />
                <h4>OWASP Top 10</h4>
                <p>Mitigación de los riesgos de seguridad más comunes en aplicaciones web.</p>
              </div>
              <div className="security-item">
                <Icons.Users />
                <h4>Autenticación OAuth</h4>
                <p>Login seguro con Google y Microsoft, sin almacenar contraseñas.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- CTA ---------- */}
        <section className="cta">
          <div className="container">
            <h2 className="cta-title">¿Listo para evaluar tu cumplimiento?</h2>
            <p className="cta-text">
              Únete a las organizaciones que ya están mejorando su protección de datos con nuestro autodiagnóstico.
              Comienza hoy sin compromiso.
            </p>
            <div className="hero-actions">
              <Link to="/register" className="btn btn-primary btn-lg cta-btn">
                Comenzar diagnóstico
              </Link>
              <Link to="/login" className="btn btn-lg btn-outline cta-btn-outline">
                Iniciar sesión
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Landing