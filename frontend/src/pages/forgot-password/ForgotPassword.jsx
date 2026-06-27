import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft, FiCheckCircle } from 'react-icons/fi'
import AuthLayout from '../../components/layout/AuthLayout'
import Input from '../../components/forms/Input'
import './ForgotPassword.css'

function ForgotPassword() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  if (sent) {
    return (
      <AuthLayout
        title="Correo enviado"
        subtitle="Si el correo ingresado está registrado, recibirás un enlace para restablecer tu contraseña en los próximos minutos."
        footer={
          <Link to="/login" className="back-link">
            <FiArrowLeft size={16} />
            Volver al inicio de sesión
          </Link>
        }
      >
        <div className="forgot-success">
          <div className="forgot-success-icon">
            <FiCheckCircle size={40} />
          </div>
          <p className="forgot-success-text">
            Revisa tu bandeja de entrada y sigue las instrucciones del correo electrónico enviado.
          </p>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title="Recuperar contraseña"
      subtitle="Ingresa tu correo y te enviaremos un enlace para restablecerla"
      footer={
        <Link to="/login" className="back-link">
          <FiArrowLeft size={16} />
          Volver al inicio de sesión
        </Link>
      }
    >
      <form noValidate onSubmit={handleSubmit}>
        <Input label="Correo electrónico" id="email" type="email" placeholder="tu@empresa.com" autoComplete="email" />
        <button type="submit" className="btn btn-primary btn-lg btn-block">Enviar enlace</button>
      </form>
    </AuthLayout>
  )
}

export default ForgotPassword
