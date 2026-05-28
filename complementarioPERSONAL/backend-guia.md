# Guía Backend — Paso a Paso

## Stack
- Node.js + Express
- Sequelize ORM + PostgreSQL
- JWT (jsonwebtoken) + bcryptjs
- dotenv, cors

---

## Estructura final del backend

```
server/
├── config/
│   └── database.js
├── models/
│   ├── index.js
│   ├── User.js
│   ├── Local.js
│   ├── Product.js
│   ├── Order.js
│   ├── OrderItem.js
│   └── Deliverer.js
├── routes/
│   ├── auth.routes.js
│   ├── locals.routes.js
│   ├── products.routes.js
│   ├── orders.routes.js
│   └── deliverers.routes.js
├── controllers/
│   ├── auth.controller.js
│   ├── local.controller.js
│   ├── product.controller.js
│   ├── order.controller.js
│   └── deliverer.controller.js
├── services/
│   ├── auth.service.js
│   ├── local.service.js
│   ├── product.service.js
│   ├── order.service.js
│   └── deliverer.service.js
├── middlewares/
│   ├── authenticate.js
│   └── errorHandler.js
├── migrations/
├── seeders/
├── app.js
├── package.json
└── .env.example
```

---

## Paso 1 — Inicializar proyecto backend
- [ ] Crear carpeta `server/` en la raíz
- [ ] `npm init -y` dentro de `server/`
- [ ] `npm install express sequelize pg pg-hstore bcryptjs jsonwebtoken cors dotenv`
- [ ] `npm install -D nodemon`
- [ ] En `package.json` agregar scripts:
  ```json
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  }
  ```

## Paso 2 — Configurar Express (app.js)
- [ ] Importar express, cors, dotenv
- [ ] `dotenv.config()`
- [ ] Configurar CORS con `CORS_ORIGIN` del .env
- [ ] `app.use(express.json())`
- [ ] Montar rutas bajo `/api/v1`
- [ ] Middleware de error al final
- [ ] Exportar app y listen en `PORT`

## Paso 3 — Configurar base de datos (config/database.js)
- [ ] Importar Sequelize
- [ ] Crear instancia con `DATABASE_URL`
- [ ] Configurar dialectOptions para SSL en producción
- [ ] Probar conexión al arrancar
- [ ] Exportar instancia

## Paso 4 — Modelos Sequelize

### User
- [ ] name: STRING, required
- [ ] email: STRING, unique, required
- [ ] password: STRING, required (bcrypt hash)
- [ ] role: ENUM('user', 'admin'), default 'user'

### Local
- [ ] name: STRING, required
- [ ] address: STRING, required
- [ ] phone: STRING
- [ ] category: STRING
- [ ] openingHours: STRING
- [ ] image: STRING (URL)
- [ ] active: BOOLEAN, default true

### Product
- [ ] name: STRING, required
- [ ] description: TEXT
- [ ] price: DECIMAL(10,2), required
- [ ] image: STRING (URL)
- [ ] category: STRING
- [ ] localId: FK → Local

### Order
- [ ] userId: FK → User
- [ ] localId: FK → Local
- [ ] status: ENUM('pendiente','preparando','en_camino','entregado','cancelado'), default 'pendiente'
- [ ] total: DECIMAL(10,2)
- [ ] deliveryAddress: TEXT, required
- [ ] delivererId: FK → Deliverer (nullable)
- [ ] eta: INTEGER (minutos, nullable)

### OrderItem
- [ ] orderId: FK → Order
- [ ] productId: FK → Product
- [ ] quantity: INTEGER, min 1
- [ ] unitPrice: DECIMAL(10,2)

### Deliverer
- [ ] name: STRING, required
- [ ] phone: STRING, required
- [ ] vehicle: STRING
- [ ] available: BOOLEAN, default true

## Paso 5 — Asociaciones
- [ ] Local.hasMany(Product)
- [ ] Product.belongsTo(Local)
- [ ] User.hasMany(Order)
- [ ] Order.belongsTo(User)
- [ ] Local.hasMany(Order)
- [ ] Order.belongsTo(Local)
- [ ] Order.hasMany(OrderItem)
- [ ] OrderItem.belongsTo(Order)
- [ ] Deliverer.hasMany(Order)
- [ ] Order.belongsTo(Deliverer)

## Paso 6 — Migraciones
- [ ] Instalar `sequelize-cli` como devDep
- [ ] Crear `.sequelizerc` apuntando a config, models, migrations
- [ ] Migración: create-users
- [ ] Migración: create-locals
- [ ] Migración: create-products
- [ ] Migración: create-orders
- [ ] Migración: create-order-items
- [ ] Migración: create-deliverers
- [ ] Script en package.json: `"migrate": "npx sequelize-cli db:migrate"`

## Paso 7 — Autenticación (auth.service.js)
- [ ] `register(data)`: validar email único, hash password con bcrypt (10 rounds), crear usuario, devolver JWT
- [ ] `login(email, password)`: buscar usuario, comparar bcrypt, devolver JWT con { id, email, role }
- [ ] `forgotPassword(email)`: generar token aleatorio, guardar en tabla password_reset_tokens con expiración 1h, mostrar en consola/log
- [ ] `resetPassword(token, newPassword)`: validar token, actualizar password, eliminar token

## Paso 8 — Controladores auth
- [ ] POST `/api/v1/auth/register` → 201 + JWT
- [ ] POST `/api/v1/auth/login` → 200 + JWT
- [ ] GET `/api/v1/auth/me` → 200 + datos usuario (protegido)
- [ ] POST `/api/v1/auth/forgot-password` → 200 + mensaje
- [ ] POST `/api/v1/auth/reset-password` → 200 + mensaje

## Paso 9 — Middleware authenticate
- [ ] Extraer token de `Authorization: Bearer <token>`
- [ ] Verificar con jwt.verify
- [ ] Adjuntar `req.user = decoded` al request
- [ ] Si no hay token o inválido → 401

## Paso 10 — CRUD Locales
- [ ] GET `/api/v1/locals` → listar (público, solo activos)
- [ ] GET `/api/v1/locals/:id` → detalle con productos (público)
- [ ] POST `/api/v1/locals` → crear (autenticado)
- [ ] PUT `/api/v1/locals/:id` → actualizar (autenticado)
- [ ] DELETE `/api/v1/locals/:id` → desactivar (soft delete, autenticado)

## Paso 11 — CRUD Productos
- [ ] GET `/api/v1/locals/:localId/products` → listar por local
- [ ] POST `/api/v1/products` → crear (autenticado)
- [ ] PUT `/api/v1/products/:id` → actualizar (autenticado)
- [ ] DELETE `/api/v1/products/:id` → eliminar (autenticado)

## Paso 12 — CRUD Pedidos
- [ ] GET `/api/v1/orders` → listar con filtros query (autenticado)
  - `?status=pendiente&userId=1&localId=2`
- [ ] GET `/api/v1/orders/:id` → detalle con items (autenticado)
- [ ] POST `/api/v1/orders` → crear (autenticado, transacción)
  - Body: { localId, items: [{ productId, quantity }], deliveryAddress }
  - Calcular total automáticamente (rq-06)
  - Usar transacción Sequelize
- [ ] PUT `/api/v1/orders/:id/status` → cambiar estado (autenticado)
  - Validar transiciones válidas
- [ ] DELETE `/api/v1/orders/:id` → cancelar (solo si status=pendiente)

## Paso 13 — Reglas de negocio (rq-05, rq-06)
- [ ] **rq-05:** Si status es 'en_camino' o 'entregado', rechazar cancelación → 409
- [ ] **rq-06:** Calcular total = SUM(items.quantity * products.price) al crear/actualizar pedido

## Paso 14 — Seguimiento y panel (rq-07, rq-08)
- [ ] GET `/api/v1/orders/active` → pedidos con status != 'entregado' y != 'cancelado'
- [ ] Incluir datos de local, repartidor en la respuesta

## Paso 15 — Asignar repartidor + ETA (rq-10)
- [ ] PUT `/api/v1/orders/:id/assign` → body: { delivererId }, marcar repartidor no disponible
- [ ] GET `/api/v1/orders/:id/eta` → devolver ETA (random 15-45 min o calculado)

## Paso 16 — CRUD Repartidores
- [ ] GET `/api/v1/deliverers` → listar (autenticado)
- [ ] POST `/api/v1/deliverers` → crear (autenticado)
- [ ] PUT `/api/v1/deliverers/:id` → actualizar (autenticado)

## Paso 17 — Error handler (GEN-08)
- [ ] Middleware global `errorHandler.js`
- [ ] Formato: `{ error: true, message: "texto", code: "CODIGO" }`
- [ ] Mapear errores Sequelize a 400/409/422
- [ ] 404 para rutas no encontradas
- [ ] 500 sin stack trace en producción (usar `NODE_ENV`)

## Paso 18 — Validaciones (GEN-10)
- [ ] Email único → 409
- [ ] Campos obligatorios en body → 400
- [ ] Tipos de datos incorrectos → 422
- [ ] Mensajes en español

## Paso 19 — Migración extra (GEN-12)
- [ ] Elegir tipo: AC (agregar campo), EC (eliminar), AV (agregar validación), MT (modificar tipo)
- [ ] Ejemplo: agregar campo `deliveryFee` a Orders (AC)
- [ ] Crear migración versionada
- [ ] Actualizar modelo y endpoints
- [ ] Documentar en README

## Paso 20 — Postman (GEN-11)
- [ ] Exportar colección a `postman/delivery-collection.json`
- [ ] Variables de colección: `baseUrl`, `token`
- [ ] Requests organizados en carpetas: Auth, Locals, Products, Orders, Deliverers
- [ ] Incluir casos de error: 401 sin token, 409 cancelar pedido en camino

---

## Resumen de endpoints

| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| POST | /api/v1/auth/register | No | Crear cuenta |
| POST | /api/v1/auth/login | No | Iniciar sesión |
| GET | /api/v1/auth/me | Sí | Perfil actual |
| POST | /api/v1/auth/forgot-password | No | Solicitar reset |
| POST | /api/v1/auth/reset-password | No | Resetear contraseña |
| GET | /api/v1/locals | No | Listar locales |
| GET | /api/v1/locals/:id | No | Detalle local |
| POST | /api/v1/locals | Sí | Crear local |
| PUT | /api/v1/locals/:id | Sí | Actualizar local |
| DELETE | /api/v1/locals/:id | Sí | Desactivar local |
| GET | /api/v1/locals/:localId/products | No | Productos de local |
| POST | /api/v1/products | Sí | Crear producto |
| PUT | /api/v1/products/:id | Sí | Actualizar producto |
| DELETE | /api/v1/products/:id | Sí | Eliminar producto |
| GET | /api/v1/orders | Sí | Listar pedidos (filtros) |
| GET | /api/v1/orders/active | Sí | Pedidos activos |
| GET | /api/v1/orders/:id | Sí | Detalle pedido |
| POST | /api/v1/orders | Sí | Crear pedido |
| PUT | /api/v1/orders/:id/status | Sí | Cambiar estado |
| PUT | /api/v1/orders/:id/assign | Sí | Asignar repartidor |
| GET | /api/v1/orders/:id/eta | Sí | Obtener ETA |
| DELETE | /api/v1/orders/:id | Sí | Cancelar pedido |
| GET | /api/v1/deliverers | Sí | Listar repartidores |
| POST | /api/v1/deliverers | Sí | Crear repartidor |
| PUT | /api/v1/deliverers/:id | Sí | Actualizar repartidor |
