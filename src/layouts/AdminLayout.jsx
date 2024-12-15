import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/Navbar'

export const AdminLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}
