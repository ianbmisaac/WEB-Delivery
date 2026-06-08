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

const ESTADOS = ['pendiente', 'confirmado', 'preparando', 'en_camino', 'entregado', 'cancelado']

export default function Dashboard() {
  const navigate = useNavigate()
  const toast = useToast()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtro, setFiltro] = useState('activos')
  const token = localStorage.getItem('token')
  const role = getRole()

  useEffect(() => {
    if (!token || role !== 'admin') {
      navigate('/')
      return
    }
    setLoading(true)
    const url = filtro === 'activos' ? `${API}/orders/active` : `${API}/orders`
    axios.get(url, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setOrders(res.data))
      .catch(() => toast('Error al cargar pedidos', 'error'))
      .finally(() => setLoading(false))
  }, [filtro])

  const cambiarEstado = async (id, nuevoEstado) => {
    try {
      await axios.patch(`${API}/orders/${id}/status`,
        { status: nuevoEstado },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setOrders(orders.map(o => o.id === id ? { ...o, status: nuevoEstado } : o))
      toast(`Pedido #${id} → ${nuevoEstado}`, 'success')
    } catch (err) {
      toast(err.response?.data?.message || 'Error al cambiar estado', 'error')
    }
  }

  const ordenarEstado = (s) => {
    const orden = { pendiente: 0, confirmado: 1, preparando: 2, en_camino: 3, entregado: 4, cancelado: 5 }
    return orden[s] ?? 99
  }

  const sorted = [...orders].sort((a, b) => ordenarEstado(a.status) - ordenarEstado(b.status))

  if (!token || role !== 'admin') return null

  return (
    <div className="container">
      <div className="header-row">
        <h2>📋 Pedidos</h2>
        <div className="dashboard-filtros">
          <button className={filtro === 'activos' ? 'active' : ''} onClick={() => setFiltro('activos')}>Activos</button>
          <button className={filtro === 'todos' ? 'active' : ''} onClick={() => setFiltro('todos')}>Todos</button>
        </div>
      </div>

      {loading ? (
        <div className="empty-state"><p>Cargando pedidos...</p></div>
      ) : sorted.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">📦</span>
          <p>No hay pedidos {filtro === 'activos' ? 'activos' : ''}</p>
        </div>
      ) : (
        sorted.map(order => (
          <div key={order.id} className="card order-card">
            <div className="order-header">
              <span className="order-id">Pedido #{order.id}</span>
              <span className={`status status-${order.status}`}>{order.status}</span>
            </div>
            <div className="order-body">
              <div className="order-detail">
                <p><strong>Local:</strong> {order.Local?.name || '—'}</p>
                <p><strong>Cliente:</strong> {order.User?.name || '—'}</p>
                <p><strong>Dirección:</strong> {order.deliveryAddress}</p>
                {order.notes && <p><strong>Notas:</strong> {order.notes}</p>}
              </div>
              <div className="order-total">
                <span>${Number(order.total).toFixed(2)}</span>
              </div>
            </div>
            {order.OrderItems && order.OrderItems.length > 0 && (
              <div className="order-items">
                {order.OrderItems.map(item => (
                  <span key={item.id} className="order-item-tag">
                    {item.quantity}x {item.Product?.name || `Producto #${item.ProductId}`}
                  </span>
                ))}
              </div>
            )}
            <div className="status-buttons">
              {ESTADOS.map(est => (
                <button
                  key={est}
                  onClick={() => cambiarEstado(order.id, est)}
                  disabled={order.status === est}
                  className={order.status === est ? 'active' : ''}
                >
                  {est}
                </button>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  )
}
