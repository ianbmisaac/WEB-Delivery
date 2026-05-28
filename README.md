<![CDATA[<div align="center">
  <h1>🚚 Delivery App</h1>
  <p><strong>Sistema web full-stack para la gestión de pedidos de delivery</strong></p>
  <p>Proyecto académico individual — Universidad, 2026</p>

  <p>
    <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white" alt="React 18">
    <img src="https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white" alt="Vite 6">
    <img src="https://img.shields.io/badge/Node.js-18-339933?logo=node.js&logoColor=white" alt="Node.js 18">
    <img src="https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white" alt="Express 5">
    <img src="https://img.shields.io/badge/PostgreSQL-14-4169E1?logo=postgresql&logoColor=white" alt="PostgreSQL 14">
    <img src="https://img.shields.io/badge/JWT-auth-d63aff?logo=jsonwebtokens&logoColor=white" alt="JWT">
    <img src="https://img.shields.io/badge/Railway-deploy-0B0D0E?logo=railway&logoColor=white" alt="Railway">
    <img src="https://img.shields.io/badge/Vercel-deploy-000000?logo=vercel&logoColor=white" alt="Vercel">
  </p>
</div>

---

## 📋 Descripción

Aplicación web para la gestión completa de pedidos de delivery. Los clientes pueden explorar locales, realizar pedidos con múltiples items, realizar seguimiento en tiempo real del estado de entrega y los repartidores pueden gestionar asignaciones con ETA simulado.

---

## 🏗️ Estructura del repositorio

```
WEB-Delivery/
├── Delivery/
│   ├── back/                    # API REST (Node.js + Express + Sequelize)
│   └── front/                   # Interfaz de usuario (React + Vite)
├── datos del proyecto/          # Documentación, requisitos y plantillas
├── PlanificacionPERSONAL/       # Planificación y guías de desarrollo
├── informe-hito-0.md            # Informe de inicio
└── README.md
```

---

## 🚀 Instalación y ejecución local

### Requisitos previos

- Node.js 18+
- PostgreSQL 14+

### Backend

```bash
cd Delivery/back
npm install
cp .env.example .env         # Configurar credenciales de BD
npx sequelize-cli db:migrate  # Ejecutar migraciones
npm run dev                   # Servidor en http://localhost:3000
```

### Frontend

```bash
cd Delivery/front
npm install
npm run dev                   # App en http://localhost:5173
```

---

## 🧱 Stack tecnológico

| Capa       | Tecnología                        |
|------------|-----------------------------------|
| Frontend   | React 18 + Vite 6 (JavaScript)    |
| Backend    | Node.js 18 + Express 5            |
| Base de datos | PostgreSQL 14 + Sequelize 6    |
| Autenticación | JWT (JSON Web Tokens)          |
| Despliegue | Railway (API + BD) · Vercel (Frontend) |

---

## 📄 Documentación relacionada

- [`datos del proyecto/`](datos%20del%20proyecto/) — Requisitos generales (GEN-01 a GEN-13) y específicos del dominio (rq-01 a rq-10)
- [`PlanificacionPERSONAL/`](PlanificacionPERSONAL/) — Planificación por hitos, checklist y guías técnicas
- [`informe-hito-0.md`](informe-hito-0.md) — Informe de inicio del proyecto

---

## ✒️ Autor

**Ian Barria Mercado** — Proyecto académico individual

---

<div align="center">
  <sub>Proyecto académico — Universidad, 2026</sub>
</div>]]>