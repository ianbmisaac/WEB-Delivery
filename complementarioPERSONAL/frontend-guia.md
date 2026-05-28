# Guía Frontend — Paso a Paso

## Stack
- React 18 + Vite
- react-router-dom (v6)
- axios

---

## Estructura final del frontend

```
client/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── LocalCard.jsx
│   │   ├── ProductCard.jsx
│   │   ├── OrderCard.jsx
│   │   └── LoadingSpinner.jsx
│   ├── pages/
│   │   ├── Register.jsx
│   │   ├── Login.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── ResetPassword.jsx
│   │   ├── Home.jsx
│   │   ├── LocalDetail.jsx
│   │   ├── Cart.jsx
│   │   ├── CreateOrder.jsx
│   │   ├── MyOrders.jsx
│   │   ├── OrderDetail.jsx
│   │   ├── ActiveOrders.jsx
│   │   ├── ManageLocals.jsx
│   │   └── ManageOrders.jsx
│   ├── services/
│   │   └── api.js
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── index.html
├── vite.config.js
└── package.json
```

---

## Paso 1 — Inicializar proyecto
- [ ] `npm create vite@latest client -- --template react`
- [ ] `cd client && npm install react-router-dom axios`
- [ ] En `vite.config.js` configurar proxy:
  ```js
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
  ```
- [ ] Crear `.env.example`: `VITE_API_URL=http://localhost:3000/api/v1`

## Paso 2 — Servicio API (services/api.js)
- [ ] Crear instancia axios con `baseURL` desde `import.meta.env.VITE_API_URL`
- [ ] Interceptor request: agregar `Authorization: Bearer <token>` desde localStorage
- [ ] Interceptor response: capturar errores globalmente

## Paso 3 — AuthContext (context/AuthContext.jsx)
- [ ] Estado: `user`, `token`, `loading`
- [ ] `login(email, password)`: llamar API, guardar token en localStorage, setear user
- [ ] `register(name, email, password)`: llamar API, guardar token, setear user
- [ ] `logout()`: limpiar localStorage, resetear estado
- [ ] `useEffect`: al montar, leer token de localStorage y obtener /auth/me
- [ ] Proveer contexto en App

## Paso 4 — Componentes comunes (components/)
- [ ] `Navbar.jsx`: logo, enlaces, mostrar/ocultar según auth, botón logout
- [ ] `ProtectedRoute.jsx`: si no autenticado → redirect a /login
- [ ] `LocalCard.jsx`: card con nombre, categoría, dirección, imagen, botón "Ver menú"
- [ ] `ProductCard.jsx`: card con nombre, precio, descripción, botón "Agregar"
- [ ] `OrderCard.jsx`: card con estado, total, fecha, enlace a detalle
- [ ] `LoadingSpinner.jsx`: spinner simple para carga

## Paso 5 — Páginas de autenticación
- [ ] `Register.jsx`: formulario (nombre, email, contraseña, confirmar), validación básica, mostrar errores API
- [ ] `Login.jsx`: formulario (email, contraseña), redirect a / tras éxito, mostrar error 401
- [ ] `ForgotPassword.jsx`: formulario (email), mensaje de confirmación
- [ ] `ResetPassword.jsx`: leer token de URL, formulario (nueva contraseña)

## Paso 6 — Home (Home.jsx)
- [ ] GET /api/v1/locals al montar
- [ ] Grid de LocalCard
- [ ] Buscador/filtro por nombre o categoría (opcional)
- [ ] Loading mientras carga

## Paso 7 — Detalle de Local (LocalDetail.jsx)
- [ ] GET /api/v1/locals/:id al montar
- [ ] Mostrar info del local + lista de productos con ProductCard
- [ ] Botón "Volver" a Home
- [ ] Manejar carrito con estado local (array en useState o context)

## Paso 8 — Carrito (Cart.jsx)
- [ ] Mostrar items agregados con cantidad y subtotal
- [ ] Botón "+" / "-" para cambiar cantidad
- [ ] Botón "Eliminar" item
- [ ] Total general
- [ ] Botón "Continuar" → navegar a CreateOrder

## Paso 9 — Crear Pedido (CreateOrder.jsx)
- [ ] Formulario: dirección de entrega (requerido)
- [ ] Resumen del pedido (items, total)
- [ ] POST /api/v1/orders con items y dirección
- [ ] Mostrar éxito y navegar a OrderDetail

## Paso 10 — Mis Pedidos (MyOrders.jsx)
- [ ] GET /api/v1/orders con filtros (por estado)
- [ ] Lista de OrderCard
- [ ] Filtro por estado (select: todos, pendiente, preparando, en_camino, entregado, cancelado)

## Paso 11 — Detalle de Pedido (OrderDetail.jsx)
- [ ] GET /api/v1/orders/:id
- [ ] Mostrar: estado, local, items, total, dirección, repartidor, ETA
- [ ] Botón "Cancelar pedido" (solo si status es pendiente)
- [ ] Mostrar error 409 si no se puede cancelar
- [ ] Tracking visual del estado (barra de progreso o pasos)

## Paso 12 — Panel Pedidos Activos (ActiveOrders.jsx) — rq-08
- [ ] GET /api/v1/orders/active
- [ ] Tablero tipo kanban o lista con estados
- [ ] Botones para cambiar estado
- [ ] Actualización periódica (opcional)

## Paso 13 — Admin: Gestionar Locales (ManageLocals.jsx)
- [ ] GET /api/v1/locals (incluyendo inactivos si es admin)
- [ ] Tabla con acciones: editar, desactivar/activar
- [ ] Modal o página para crear/editar (formulario con todos los campos)
- [ ] Sección para gestionar productos del local

## Paso 14 — Admin: Gestionar Pedidos (ManageOrders.jsx)
- [ ] GET /api/v1/orders (todos, con filtros)
- [ ] Tabla con acciones: asignar repartidor, cambiar estado
- [ ] Select de repartidores disponibles al asignar

## Paso 15 — Configurar App.jsx con Router
- [ ] Importar BrowserRouter, Routes, Route
- [ ] Layout con Navbar
- [ ] Definir rutas:
  - `/` → Home
  - `/register` → Register
  - `/login` → Login
  - `/forgot-password` → ForgotPassword
  - `/reset-password` → ResetPassword
  - `/local/:id` → LocalDetail
  - `/cart` → Cart (protegida)
  - `/create-order` → CreateOrder (protegida)
  - `/my-orders` → MyOrders (protegida)
  - `/orders/:id` → OrderDetail (protegida)
  - `/active-orders` → ActiveOrders (protegida)
  - `/admin/locals` → ManageLocals (protegida)
  - `/admin/orders` → ManageOrders (protegida)
- [ ] Ruta 404 NotFound

## Paso 16 — Manejo de errores en UI
- [ ] Mostrar toast/alert con mensaje de error de la API
- [ ] 401 → redirect a login
- [ ] 409 → mostrar mensaje de conflicto
- [ ] 422 → mostrar validaciones
- [ ] 500 → mostrar "Error del servidor"

## Paso 17 — Build y deploy
- [ ] `npm run build` genera carpeta `dist/`
- [ ] Variable `VITE_API_URL` apunta a URL de Railway en producción
- [ ] Configurar en Vercel: build command `npm run build`, output `dist`
