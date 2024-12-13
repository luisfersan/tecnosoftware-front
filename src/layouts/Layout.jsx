import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Home } from '../components/Home'
import { CategoryBar } from '../components/CategoryBar'
import { Footer } from '../components/Footer'
import { Products } from '../components/Products'
import { useAuth } from '../hooks/useAuth'


export const Layout = () => {

  const useAuth = useAuth( { middleware: 'auth', url: '/profile' } );

  return (
    <>
      <Navbar />
      <div className="">
      <Outlet />
      </div>
      <Footer />
    </>
  )
}
