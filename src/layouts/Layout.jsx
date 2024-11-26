import React from 'react'
import { Inicio } from '../views/Inicio'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/Navbar'

export const Layout = () => {
  return (
    <>
      <Navbar />
      
      <Outlet />
    </>
  )
}
