import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/Navbar'

export const AdminLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}
