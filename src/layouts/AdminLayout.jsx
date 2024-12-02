import { Outlet } from 'react-router-dom'
import { AdminNavbar } from '../components/AdminNavbar'

export const AdminLayout = () => {
  return (
    <div>
      <AdminNavbar />
      <Outlet />
    </div>
  )
}
