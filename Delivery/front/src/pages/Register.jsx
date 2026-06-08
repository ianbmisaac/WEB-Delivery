import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { useToast } from '../Toast'

const API = 'http://localhost:3000/api'

export default function Register() {
  const navigate = useNavigate()
  const toast = useToast()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [valido, setValido] = useState({ name: true, email: true, password: true })

  const validar = () => {
    const v = {
      name: form.name.trim().length >= 2,
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email),
      password: form.password.length >= 6
    }
    setValido(v)
    return v.name && v.email && v.password
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validar()) return
    setLoading(true)
    setError('')
    try {
      await axios.post(`${API}/auth/register`, form)
      toast('Cuenta creada con éxito. Ahora iniciá sesión.', 'success')
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrarse')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container form-page">
      <div className="form-card">
        <h2>Crear cuenta</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <input
              placeholder="Nombre"
              value={form.name}
              onChange={e => setForm({...form, name: e.target.value})}
              className={form.name && !valido.name ? 'input-error' : ''}
              required
            />
            {form.name && !valido.name && <span className="field-hint">Mínimo 2 caracteres</span>}
          </div>
          <div className="field">
            <input
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={e => setForm({...form, email: e.target.value})}
              className={form.email && !valido.email ? 'input-error' : ''}
              required
            />
            {form.email && !valido.email && <span className="field-hint">Email inválido</span>}
          </div>
          <div className="field">
            <input
              placeholder="Contraseña"
              type="password"
              value={form.password}
              onChange={e => setForm({...form, password: e.target.value})}
              className={form.password && !valido.password ? 'input-error' : ''}
              required
            />
            {form.password && !valido.password && <span className="field-hint">Mínimo 6 caracteres</span>}
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Registrando...' : 'Crear cuenta'}
          </button>
        </form>
        <p className="form-footer">¿Ya tenés cuenta? <Link to="/login">Iniciar sesión</Link></p>
      </div>
    </div>
  )
}
