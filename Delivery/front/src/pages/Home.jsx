import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useToast } from '../Toast'

const API = 'http://localhost:3000/api'

function getRole() {
  const token = localStorage.getItem('token')
  if (!token) return null
  try {
    return JSON.parse(atob(token.split('.')[1])).role
  } catch {
    return null
  }
}

export default function Home() {
  const navigate = useNavigate()
  const toast = useToast()
  const [locales, setLocales] = useState([])
  const [categoria, setCategoria] = useState('')
  const [vista, setVista] = useState('activos')
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem('token')
  const esAdmin = getRole() === 'admin'

  const cargar = (v) => {
    const vActual = v || vista
    setLoading(true)
    let url = `${API}/locals`
    if (vActual === 'inactivos') url = `${API}/locals/inactivos`
    else if (vActual === 'todos') url = `${API}/locals/todas`
    axios.get(url, {
      headers: vActual !== 'activos' ? { Authorization: `Bearer ${token}` } : {}
    })
      .then(res => setLocales(res.data))
      .catch(() => toast('Error al cargar locales', 'error'))
      .finally(() => setLoading(false))
  }

  useEffect(() => cargar(), [])

  const eliminar = async (id, e) => {
    e.stopPropagation()
    try {
      await axios.delete(`${API}/locals/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      toast('Local desactivado correctamente', 'success')
      cargar(vista)
    } catch (err) {
      toast(err.response?.data?.message || 'Error al desactivar', 'error')
    }
  }

  const eliminarPermanente = async (id, e) => {
    e.stopPropagation()
    if (!window.confirm('¿Eliminar permanentemente este local y todos sus productos? Esta acción no se puede deshacer.')) return
    try {
      await axios.delete(`${API}/locals/${id}?force=true`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      toast('Local eliminado permanentemente', 'success')
      cargar(vista)
    } catch (err) {
      toast(err.response?.data?.message || 'Error al eliminar', 'error')
    }
  }

  const restaurar = async (id, e) => {
    e.stopPropagation()
    try {
      await axios.patch(`${API}/locals/${id}/restore`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      toast('Local restaurado correctamente', 'success')
      cargar(vista)
    } catch (err) {
      toast(err.response?.data?.message || 'Error al restaurar', 'error')
    }
  }

  const editar = (id, e) => {
    e.stopPropagation()
    navigate(`/locales/editar/${id}`)
  }

  const filtradas = categoria
    ? locales.filter(l => l.category === categoria)
    : locales

  const categorias = [...new Set(locales.map(l => l.category).filter(Boolean))]

  if (loading) {
    return (
      <div className="container">
        <div className="hero loading-hero">&nbsp;</div>
        <div className="grid">
          {[1,2,3,4].map(i => <div key={i} className="card skeleton-card"><div className="skeleton-img" /><div className="skeleton-lines"><div /><div /><div /></div></div>)}
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="hero">
        <h1>Pedí de los mejores locales</h1>
        <p>Elegí tu lugar favorito y pedí desde casa</p>
      </div>

      {esAdmin && (
        <div className="filtros admin-vista">
          <button className={vista === 'activos' ? 'active' : ''} onClick={() => { setVista('activos'); cargar('activos') }}>Activos</button>
          <button className={vista === 'inactivos' ? 'active' : ''} onClick={() => { setVista('inactivos'); cargar('inactivos') }}>Inactivos</button>
          <button className={vista === 'todos' ? 'active' : ''} onClick={() => { setVista('todos'); cargar('todos') }}>Todos</button>
        </div>
      )}

      {categorias.length > 0 && (
        <div className="filtros">
          <button className={!categoria ? 'active' : ''} onClick={() => setCategoria('')}>
            Todas
          </button>
          {categorias.map(cat => (
            <button key={cat} className={categoria === cat ? 'active' : ''} onClick={() => setCategoria(cat)}>
              {cat}
            </button>
          ))}
        </div>
      )}

      {filtradas.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">🍽️</span>
          <p>{categoria ? `No hay locales en la categoría "${categoria}"` : vista === 'inactivos' ? 'No hay locales inactivos' : 'No hay locales disponibles'}</p>
        </div>
      ) : (
        <div className="grid">
          {filtradas.map(l => (
            <div key={l.id} className="card local-card" onClick={() => navigate(`/locales/${l.id}`)}>
              {l.imageUrl && <img src={l.imageUrl} alt={l.name} className="local-img" />}
              <div className="local-info">
                <h3>{l.name}</h3>
                {l.category && <span className="badge">{l.category}</span>}
                {!l.isActive && <span className="badge badge-inactivo">Inactivo</span>}
                <p className="address">{l.address}</p>
                {l.openingHours && <p className="hours">{l.openingHours}</p>}
                {esAdmin && l.isActive && (
                  <div className="card-actions">
                    <button onClick={(e) => editar(l.id, e)}>Editar</button>
                    <button className="btn-danger" onClick={(e) => eliminar(l.id, e)}>Desactivar</button>
                  </div>
                )}
                {esAdmin && !l.isActive && (
                  <div className="card-actions">
                    <button onClick={(e) => restaurar(l.id, e)}>Restaurar</button>
                    <button className="btn-danger" onClick={(e) => eliminarPermanente(l.id, e)}>Eliminar</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
