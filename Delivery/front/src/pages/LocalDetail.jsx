import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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

export default function LocalDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const toast = useToast()
  const token = localStorage.getItem('token')
  const esAdmin = getRole() === 'admin'
  const [local, setLocal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editProduct, setEditProduct] = useState(null)
  const [form, setForm] = useState({ name: '', description: '', price: '', category: '', imageUrl: '' })
  const [formError, setFormError] = useState('')
  const [uploading, setUploading] = useState(false)

  const cargar = () => {
    setLoading(true)
    axios.get(`${API}/locals/${id}`)
      .then(res => { setLocal(res.data); setLoading(false) })
      .catch(() => { setLoading(false); navigate('/') })
  }

  useEffect(cargar, [id])

  const abrirNuevo = () => {
    setEditProduct(null)
    setForm({ name: '', description: '', price: '', category: '', imageUrl: '' })
    setShowForm(true)
    setFormError('')
  }

  const abrirEditar = (p) => {
    setEditProduct(p)
    setForm({ name: p.name, description: p.description || '', price: Number(p.price), category: p.category || '', imageUrl: p.imageUrl || '' })
    setShowForm(true)
    setFormError('')
  }

  const handleFile = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (!file.type.startsWith('image/')) { toast('Solo se permiten imágenes', 'error'); return }
    setUploading(true)
    setFormError('')
    try {
      const fd = new FormData()
      fd.append('image', file)
      const res = await axios.post(`${API}/upload`, fd, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
      })
      setForm(prev => ({ ...prev, imageUrl: res.data.url }))
      toast('Imagen subida', 'success')
    } catch (err) {
      toast(err.response?.data?.message || 'Error al subir imagen', 'error')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.price) {
      setFormError('Nombre y precio son obligatorios')
      return
    }
    try {
      const data = { ...form, price: parseFloat(form.price) }
      if (editProduct) {
        await axios.put(`${API}/products/${editProduct.id}`, data, {
          headers: { Authorization: `Bearer ${token}` }
        })
        toast('Producto actualizado', 'success')
      } else {
        await axios.post(`${API}/products/local/${id}`, data, {
          headers: { Authorization: `Bearer ${token}` }
        })
        toast('Producto creado', 'success')
      }
      setShowForm(false)
      setEditProduct(null)
      cargar()
    } catch (err) {
      setFormError(err.response?.data?.message || 'Error al guardar')
    }
  }

  const eliminar = async (productId) => {
    try {
      await axios.delete(`${API}/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      toast('Producto eliminado', 'success')
      cargar()
    } catch (err) {
      toast(err.response?.data?.message || 'Error al eliminar', 'error')
    }
  }

  if (loading) {
    return (
      <div className="container">
        <div className="skeleton-detail">
          <div className="skeleton-img" />
          <div className="skeleton-lines"><div /><div /><div /></div>
        </div>
      </div>
    )
  }
  if (!local) return null

  const products = local.Products || []

  return (
    <div className="container">
      <button className="btn-back" onClick={() => navigate('/')}>← Volver</button>

      <div className="detail-header">
        {local.imageUrl && <img src={local.imageUrl} alt={local.name} className="detail-img" />}
        <div className="detail-info">
          <h1>{local.name}</h1>
          {local.category && <span className="badge">{local.category}</span>}
          {local.description && <p className="desc">{local.description}</p>}
          <p className="address">📍 {local.address}</p>
          {local.phone && <p className="phone">📞 {local.phone}</p>}
          {local.openingHours && <p className="hours">🕐 {local.openingHours}</p>}
        </div>
      </div>

      <div className="menu-section">
        <div className="menu-header">
          <h2>🍽️ Menú ({products.length} productos)</h2>
          {esAdmin && <button onClick={abrirNuevo}>+ Agregar producto</button>}
        </div>

        {showForm && (
          <div className="product-form">
            <h3>{editProduct ? 'Editar producto' : 'Nuevo producto'}</h3>
            {formError && <p className="error">{formError}</p>}
            <form onSubmit={handleSubmit}>
              <input
                placeholder="Nombre del producto *"
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
                required
              />
              <textarea
                placeholder="Descripción"
                value={form.description}
                onChange={e => setForm({...form, description: e.target.value})}
                rows={2}
              />
              <input
                placeholder="Precio *"
                type="number"
                step="0.01"
                min="0"
                value={form.price}
                onChange={e => setForm({...form, price: e.target.value})}
                required
              />
              <input
                placeholder="Categoría (ej: pizza, bebida, postre)"
                value={form.category}
                onChange={e => setForm({...form, category: e.target.value})}
              />
              <div className="upload-group">
                <label>Imagen del producto</label>
                <input type="file" accept="image/*" onChange={handleFile} disabled={uploading} />
                {uploading && <p className="uploading">Subiendo...</p>}
                {form.imageUrl && (
                  <div className="upload-preview">
                    <img src={form.imageUrl} alt="Preview" />
                    <button type="button" className="btn-remove-image" onClick={() => setForm(prev => ({...prev, imageUrl: ''}))}>
                      Quitar imagen
                    </button>
                  </div>
                )}
              </div>
              <div className="form-actions">
                <button type="submit" disabled={uploading}>
                  {uploading ? 'Subiendo...' : editProduct ? 'Guardar cambios' : 'Crear producto'}
                </button>
                <button type="button" className="btn-secondary" onClick={() => setShowForm(false)}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {products.length === 0 && !showForm ? (
          <div className="empty-state">
            <span className="empty-icon">📋</span>
            <p>{esAdmin ? 'Este local no tiene productos. ¡Agregá el primero!' : 'Este local aún no tiene productos en su menú'}</p>
          </div>
        ) : (
          <div className="product-list">
            {products.map(p => (
              <div key={p.id} className="product-card">
                <div className="product-info">
                  <div className="product-info-top">
                    {p.imageUrl && <img src={p.imageUrl} alt={p.name} className="product-thumb" />}
                    <div>
                      <h4>{p.name}</h4>
                      {p.description && <p className="desc">{p.description}</p>}
                    </div>
                  </div>
                </div>
                <div className="product-right">
                  <div className="product-price">
                    <span>${Number(p.price).toFixed(2)}</span>
                  </div>
                  {esAdmin && (
                    <div className="product-actions">
                      <button className="btn-sm" onClick={() => abrirEditar(p)}>Editar</button>
                      <button className="btn-sm btn-danger" onClick={() => eliminar(p.id)}>×</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
