import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../services/auth'
import AuthLayout from '../../components/layout/AuthLayout'
import Input from '../../components/forms/Input'
import GoogleIcon from '../../components/common/GoogleIcon'
import './Login.css'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const demoCredentials = {
    admin: { email: 'admin@cavaltec.com', password: 'Admin123!' },
  }

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

  const fillDemoCredentials = (role) => {
    const creds = demoCredentials[role]
    setEmail(creds.email)
    setPassword(creds.password)
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
            // Simulación de login con Google
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
      </form>
    </AuthLayout>
  )
}

export default Login