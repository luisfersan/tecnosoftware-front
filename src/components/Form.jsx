import React, { useState } from 'react'
import InputField from './InputField'
import Button from './Button'
import './Form.css' // Importa el archivo CSS correspondiente

export const Form = () => {
  const [formData, setFormData] = useState({
    Nombres: '',
    Apellidos: '',
    Móvil: '',
    Email: '',
    Id: '',
  })

  const [successMessage, setSuccessMessage] = useState(false) // Estado para el mensaje

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    console.log('Datos capturados:', formData)

    // Mostrar el mensaje de éxito
    setSuccessMessage(true)

    // Reiniciar los campos del formulario
    setFormData({
      Nombres: '',
      Apellidos: '',
      Móvil: '',
      Email: '',
      Id: '',
    })

    // Ocultar el mensaje después de 3 segundos
    setTimeout(() => {
      setSuccessMessage(false)
    }, 3000)
  }

  return (
    <div className="form-container">
      <h2 className="form-title">Registro</h2>

      {Object.keys(formData).map((key) => (
        <div
          className="input-field-container"
          key={key}
        >
          <InputField
            label={key.charAt(0).toUpperCase() + key.slice(1) + ':'}
            type="text"
            value={formData[key]}
            onChange={handleChange}
            name={key}
          />
        </div>
      ))}

      <Button
        text="Enviar"
        onClick={handleSubmit}
        className="submit-btn"
      />

      {/* Mostrar el mensaje de éxito si successMessage es true */}
      {successMessage && (
        <div className="form-success-message">
          ¡Se creó el registro correctamente!
        </div>
      )}
    </div>
  )
}
