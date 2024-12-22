import React, { useState } from 'react'
import './Registro.css' // Importa el archivo CSS correspondiente
import clienteAxios from '../config/axios'
import { Link, useNavigate } from 'react-router-dom'

export const Registro = () => {

  const navigate = useNavigate()

  const usernameRef = React.createRef()
  const emailRef = React.createRef()
  const passwordRef = React.createRef()
  const repeatPasswordRef = React.createRef()


  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    // // Validar que todos los campos estén llenos
    if (!usernameRef.current.value || !emailRef.current.value || !passwordRef.current.value || !repeatPasswordRef.current.value) {
      setErrorMessage('Todos los campos deben ser diligenciados.')
      setSuccessMessage('')
    } else if(passwordRef.current.value !== repeatPasswordRef.current.value){
      setErrorMessage('Las contraseñas no coinciden.')
      setSuccessMessage('')
    } else {
      const datos = {
        username: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value
      }

      try {
        const {data} = await clienteAxios.post('/users/auth/register', datos)
        if (data.status === "success") {
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
    <div className="d-flex justify-content-center align-items-center my-5">
      <form
        onSubmit={handleSubmit}
        className="register-form"
      >
        <h2 className="register-title">Registro</h2>

        {/* Mensaje de error */}
        {errorMessage && <p className="register-error">{errorMessage}</p>}

        <div className="register-input-group">
          <label className="register-label">Nombre completo:</label>
          <input
            type="text"
            name="name"
            className="register-input"
            placeholder="Ingresa tu nombre"
            ref={usernameRef}
          />
        </div>

        <div className="register-input-group">
          <label className="register-label">Email:</label>
          <input
            type="email"
            name="email"
            className="register-input"
            placeholder="Ingresa tu correo electrónico"
            ref={emailRef}
          />
        </div>

        <div className="register-input-group">
          <label className="register-label">Password:</label>
          <input
            type="password"
            name="password"
            className="register-input"
            placeholder="Ingresa tu password"
            ref={passwordRef}
          />
        </div>

        <div className="register-input-group">
          <label className="register-label">Repite el Password:</label>
          <input
            type="password"
            name="repetirPassword"
            className="register-input"
            placeholder="Repite tu password"
            ref={repeatPasswordRef}
          />
        </div>

        <button
          type="submit"
          className="register-btn"
        >
          Enviar
        </button>

        {/* Mensaje de éxito */}
        {successMessage && <p className="register-success">{successMessage}</p>}
        <div className="d-flex justify-content-between">
        <Link
          to="/auth/login"
          className="link-light link-opacity-75-hover text-decoration-none link-text"
        >
          Ya tienes cuenta? Ingresa aquí
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
