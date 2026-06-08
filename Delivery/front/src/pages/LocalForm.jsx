import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
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

export default function LocalForm() {
  const navigate = useNavigate()
  const toast = useToast()
  const { id } = useParams()
  const isEdit = Boolean(id)
  const token = localStorage.getItem('token')
  const role = getRole()

  const [form, setForm] = useState({
    name: '',
    address: '',
    phone: '',
    category: '',
    openingHours: '',
    description: '',
    imageUrl: ''
  })
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!token || role !== 'admin') {
      navigate('/')
      return
    }
    if (isEdit) {
      axios.get(`${API}/locals/${id}`)
        .then(res => {
          const l = res.data
          setForm({
            name: l.name || '',
            address: l.address || '',
            phone: l.phone || '',
            category: l.category || '',
            openingHours: l.openingHours || '',
            description: l.description || '',
            imageUrl: l.imageUrl || ''
          })
          setPreview(l.imageUrl || '')
        })
        .catch(() => navigate('/'))
    }
  }, [id])

  const handleFile = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setError('Solo se permiten imágenes')
      return
    }
    setUploading(true)
    setError('')
    try {
      const fd = new FormData()
      fd.append('image', file)
      const res = await axios.post(`${API}/upload`, fd, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
      })
      setForm(prev => ({ ...prev, imageUrl: res.data.url }))
      setPreview(res.data.url)
      toast('Imagen subida', 'success')
    } catch (err) {
      setError(err.response?.data?.message || 'Error al subir imagen')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      if (isEdit) {
        await axios.put(`${API}/locals/${id}`, form, {
          headers: { Authorization: `Bearer ${token}` }
        })
        toast('Local actualizado', 'success')
      } else {
        await axios.post(`${API}/locals`, form, {
          headers: { Authorization: `Bearer ${token}` }
        })
        toast('Local creado con éxito', 'success')
      }
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Error al guardar')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="container form-page">
      <div className="form-card form-card-wide">
        <h2>{isEdit ? 'Editar local' : 'Nuevo local'}</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="field">
              <label>Nombre del local *</label>
              <input
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
                required
              />
            </div>
            <div className="field">
              <label>Categoría</label>
              <input
                placeholder="ej: pizza, hamburguesa, sushi"
                value={form.category}
                onChange={e => setForm({...form, category: e.target.value})}
              />
            </div>
          </div>
          <div className="field">
            <label>Dirección *</label>
            <input
              value={form.address}
              onChange={e => setForm({...form, address: e.target.value})}
              required
            />
          </div>
          <div className="form-row">
            <div className="field">
              <label>Teléfono</label>
              <input
                value={form.phone}
                onChange={e => setForm({...form, phone: e.target.value})}
              />
            </div>
            <div className="field">
              <label>Horario</label>
              <input
                placeholder="ej: Lun-Sáb 10:00-22:00"
                value={form.openingHours}
                onChange={e => setForm({...form, openingHours: e.target.value})}
              />
            </div>
          </div>
          <div className="field">
            <label>Descripción</label>
            <textarea
              value={form.description}
              onChange={e => setForm({...form, description: e.target.value})}
              rows={3}
            />
          </div>
          <div className="upload-group">
            <label>Imagen del local</label>
            <input type="file" accept="image/*" onChange={handleFile} disabled={uploading} />
            {uploading && <p className="uploading">Subiendo imagen...</p>}
            {preview && (
              <div className="upload-preview">
                <img src={preview} alt="Preview" />
              </div>
            )}
            {preview && (
              <button type="button" className="btn-remove-image" onClick={() => { setPreview(''); setForm(prev => ({...prev, imageUrl: ''})) }}>
                Quitar imagen
              </button>
            )}
          </div>
          <div className="form-actions">
            <button type="submit" disabled={saving || uploading}>
              {saving ? 'Guardando...' : isEdit ? 'Guardar cambios' : 'Crear local'}
            </button>
            <button type="button" className="btn-secondary" onClick={() => navigate('/')}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
