# 🚚 Delivery App

**Sistema web full-stack para la gestión de pedidos de delivery**

Proyecto académico individual — Universidad, 2026


![React 19](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white) ![Vite 8](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white) ![Node.js 26](https://img.shields.io/badge/Node.js-26-339933?logo=node.js&logoColor=white) ![Express 5](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white) ![PostgreSQL 18](https://img.shields.io/badge/PostgreSQL-18-4169E1?logo=postgresql&logoColor=white) ![Sequelize 6](https://img.shields.io/badge/Sequelize-6-52B0E7?logo=sequelize&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-auth-d63aff?logo=jsonwebtokens&logoColor=white) ![Railway](https://img.shields.io/badge/Railway-deploy-0B0D0E?logo=railway&logoColor=white) ![Vercel](https://img.shields.io/badge/Vercel-deploy-000000?logo=vercel&logoColor=white)

---

## 📋 Descripción

Aplicación web full-stack para la gestión de pedidos de delivery. Los clientes pueden explorar locales, crear pedidos con varios items y seguir el estado de entrega.

El backend ofrece una API REST con autenticación JWT para usuarios y repartidores.

---

## 🏗️ Estructura del repositorio

```text
WEB-Delivery/
├── Delivery/
│   ├── back/                    # API REST (Node.js + Express + Sequelize)
│   └── front/                   # Interfaz de usuario (React + Vite)
├── datos del proyecto/          # Documentación, requisitos y plantillas
├── complementarioPERSONAL/      # Planificación y guías de desarrollo
├── informe-hito-0.md            # Informe de inicio
└── README.md
```

---

## 🚀 Instalación y ejecución local

### Requisitos previos

- Node.js 26+
- PostgreSQL 18+

### Backend

```bash
cd Delivery/back
npm install
```

Crear un archivo `.env` en `Delivery/back` con la configuración de la base de datos:

```env
DB_USER=postgres
DB_PASSWORD=
DB_NAME=delivery_db
DB_HOST=localhost
DB_PORT=5432
PORT=3000
```

Ejecutar:

```bash
npm run db:migrate
npm run db:seed
npm run dev
```

El servidor quedará disponible en `http://localhost:3000`.

### Postman (pruebas de API)

La colección de Postman se encuentra en [`postman/Delivery-API.postman_collection.json`](postman/Delivery-API.postman_collection.json):

```bash
# Importar en Postman:
# File → Import → seleccionar el archivo JSON
```

Incluye flujos completo de autenticación, CRUD de locales, usuarios y pedidos, más casos de error (401, 404, 409, 400). Usa variables de colección (`baseUrl`, `token`) para facilitar las pruebas.

### Frontend

```bash
cd Delivery/front
npm install
npm run dev
```

La aplicación de cliente se ejecuta típicamente en `http://localhost:5173`.

---

## 🧱 Stack tecnológico

| Capa           | Tecnología                                  |
|----------------|---------------------------------------------|
| Frontend       | React 19 · Vite 8 · React Router DOM        |
| Backend        | Node.js 26 · Express 5 · Sequelize 6        |
| Base de datos  | PostgreSQL 18 · `pg` / `pg-hstore`         |
| Autenticación  | JWT (JSON Web Tokens)                       |
| Utilidades     | Axios · dotenv · nodemon                    |
| Despliegue     | Railway (backend + BD) · Vercel (frontend)  |

---

## 📌 Notas importantes

- El archivo `.env.example` en `Delivery/back/` sirve como plantilla; copialo a `.env` y ajusta las credenciales.
- El backend expone la API en `/api`, incluida la ruta de salud `GET /api/health`.
- Si cambias el puerto del backend, actualiza `VITE_API_URL` en el frontend.
- Para probar la API manualmente, importa la colección de Postman en [`postman/`](postman/).

---

## 📄 Documentación relacionada

- [`datos del proyecto/`](datos%20del%20proyecto/) — Requisitos generales (GEN-01 a GEN-13) y específicos del dominio (rq-01 a rq-10)
- [`complementarioPERSONAL/`](complementarioPERSONAL/) — Planificación por hitos, checklist y guías técnicas
- [`informe-hito-0.md`](informe-hito-0.md) — Informe de inicio del proyecto

---

## ✒️ Autor

**Ian Barria Mercado** — Proyecto académico individual

---

Proyecto académico — Universidad, 2026
]]>