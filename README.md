<![CDATA[# 🚚 Delivery App

<<<<<<< HEAD
**Sistema web full-stack para la gestión de pedidos de delivery**

Proyecto académico individual — Universidad, 2026


![React 19](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white) ![Vite 8](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white) ![Node.js 18](https://img.shields.io/badge/Node.js-18-339933?logo=node.js&logoColor=white) ![Express 5](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white) ![PostgreSQL 14](https://img.shields.io/badge/PostgreSQL-14-4169E1?logo=postgresql&logoColor=white) ![Sequelize 6](https://img.shields.io/badge/Sequelize-6-52B0E7?logo=sequelize&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-auth-d63aff?logo=jsonwebtokens&logoColor=white)
=======
  <p>
    <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React 19">
    <img src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white" alt="Vite 8">
    <img src="https://img.shields.io/badge/Node.js-18-339933?logo=node.js&logoColor=white" alt="Node.js 18">
    <img src="https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white" alt="Express 5">
    <img src="https://img.shields.io/badge/PostgreSQL-14-4169E1?logo=postgresql&logoColor=white" alt="PostgreSQL 14">
    <img src="https://img.shields.io/badge/Sequelize-6-52B0E7?logo=sequelize&logoColor=white" alt="Sequelize 6">
    <img src="https://img.shields.io/badge/JWT-auth-d63aff?logo=jsonwebtokens&logoColor=white" alt="JWT">
    <img src="https://img.shields.io/badge/Railway-deploy-0B0D0E?logo=railway&logoColor=white" alt="Railway">
    <img src="https://img.shields.io/badge/Vercel-deploy-000000?logo=vercel&logoColor=white" alt="Vercel">
  </p>
</div>
>>>>>>> 70a6bdd23a76e173b93a73aa95ed01e323aa7874

---

## 📋 Descripción

<<<<<<< HEAD
Aplicación web full-stack para la gestión de pedidos de delivery. Los clientes pueden explorar restaurantes, crear pedidos con varios items y seguir el estado de entrega. El backend expone una API REST con autenticación JWT para usuarios y repartidores.
=======
Aplicación web full-stack para la gestión de pedidos de delivery. Los clientes pueden explorar restaurantes, armar pedidos con varios items y seguir el estado de entrega. El backend expone una API REST con autenticación JWT para usuarios y repartidores.
>>>>>>> 70a6bdd23a76e173b93a73aa95ed01e323aa7874

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

- Node.js 18+
- PostgreSQL 14+
- Git (opcional)

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

<<<<<<< HEAD
Ejecutar:
=======
A continuación ejecutar:
>>>>>>> 70a6bdd23a76e173b93a73aa95ed01e323aa7874

```bash
npm run db:migrate
npm run db:seed
npm run dev
```

El servidor quedará disponible en `http://localhost:3000`.

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
| Backend        | Node.js 18 · Express 5 · Sequelize 6        |
| Base de datos  | PostgreSQL 14 · `pg` / `pg-hstore`         |
| Autenticación  | JWT (JSON Web Tokens)                       |
| Utilidades     | Axios · dotenv · nodemon                    |
| Despliegue     | Railway (backend + BD) · Vercel (frontend)  |

---

## 📌 Notas importantes

- No existe un archivo `.env.example`; crea `Delivery/back/.env` manualmente usando el ejemplo anterior.
- El backend expone la API en `/api`, incluida la ruta de salud `GET /api/health`.
- Si cambias el puerto del backend, actualiza la URL de la API en el frontend según corresponda.

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