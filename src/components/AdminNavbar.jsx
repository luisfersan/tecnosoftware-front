import React from 'react'

export const AdminNavbar = () => {
  return (
    <header className='bg-dark py-3'>
      <div className="container d-flex justify-content-between">
        <div className="img-container mx-5">
          <img
            src=""
            alt="TecnoSoftware"
            className=" mb-0 img-navbar"
          />
        </div>
        <nav className="nav justify-content-center gap-3 mx-5 nav-masthead">

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
          <Link
            className="link-light link-opacity-75-hover text-decoration-none text-uppercase"
            to="/perfil"
          >
            Mi Perfil
          </Link>

        </nav>
      </div>
    </header>
  )
}
