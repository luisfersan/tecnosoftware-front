import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { TiendaProvider } from './context/TiendaContext'
import { RouterProvider } from 'react-router-dom'
import router from './Router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TiendaProvider>
      <RouterProvider router={router}/>
    </TiendaProvider>
  </StrictMode>,
)
