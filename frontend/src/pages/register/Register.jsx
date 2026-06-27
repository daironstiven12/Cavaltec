import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/layout/AuthLayout'
import Input from '../../components/forms/Input'
import GoogleIcon from '../../components/common/GoogleIcon'
import './Register.css'

function Register() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    nit: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  // Datos de prueba para demo
  const demoData = {
    firstName: 'Juan',
    lastName: 'Pérez',
    company: 'CAVALTEC S.A.S.',
    nit: '901.234.567-8',
    email: 'juan.perez@cavaltec.com',
    password: 'Cavaltec2026!',
    confirmPassword: 'Cavaltec2026!'
  }

  const fillDemoData = () => {
    setFormData(demoData)
    setPasswordStrength(100)
    setErrors({})
  }

  const validatePassword = (password) => {
    let strength = 0
    if (password.length >= 8) strength += 25
    if (password.match(/[a-z]/)) strength += 25
    if (password.match(/[A-Z]/)) strength += 25
    if (password.match(/[0-9!@#$%^&*(),.?":{}|<>]/)) strength += 25
    return strength
  }

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))

    if (id === 'password') {
      setPasswordStrength(validatePassword(value))
    }

    // Limpiar error del campo
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.firstName.trim()) newErrors.firstName = 'El nombre es requerido'
    if (!formData.lastName.trim()) newErrors.lastName = 'El apellido es requerido'
    if (!formData.company.trim()) newErrors.company = 'La empresa es requerida'
    if (!formData.nit.trim()) newErrors.nit = 'El NIT es requerido'
    if (!formData.email.trim()) {
      newErrors.email = 'El correo es requerido'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Correo electrónico inválido'
    }
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida'
    } else if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres'
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden'
    }
    if (!acceptTerms) {
      newErrors.terms = 'Debes aceptar los términos y condiciones'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)

    // Navegar al dashboard
    navigate('/dashboard')
  }

  const getPasswordStrengthLabel = () => {
    if (passwordStrength === 0) return ''
    if (passwordStrength <= 25) return 'Débil'
    if (passwordStrength <= 50) return 'Regular'
    if (passwordStrength <= 75) return 'Fuerte'
    return 'Muy fuerte'
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 25) return 'var(--color-error)'
    if (passwordStrength <= 50) return 'var(--color-warning)'
    if (passwordStrength <= 75) return '#f59e0b'
    return 'var(--color-success)'
  }

  return (
    <AuthLayout
      title="Crear cuenta"
      subtitle="Comienza a gestionar tu cumplimiento normativo"
      footer={
        <>
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </>
      }
    >
      <form noValidate onSubmit={handleSubmit}>

        {/* ---------- NOMBRE Y APELLIDO ---------- */}
        <div className="register-grid">
          <Input
            label="Nombre"
            id="firstName"
            placeholder="Juan"
            autoComplete="given-name"
            value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
            required
          />
          <Input
            label="Apellido"
            id="lastName"
            placeholder="Pérez"
            autoComplete="family-name"
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
            required
          />
        </div>

        {/* ---------- EMPRESA Y NIT ---------- */}
        <div className="register-grid">
          <Input
            label="Empresa"
            id="company"
            placeholder="Mi Empresa S.A.S."
            autoComplete="organization"
            value={formData.company}
            onChange={handleChange}
            error={errors.company}
            required
          />
          <Input
            label="NIT"
            id="nit"
            placeholder="123.456.789-0"
            value={formData.nit}
            onChange={handleChange}
            error={errors.nit}
            required
          />
        </div>

        {/* ---------- CORREO ---------- */}
        <Input
          label="Correo electrónico"
          id="email"
          type="email"
          placeholder="tu@empresa.com"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />

        {/* ---------- CONTRASEÑAS ---------- */}
        <div className="register-grid">
          <div className="register-password-wrapper">
            <Input
              label="Contraseña"
              id="password"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              showToggle
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
            />
            {formData.password && (
              <div className="register-password-strength">
                <div className="register-password-strength-bar">
                  <div
                    className="register-password-strength-fill"
                    style={{
                      width: `${passwordStrength}%`,
                      background: getPasswordStrengthColor()
                    }}
                  />
                </div>
                <span
                  className="register-password-strength-label"
                  style={{ color: getPasswordStrengthColor() }}
                >
                  {getPasswordStrengthLabel()}
                </span>
              </div>
            )}
          </div>
          <Input
            label="Confirmar contraseña"
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            showToggle
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            required
          />
        </div>

        {/* ---------- TÉRMINOS ---------- */}
        <div className="register-terms">
          <label className="form-checkbox">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => {
                setAcceptTerms(e.target.checked)
                if (errors.terms) setErrors(prev => ({ ...prev, terms: '' }))
              }}
            />
            <span>
              Acepto los <Link to="#">Términos y condiciones</Link> y la{' '}
              <Link to="#">Política de privacidad</Link>
            </span>
          </label>
          {errors.terms && (
            <p className="register-terms-error">{errors.terms}</p>
          )}
        </div>

        {/* ---------- BOTÓN PRINCIPAL ---------- */}
        <button
          type="submit"
          className="btn btn-primary btn-lg btn-block register-submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="register-spinner" />
              Creando cuenta...
            </>
          ) : (
            'Crear cuenta'
          )}
        </button>

        {/* ---------- DIVISOR ---------- */}
        <div className="form-divider">o continúa con</div>

        {/* ---------- BOTÓN GOOGLE ---------- */}
        <button
          type="button"
          className="btn btn-google btn-lg btn-block register-google"
          onClick={() => {
            setIsLoading(true)
            setTimeout(() => {
              setIsLoading(false)
              navigate('/login')
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

export default Register