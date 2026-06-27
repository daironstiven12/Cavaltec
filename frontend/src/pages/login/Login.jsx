import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/layout/AuthLayout'
import Input from '../../components/forms/Input'
import GoogleIcon from '../../components/common/GoogleIcon'
import './Login.css'

const roles = [
  { id: 'admin', label: 'Super Administrador', path: '/admin/dashboard' },
  { id: 'company', label: 'Administrador Empresa', path: '/company/dashboard' },
  { id: 'auditor', label: 'Auditor', path: '/auditor/dashboard' },
]

function Login() {
  const navigate = useNavigate()
  const [selectedRole, setSelectedRole] = useState('admin')

  const handleSubmit = (e) => {
    e.preventDefault()
    const role = roles.find((r) => r.id === selectedRole)
    navigate(role.path)
  }

  return (
    <AuthLayout
      title="Bienvenido de nuevo"
      subtitle="Inicia sesión para acceder a tu panel"
      footer={<>¿No tienes cuenta? <Link to="/register">Regístrate gratis</Link></>}
    >
      <form noValidate onSubmit={handleSubmit}>
        <div className="login-demo-card">
          <div className="login-demo-title">Modo demostración</div>
          <p className="login-demo-desc">Selecciona un rol para explorar la plataforma</p>
          <div className="login-demo-roles">
            {roles.map((role) => (
              <label key={role.id} className={`login-demo-role ${selectedRole === role.id ? 'login-demo-role--active' : ''}`}>
                <input
                  type="radio"
                  name="role"
                  value={role.id}
                  checked={selectedRole === role.id}
                  onChange={() => setSelectedRole(role.id)}
                />
                <div className="login-demo-role-content">
                  <span className="login-demo-role-label">{role.label}</span>
                  <span className="login-demo-role-path">{role.path}</span>
                </div>
              </label>
            ))}
          </div>
          <p className="login-demo-note">Esta selección es temporal. Desaparecerá cuando el backend esté conectado.</p>
        </div>

        <Input label="Correo electrónico" id="email" type="email" placeholder="tu@empresa.com" autoComplete="email" />
        <Input label="Contraseña" id="password" type="password" placeholder="••••••••" autoComplete="current-password" showToggle />

        <div className="login-options">
          <label className="form-checkbox">
            <input type="checkbox" defaultChecked />
            Recordarme
          </label>
          <Link to="/forgot-password" className="form-link">¿Olvidaste tu contraseña?</Link>
        </div>

        <button type="submit" className="btn btn-primary btn-lg btn-block">Iniciar sesión</button>

        <div className="form-divider">o continúa con</div>

        <button type="button" className="btn btn-google btn-lg" onClick={() => { const role = roles.find((r) => r.id === selectedRole); navigate(role.path); }}>
          <GoogleIcon />
          Continuar con Google
        </button>
      </form>
    </AuthLayout>
  )
}

export default Login
