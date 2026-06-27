import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../services/auth'
import AuthLayout from '../../components/layout/AuthLayout'
import Input from '../../components/forms/Input'
import GoogleIcon from '../../components/common/GoogleIcon'
import { FiShield, FiBriefcase, FiEye, FiHeadphones } from 'react-icons/fi'
import './Login.css'

const demoCredentials = [
  {
    role: 'Super Admin',
    email: 'admin@cavaltec.com',
    password: 'Admin123!',
    icon: <FiShield size={16} />,
    color: 'var(--color-accent)',
    description: 'Vista completa del sistema',
  },
  {
    role: 'Admin Empresa',
    email: 'maria.gomez@segurdata.com',
    password: 'Empresa123!',
    icon: <FiBriefcase size={16} />,
    color: 'var(--color-success)',
    description: 'Gestión de su empresa',
  },
  {
    role: 'Auditor',
    email: 'carlos.rodriguez@cavaltec.com',
    password: 'Auditor123!',
    icon: <FiEye size={16} />,
    color: 'var(--color-warning)',
    description: 'Revisión de evaluaciones',
  },
  {
    role: 'Consultor',
    email: 'ana.martinez@cavaltec.com',
    password: 'Consultor123!',
    icon: <FiHeadphones size={16} />,
    color: '#8b5cf6',
    description: 'Consultoría externa',
  },
]

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const userData = await login(email, password)
      const roleRoutes = {
        'Administrador': '/admin/dashboard',
        'Administrador Empresa': '/company/dashboard',
        'Auditor': '/auditor/dashboard',
        'Consultor': '/company/dashboard',
      }
      const route = roleRoutes[userData.role?.name] || '/company/dashboard'
      navigate(route)
    } catch (err) {
      const msg = err.response?.data?.detail || 'Correo o contraseña incorrectos.'
      setError(msg)
    } finally {
      setIsLoading(false)
    }
  }

  const fillDemoCredentials = (cred) => {
    setEmail(cred.email)
    setPassword(cred.password)
    setError('')
  }

  return (
    <AuthLayout
      title="Bienvenido de nuevo"
      subtitle="Ingresa tus credenciales para acceder a tu panel"
      footer={
        <>
          ¿No tienes cuenta? <Link to="/register">Regístrate gratis</Link>
        </>
      }
    >
      <form noValidate onSubmit={handleSubmit}>

        {/* ---------- CAMPOS DEL FORMULARIO ---------- */}
        <Input
          label="Correo electrónico"
          id="email"
          type="email"
          placeholder="tu@empresa.com"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          label="Contraseña"
          id="password"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          showToggle
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* ---------- ERROR ---------- */}
        {error && (
          <div className="login-error">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {error}
          </div>
        )}

        {/* ---------- OPCIONES ---------- */}
        <div className="login-options">
          <label className="form-checkbox">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Recordarme
          </label>
          <Link to="/forgot-password" className="form-link">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        {/* ---------- BOTÓN PRINCIPAL ---------- */}
        <button
          type="submit"
          className="btn btn-primary btn-lg btn-block login-submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="login-spinner" />
              Iniciando sesión...
            </>
          ) : (
            'Iniciar sesión'
          )}
        </button>

        {/* ---------- DIVISOR ---------- */}
        <div className="form-divider">o continúa con</div>

        {/* ---------- BOTÓN GOOGLE ---------- */}
        <button
          type="button"
          className="btn btn-google btn-lg btn-block login-google"
          onClick={() => {
            setIsLoading(true)
            setTimeout(() => {
              setIsLoading(false)
              navigate('/admin/dashboard')
            }, 1500)
          }}
          disabled={isLoading}
        >
          <GoogleIcon />
          Continuar con Google
        </button>

        {/* ---------- CREDENCIALES DEMO ---------- */}
        <div className="login-demo">
          <div className="login-demo-title">Credenciales de demostración</div>
          <div className="login-demo-grid">
            {demoCredentials.map((cred) => (
              <button
                key={cred.role}
                type="button"
                className="login-demo-btn"
                onClick={() => fillDemoCredentials(cred)}
              >
                <div className="login-demo-icon" style={{ color: cred.color }}>
                  {cred.icon}
                </div>
                <div className="login-demo-info">
                  <span className="login-demo-role">{cred.role}</span>
                  <span className="login-demo-desc">{cred.description}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </form>

    
    </AuthLayout>
  )
}

export default Login
