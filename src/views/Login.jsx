import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css' // Importa el archivo CSS correspondiente
import clienteAxios from '../config/axios'
import useTienda from '../hooks/useTienda'

export const Login = () => {

  const emailRef = React.createRef()
  const passwordRef = React.createRef()

  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const navigate = useNavigate()

  const {getProfile} = useTienda()

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validar que todos los campos estén llenos
    if (!emailRef.current.value || !passwordRef.current.value) {
      setErrorMessage('Todos los campos deben ser diligenciados.')
      setSuccessMessage('')
    } else {
      const datos = {
        email: emailRef.current.value,
        password: passwordRef.current.value
      }

      try {
        const { data } = await clienteAxios.post('/users/auth/login', datos)
        if (data.status === "success") {
          localStorage.setItem('AUTH_TOKEN', data.data.token);
          getProfile()
          setErrorMessage('')
          setSuccessMessage(data.message)
          setTimeout(() => {
            navigate('/')
          }, 2000)
        } else {
          setErrorMessage(data.message)
          setSuccessMessage('')
        }
      } catch (error) {
        setErrorMessage(error.response.data.message)
        setSuccessMessage('')
      }
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
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
            placeholder="Ingresa tu correo electrónico"
            ref={emailRef}
          />
        </div>

        <div className="login-input-group">
          <label className="login-label">Contraseña:</label>
          <input
            type="password"
            name="password"
            className="login-input"
            placeholder="Ingresa tu contraseña"
            ref={passwordRef}
          />
        </div>

        <button
          type="submit"
          className="login-btn"
        >
          Ingresar
        </button>

        <div className="d-flex justify-content-between">
        <Link
          to="/registro"
          className="link-light link-opacity-75-hover text-decoration-none link-text"
        >
          ¿No tienes una cuenta? Registrate
        </Link>
        <Link
          to="/"
          className="link-light link-opacity-75-hover text-decoration-none link-text"
        >
          Volver al inicio
        </Link>
        </div>
      </form>
    </div>
  )
}
