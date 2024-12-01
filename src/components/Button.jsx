import React from 'react'
import './Button.css' // Importar los estilos css

export const Button = ({ text, onClick }) => (
  <button
    className="btn btn-primary w-100"
    onClick={onClick}
  >
    {text}
  </button>
)
