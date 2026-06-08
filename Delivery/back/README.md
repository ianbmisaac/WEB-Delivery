<div align="center">
  <h1>Delivery — API Backend</h1>
  <p><strong>API RESTful para sistema de gestión de pedidos de delivery</strong></p>
  <p>
    <img src="https://img.shields.io/badge/Node.js-26-339933?logo=node.js&logoColor=white" alt="Node.js 26">
    <img src="https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white" alt="Express 5">
    <img src="https://img.shields.io/badge/Sequelize-6-52B0E7?logo=sequelize&logoColor=white" alt="Sequelize 6">
    <img src="https://img.shields.io/badge/PostgreSQL-18-4169E1?logo=postgresql&logoColor=white" alt="PostgreSQL 18">
    <img src="https://img.shields.io/badge/JWT-auth-d63aff?logo=jsonwebtokens&logoColor=white" alt="JWT">
  </p>
</div>

---

## 📋 Requisitos previos

- **Node.js** 26 o superior
- **PostgreSQL** 18 o superior
- **npm** 9 o superior

---

## 🚀 Instalación y ejecución local

```bash
# 1. Clonar el repositorio
git clone <url-del-repo>
cd Delivery/back

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con las credenciales de tu base de datos

# 4. Crear la base de datos
createdb -U postgres delivery_db

# 5. Ejecutar migraciones
npm run db:migrate

# 6. Iniciar servidor (desarrollo)
npm run dev
```

El servidor se iniciará en `http://localhost:3000`.

---

## 🔧 Variables de entorno

| Variable | Descripción | Local | Producción (Railway) |
|----------|-------------|-------|---------------------|
| `DATABASE_URL` | Connection string PostgreSQL | `postgresql://user:pass@localhost:5432/delivery_db` | Se inyecta automáticamente |
| `DB_HOST` | Host de BD | `localhost` | — |
| `DB_PORT` | Puerto de BD | `5432` | — |
| `DB_NAME` | Nombre de la BD | `delivery_db` | — |
| `DB_USER` | Usuario de BD | `postgres` | — |
| `DB_PASSWORD` | Contraseña de BD | *(según tu instalación)* | — |
| `JWT_SECRET` | Clave secreta para firmar tokens JWT | `dev_secret_...` | Configurar en panel Railway |
| `PORT` | Puerto del servidor | `3000` | Railway lo inyecta |
| `NODE_ENV` | Entorno | `development` | `production` |
| `CORS_ORIGIN` | URL del frontend permitida | `http://localhost:5173` | URL pública del front |
| `VITE_API_URL` | URL de la API (para el frontend) | `http://localhost:3000/api` | URL pública de la API |

### Configuración en producción (Railway)

1. Crear proyecto en Railway y añadir servicio PostgreSQL
2. Copiar `DATABASE_URL` generada por Railway
3. Configurar las variables en el panel de Railway (sin archivo `.env`)
4. El backend usará `DATABASE_URL` automáticamente en producción

---

## 📦 Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor con recarga automática (nodemon) |
| `npm start` | Inicia servidor en modo producción |
| `npm run db:migrate` | Ejecuta migraciones pendientes |
| `npm run db:migrate:undo` | Revierte todas las migraciones |
| `npm run db:seed` | Ejecuta seeders (datos de prueba) |

---

## 🗄️ Base de datos

### Migraciones

Las migraciones se encuentran en `migrations/` y se ejecutan con `npm run db:migrate`.

### Modelos actuales

| Modelo | Descripción |
|--------|-------------|
| `User` | Usuarios del sistema (clientes, admins) |
| `Local` | Locales o restaurantes registrados (con `isActive` para borrado lógico) |
| `Product` | Productos de cada local |
| `Order` | Pedidos realizados por los clientes |
| `OrderItem` | Items individuales dentro de un pedido |
| `Deliverer` | Repartidores con ubicación y vehículo |

### Relaciones

- `User` → `Order` (1:N)
- `User` → `Local` (1:N)
- `Local` → `Product` (1:N)
- `Local` → `Order` (1:N)
- `Order` → `OrderItem` (1:N)
- `OrderItem` → `Product` (N:1)
- `Deliverer` → `Order` (1:N)

---

## 🧪 Verificación del servidor

```bash
npm run dev
```

Luego probar:

```bash
curl http://localhost:3000/api/health
# Respuesta esperada: {"status":"ok","timestamp":"..."}
```

---

## 📁 Estructura del proyecto

```
Delivery/back/                # Backend (API REST)
├── config/
│   └── config.js             # Configuración de Sequelize
├── controllers/              # Controladores HTTP
│   ├── localController.js    # CRUD locals + restaurar, inactivos, todas
│   ├── productController.js  # CRUD productos
│   ├── orderController.js
│   └── userController.js
├── middlewares/
│   └── auth.js               # Middleware JWT
├── migrations/               # Migraciones (01- a 09-)
├── models/                   # Modelos Sequelize
│   ├── index.js
│   ├── user.js
│   ├── local.js
│   ├── product.js
│   ├── order.js
│   ├── orderitem.js
│   └── deliverer.js
├── routes/                   # Definición de rutas
│   ├── index.js
│   ├── auth.js
│   ├── users.js
│   ├── locals.js
│   ├── orders.js
│   ├── products.js
│   └── upload.js
├── uploads/                  # Imágenes subidas (creado automáticamente)
├── app.js                    # Punto de entrada
├── .env.example              # Plantilla de variables de entorno
├── .sequelizerc              # Configuración de Sequelize CLI
└── package.json
```

---

## 🔐 Autenticación

El sistema usa JWT (JSON Web Tokens) para autenticación:

- **Registro**: `POST /api/auth/register`
- **Login**: `POST /api/auth/login`
- Las rutas protegidas requieren header: `Authorization: Bearer <token>`

---

## 📡 Endpoints de la API

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| GET | `/api/health` | No | Health check |
| GET | `/api` | No | Mensaje de bienvenida |
| POST | `/api/auth/register` | No | Registrar nuevo usuario |
| POST | `/api/auth/login` | No | Iniciar sesión (devuelve JWT) |
| GET | `/api/locals` | No | Listar locales activos |
| GET | `/api/locals/inactivos` | Sí | Listar solo locales inactivos |
| GET | `/api/locals/todas` | Sí | Listar todos los locales (activos e inactivos) |
| GET | `/api/locals/:id` | No | Obtener local + productos |
| POST | `/api/locals` | Sí | Crear local |
| PUT | `/api/locals/:id` | Sí | Actualizar local |
| DELETE | `/api/locals/:id` | Sí | Desactivar local (borrado lógico, o `?force=true` para borrado físico) |
| PATCH | `/api/locals/:id/restore` | Sí | Restaurar local desactivado |
| GET | `/api/products/local/:id` | No | Listar productos de un local |
| GET | `/api/products/:id` | No | Obtener producto por ID |
| POST | `/api/products/local/:id` | Sí | Crear producto en un local |
| PUT | `/api/products/:id` | Sí | Actualizar producto |
| DELETE | `/api/products/:id` | Sí | Eliminar producto |
| POST | `/api/upload` | Sí | Subir imagen |
| GET | `/api/users` | Sí | Listar usuarios |
| GET | `/api/users/:id` | Sí | Obtener usuario |
| POST | `/api/users` | No | Crear usuario |
| PUT | `/api/users/:id` | Sí | Actualizar usuario |
| DELETE | `/api/users/:id` | Sí | Eliminar usuario |
| GET | `/api/orders` | Sí | Listar pedidos |
| GET | `/api/orders/active` | Sí | Listar pedidos activos |
| GET | `/api/orders/:id` | Sí | Obtener pedido |
| POST | `/api/orders` | Sí | Crear pedido |
| PATCH | `/api/orders/:id/status` | Sí | Actualizar estado |
| DELETE | `/api/orders/:id` | Sí | Eliminar pedido |

---

## 📬 Pruebas con Postman

La colección de Postman se encuentra en [`postman/Delivery-API.postman_collection.json`](../postman/Delivery-API.postman_collection.json) (raíz del repo).

Incluye requests organizados por recurso (Auth, Locals, Users, Orders) y casos de error (401, 400, 409, 404). Usa variables de colección `baseUrl` y `token`; el token se guarda automáticamente al ejecutar Login.

---

## ✒️ Autor

**Ian Barria Mercado**

---

<div align="center">
  <sub>Proyecto académico — Universidad, 2026</sub>
</div>
