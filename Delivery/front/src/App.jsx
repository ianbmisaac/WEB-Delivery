import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import { ToastProvider } from './Toast'
import './App.css'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import LocalDetail from './pages/LocalDetail'
import Dashboard from './pages/Dashboard'
import LocalForm from './pages/LocalForm'

function decodeToken() {
  const token = localStorage.getItem('token')
  if (!token) return null
  try {
    return JSON.parse(atob(token.split('.')[1]))
  } catch {
    return null
  }
}

function Nav() {
  const location = useLocation()
  const navigate = useNavigate()
  const [user, setUser] = useState(decodeToken())

  useEffect(() => {
    setUser(decodeToken())
  }, [location])

  const cerrarSesion = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  const esAdmin = user?.role === 'admin'

  return (
    <nav>
      <Link to="/" className="logo">🍕 Delivery App</Link>
      <div className="nav-links">
        <Link to="/">Inicio</Link>
        {user ? (
          <>
            {esAdmin && <Link to="/locales/nuevo">Nuevo local</Link>}
            {esAdmin && <Link to="/dashboard">Pedidos</Link>}
            <span className="user-name">{user.name || user.email}</span>
            <button onClick={cerrarSesion}>Salir</button>
          </>
        ) : (
          <>
            <Link to="/login">Ingresar</Link>
            <Link to="/register">Registro</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/locales/:id" element={<LocalDetail />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/locales/nuevo" element={<LocalForm />} />
            <Route path="/locales/editar/:id" element={<LocalForm />} />
          </Routes>
        </main>
      </ToastProvider>
    </BrowserRouter>
  )
}
