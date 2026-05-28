<![CDATA[<div align="center">
  <h1>⚙️ Backend — API Delivery</h1>
  <p><strong>API RESTful para el sistema de gestión de pedidos de delivery</strong></p>

  <p>
    <img src="https://img.shields.io/badge/Node.js-18-339933?logo=node.js&logoColor=white" alt="Node.js 18">
    <img src="https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white" alt="Express 5">
    <img src="https://img.shields.io/badge/Sequelize-6-52B0E7?logo=sequelize&logoColor=white" alt="Sequelize 6">
    <img src="https://img.shields.io/badge/PostgreSQL-14-4169E1?logo=postgresql&logoColor=white" alt="PostgreSQL 14">
    <img src="https://img.shields.io/badge/JWT-auth-d63aff?logo=jsonwebtokens&logoColor=white" alt="JWT">
  </p>
</div>

---

## 📋 Requisitos previos

- **Node.js** 18 o superior
- **PostgreSQL** 14 o superior
- **npm** 9 o superior

---

## 🚀 Instalación

```bash
npm install
cp .env.example .env
```

Editar el archivo `.env` con las credenciales de la base de datos.

---

## 🔧 Configuración de entorno

| Variable       | Descripción                     | Valor por defecto |
|----------------|---------------------------------|-------------------|
| `DB_HOST`      | Host de PostgreSQL              | `localhost`       |
| `DB_PORT`      | Puerto de PostgreSQL            | `5432`            |
| `DB_NAME`      | Nombre de la base de datos      | `delivery_db`     |
| `DB_USER`      | Usuario de la base de datos     | `delivery_user`   |
| `DB_PASSWORD`  | Contraseña del usuario          | *(requerido)*     |

---

## 📦 Scripts disponibles

| Comando                    | Descripción                              |
|----------------------------|------------------------------------------|
| `npm run dev`              | Inicia el servidor con recarga automática (nodemon) |
| `npm start`                | Inicia el servidor en modo producción     |
| `npx sequelize-cli db:migrate` | Ejecuta las migraciones pendientes    |
| `npx sequelize-cli db:seed:all` | Ejecuta los seeders (si existen)      |

---

## 🗄️ Base de datos

### Migraciones

Las migraciones se encuentran en `migrations/` y se ejecutan con:

```bash
npx sequelize-cli db:migrate
```

### Modelos actuales

| Modelo   | Descripción                            |
|----------|----------------------------------------|
| `User`   | Usuarios del sistema (clientes, admins, repartidores) |

---

## 🧪 Verificación del servidor

```bash
npm run dev
```

El servidor se iniciará en `http://localhost:3000`.  
La salud del servicio puede verificarse en `GET /api/health`.

---

## 📁 Estructura del proyecto

```
back/
├── config/
│   └── config.js           # Configuración de Sequelize
├── migrations/             # Migraciones de la base de datos
├── models/                 # Modelos de Sequelize
│   ├── index.js
│   └── user.js
├── seeders/                # Datos de prueba (semillas)
├── app.js                  # Punto de entrada de la aplicación
├── .env                    # Variables de entorno (no versionar)
├── .env.example            # Plantilla de variables de entorno
├── package.json
└── README.md
```

---

## ✒️ Autor

**Ian Barria Mercado**

---

<div align="center">
  <sub>Proyecto académico — Universidad, 2026</sub>
</div>]]>