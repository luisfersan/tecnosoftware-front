import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css' // Importa el archivo CSS correspondiente

export const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const { email, password } = formData

    // Validar que todos los campos estén llenos
    if (!email || !password) {
      setErrorMessage('Todos los campos deben ser diligenciados.')
      setSuccessMessage('')
    } else {
      setErrorMessage('')
      setSuccessMessage('¡Inició sesión correctamente!')

      // Limpiar campos
      setFormData({ email: '', password: '' })

      // Mostrar mensaje por 3 segundos
      setTimeout(() => {
        setSuccessMessage('')
        navigate('/') // Redirigir al home
      }, 3000)
    }
  }

  return (
    <div className="login-container">
      <form
        onSubmit={handleSubmit}
        className="login-form"
      >
        <h2 className="login-title">Iniciar sesión</h2>

        {/* Mensaje de error */}
        {errorMessage && <p className="login-error">{errorMessage}</p>}

        {/* Mensaje de éxito */}
        {successMessage && <p className="login-success">{successMessage}</p>}

        <div className="login-input-group">
          <label className="login-label">Email:</label>
          <input
            type="email"
            name="email"
            className="login-input"
            value={formData.email}
            onChange={handleChange}
            placeholder="Ingresa tu correo electrónico"
          />
        </div>

        <div className="login-input-group">
          <label className="login-label">Contraseña:</label>
          <input
            type="password"
            name="password"
            className="login-input"
            value={formData.password}
            onChange={handleChange}
            placeholder="Ingresa tu contraseña"
          />
        </div>

        <button
          type="submit"
          className="login-btn"
        >
          Ingresar
        </button>

        <p className="login-register-link">
          No tienes tu cuenta:{' '}
          <button
            className="login-register-button"
            onClick={() => navigate('/register')}
          >
            Regístrate
          </button>
        </p>
      </form>
    </div>
  )
}
