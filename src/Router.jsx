import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './layouts/Layout'
import { Inicio } from './views/Inicio'
import { Carrito } from './views/Carrito'
import { AuthLayout } from './layouts/AuthLayout'
import { Registro } from './views/Registro'
import { Login } from './views/Login'
import { AdminLayout } from './layouts/AdminLayout'
import { Administrador } from './views/Administrador'
import { Form } from './components/Form'
import { Button } from './components/Button'
import { InputField } from './components/InputField'

const router = createBrowserRouter([
  //EJEMPLO
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Inicio />,
      },
      {
        path: '/carrito',
        element: <Carrito />,
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: '/auth/login',
        element: <Login />,
      },
      {
        path: '/auth/registro',
        element: <Registro />,
      },
      {
        path: '/auth/form',
        element: <Form />,
      },
      {
        path: '/auth/button',
        element: <Button />,
      },
      {
        path: '/auth/InputField',
        element: <InputField />,
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        path: '/admin/inicio',
        element: <Administrador />,
      },
    ],
  },
])

export default router
