import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './Routes/Router.jsx'
import AuthProvider from './AuthProvider/AuthProvider.jsx'

const theme = document.getElementsByTagName('html')[0]
theme.setAttribute('data-theme', 'light')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </StrictMode>,
)
