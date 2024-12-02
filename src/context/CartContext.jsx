// Configurado el contexto del Carrito.
// Este contexto manejará las operaciones del carrito, como agregar productos, ajustar cantidades y limpiar el carrito.

import React, { createContext, useContext, useState } from 'react'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    setCart((prev) => {
      const existingProduct = prev.find((item) => item.id === product.id)

      if (existingProduct) {
        // Si el producto ya está en el carrito, incrementar cantidad
        return prev.map((item) =>
          item.id === product.id && item.quantity < product.stock
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      // Agregar producto al carrito si no existe
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId))
  }

  const clearCart = () => setCart([])

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}
