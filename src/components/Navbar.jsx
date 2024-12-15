import { Link } from 'react-router-dom'
import './Navbar.css'
import { useEffect, useState } from 'react'
import useTienda from '../hooks/useTienda'

export const Navbar = () => {

  const { profile, handleClickEndSession } = useTienda()

  return (
    <header
      className='w-100 navbar navbar-expand-lg navbar-primary bg-dark fixed-top py-2'
    >
      <div className="container d-flex justify-content-between movile-view">
        <div className="img-container">




          <Link to="/">
            <img
              src=""
              alt="TecnoSoftware"
              className="mb-0 img-navbar"
            />
          </Link>
        </div>
        <nav className="nav justify-content-center  gap-3 mx-5 nav-masthead">

        {profile.admin ? (
            <>
              <Link
                className="link-light link-opacity-75-hover text-decoration-none text-uppercase"
                aria-current="page"
                to="/admin/usuarios"
              >
                Usuarios
              </Link>
              <Link
                className="link-light link-opacity-75-hover text-decoration-none text-uppercase"
                aria-current="page"
                to="/admin/productos"
              >
                Productos
              </Link>
            </>
          ) : <></>}

          {Object.keys(profile).length === 0 ? (
            <>
              <Link
                className="link-light link-opacity-75-hover text-decoration-none text-uppercase"
                aria-current="page"
                to="/auth/login"
              >
                Iniciar Sesión
              </Link>
              <Link
                className="link-light link-opacity-75-hover text-decoration-none text-uppercase"
                aria-current="page"
                to="/auth/registro"
              >
                Crear Cuenta
              </Link>
            </>
          ) : (
            <Link
              className="link-light link-opacity-75-hover text-decoration-none text-uppercase"
              to="/perfil"
            >
              Mi Perfil
            </Link>
          )}

          <Link
            className="link-light link-opacity-75-hover text-decoration-none text-uppercase"
            to="/carrito"
          >
            Carrito
          </Link>

          {Object.keys(profile).length > 0 ? (
            <>
              <Link
                className="link-light link-opacity-75-hover text-decoration-none text-uppercase"
                aria-current="page"
                onClick={() => handleClickEndSession()}
                to="/"
              >
                Cerrar Sesión
              </Link>
            </>
          ) : (
            <></>
          )}

        </nav>
      </div>
    </header>
  )
}
