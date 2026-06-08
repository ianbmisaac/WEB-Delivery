<div align="center">
  <h1>Frontend — Delivery App</h1>
  <p><strong>Interfaz de usuario para el sistema de gestión de pedidos de delivery</strong></p>

  <p>
    <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React 19">
    <img src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white" alt="Vite 8">
    <img src="https://img.shields.io/badge/React_Router-7-CA4245?logo=reactrouter&logoColor=white" alt="React Router 7">
    <img src="https://img.shields.io/badge/Axios-1-5A29E4?logo=axios&logoColor=white" alt="Axios">
  </p>
</div>

---

## Requisitos previos

- **Node.js** 18 o superior
- **npm** 9 o superior

---

## Instalación

```bash
npm install
```

La app espera un backend corriendo en `http://localhost:3000`. Las rutas se configuran en `src/pages/*.jsx` con la constante `API`.

---

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor de desarrollo (Vite) en puerto 5173 |
| `npm run build` | Compila para producción |
| `npm run preview` | Vista previa de la compilación producción |

---

## Tecnologías

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| React | 19 | Librería de interfaz de usuario |
| Vite | 8 | Bundler y servidor de desarrollo |
| React Router | 7 | Enrutamiento SPA |
| Axios | 1 | Cliente HTTP |
| Toast | — | Notificaciones mediante contexto personalizado |

---

## Páginas

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | `Home.jsx` | Lista de locales con hero, filtros por categoría, skeletons, vista admin (activos/inactivos/todos) |
| `/locales/:id` | `LocalDetail.jsx` | Detalle del local + productos con thumbs; admin puede crear/editar/eliminar productos con upload de imagen |
| `/locales/nuevo` | `LocalForm.jsx` | Crear nuevo local (admin, con upload de imagen) |
| `/locales/editar/:id` | `LocalForm.jsx` | Editar local existente (admin) |
| `/login` | `Login.jsx` | Inicio de sesión con JWT |
| `/register` | `Register.jsx` | Registro con validación en cliente |
| `/dashboard` | `Dashboard.jsx` | Panel de pedidos con cambio de estado (admin) |

## Estructura del proyecto

```
front/
├── public/
├── src/
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── LocalDetail.jsx
│   │   ├── LocalForm.jsx
│   │   └── Dashboard.jsx
│   ├── Toast.jsx          # Contexto + provider de notificaciones
│   ├── App.jsx            # Router + Nav con decode JWT
│   ├── App.css            # Estilos completos
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## Autor

**Ian Barria Mercado**

---

<div align="center">
  <sub>Proyecto académico — Universidad, 2026</sub>
</div>