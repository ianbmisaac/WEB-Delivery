# Guía Completa Paso a Paso — Proyecto Delivery

> **Alumno:** Ian Barria Mercado  
> **Tema:** #15 — Pedidos Delivery  
> **Stack:** React 19 + Vite 8 · Node + Express 5 + Sequelize 6 · PostgreSQL · JWT · Railway + Vercel  
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

1. Andá a [github.com](https://github.com) e iniciá sesión.
2. Hacé clic en el botón verde **"New"**.
3. **Repository name:** `WEB-Delivery`
4. **Description:** "Sistema web para gestión de pedidos de delivery — Proyecto académico"
5. Dejalo en **Public**.
6. **No** marcar "Add a README", "Add .gitignore" ni "Choose a license".
7. Hacé clic en **"Create repository"**.

### Paso 2: Clonar el repositorio en tu máquina

```bash
cd C:\Users\Yan\Documents\GitHub
git clone https://github.com/ianbmisaac/WEB-Delivery.git
cd WEB-Delivery
```

### Paso 3: Crear la estructura de carpetas

```bash
mkdir -p Delivery\back Delivery\front "datos del proyecto" complementarioPERSONAL
```

### Paso 4: Inicializar el backend

```bash
cd Delivery\back
npm init -y
```

Instalar las dependencias:

```bash
npm install express cors dotenv sequelize pg pg-hstore bcryptjs jsonwebtoken
npm install --save-dev nodemon sequelize-cli
```

| Dependencia | ¿Para qué sirve? |
|-------------|------------------|
| `express` | Framework web para crear el servidor y rutas API |
| `cors` | Permite que el frontend (otro puerto) llame a la API |
| `dotenv` | Lee variables del archivo `.env` |
| `sequelize` | ORM para conectar y operar PostgreSQL |
| `pg` + `pg-hstore` | Drivers para que Sequelize hable con PostgreSQL |
| `bcryptjs` | Hashea contraseñas |
| `jsonwebtoken` | Crea y verifica tokens JWT |
| `nodemon` (dev) | Reinicia el servidor automáticamente al cambiar archivos |
| `sequelize-cli` (dev) | Herramienta de línea de comandos para migraciones |

### Paso 5: Configurar Sequelize CLI

```bash
npx sequelize-cli init
```

Esto crea: `config/`, `models/`, `migrations/`, `seeders/`.

Borrá `config\config.json` y creá `config\config.js`:

```javascript
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'delivery_db',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
  },
  test: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'delivery_db',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
```

Editá `models/index.js` y cambiá esta línea:

```javascript
const config = require(__dirname + '/../config/config.json')[env];
```

por:

```javascript
const config = require(__dirname + '/../config/config.js')[env];
```

### Paso 6: Crear el archivo .env y .env.example

Creá `Delivery\back\.env`:

```env
DATABASE_URL=postgresql://postgres@localhost:5432/delivery_db
DB_HOST=localhost
DB_PORT=5432
DB_NAME=delivery_db
DB_USER=postgres
DB_PASSWORD=

JWT_SECRET=dev_secret_no_usar_en_produccion_12345

PORT=3000
NODE_ENV=development

CORS_ORIGIN=http://localhost:5173

VITE_API_URL=http://localhost:3000/api
```

Creá `Delivery\back\.env.example` (sin secretos):

```env
# === Base de datos PostgreSQL ===
DATABASE_URL=postgresql://usuario:password@localhost:5432/delivery_db
DB_HOST=localhost
DB_PORT=5432
DB_NAME=delivery_db
DB_USER=postgres
DB_PASSWORD=

# === Seguridad JWT ===
JWT_SECRET=cambia_esto_por_un_secreto_seguro

# === Servidor ===
PORT=3000
NODE_ENV=development

# === CORS ===
CORS_ORIGIN=http://localhost:5173

# === URL de la API para el frontend ===
VITE_API_URL=http://localhost:3000/api
```

### Paso 7: Editar package.json (scripts)

En `Delivery\back\package.json`, dejá los scripts así:

```json
"scripts": {
  "start": "node app.js",
  "dev": "nodemon app.js",
  "db:migrate": "npx sequelize-cli db:migrate",
  "db:migrate:undo": "npx sequelize-cli db:migrate:undo:all",
  "db:seed": "npx sequelize-cli db:seed:all"
}
```

### Paso 8: Configurar PostgreSQL

Verificá que PostgreSQL esté instalado y el servicio corriendo:

```powershell
# Verificar servicio
Get-Service -Name postgresql*
# Verificar que acepta conexiones
& "C:\Program Files\PostgreSQL\18\bin\pg_isready.exe"
```

Crear la base de datos:

```powershell
& "C:\Program Files\PostgreSQL\18\bin\createdb.exe" -U postgres delivery_db
```

### Paso 9: Crear la estructura de rutas

Crear las carpetas necesarias:

```bash
mkdir Delivery\back\routes Delivery\back\controllers Delivery\back\middlewares
```

### Paso 10: Crear el archivo principal del servidor (app.js)

Creá `Delivery\back\app.js`:

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
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api', require('./routes'));

// Middleware de error global
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: true, message: 'Error interno del servidor' });
});

// 404 para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: true, message: 'Ruta no encontrada' });
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

### Paso 11: Crear .sequelizerc

Creá `Delivery\back\.sequelizerc`:

```javascript
const path = require('path');

module.exports = {
  config: path.resolve('config', 'config.js'),
  'models-path': path.resolve('models'),
  'migrations-path': path.resolve('migrations'),
  'seeders-path': path.resolve('seeders'),
};
```

### Paso 12: Crear el modelo User y su migración

```bash
cd Delivery\back
npx sequelize-cli model:generate --name User --attributes name:string,email:string,password:string,role:string
```

Renombrá la migración generada para controlar el orden:

```bash
cd migrations
ren 202*create-user.js 01-create-user.js
```

Editá `models\user.js` para agregar asociaciones y validaciones:

```javascript
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Order, { foreignKey: 'UserId' });
      User.hasMany(models.Local, { foreignKey: 'UserId' });
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'cliente'
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
```

### Paso 13: Crear .gitignore en la raíz del proyecto

En `WEB-Delivery\.gitignore`:

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

### Paso 14: Inicializar el frontend con Vite + React

```bash
cd Delivery\front
npm create vite@latest . -- --template react
```

Cuando pregunte, confirmá con Enter. Después:

```bash
npm install
npm install axios react-router-dom
```

### Paso 15: Configurar el enrutador de rutas (routes/index.js)

Creá `Delivery\back\routes\index.js`:

```javascript
'use strict';
const router = require('express').Router();

router.get('/', (req, res) => {
  res.json({ message: 'API Delivery v1' });
});

router.use('/auth', require('./auth'));
router.use('/users', require('./users'));
router.use('/locals', require('./locals'));
router.use('/orders', require('./orders'));

module.exports = router;
```

### Paso 16: Verificar que todo funciona

**Backend:**

```bash
cd Delivery\back
npm run db:migrate
npm run dev
```

Vas a ver:

```
Conexión a BD establecida correctamente.
Servidor corriendo en http://localhost:3000
```

**Frontend** (en otra terminal):

```bash
cd Delivery\front
npm run dev
```

Vas a ver:

```
VITE v8.x.x  ready in XXX ms
Local:   http://localhost:5173/
```

### Paso 17: Hacer commit del Hito 0

```bash
cd C:\Users\Yan\Documents\GitHub\WEB-Delivery
git add .
git commit -m "Hito 0: estructura inicial del proyecto"
git tag -a entrega-hito-0 -m "Hito 0: inicio del proyecto"
git push origin main --tags
```

---

## Hito 1 — Revisión 20%

### Objetivo

Tener al menos 5 requisitos: GEN-01, GEN-02, GEN-03, rq-01, rq-02.

### GEN-01: Estructura del repositorio y README

Ya está hecho desde el Hito 0. Verificá que:
- `README.md` tenga descripción, stack, instrucciones de instalación y ejecución.
- `.gitignore` excluya `node_modules/`, `.env`, `dist/`.
- Estructura `Delivery/back/` + `Delivery/front/` visible.
- No haya secretos en el repo (el `.env` está en `.gitignore`).

### GEN-02: Variables de entorno

Ya está hecho. Verificá que:
- `.env.example` exista en `Delivery/back/` con comentarios.
- `.env` esté en `.gitignore`.
- El README tenga tabla de variables de entorno.

### GEN-03: BD y migraciones

Ya está hecho. Verificá que:
- La conexión se verifique al arrancar la API.
- Las migraciones estén en `migrations/`.
- El README indique el comando `npm run db:migrate`.

### rq-01: Modelo Local (entidad principal)

**¿Qué es?** Un Local es un restaurante o comercio que ofrece productos para delivery.

Crear el modelo y migración:

```bash
cd Delivery\back
npx sequelize-cli model:generate --name Local --attributes name:string,address:string,phone:string,category:string,openingHours:string,imageUrl:string,isActive:boolean
```

Renombrar la migración:

```bash
cd migrations
ren 202*create-local.js 02-create-local.js
```

Agregar asociaciones en `models\local.js`:

```javascript
static associate(models) {
  Local.belongsTo(models.User, { foreignKey: 'UserId' });
  Local.hasMany(models.Product, { foreignKey: 'LocalId' });
  Local.hasMany(models.Order, { foreignKey: 'LocalId' });
}
```

Agregar validaciones a los campos en el `Local.init()`:

```javascript
name: {
  type: DataTypes.STRING,
  allowNull: false,
  validate: { notEmpty: true }
},
address: {
  type: DataTypes.STRING,
  allowNull: false,
  validate: { notEmpty: true }
},
phone: DataTypes.STRING,
imageUrl: DataTypes.STRING,
category: DataTypes.STRING,
openingHours: DataTypes.STRING,
isActive: {
  type: DataTypes.BOOLEAN,
  defaultValue: true
}
```

### rq-02: Modelo Order + OrderItem + Product + Deliverer

**Product:**

```bash
npx sequelize-cli model:generate --name Product --attributes name:string,description:text,price:decimal,stock:integer,imageUrl:string,category:string
```

Renombrar: `202*create-product.js` → `03-create-product.js`

En `models\product.js`:

```javascript
static associate(models) {
  Product.belongsTo(models.Local, { foreignKey: 'LocalId' });
  Product.hasMany(models.OrderItem, { foreignKey: 'ProductId' });
}
```

**Order:**

```bash
npx sequelize-cli model:generate --name Order --attributes status:enum:{pendiente,confirmado,preparando,en_camino,entregado,cancelado},total:decimal,deliveryAddress:string,deliveryLat:float,deliveryLng:float,notes:text,estimatedDeliveryTime:date,deliveredAt:date
```

Renombrar: `202*create-order.js` → `04-create-order.js`

Agregar manualmente en la migración las columnas `UserId` y `LocalId` con sus foreign keys.

En `models\order.js`:

```javascript
static associate(models) {
  Order.belongsTo(models.User, { foreignKey: 'UserId' });
  Order.belongsTo(models.Local, { foreignKey: 'LocalId' });
  Order.belongsTo(models.Deliverer, { foreignKey: 'DelivererId' });
  Order.hasMany(models.OrderItem, { foreignKey: 'OrderId' });
}
```

**OrderItem:**

```bash
npx sequelize-cli model:generate --name OrderItem --attributes quantity:integer,price:decimal,subtotal:decimal
```

Renombrar: `202*create-order-item.js` → `05-create-order-item.js`

Agregar foreign keys `OrderId` y `ProductId` en la migración.

En `models\orderitem.js`:

```javascript
static associate(models) {
  OrderItem.belongsTo(models.Order, { foreignKey: 'OrderId' });
  OrderItem.belongsTo(models.Product, { foreignKey: 'ProductId' });
}
```

**Deliverer:**

```bash
npx sequelize-cli model:generate --name Deliverer --attributes name:string,phone:string,email:string,vehicle:string,active:boolean,latitude:float,longitude:float
```

Renombrar: `202*create-deliverer.js` → `06-create-deliverer.js`

En `models\deliverer.js`:

```javascript
static associate(models) {
  Deliverer.hasMany(models.Order, { foreignKey: 'DelivererId' });
}
```

Agregar `DelivererId` a Orders con una migración aparte:

```bash
npx sequelize-cli migration:generate --name add-deliverer-id-to-orders
```

Renombrar: `202*add-deliverer-id-to-orders.js` → `07-add-deliverer-id-to-orders.js`

```javascript
'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Orders', 'DelivererId', {
      type: Sequelize.INTEGER,
      references: { model: 'Deliverers', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },
  async down(queryInterface) {
    await queryInterface.removeColumn('Orders', 'DelivererId');
  }
};
```

**Ejecutar migraciones:**

```bash
npm run db:migrate
```

### Completar la matriz de avance

Copiá la plantilla desde `datos del proyecto\plantillas\plantilla-matriz-avance.md` a la raíz como `matriz-avance-hito-1.md` y marcá:
- GEN-01, GEN-02, GEN-03, rq-01, rq-02 como "desarrollado".

### Tag del Hito 1

```bash
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

### GEN-06: Middleware de autenticación

Crear `Delivery\back\middlewares\auth.js`:

```javascript
const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: true, message: 'Token requerido' });
  }

  const token = header.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret_no_usar_en_produccion_12345');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: true, message: 'Token inválido o expirado' });
  }
}

module.exports = { authenticate };
```

**Explicación:** El frontend envía el token en el header `Authorization: Bearer <token>`. Este middleware lo extrae, verifica con `jwt.verify()` y, si es válido, guarda los datos en `req.user` y pasa a la siguiente función. Si no hay token o es inválido, devuelve 401.

---

### GEN-04 + GEN-05: Rutas de autenticación (registro y login)

Crear `Delivery\back\routes\auth.js`:

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
      process.env.JWT_SECRET || 'dev_secret_no_usar_en_produccion_12345',
      { expiresIn: '24h' }
    );

    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: 'Error del servidor' });
  }
});

module.exports = router;
```

**Explicación:**
- `bcrypt.hash(password, 10)` — Convierte la contraseña en texto plano a un hash irreversible (costo 10 = seguro).
- `bcrypt.compare(password, user.password)` — Compara la contraseña escrita con el hash guardado en la BD.
- `jwt.sign(payload, secret, options)` — Crea un JWT con datos del usuario, firmado con la clave secreta. Expira en 24h.
- 400 = faltan campos, 401 = credenciales inválidas, 409 = email duplicado.

---

### rq-03: CRUD Locales (Backend)

Crear `Delivery\back\controllers\localController.js`:

```javascript
const { Local, Product } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const locals = await Local.findAll({
      where: { isActive: true },
      order: [['name', 'ASC']]
    });
    res.json(locals);
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const local = await Local.findByPk(req.params.id, { include: Product });
    if (!local) return res.status(404).json({ error: true, message: 'Local no encontrado' });
    res.json(local);
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const local = await Local.create(req.body);
    res.status(201).json(local);
  } catch (err) {
    res.status(400).json({ error: true, message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const local = await Local.findByPk(req.params.id);
    if (!local) return res.status(404).json({ error: true, message: 'Local no encontrado' });
    await local.update(req.body);
    res.json(local);
  } catch (err) {
    res.status(400).json({ error: true, message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const local = await Local.findByPk(req.params.id);
    if (!local) return res.status(404).json({ error: true, message: 'Local no encontrado' });
    await local.update({ isActive: false }); // Borrado lógico
    res.json({ message: 'Local desactivado correctamente' });
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
};
```

Crear `Delivery\back\routes\locals.js`:

```javascript
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/localController');
const { authenticate } = require('../middlewares/auth');

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.post('/', authenticate, ctrl.create);
router.put('/:id', authenticate, ctrl.update);
router.delete('/:id', authenticate, ctrl.remove);

module.exports = router;
```

Crear `Delivery\back\routes\users.js`:

```javascript
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/userController');
const { authenticate } = require('../middlewares/auth');

router.get('/', authenticate, ctrl.getAll);
router.get('/:id', authenticate, ctrl.getById);
router.post('/', ctrl.create);
router.put('/:id', authenticate, ctrl.update);
router.delete('/:id', authenticate, ctrl.remove);

module.exports = router;
```

Crear `Delivery\back\controllers\userController.js`:

```javascript
const { User } = require('../models');
const bcrypt = require('bcryptjs');

exports.getAll = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']]
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] }
    });
    if (!user) return res.status(404).json({ error: true, message: 'Usuario no encontrado' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: true, message: 'name, email and password are required' });
    }
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: true, message: 'Email already in use' });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash, role });
    const { password: _p, ...data } = user.toJSON();
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: true, message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: true, message: 'Usuario no encontrado' });
    const updates = { ...req.body };
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }
    await user.update(updates);
    const { password: _p, ...data } = user.toJSON();
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: true, message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: true, message: 'Usuario no encontrado' });
    await user.destroy();
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
};
```

### rq-03: CRUD Locales (Frontend)

Instalar dependencias del frontend:

```bash
cd Delivery\front
npm install axios react-router-dom
```

Crear `Delivery\front\src\pages\Register.jsx`:

```jsx
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const API = 'http://localhost:3000/api'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${API}/auth/register`, form)
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrarse')
    }
  }

  return (
    <div className="container">
      <h2>Registrarse</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input placeholder="Nombre" value={form.name}
          onChange={e => setForm({...form, name: e.target.value})} required />
        <input placeholder="Email" type="email" value={form.email}
          onChange={e => setForm({...form, email: e.target.value})} required />
        <input placeholder="Contraseña" type="password" value={form.password}
          onChange={e => setForm({...form, password: e.target.value})} required />
        <button type="submit">Crear cuenta</button>
      </form>
      <p>¿Ya tenés cuenta? <Link to="/login">Iniciar sesión</Link></p>
    </div>
  )
}
```

Crear `Delivery\front\src\pages\Login.jsx`:

```jsx
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const API = 'http://localhost:3000/api'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${API}/auth/login`, form)
      localStorage.setItem('token', res.data.token)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesión')
    }
  }

  return (
    <div className="container">
      <h2>Iniciar sesión</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input placeholder="Email" type="email" value={form.email}
          onChange={e => setForm({...form, email: e.target.value})} required />
        <input placeholder="Contraseña" type="password" value={form.password}
          onChange={e => setForm({...form, password: e.target.value})} required />
        <button type="submit">Ingresar</button>
      </form>
      <p>¿No tenés cuenta? <Link to="/register">Registrarse</Link></p>
    </div>
  )
}
```

Crear `Delivery\front\src\pages\Home.jsx`:

```jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const API = 'http://localhost:3000/api'

export default function Home() {
  const navigate = useNavigate()
  const [locales, setLocales] = useState([])
  const token = localStorage.getItem('token')

  const cargar = () => {
    axios.get(`${API}/locals`)
      .then(res => setLocales(res.data))
      .catch(err => console.error(err))
  }

  useEffect(cargar, [])

  const eliminar = async (id) => {
    if (!confirm('¿Desactivar este local?')) return
    try {
      await axios.delete(`${API}/locals/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      cargar()
    } catch (err) {
      alert(err.response?.data?.message || 'Error al eliminar')
    }
  }

  return (
    <div className="container">
      <div className="header-row">
        <h2>Locales</h2>
        {token && (
          <button onClick={() => navigate('/locales/nuevo')}>+ Nuevo</button>
        )}
      </div>
      <div className="grid">
        {locales.map(l => (
          <div key={l.id} className="card">
            <h3>{l.name}</h3>
            <p className="category">{l.category}</p>
            <p>{l.address}</p>
            {l.phone && <p>📞 {l.phone}</p>}
            {l.openingHours && <p>🕐 {l.openingHours}</p>}
            {token && (
              <div className="card-actions">
                <button onClick={() => navigate(`/locales/editar/${l.id}`)}>Editar</button>
                <button className="btn-danger" onClick={() => eliminar(l.id)}>Desactivar</button>
              </div>
            )}
          </div>
        ))}
        {locales.length === 0 && <p>No hay locales disponibles</p>}
      </div>
    </div>
  )
}
```

Crear `Delivery\front\src\pages\LocalForm.jsx`:

```jsx
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const API = 'http://localhost:3000/api'

export default function LocalForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = Boolean(id)
  const token = localStorage.getItem('token')

  const [form, setForm] = useState({
    name: '', address: '', phone: '', category: '',
    openingHours: '', description: '', imageUrl: ''
  })
  const [error, setError] = useState('')

  useEffect(() => {
    if (!token) { navigate('/login'); return }
    if (isEdit) {
      axios.get(`${API}/locals/${id}`)
        .then(res => {
          const l = res.data
          setForm({
            name: l.name || '', address: l.address || '',
            phone: l.phone || '', category: l.category || '',
            openingHours: l.openingHours || '',
            description: l.description || '', imageUrl: l.imageUrl || ''
          })
        })
        .catch(() => navigate('/'))
    }
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (isEdit) {
        await axios.put(`${API}/locals/${id}`, form, {
          headers: { Authorization: `Bearer ${token}` }
        })
      } else {
        await axios.post(`${API}/locals`, form, {
          headers: { Authorization: `Bearer ${token}` }
        })
      }
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Error al guardar')
    }
  }

  return (
    <div className="container">
      <h2>{isEdit ? 'Editar local' : 'Nuevo local'}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input placeholder="Nombre *" value={form.name}
          onChange={e => setForm({...form, name: e.target.value})} required />
        <input placeholder="Dirección *" value={form.address}
          onChange={e => setForm({...form, address: e.target.value})} required />
        <input placeholder="Teléfono" value={form.phone}
          onChange={e => setForm({...form, phone: e.target.value})} />
        <input placeholder="Categoría (ej: pizza, hamburguesa)" value={form.category}
          onChange={e => setForm({...form, category: e.target.value})} />
        <input placeholder="Horario (ej: 10:00-22:00)" value={form.openingHours}
          onChange={e => setForm({...form, openingHours: e.target.value})} />
        <textarea placeholder="Descripción" value={form.description}
          onChange={e => setForm({...form, description: e.target.value})} rows={3} />
        <input placeholder="URL de imagen" value={form.imageUrl}
          onChange={e => setForm({...form, imageUrl: e.target.value})} />
        <div className="form-actions">
          <button type="submit">{isEdit ? 'Guardar cambios' : 'Crear local'}</button>
          <button type="button" className="btn-secondary"
            onClick={() => navigate('/')}>Cancelar</button>
        </div>
      </form>
    </div>
  )
}
```

### rq-08: Dashboard de pedidos activos (Backend)

Crear `Delivery\back\routes\orders.js`:

```javascript
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/orderController');
const { authenticate } = require('../middlewares/auth');

router.get('/', authenticate, ctrl.getAll);
router.get('/active', authenticate, ctrl.getActive);
router.get('/:id', authenticate, ctrl.getById);
router.post('/', authenticate, ctrl.create);
router.patch('/:id/status', authenticate, ctrl.updateStatus);
router.delete('/:id', authenticate, ctrl.remove);

module.exports = router;
```

Crear `Delivery\back\controllers\orderController.js`:

```javascript
const { Order, User, Local, OrderItem, Product } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: Local, attributes: ['id', 'name', 'address'] },
        { model: OrderItem, include: [Product] }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
};

exports.getActive = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { status: ['pendiente', 'preparando', 'en_camino'] },
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: Local, attributes: ['id', 'name', 'address'] },
        { model: OrderItem, include: [Product] }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: Local, attributes: ['id', 'name', 'address'] },
        { model: OrderItem, include: [Product] }
      ]
    });
    if (!order) return res.status(404).json({ error: true, message: 'Pedido no encontrado' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    const created = await Order.findByPk(order.id, {
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: Local, attributes: ['id', 'name'] }
      ]
    });
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: true, message: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ error: true, message: 'Pedido no encontrado' });
    await order.update({ status: req.body.status });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: true, message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ error: true, message: 'Pedido no encontrado' });
    await order.destroy();
    res.json({ message: 'Pedido eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
};
```

### rq-08: Dashboard de pedidos activos (Frontend)

Crear `Delivery\front\src\pages\Dashboard.jsx`:

```jsx
import { useState, useEffect } from 'react'
import axios from 'axios'

const API = 'http://localhost:3000/api'

export default function Dashboard() {
  const [orders, setOrders] = useState([])
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) return
    axios.get(`${API}/orders/active`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setOrders(res.data))
      .catch(err => console.error(err))
  }, [])

  const cambiarEstado = async (id, nuevoEstado) => {
    try {
      await axios.patch(`${API}/orders/${id}/status`,
        { status: nuevoEstado },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setOrders(orders.map(o => o.id === id ? { ...o, status: nuevoEstado } : o))
    } catch (err) {
      console.error(err)
    }
  }

  const cerrarSesion = () => {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  if (!token) {
    return <div className="container"><p>Debés iniciar sesión para ver esta página.</p></div>
  }

  return (
    <div className="container">
      <div className="header-row">
        <h2>Panel de pedidos</h2>
        <button onClick={cerrarSesion} className="btn-secondary">Cerrar sesión</button>
      </div>
      {orders.length === 0 && <p>No hay pedidos activos</p>}
      {orders.map(order => (
        <div key={order.id} className="card order-card">
          <p><strong>Local:</strong> {order.Local?.name || '—'}</p>
          <p><strong>Estado:</strong> <span className={`status status-${order.status}`}>{order.status}</span></p>
          <p><strong>Dirección:</strong> {order.deliveryAddress}</p>
          <p><strong>Total:</strong> ${order.total}</p>
          <div className="status-buttons">
            {['pendiente', 'preparando', 'en_camino', 'entregado'].map(est => (
              <button key={est} onClick={() => cambiarEstado(order.id, est)}
                disabled={order.status === est}
                className={order.status === est ? 'active' : ''}>{est}</button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
```

### App.jsx (Router + Navegación)

Actualizar `Delivery\front\src\App.jsx`:

```jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import LocalForm from './pages/LocalForm'

function Nav() {
  const token = localStorage.getItem('token')

  return (
    <nav>
      <Link to="/" className="logo">Delivery App</Link>
      <div className="nav-links">
        <Link to="/">Inicio</Link>
        {token ? (
          <>
            <Link to="/dashboard">Pedidos</Link>
            <button onClick={() => { localStorage.removeItem('token'); window.location.href = '/' }}>
              Salir
            </button>
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
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/locales/nuevo" element={<LocalForm />} />
          <Route path="/locales/editar/:id" element={<LocalForm />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
```

### CSS (App.css)

Reemplazar `Delivery\front\src\App.css` con los estilos completos.

### Matriz de avance

Copiá como `matriz-avance-hito-2.md` y marcá:
- GEN-01, GEN-02, GEN-03, GEN-04, GEN-05, GEN-06, rq-01, rq-02, rq-03, rq-08 como "desarrollado".
- Total: 10/23.

### Tag del Hito 2

```bash
git add .
git commit -m "Hito 2: auth (registro, login, JWT) + CRUD Locales + Dashboard pedidos"
git tag -a entrega-hito-2 -m "Hito 2: revisión 40%"
git push origin main --tags
```

---

## Hito 3 — Entrega final 100% + Deploy

### Objetivo

Completar los 23 requisitos. Los 10 ya hechos + GEN-07, GEN-08, GEN-09, GEN-10, GEN-11, GEN-12, GEN-13, rq-04, rq-05, rq-06, rq-07, rq-09, rq-10.

### GEN-07: Restablecer contraseña

Crear modelo `PasswordResetToken`:

```bash
cd Delivery\back
npx sequelize-cli model:generate --name PasswordResetToken --attributes email:string,token:string,expiresAt:date,used:boolean
npx sequelize-cli db:migrate
```

Agregar a `routes/auth.js` los endpoints:
- `POST /api/auth/forgot-password` — recibe email, genera token aleatorio de 32 bytes, lo guarda con expiración de 1h, muestra token en consola (en producción se enviaría por email).
- `POST /api/auth/reset-password` — recibe email + token + newPassword, verifica que el token exista, no esté usado y no haya expirado, actualiza la contraseña, marca token como usado.

Necesitás importar al principio:
```javascript
const crypto = require('crypto');
const { Op } = require('sequelize');
```

Frontend: crear `pages/ForgotPassword.jsx` y `pages/ResetPassword.jsx`.

### GEN-08: Manejo centralizado de errores

Agregar en `app.js` (al final, antes del `app.listen`):

```javascript
app.use((err, req, res, next) => {
  console.error(err);
  if (process.env.NODE_ENV === 'production') {
    res.status(500).json({ error: true, message: 'Error interno del servidor' });
  } else {
    res.status(500).json({ error: true, message: err.message, stack: err.stack });
  }
});
```

### GEN-09: CRUD REST + UI completo

Asegurar que todos los CRUD tengan API completa y pantallas web.

### GEN-10: Validaciones de entrada

Agregar en cada controlador validaciones como:
```javascript
if (!name || name.trim().length === 0) {
  return res.status(422).json({ error: true, message: 'El nombre es obligatorio' });
}
```

Códigos HTTP: 200 (OK), 201 (Created), 400 (Bad Request), 401 (Unauthorized), 404 (Not Found), 409 (Conflict), 422 (Unprocessable Entity), 500 (Internal Server Error).

### rq-04: CRUD Pedidos completo

Mejorar `routes/orders.js`:
- `POST /api/orders` con transacción (crear Order + OrderItems, calcular total desde los productos).
- Frontend: página para crear pedido con selección de local, productos, carrito, dirección.

### rq-05: No cancelar en camino

Agregar endpoint `PUT /api/orders/:id/cancel` que rechace con 409 si el estado es `en_camino` o `entregado`.

### rq-06: Total coherente

Calcular el total automáticamente en el servidor = SUM(cantidad * precio_unitario). Nunca confiar en el total que envía el cliente.

### rq-07: Filtros por estado/cliente

`GET /api/orders?status=pendiente&userId=1` con query params. Frontend: agregar select de filtro.

### rq-09: Flujo transaccional completo

Crear página `CreateOrder.jsx`:
1. Seleccionar local
2. Ver productos
3. Agregar al carrito
4. Ingresar dirección
5. Confirmar → POST a API
Barra de progreso visual en el Dashboard.

### rq-10: Asignar repartidor + ETA

Endpoint `PUT /api/orders/:id/assign`:
- Recibe `{ delivererId }`
- Verifica repartidor activo
- Simula ETA (15-45 min aleatorio)
- Actualiza `DelivererId`, `status: 'en_camino'`, `estimatedDeliveryTime`
Frontend: mostrar datos del repartidor y ETA.

### GEN-11: Colección Postman

Crear carpeta `Delivery\back\postman\` y exportar colección Postman con:
- Register, Login, Get Locals, Create Local, Get Active Orders, Cancel Order, Sin Token
- Script en Login que auto-guarda token: `pm.collectionVariables.set("token", pm.response.json().token);`

### GEN-12: Evolución de esquema

Crear migración extra (ej: agregar `discount` a Orders) y documentar en README.

### GEN-13: Deploy Railway + Vercel

**Railway (API + BD):**
1. Ir a [railway.app](https://railway.app) e iniciar sesión con GitHub
2. New Project → Deploy from GitHub repo → `ianbmisaac/WEB-Delivery`
3. Configurar Start Command: `node app.js`
4. Agregar PostgreSQL desde New → Database
5. Variables de entorno: `DATABASE_URL` (copiar del plugin), `JWT_SECRET`, `NODE_ENV=production`, `CORS_ORIGIN=URL_FRONT`
6. Ejecutar migraciones: `railway run "npx sequelize-cli db:migrate"`

**Vercel (Frontend):**
1. Ir a [vercel.com](https://vercel.com) e iniciar sesión con GitHub
2. Add New → Project → `ianbmisaac/WEB-Delivery`
3. Root Directory: `Delivery/front`
4. Framework Preset: Vite
5. Environment Variables: `VITE_API_URL` = URL de la API en Railway

### README con URLs de producción

Actualizar README.md con:
```markdown
## URLs de Producción
- **API:** https://tu-api.up.railway.app
- **Frontend:** https://tu-app.vercel.app
```

### Tag final

```bash
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
| `npm run db:migrate` | Ejecutar migraciones |
| `npm run db:migrate:undo` | Revertir todas las migraciones |
| `npm run db:seed` | Ejecutar seeders |

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
- [ ] rq-02: Modelo Order + OrderItem + Product + Deliverer
- [ ] Matriz con ≥5 requisitos
- [ ] Tag `entrega-hito-1`

### Hito 2
- [ ] GEN-04: Registro (backend + frontend)
- [ ] GEN-05: Login JWT (backend + frontend)
- [ ] GEN-06: Middleware auth
- [ ] rq-03: CRUD Locales con UI (lista, crear, editar, desactivar)
- [ ] rq-08: Dashboard pedidos activos
- [ ] Matriz con ≥10 requisitos
- [ ] Demo local (capturas/video)
- [ ] Tag `entrega-hito-2`

### Hito 3
- [ ] GEN-07: Reset contraseña
- [ ] GEN-08: Error handler global
- [ ] GEN-09: CRUD + UI completo
- [ ] GEN-10: Validaciones HTTP (400, 422, 409)
- [ ] GEN-11: Postman exportado
- [ ] GEN-12: Migración extra documentada
- [ ] GEN-13: Deploy Railway + Vercel
- [ ] rq-04: CRUD Pedidos completo con UI
- [ ] rq-05: No cancelar en_camino/entregado
- [ ] rq-06: Total calculado automáticamente
- [ ] rq-07: Filtros por estado/cliente
- [ ] rq-09: Flujo crear pedido (carrito → dirección → confirmar)
- [ ] rq-10: Asignar repartidor + ETA simulado
- [ ] Matriz 23/23
- [ ] URLs producción en README
- [ ] Tag `entrega-hito-3`

---

> **Tip final:** Hacé commits chicos y frecuentes. Cada vez que termines una funcionalidad, commiteá. No esperes al final del hito para hacer un solo commit gigante. Así podés volver atrás si algo se rompe.
