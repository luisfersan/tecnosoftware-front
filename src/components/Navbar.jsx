import { Link } from 'react-router-dom'
import './Navbar.css'
import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'

export const Navbar = () => {
  const { user } = useAuth()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header
      className={`mb-auto fixed-top navbar-scroll ${scrolled ? 'scrolled' : ''
        }`}
    >
      <div className="container">
        <div className="img-container mx-5">
          <Link to="/">
          <img
            src=""
            alt="TecnoSoftware"
            className="float-md-start mb-0 img-navbar"
          />
          </Link>
        </div>
        <nav className="nav justify-content-center float-md-end gap-3 mx-5 nav-masthead">
          {!user ? (
              <div>
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
              </div>
          ) :           <Link
          className="link-light link-opacity-75-hover text-decoration-none text-uppercase"
          to="/perfil"
        >
          Mi Perfil
        </Link>}

          <Link
            className="link-light link-opacity-75-hover text-decoration-none text-uppercase"
            to="/carrito"
          >
            Carrito
          </Link>

        </nav>
      </div>
    </header>
  )
}
