import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/layout/AuthLayout'
import Input from '../../components/forms/Input'
import GoogleIcon from '../../components/common/GoogleIcon'
import './Register.css'

function Register() {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/dashboard')
  }

  return (
    <AuthLayout
      title="Crear cuenta"
      subtitle="Comienza a gestionar tu cumplimiento normativo"
      footer={<>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></>}
    >
      <form noValidate onSubmit={handleSubmit}>
        <div className="flex gap-md">
          <Input label="Nombre" id="first_name" placeholder="Juan" autoComplete="given-name" />
          <Input label="Apellido" id="last_name" placeholder="Pérez" autoComplete="family-name" />
        </div>

        <Input label="Empresa" id="company" placeholder="Mi Empresa S.A.S." autoComplete="organization" />
        <Input label="NIT" id="nit" placeholder="123.456.789-0" />

        <Input label="Correo electrónico" id="email" type="email" placeholder="tu@empresa.com" autoComplete="email" />

        <div className="flex gap-md">
          <Input label="Contraseña" id="password" type="password" placeholder="••••••••" autoComplete="new-password" showToggle />
          <Input label="Confirmar contraseña" id="confirm_password" type="password" placeholder="••••••••" autoComplete="new-password" showToggle />
        </div>

        <div className="register-terms">
          <label className="form-checkbox">
            <input type="checkbox" />
            Acepto los <Link to="#">Términos y condiciones</Link> y la <Link to="#">Política de privacidad</Link>
          </label>
        </div>

        <button type="submit" className="btn btn-primary btn-lg btn-block">Crear cuenta</button>

        <div className="form-divider">o continúa con</div>

        <button type="button" className="btn btn-google btn-lg" onClick={() => navigate('/dashboard')}>
          <GoogleIcon />
          Continuar con Google
        </button>
      </form>
    </AuthLayout>
  )
}

export default Register
