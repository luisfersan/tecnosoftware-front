// Creando el Carrito
// Muestra los productos agregados al carrito, permitiendo eliminar productos o limpiar el carrito.

import React from 'react'
import { useCart } from '../context/CartContext'

export const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart()

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  return (
    <div className="container mt-5">
      <h2>Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {cart.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <h6>{item.name}</h6>
                  <p className="mb-0">Cantidad: {item.quantity}</p>
                  <p className="mb-0">
                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <div className="d-flex justify-content-between">
            <h4>Total: ${totalPrice.toFixed(2)}</h4>
            <button
              className="btn btn-warning"
              onClick={clearCart}
            >
              Vaciar Carrito
            </button>
          </div>
        </>
      )}
    </div>
  )
}
