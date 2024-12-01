import React from 'react'
import { Home } from '../components/Home'
import { CategoryBar } from '../components/CategoryBar'
import { Products } from '../components/Products'

export const Inicio = () => {
  return (
    <>
      <Home />

      <CategoryBar />
      <div id='servicios' className="div-nav">
        <Products />
      </div>
    </>
  )
}
