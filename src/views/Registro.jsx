// export const Registro = () => {
//   return <div>Registro</div>
// }

import React, { useState } from 'react'
import './Registro.css' // Importa el archivo CSS correspondiente

export const Registro = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    mobile: '',
    email: '',
    id: '',
  })

  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const { name, surname, mobile, email, id } = formData

    // Validar que todos los campos estén llenos
    if (!name || !surname || !mobile || !email || !id) {
      setErrorMessage('Todos los campos deben ser diligenciados.')
      setSuccessMessage('') // Limpia el mensaje de éxito
    } else {
      setErrorMessage('')
      setSuccessMessage('¡Se creó el registro correctamente!')

      // Blanquear los campos
      setFormData({
        name: '',
        surname: '',
        mobile: '',
        email: '',
        id: '',
      })

      // Desaparecer el mensaje de éxito después de 2 segundos
      setTimeout(() => {
        setSuccessMessage('')
      }, 2000)
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
          <label className="register-label">Nombres:</label>
          <input
            type="text"
            name="name"
            className="register-input"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ingresa tu nombre"
          />
        </div>

        <div className="register-input-group">
          <label className="register-label">Apellidos:</label>
          <input
            type="text"
            name="surname"
            className="register-input"
            value={formData.surname}
            onChange={handleChange}
            placeholder="Ingresa tu apellido"
          />
        </div>

        <div className="register-input-group">
          <label className="register-label">Móvil:</label>
          <input
            type="text"
            name="mobile"
            className="register-input"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Ingresa tu número móvil"
          />
        </div>

        <div className="register-input-group">
          <label className="register-label">Email:</label>
          <input
            type="email"
            name="email"
            className="register-input"
            value={formData.email}
            onChange={handleChange}
            placeholder="Ingresa tu correo electrónico"
          />
        </div>

        <div className="register-input-group">
          <label className="register-label">ID:</label>
          <input
            type="text"
            name="id"
            className="register-input"
            value={formData.id}
            onChange={handleChange}
            placeholder="Ingresa tu ID"
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
      </form>
    </div>
  )
}
