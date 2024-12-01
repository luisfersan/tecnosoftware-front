import React from 'react'
import './InputField.css' // Importa el archivo CSS correspondiente

export const InputField = ({ label, type, value, onChange, name }) => (
  <div className="input-field-container">
    <label className="input-label">{label}</label>
    <input
      type={type}
      className="input-field"
      value={value}
      onChange={onChange}
      name={name} // Identificador del campo
    />
  </div>
)
