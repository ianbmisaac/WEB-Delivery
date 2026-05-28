# Guía Completa Paso a Paso — Proyecto Delivery

> **Alumno:** Ian Barria Mercado  
> **Tema:** #15 — Pedidos Delivery  
> **Stack:** React 18 + Vite · Node + Express + Sequelize · PostgreSQL · JWT · Railway + Vercel  
> **Total requisitos:** 23 (13 GEN + 10 rq)

---

## Índice

1. [Hito 0 — Inicio del proyecto](#hito-0--inicio-del-proyecto)
2. [Hito 1 — Revisión 20%](#hito-1--revisión-20)
3. [Hito 2 — Revisión 40%](#hito-2--revisión-40)
4. [Hito 3 — Entrega final 100% + Deploy](#hito-3--entrega-final-100--deploy)

---

## Hito 0 — Inicio del proyecto

### Objetivo

Crear la estructura del repositorio, inicializar backend y frontend, conectar la base de datos y dejar todo listo para empezar a codificar.

---

### Paso 1: Crear el repositorio en GitHub

1. Abrí [github.com](https://github.com) e iniciá sesión con tu cuenta (ianbmisaac).
2. Hacé clic en el botón verde **"New"** (o andá a https://github.com/new).
3. **Repository name:** `WEB-Delivery`
4. **Description:** (opcional) "Sistema web para gestión de pedidos de delivery — Proyecto académico"
5. Dejalo en **Public**.
6. **No** marcar "Add a README", "Add .gitignore" ni "Choose a license".
7. Hacé clic en **"Create repository"**.

### Paso 2: Clonar el repositorio en tu máquina

Abrí la terminal en VS Code (`` Ctrl + ò `` o `Terminal > New Terminal`).

```bash
cd ~/Documentos/GitHub
git clone https://github.com/ianbmisaac/WEB-Delivery.git
cd WEB-Delivery
```

### Paso 3: Crear la estructura de carpetas

Dentro del proyecto, creá las carpetas principales:

```bash
mkdir -p Delivery/back Delivery/front datos\ del\ proyecto PlanificacionPERSONAL
```

### Paso 4: Inicializar el backend

```bash
cd Delivery/back
npm init -y
```

Esto crea un `package.json` con valores por defecto.

Ahora instalamos las dependencias necesarias:

```bash
npm install express cors dotenv sequelize pg pg-hstore
npm install --save-dev nodemon sequelize-cli
```

**Explicación de cada dependencia:**

| Dependencia | ¿Para qué sirve? |
|-------------|------------------|
| `express` | Framework web para crear el servidor y las rutas API |
| `cors` | Permite que el frontend (en otro puerto) pueda llamar a la API |
| `dotenv` | Lee variables del archivo `.env` y las pone en `process.env` |
| `sequelize` | ORM para conectar y operar la base de datos PostgreSQL |
| `pg` + `pg-hstore` | Drivers para que Sequelize pueda hablar con PostgreSQL |
| `nodemon` (dev) | Reinicia el servidor automáticamente cuando cambia un archivo |
| `sequelize-cli` (dev) | Herramienta de línea de comandos para migraciones |

### Paso 5: Configurar Sequelize CLI

```bash
npx sequelize-cli init
```

Esto va a crear las carpetas `config/`, `models/`, `migrations/` y `seeders/`.

Pero ojo: Sequelize CLI por defecto genera `config/config.json`, y nosotros vamos a usar un archivo `.js` para poder leer variables de entorno. Así que:

1. Borrá el `config/config.json` que se generó.
2. Creá `config/config.js` con este contenido:

```javascript
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'postgres',
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'postgres',
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'postgres',
  },
};
```

Después, editá `models/index.js` para que cargue `config/config.js` en vez de `config/config.json`. Buscá esta línea:

```javascript
const config = require(__dirname + '/../config/config.json')[env];
```

y cambiala por:

```javascript
const config = require(__dirname + '/../config/config.js')[env];
```

> **¿Por qué?** El archivo `.js` nos permite usar `dotenv` para leer variables de entorno, mientras que `.json` no puede ejecutar código. Es una decisión técnica común en proyectos con Sequelize.

### Paso 6: Crear el archivo .env

```bash
cp .env.example .env   # (todavía no existe, lo creamos)
```

Pero antes tenemos que crearlo. Escribí esto en `.env`:

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=delivery_db
DB_USER=delivery_user
DB_PASSWORD=tu_password_segura
```

Y también creá `.env.example` con los mismos valores pero con comentarios (sin la contraseña real):

```
# PostgreSQL
DB_HOST=localhost        # Host de la base de datos
DB_PORT=5432             # Puerto de PostgreSQL
DB_NAME=delivery_db      # Nombre de la base de datos
DB_USER=delivery_user    # Usuario de la base de datos
DB_PASSWORD=             # Contraseña del usuario (completar localmente)
```

### Paso 7: Configurar la base de datos local

Asegurate de tener PostgreSQL funcionando. En Linux:

```bash
sudo systemctl start postgresql
sudo -u postgres psql
```

Dentro de PostgreSQL, creá el usuario y la base de datos:

```sql
CREATE USER delivery_user WITH PASSWORD 'tu_password_segura';
CREATE DATABASE delivery_db OWNER delivery_user;
\q
```

**Explicación:** El motor de base de datos PostgreSQL necesita un usuario (quien se conecta) y una base de datos (dónde se guardan los datos). Estos valores tienen que coincidir con los del `.env`.

### Paso 8: Editar package.json (scripts)

Abrí `Delivery/back/package.json` y en la sección `"scripts"` agregá:

```json
"scripts": {
  "start": "node app.js",
  "dev": "nodemon app.js",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

### Paso 9: Crear el archivo principal del servidor (app.js)

Creá `Delivery/back/app.js`:

```javascript
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a BD establecida correctamente.');

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al conectar con la BD:', error);
  }
};

start();

module.exports = app;
```

**Explicación línea por línea:**

- `require('dotenv').config()` — Carga las variables del `.env` para usarlas en todo el proyecto.
- `express()` — Crea la aplicación Express (nuestro servidor web).
- `cors()` — Middleware que permite que el frontend (en otro puerto/origen) haga peticiones.
- `express.json()` — Middleware que convierte automáticamente el body de las requests a JSON.
- `GET /api/health` — Endpoint de prueba para verificar que el servidor funciona.
- `sequelize.authenticate()` — Prueba la conexión a la base de datos.
- `app.listen()` — Arranca el servidor en el puerto indicado.

### Paso 10: Crear el modelo User y su migración

```bash
npx sequelize-cli model:generate --name User --attributes name:string,email:string,password:string,role:string
```

Este comando hace dos cosas:
1. Crea el archivo `models/user.js` con la definición del modelo.
2. Crea un archivo de migración en `migrations/` con la estructura de la tabla.

**Explicación:** Una migración es como un "control de versiones" para la base de datos. Te permite crear, modificar o eliminar tablas de forma ordenada y reproducible. Si otro desarrollador (o vos en otra máquina) ejecuta `db:migrate`, va a tener exactamente la misma estructura.

### Paso 11: Ejecutar la migración

```bash
npx sequelize-cli db:migrate
```

Si todo sale bien, vas a ver que la tabla `Users` se creó en PostgreSQL.

### Paso 12: Crear .gitignore en la raíz del proyecto

En la carpeta raíz `WEB-Delivery/`, creá un archivo `.gitignore`:

```
# Node
node_modules/
dist/
build/
.env
.env.*
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Sequelize
*.sqlite

# Sistema
.DS_Store
Thumbs.db

# VSCode
.vscode/
```

> **¿Por qué?** `node_modules/` pesa muchísimo y no debería subirse a GitHub (se regenera con `npm install`). `.env` contiene credenciales secretas. Todo lo que se pueda regenerar no se versiona.

### Paso 13: Inicializar el frontend con Vite + React

```bash
cd ~/Documentos/GitHub/WEB-Delivery/Delivery/front
npm create vite@latest . -- --template react
```

Cuando pregunte, confirmá con Enter. Después:

```bash
npm install
```

Esto instala React, Vite y sus dependencias. El proyecto front ya está listo.

### Paso 14: Verificar que todo funciona

**Backend:**

```bash
cd ~/Documentos/GitHub/WEB-Delivery/Delivery/back
npm run dev
```

Vas a ver en la terminal:

```
Conexión a BD establecida correctamente.
Servidor corriendo en http://localhost:3000
```

**Frontend** (en otra terminal):

```bash
cd ~/Documentos/GitHub/WEB-Delivery/Delivery/front
npm run dev
```

Vas a ver:
```
VITE v6.x.x  ready in XXX ms
Local:   http://localhost:5173/
```

### Paso 15: Hacer commit del Hito 0

```bash
cd ~/Documentos/GitHub/WEB-Delivery
git add .
git commit -m "Hito 0: estructura inicial del proyecto"
git tag -a entrega-hito-0 -m "Hito 0: inicio del proyecto"
git push origin main --tags
```

### Paso 16: Completar el informe de inicio

Usá la plantilla en `datos del proyecto/plantillas/plantilla-informe-hito.md`. Completá con tus datos, marcá Hito 0 y describí lo que hiciste. Guardalo como `informe-hito-0.md` en la raíz del proyecto.

---

## Hito 1 — Revisión 20%

### Objetivo

Tener al menos 5 requisitos desarrollados: GEN-01, GEN-02, GEN-03, rq-01, rq-02.

---

### GEN-01: Estructura del repositorio y README (✓ ya hecho en Hito 0)

En este punto ya tenés:
- README.md con descripción, stack, instrucciones de instalación y ejecución.
- `.gitignore` que excluye `node_modules/`, `.env`, `dist/`, `build/`.
- Estructura `Delivery/back/` + `Delivery/front/` visible.
- Sin secretos en el repo (`.env` está en `.gitignore`).

Solo asegurate de que el README esté completo y se vea profesional.

### GEN-02: Variables de entorno y .env.example (✓ ya hecho en Hito 0)

Verificá que:
- `.env.example` exista en `Delivery/back/` con comentarios.
- `.env` esté en `.gitignore`.
- El README tenga una sección "Variables de Entorno" con tabla explicativa.

### GEN-03: Conexión a BD y migraciones (✓ ya hecho en Hito 0)

Verificá que:
- La conexión se verifique al arrancar la API (lo hace `app.js`).
- Las migraciones estén en `migrations/`.
- El README indique el comando `npx sequelize-cli db:migrate`.

### rq-01: Modelo Local (entidad principal)

**¿Qué es?** Un Local es un restaurante o comercio que ofrece productos para delivery.

**Paso 1: Crear el modelo y migración**

```bash
cd ~/Documentos/GitHub/WEB-Delivery/Delivery/back
npx sequelize-cli model:generate --name Local --attributes name:string,address:string,phone:string,category:string,openingHours:string,image:string,active:boolean
```

**Paso 2: Ejecutar la migración**

```bash
npx sequelize-cli db:migrate
```

Esto crea la tabla `Locals` en la base de datos. Fijate que Sequelize agrega automáticamente `id`, `createdAt` y `updatedAt`.

**Explicación del modelo:**

| Campo | Tipo | ¿Para qué sirve? |
|-------|------|------------------|
| `name` | STRING | Nombre del local/restaurante (ej: "Pizza Hut") |
| `address` | STRING | Dirección física del local |
| `phone` | STRING | Teléfono de contacto |
| `category` | STRING | Categoría (ej: "pizza", "hamburguesa", "china") |
| `openingHours` | STRING | Horario de atención (ej: "10:00-22:00") |
| `image` | STRING | URL de la imagen del local |
| `active` | BOOLEAN | Si el local está activo o desactivado |

### rq-02: Modelo Order + OrderItem (entidad secundaria)

**¿Qué es?** Un Pedido (Order) es la solicitud que hace un cliente. Cada pedido puede tener varios items (OrderItem) que son los productos que pidió.

**Paso 1: Crear modelo Product** (porque OrderItem necesita referenciar un producto)

```bash
npx sequelize-cli model:generate --name Product --attributes name:string,description:text,price:decimal,image:string,LocalId:integer
```

**Paso 2: Crear modelo Order**

```bash
npx sequelize-cli model:generate --name Order --attributes UserId:integer,LocalId:integer,status:string,total:decimal,deliveryAddress:string,deliveryFee:decimal,DelivererId:integer,estimatedDelivery:date
```

**Paso 3: Crear modelo OrderItem**

```bash
npx sequelize-cli model:generate --name OrderItem --attributes OrderId:integer,ProductId:integer,quantity:integer,unitPrice:decimal
```

**Paso 4: Crear modelo Deliverer**

```bash
npx sequelize-cli model:generate --name Deliverer --attributes name:string,phone:string,email:string,vehicle:string,active:boolean,latitude:float,longitude:float
```

**Paso 5: Ejecutar todas las migraciones**

```bash
npx sequelize-cli db:migrate
```

**Paso 6: Definir las asociaciones entre modelos**

Abrí cada modelo y agregá las relaciones.

En `models/local.js`, dentro de `static associate(models)`:

```javascript
static associate(models) {
  Local.hasMany(models.Product, { foreignKey: 'LocalId' });
  Local.hasMany(models.Order, { foreignKey: 'LocalId' });
}
```

En `models/product.js`:

```javascript
static associate(models) {
  Product.belongsTo(models.Local, { foreignKey: 'LocalId' });
  Product.hasMany(models.OrderItem, { foreignKey: 'ProductId' });
}
```

En `models/order.js`:

```javascript
static associate(models) {
  Order.belongsTo(models.User, { foreignKey: 'UserId' });
  Order.belongsTo(models.Local, { foreignKey: 'LocalId' });
  Order.belongsTo(models.Deliverer, { foreignKey: 'DelivererId' });
  Order.hasMany(models.OrderItem, { foreignKey: 'OrderId' });
}
```

En `models/orderitem.js`:

```javascript
static associate(models) {
  OrderItem.belongsTo(models.Order, { foreignKey: 'OrderId' });
  OrderItem.belongsTo(models.Product, { foreignKey: 'ProductId' });
}
```

En `models/deliverer.js`:

```javascript
static associate(models) {
  Deliverer.hasMany(models.Order, { foreignKey: 'DelivererId' });
}
```

En `models/user.js`:

```javascript
static associate(models) {
  User.hasMany(models.Order, { foreignKey: 'UserId' });
}
```

**Explicación de las relaciones:**

| Relación | Tipo | Significado |
|----------|------|-------------|
| Local → Product | 1:N | Un local tiene muchos productos |
| Local → Order | 1:N | Un local recibe muchos pedidos |
| Order → User | N:1 | Un pedido pertenece a un cliente |
| Order → Deliverer | N:1 | Un pedido es asignado a un repartidor |
| Order → OrderItem | 1:N | Un pedido tiene muchas líneas de items |
| Product → OrderItem | 1:N | Un producto aparece en muchas líneas de pedidos |
| Deliverer → Order | 1:N | Un repartidor tiene muchos pedidos asignados |

### Completar la matriz de avance

Copiá `datos del proyecto/plantillas/plantilla-matriz-avance.md` a la raíz, nombrala como `matriz-avance-hito-1.md`, y marcar:
- GEN-01, GEN-02, GEN-03, rq-01, rq-02 como "desarrollado".

### Tag del Hito 1

```bash
cd ~/Documentos/GitHub/WEB-Delivery
git add .
git commit -m "Hito 1: modelos Local, Product, Order, OrderItem, Deliverer"
git tag -a entrega-hito-1 -m "Hito 1: revisión 20%"
git push origin main --tags
```

---

## Hito 2 — Revisión 40%

### Objetivo

Al menos 10 requisitos: los 5 del Hito 1 + GEN-04, GEN-05, GEN-06, rq-03, rq-08.

---

### GEN-04: Registro de usuario (sign up)

**Backend — Crear ruta de autenticación**

Primero instalá bcrypt para hashear contraseñas y jsonwebtoken para los tokens:

```bash
cd ~/Documentos/GitHub/WEB-Delivery/Delivery/back
npm install bcryptjs jsonwebtoken
```

Creá la carpeta `routes/` y el archivo `routes/auth.js`:

```javascript
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: true, message: 'Todos los campos son obligatorios' });
    }

    const existe = await User.findOne({ where: { email } });
    if (existe) {
      return res.status(409).json({ error: true, message: 'El email ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role: 'cliente' });

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: 'Error del servidor' });
  }
});

module.exports = router;
```

Explicación:
- `bcrypt.hash(password, 10)` — Toma la contraseña en texto plano y la convierte en un hash irreversible. El número 10 es el "costo" de procesamiento (más alto = más seguro pero más lento). Nunca guardamos la contraseña original.
- `User.findOne({ where: { email } })` — Busca si ya existe un usuario con ese email. Si existe, devolvemos 409 (conflicto).
- El código 201 significa "creado exitosamente".

Después conectá la ruta en `app.js`. Agregá antes del `app.listen`:

```javascript
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
```

**Frontend — Pantalla de registro**

En `Delivery/front/src/`, creá la carpeta `pages/` y el archivo `pages/Register.jsx`:

```jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/auth/register', form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrarse');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrarse</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input placeholder="Nombre" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
      <input placeholder="Email" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
      <input placeholder="Contraseña" type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
      <button type="submit">Crear cuenta</button>
    </form>
  );
}
```

Instalá las dependencias del front:

```bash
cd ~/Documentos/GitHub/WEB-Delivery/Delivery/front
npm install axios react-router-dom
```

Configurá el router en `main.jsx` o `App.jsx`:

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### GEN-05: Login y emisión JWT

**Backend — Endpoint de login**

Agregá al final de `routes/auth.js`:

```javascript
// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: true, message: 'Email y contraseña son obligatorios' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: true, message: 'Credenciales inválidas' });
    }

    const valida = await bcrypt.compare(password, user.password);
    if (!valida) {
      return res.status(401).json({ error: true, message: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secreto_temporal',
      { expiresIn: '24h' }
    );

    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: 'Error del servidor' });
  }
});
```

Explicación:
- `bcrypt.compare(password, user.password)` — Compara la contraseña que el usuario escribió con el hash guardado en la BD. Si coinciden, la contraseña es correcta (nunca sabemos la contraseña original).
- `jwt.sign(payload, secret, options)` — Crea un JWT. El payload contiene info del usuario (id, email, rol). El secret es una clave que solo el servidor conoce, usada para firmar el token. `expiresIn: '24h'` hace que el token expire en 24 horas.
- Si el email no existe o la contraseña no coincide, devolvemos **401** (no autorizado) con un mensaje genérico "Credenciales inválidas" para no revelar qué dato está mal.

**Frontend — Pantalla de login**

Creá `pages/Login.jsx`:

```jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Iniciar sesión</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input placeholder="Email" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
      <input placeholder="Contraseña" type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
      <button type="submit">Ingresar</button>
    </form>
  );
}
```

**Logout:** El logout es simplemente borrar el token:

```javascript
localStorage.removeItem('token');
```

**Explicación de localStorage:** Guardamos el token en `localStorage` porque persiste aunque se cierre el navegador. Hay alternativas más seguras (cookies httpOnly) pero para este proyecto académico localStorage es suficiente.

### GEN-06: Middleware de autenticación

Creá la carpeta `middlewares/` y el archivo `middlewares/auth.js`:

```javascript
const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: true, message: 'Token requerido' });
  }

  const token = header.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secreto_temporal');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: true, message: 'Token inválido o expirado' });
  }
}

module.exports = { authenticate };
```

**Explicación:**
- El frontend envía el token en el header `Authorization: Bearer <token>`.
- El middleware extrae el token, lo verifica con `jwt.verify()`, y si es válido, guarda los datos del usuario en `req.user` para que lo usen las rutas siguientes.
- Si no hay token o es inválido, devuelve 401.
- Las rutas públicas (registro, login, health) NO usan este middleware. Las rutas protegidas SÍ.

**Rutas públicas vs protegidas:** En `app.js`, las rutas públicas van antes del middleware global. Un ejemplo:

```javascript
// Rutas públicas (no necesitan token)
app.use('/api/auth', authRoutes);
app.get('/api/health', ...);

// Rutas protegidas (necesitan token)
app.use('/api/locals', authenticate, localsRoutes);
```

### rq-03: CRUD Locales

**Backend — Crear el CRUD de Locales**

Creá `routes/locals.js`:

```javascript
const express = require('express');
const router = express.Router();
const { Local, Product } = require('../models');
const { authenticate } = require('../middlewares/auth');

// GET /api/locals — Listar todos los locales activos
router.get('/', async (req, res) => {
  const locals = await Local.findAll({ where: { active: true } });
  res.json(locals);
});

// GET /api/locals/:id — Obtener un local con sus productos
router.get('/:id', async (req, res) => {
  const local = await Local.findByPk(req.params.id, { include: Product });
  if (!local) {
    return res.status(404).json({ error: true, message: 'Local no encontrado' });
  }
  res.json(local);
});

// POST /api/locals — Crear un local (solo autenticado)
router.post('/', authenticate, async (req, res) => {
  const { name, address, phone, category, openingHours, image } = req.body;
  const local = await Local.create({ name, address, phone, category, openingHours, image, active: true });
  res.status(201).json(local);
});

// PUT /api/locals/:id — Actualizar un local
router.put('/:id', authenticate, async (req, res) => {
  const local = await Local.findByPk(req.params.id);
  if (!local) {
    return res.status(404).json({ error: true, message: 'Local no encontrado' });
  }
  await local.update(req.body);
  res.json(local);
});

// DELETE /api/locals/:id — Desactivar un local (borrado lógico)
router.delete('/:id', authenticate, async (req, res) => {
  const local = await Local.findByPk(req.params.id);
  if (!local) {
    return res.status(404).json({ error: true, message: 'Local no encontrado' });
  }
  await local.update({ active: false });
  res.json({ message: 'Local desactivado' });
});

module.exports = router;
```

**Explicación del CRUD:**

| Método | Endpoint | ¿Qué hace? | Código HTTP |
|--------|----------|------------|-------------|
| GET | /api/locals | Lista todos los locales activos | 200 |
| GET | /api/locals/:id | Muestra un local con sus productos | 200 / 404 |
| POST | /api/locals | Crea un local nuevo | 201 |
| PUT | /api/locals/:id | Actualiza los datos de un local | 200 / 404 |
| DELETE | /api/locals/:id | Desactiva un local (borrado lógico) | 200 / 404 |

**Borrado lógico:** En vez de eliminar el registro de la BD, ponemos `active: false`. Así no se pierde el histórico de pedidos.

Conectá las rutas en `app.js`:

```javascript
const localsRoutes = require('./routes/locals');
app.use('/api/locals', localsRoutes);
```

**Frontend — Listar locales**

Creá `pages/Home.jsx` (conexión a la API real):

```jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [locals, setLocals] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/locals')
      .then(res => setLocals(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Locales</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
        {locals.map(local => (
          <div key={local.id} style={{ border: '1px solid #ccc', padding: '1rem' }}>
            <h3>{local.name}</h3>
            <p>{local.category}</p>
            <p>{local.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

**Explicación de `useEffect`:** Es un hook de React que se ejecuta cuando el componente se monta (aparece en pantalla). Adentro hacemos un `axios.get` a la API para traer los locales. Cuando la respuesta llega, actualizamos el estado `locals` con `setLocals`, y React automáticamente vuelve a renderizar la página con los datos.

### rq-08: Panel de seguimiento de pedidos activos

**Backend — Endpoint para pedidos activos**

Creá `routes/orders.js`:

```javascript
const express = require('express');
const router = express.Router();
const { Order, OrderItem, Product, Local, Deliverer } = require('../models');
const { authenticate } = require('../middlewares/auth');

// GET /api/orders/active — Pedidos activos (pendiente, preparando, en_camino)
router.get('/active', authenticate, async (req, res) => {
  const orders = await Order.findAll({
    where: { status: ['pendiente', 'preparando', 'en_camino'] },
    include: [Local, Deliverer, { model: OrderItem, include: Product }]
  });
  res.json(orders);
});

module.exports = router;
```

Y conectalo en `app.js`:

```javascript
const ordersRoutes = require('./routes/orders');
app.use('/api/orders', ordersRoutes);
```

**Frontend — Panel de pedidos activos**

Creá `pages/Dashboard.jsx`:

```jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:3000/api/orders/active', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);

  const cambiarEstado = async (id, nuevoEstado) => {
    await axios.put(`http://localhost:3000/api/orders/${id}`, { status: nuevoEstado }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const updated = orders.map(o => o.id === id ? { ...o, status: nuevoEstado } : o);
    setOrders(updated);
  };

  return (
    <div>
      <h2>Pedidos activos</h2>
      {orders.map(order => (
        <div key={order.id} style={{ border: '1px solid #ccc', margin: '1rem 0', padding: '1rem' }}>
          <p><strong>Local:</strong> {order.Local?.name}</p>
          <p><strong>Estado:</strong> {order.status}</p>
          <p><strong>Dirección:</strong> {order.deliveryAddress}</p>
          <p><strong>Total:</strong> ${order.total}</p>
          <div>
            {['pendiente', 'preparando', 'en_camino', 'entregado'].map(est => (
              <button key={est} onClick={() => cambiarEstado(order.id, est)} disabled={order.status === est}>
                {est}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
```

**Explicación del estado:** Los pedidos pasan por una secuencia de estados:
1. `pendiente` — El cliente creó el pedido, el local aún no lo procesa.
2. `preparando` — El local está preparando los productos.
3. `en_camino` — Un repartidor recogió el pedido y va hacia el cliente.
4. `entregado` — El cliente recibió el pedido.
5. `cancelado` — El pedido fue cancelado (solo si está en pendiente).

### Completar la matriz de avance

Actualizá la matriz marcando GEN-04, GEN-05, GEN-06, rq-03, rq-08 como "desarrollado". Total: 10/23.

### Tag del Hito 2

```bash
cd ~/Documentos/GitHub/WEB-Delivery
git add .
git commit -m "Hito 2: auth (registro, login, JWT) + CRUD Locales + Dashboard pedidos"
git tag -a entrega-hito-2 -m "Hito 2: revisión 40%"
git push origin main --tags
```

---

## Hito 3 — Entrega final 100% + Deploy

### Objetivo

Completar los 23 requisitos. Los 10 ya hechos + GEN-07, GEN-08, GEN-09, GEN-10, GEN-11, GEN-12, GEN-13, rq-04, rq-05, rq-06, rq-07, rq-09, rq-10.

---

### GEN-07: Restablecer contraseña

**Backend — Flujo de reset**

Crear tabla `password_reset_tokens`:

```bash
npx sequelize-cli model:generate --name PasswordResetToken --attributes email:string,token:string,expiresAt:date,used:boolean
npx sequelize-cli db:migrate
```

Agregar endpoints a `routes/auth.js`:

```javascript
// POST /api/auth/forgot-password
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(404).json({ error: true, message: 'Email no encontrado' });
  }

  const token = crypto.randomBytes(32).toString('hex');
  await PasswordResetToken.create({
    email,
    token,
    expiresAt: new Date(Date.now() + 3600000), // 1 hora
    used: false
  });

  console.log(`Token de reset para ${email}: ${token}`); // En desarrollo se muestra en consola
  res.json({ message: 'Si el email existe, recibirás un token de restablecimiento' });
});

// POST /api/auth/reset-password
router.post('/reset-password', async (req, res) => {
  const { email, token, newPassword } = req.body;

  const resetToken = await PasswordResetToken.findOne({
    where: { email, token, used: false, expiresAt: { [Op.gt]: new Date() } }
  });

  if (!resetToken) {
    return res.status(400).json({ error: true, message: 'Token inválido o expirado' });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await User.update({ password: hashedPassword }, { where: { email } });
  await resetToken.update({ used: true });

  res.json({ message: 'Contraseña restablecida exitosamente' });
});
```

En la cabecera del archivo necesitás importar `crypto` y `Op`:

```javascript
const crypto = require('crypto');
const { Op } = require('sequelize');
```

**Explicación del flujo:**
1. El usuario ingresa su email y pide restablecer la contraseña.
2. El servidor genera un token aleatorio de 32 bytes y lo guarda en la BD con expiración de 1 hora.
3. En desarrollo, el token se muestra en la consola del servidor (en producción se enviaría por email).
4. El usuario ingresa el token, su email y la nueva contraseña.
5. El servidor verifica que el token exista, no esté usado y no haya expirado.
6. Si todo ok, actualiza la contraseña y marca el token como usado (no se puede reutilizar).

**Frontend — Pantallas de reset**

Creá `pages/ForgotPassword.jsx` y `pages/ResetPassword.jsx`.

### GEN-08: Manejo centralizado de errores

En `app.js`, antes del `app.listen`, agregá un middleware de error:

```javascript
// Middleware de error global (debe ir al final, después de todas las rutas)
app.use((err, req, res, next) => {
  console.error(err);

  if (process.env.NODE_ENV === 'production') {
    res.status(500).json({ error: true, message: 'Error interno del servidor' });
  } else {
    res.status(500).json({ error: true, message: err.message, stack: err.stack });
  }
});

// Manejo de 404 — rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: true, message: 'Ruta no encontrada' });
});
```

**Explicación:** Express identifica un middleware de error porque tiene **4 parámetros** `(err, req, res, next)`. Si cualquier ruta tira un error con `next(err)`, este middleware lo captura. En producción no mostramos el stack trace por seguridad.

### GEN-09: CRUD REST completo + pantallas web

Esto se cubre con los CRUD que ya hicimos de Locales (rq-03) y Pedidos (rq-04). Asegurate de que:
- El CRUD API funcione completo (Get All, Get By Id, Create, Update, Delete).
- Las pantallas web correspondientes existan.
- La UI muestre errores de la API (no console.error).

### GEN-10: Validaciones de entrada y reglas HTTP

Agregá validaciones en cada controlador:

```javascript
// Ejemplo de validación en POST /api/locals
router.post('/', authenticate, async (req, res) => {
  const { name, address } = req.body;

  if (!name || name.trim().length === 0) {
    return res.status(422).json({ error: true, message: 'El nombre del local es obligatorio' });
  }

  if (!address || address.trim().length === 0) {
    return res.status(422).json({ error: true, message: 'La dirección es obligatoria' });
  }

  // ... crear local
});
```

**Códigos HTTP que usamos:**

| Código | Significado | ¿Cuándo usarlo? |
|--------|-------------|------------------|
| 200 | OK | Respuesta exitosa |
| 201 | Created | Recurso creado exitosamente |
| 400 | Bad Request | Faltan campos obligatorios |
| 401 | Unauthorized | Token faltante, inválido o credenciales incorrectas |
| 404 | Not Found | Recurso no encontrado |
| 409 | Conflict | Email duplicado, regla de negocio violada |
| 422 | Unprocessable Entity | Dato inválido (ej: nombre vacío) |
| 500 | Internal Server Error | Error inesperado del servidor |

### rq-04: CRUD Pedidos

Similar a rq-03 pero para pedidos. Agregá a `routes/orders.js`:

```javascript
// GET /api/orders — Listar pedidos del usuario autenticado
router.get('/', authenticate, async (req, res) => {
  const orders = await Order.findAll({
    where: { UserId: req.user.id },
    include: [Local, { model: OrderItem, include: Product }]
  });
  res.json(orders);
});

// GET /api/orders/:id — Detalle de un pedido
router.get('/:id', authenticate, async (req, res) => {
  const order = await Order.findByPk(req.params.id, {
    include: [Local, Deliverer, { model: OrderItem, include: Product }]
  });
  if (!order) {
    return res.status(404).json({ error: true, message: 'Pedido no encontrado' });
  }
  res.json(order);
});

// POST /api/orders — Crear pedido (con transacción)
router.post('/', authenticate, async (req, res) => {
  const { LocalId, items, deliveryAddress } = req.body;

  // Validar datos básicos
  if (!LocalId || !items || !items.length || !deliveryAddress) {
    return res.status(400).json({ error: true, message: 'Faltan datos del pedido' });
  }

  // Iniciar transacción
  const t = await sequelize.transaction();
  try {
    let total = 0;

    // Crear cada OrderItem y calcular total
    const orderItems = await Promise.all(items.map(async (item) => {
      const product = await Product.findByPk(item.ProductId, { transaction: t });
      if (!product) {
        throw new Error(`Producto ${item.ProductId} no encontrado`);
      }
      const subtotal = parseFloat(product.price) * item.quantity;
      total += subtotal;
      return { ProductId: item.ProductId, quantity: item.quantity, unitPrice: product.price };
    }));

    // Crear la orden
    const order = await Order.create({
      UserId: req.user.id,
      LocalId,
      status: 'pendiente',
      total,
      deliveryAddress,
      deliveryFee: 0
    }, { transaction: t });

    // Crear los items asociados
    await Promise.all(orderItems.map(oi =>
      OrderItem.create({ ...oi, OrderId: order.id }, { transaction: t })
    ));

    await t.commit();
    res.status(201).json(order);
  } catch (error) {
    await t.rollback();
    res.status(500).json({ error: true, message: error.message || 'Error al crear pedido' });
  }
});
```

**Explicación de transacciones:** Cuando creamos un pedido, tenemos que hacer varias operaciones: crear la orden, crear cada item, calcular el total. Si alguna falla (ej: un producto no existe), hacemos `rollback()` para que ninguna operación se guarde a medias. Es como decir "todo o nada". Así la BD nunca queda en un estado inconsistente.

**Frontend — Crear pedido con carrito**

Creá `pages/CreateOrder.jsx`. El flujo sería:
1. Seleccionar un local.
2. Ver sus productos.
3. Agregar productos a un carrito (estado local).
4. Ingresar dirección de entrega.
5. Confirmar → POST a la API.

### rq-05: No cancelar pedido en en_camino o entregado

En la ruta de cancelar pedido:

```javascript
// PUT /api/orders/:id/cancel
router.put('/:id/cancel', authenticate, async (req, res) => {
  const order = await Order.findByPk(req.params.id);
  if (!order) {
    return res.status(404).json({ error: true, message: 'Pedido no encontrado' });
  }

  if (order.status === 'en_camino' || order.status === 'entregado') {
    return res.status(409).json({
      error: true,
      message: 'No se puede cancelar un pedido que está en camino o ya fue entregado'
    });
  }

  order.status = 'cancelado';
  await order.save();
  res.json(order);
});
```

**Explicación:** Esta es una regla de negocio. No tiene sentido cancelar un pedido que el repartidor ya está llevando o que ya llegó. Devolvemos 409 (conflicto) porque la acción solicitada choca contra el estado actual del recurso.

### rq-06: Total coherente con items

El total se calcula automáticamente al crear el pedido (en la transacción de rq-04). También agregá una validación en el modelo:

En `models/order.js`, agregá una validación custom para que nadie pueda setear un total manualmente. Mejor: que el total se calcule SIEMPRE en el servidor y nunca se confíe en lo que envía el cliente.

### rq-07: Filtros: pedidos por estado o cliente

En la ruta GET /api/orders, agregá filtros por query params:

```javascript
// GET /api/orders — con filtros opcionales
router.get('/', authenticate, async (req, res) => {
  const where = {};

  // Filtro por estado
  if (req.query.status) {
    where.status = req.query.status;
  }

  // Filtro por cliente (solo admin, o el propio usuario)
  if (req.query.userId) {
    where.UserId = req.query.userId;
  } else {
    where.UserId = req.user.id; // Por defecto, solo sus pedidos
  }

  const orders = await Order.findAll({
    where,
    include: [Local, Deliverer, { model: OrderItem, include: Product }]
  });
  res.json(orders);
});
```

**Frontend:** Agregá un `<select>` para filtrar por estado y un input para buscar por cliente.

### rq-09: Flujo transaccional: crear pedido con dirección + items + tracking

Cubierto con el POST /api/orders y la transacción. Agregá tracking en el front con una barra de progreso:

```jsx
function OrderStatus({ status }) {
  const estados = ['pendiente', 'preparando', 'en_camino', 'entregado'];
  const actual = estados.indexOf(status);

  return (
    <div style={{ display: 'flex', gap: '0.5rem', margin: '1rem 0' }}>
      {estados.map((est, i) => (
        <div key={est} style={{
          padding: '0.5rem 1rem',
          background: i <= actual ? '#4CAF50' : '#ddd',
          color: i <= actual ? 'white' : 'black',
          borderRadius: '4px'
        }}>
          {est}
        </div>
      ))}
    </div>
  );
}
```

### rq-10: Asignar repartidor + ETA simulado

**Backend — Asignar repartidor**

```javascript
// PUT /api/orders/:id/assign
router.put('/:id/assign', authenticate, async (req, res) => {
  const { delivererId } = req.body;
  const order = await Order.findByPk(req.params.id);

  if (!order) {
    return res.status(404).json({ error: true, message: 'Pedido no encontrado' });
  }

  const deliverer = await Deliverer.findByPk(delivererId);
  if (!deliverer || !deliverer.active) {
    return res.status(400).json({ error: true, message: 'Repartidor no disponible' });
  }

  // ETA simulado: entre 15 y 45 minutos
  const etaMinutes = Math.floor(Math.random() * 30) + 15;
  const estimatedDelivery = new Date(Date.now() + etaMinutes * 60000);

  await order.update({
    DelivererId: delivererId,
    status: 'en_camino',
    estimatedDelivery
  });

  res.json({
    order,
    deliverer: { name: deliverer.name, phone: deliverer.phone, vehicle: deliverer.vehicle },
    eta: `${etaMinutes} minutos`
  });
});
```

**Frontend — Mostrar repartidor y ETA**

En el detalle del pedido, mostrá:

```jsx
{order.Deliverer && (
  <div>
    <h3>Repartidor asignado</h3>
    <p>Nombre: {order.Deliverer.name}</p>
    <p>Vehículo: {order.Deliverer.vehicle}</p>
    <p>ETA: {order.estimatedDelivery ? new Date(order.estimatedDelivery).toLocaleTimeString() : '—'}</p>
  </div>
)}
```

### GEN-11: Colección Postman

1. Abrí Postman.
2. Creá una colección llamada "Delivery App".
3. Definí variables de colección: `baseUrl` = `http://localhost:3000/api`, `token` = vacío.
4. Agregá requests:
   - **Register** — POST `{{baseUrl}}/auth/register`
   - **Login** — POST `{{baseUrl}}/auth/login`
   - **Get Locals** — GET `{{baseUrl}}/locals`
   - **Create Local** — POST `{{baseUrl}}/locals` (con token)
   - **Get Active Orders** — GET `{{baseUrl}}/orders/active` (con token)
   - **Cancel Order** — PUT `{{baseUrl}}/orders/1/cancel` (con token, caso 409)
   - **Sin Token** — GET `{{baseUrl}}/locals` (sin token, caso 401)
5. En el request de Login, agregá un script de prueba que guarde el token automáticamente:

```javascript
pm.collectionVariables.set("token", pm.response.json().token);
```
6. Exportá la colección como JSON y guardala en `Delivery/back/postman/coleccion.json`.

### GEN-12: Evolución de esquema

Agregá un cambio al esquema. Por ejemplo, agregar un campo `description` a la tabla `Locals`:

```bash
npx sequelize-cli migration:generate --name add-description-to-locals
```

Editá el archivo generado en `migrations/`:

```javascript
'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Locals', 'description', {
      type: Sequelize.TEXT,
      allowNull: true
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Locals', 'description');
  }
};
```

Ejecutá la migración:

```bash
npx sequelize-cli db:migrate
```

Documentá en el README que se agregó el campo `description` a la tabla `Locals` para permitir descripciones más largas de los locales.

### GEN-13: Deploy Railway (API+BD) + Vercel (Front)

**Paso 1: Preparar Railway**

1. Andá a [railway.app](https://railway.app) e iniciá sesión con GitHub.
2. Hacé clic en **"New Project"**.
3. Seleccioná **"Deploy from GitHub repo"**.
4. Elegí `ianbmisaac/WEB-Delivery`.
5. Railway detecta el `package.json` y despliega automáticamente.
6. Configurá el **Start Command** como `node app.js`.
7. Agregá un servicio PostgreSQL desde **"New" > "Database" > "Add PostgreSQL"**.
8. En las variables de entorno del servicio API, agregá:
   - `DATABASE_URL` — Copiala del plugin PostgreSQL.
   - `JWT_SECRET` — Un string largo y aleatorio.
   - `NODE_ENV` = `production`
   - `CORS_ORIGIN` = URL del front (después del deploy).
9. Ejecutá las migraciones en Railway:
   - Conectate por Railway CLI: `railway login && railway run "npx sequelize-cli db:migrate"`.
   - O desde el panel: **"Connect" > "Railway CLI"** y seguí las instrucciones.

**Paso 2: Preparar el front para producción**

Creá un archivo `.env` en `Delivery/front/`:

```
VITE_API_URL=https://tu-api.up.railway.app/api
```

**Paso 3: Desplegar front en Vercel**

1. Andá a [vercel.com](https://vercel.com) e iniciá sesión con GitHub.
2. **"Add New..." > "Project"**.
3. Elegí el repositorio `ianbmisaac/WEB-Delivery`.
4. **Root Directory:** `Delivery/front`
5. **Framework Preset:** Vite
6. **Environment Variables:** `VITE_API_URL` = la URL de la API en Railway.
7. **"Deploy"**.

**Paso 4: Configurar CORS**

En el backend, configurá CORS dinámicamente:

```javascript
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
```

**Paso 5: Verificar**

1. Abrí la URL del front en Vercel.
2. Registrate, iniciá sesión, explorá locales, creá un pedido.
3. Todo debe funcionar contra la API en Railway.

### Completar la matriz de avance final

Marcá los 23 requisitos como "desarrollado". Total: 23/23.

### README con URLs de producción

Actualizá el README raíz con las URLs de producción:

```markdown
## URLs de Producción

- **API:** https://tu-api.up.railway.app
- **Frontend:** https://tu-app.vercel.app
- **Plataforma frontend:** Vercel
```

### Tag final

```bash
cd ~/Documentos/GitHub/WEB-Delivery
git add .
git commit -m "Hito 3: proyecto completo + deploy"
git tag -a entrega-hito-3 -m "Hito 3: entrega final 100%"
git push origin main --tags
```

---

## Resumen de comandos rápidos

### Backend

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Iniciar servidor de desarrollo |
| `npx sequelize-cli db:migrate` | Ejecutar migraciones |
| `npx sequelize-cli db:seed:all` | Ejecutar seeders |
| `npx sequelize-cli migration:generate --name descripcion` | Crear migración nueva |

### Frontend

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Iniciar servidor de desarrollo |
| `npm run build` | Compilar para producción |
| `npm run preview` | Vista previa de build |

### Git

| Comando | Descripción |
|---------|-------------|
| `git add . && git commit -m "mensaje"` | Commitear cambios |
| `git push origin main` | Subir cambios a GitHub |
| `git tag -a entrega-hito-X -m "mensaje"` | Crear tag de hito |
| `git push origin main --tags` | Subir tags a GitHub |

---

## Checklist de entregables por hito

### Hito 0
- [ ] Repositorio en GitHub con estructura back/ + front/
- [ ] Backend con Express + Sequelize funcionando
- [ ] Frontend con Vite + React funcionando
- [ ] Conexión a BD PostgreSQL verificada
- [ ] Migración inicial (tabla Users)
- [ ] `.gitignore` en raíz
- [ ] `.env.example` documentado
- [ ] READMEs profesionales
- [ ] Informe de inicio completado
- [ ] Tag `entrega-hito-0`

### Hito 1
- [ ] GEN-01: README completo
- [ ] GEN-02: Variables de entorno
- [ ] GEN-03: BD y migraciones
- [ ] rq-01: Modelo Local
- [ ] rq-02: Modelo Order + OrderItem
- [ ] Matriz con ≥5 requisitos
- [ ] Tag `entrega-hito-1`

### Hito 2
- [ ] GEN-04: Registro
- [ ] GEN-05: Login JWT
- [ ] GEN-06: Middleware auth
- [ ] rq-03: CRUD Locales con UI
- [ ] rq-08: Dashboard pedidos activos
- [ ] Matriz con ≥10 requisitos
- [ ] Demo local (capturas/video)
- [ ] Tag `entrega-hito-2`

### Hito 3
- [ ] GEN-07: Reset contraseña
- [ ] GEN-08: Error handler
- [ ] GEN-09: CRUD + UI completo
- [ ] GEN-10: Validaciones HTTP
- [ ] GEN-11: Postman exportado
- [ ] GEN-12: Migración extra
- [ ] GEN-13: Deploy Railway + Vercel
- [ ] rq-04: CRUD Pedidos
- [ ] rq-05: No cancelar en camino
- [ ] rq-06: Total coherente
- [ ] rq-07: Filtros por estado/cliente
- [ ] rq-09: Flujo crear pedido completo
- [ ] rq-10: Asignar repartidor + ETA
- [ ] Matriz 23/23
- [ ] URLs producción en README
- [ ] Tag `entrega-hito-3`

---

> **Tip final:** Hacé commits chicos y frecuentes. Cada vez que termines una funcionalidad, commiteá. No esperes al final del hito para hacer un solo commit gigante. Así podés volver atrás si algo se rompe.
