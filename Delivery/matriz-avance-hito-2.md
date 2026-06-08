# Matriz de avance — Proyecto final web

**Alumno:** Ian Barria Mercado
**Tema # / slug:** Delivery / https://github.com/rinostrozacl/docencia-proyectos-web/blob/main/proyectos/15-delivery/lista-requerimientos.md
**Hito:** ☐ 1 — 20% (≥5/23)  ☒ 2 — 40% (≥10/23)  ☐ 3 — 100% (23/23)  
**Fecha:** 08-06-2026

Leyenda estado: `pendiente` | `en progreso` | `desarrollado`  
API / WEB: `sí` | `no` | `parcial` | `n/a`

## Requisitos generales

| ID | Título | API | WEB | Estado | Evidencia |
|----|--------|-----|-----|--------|-----------|
| GEN-01 | Estructura y README | n/a | n/a | `desarrollado` | README root + back actualizados con stack, instalación, endpoints, Postman |
| GEN-02 | Variables de entorno | n/a | n/a | `desarrollado` | .env.example completo con tabla documentada en README |
| GEN-03 | BD y migraciones | n/a | n/a | `desarrollado` | Migraciones 01-09 ejecutadas (User, Local, Product, Order, OrderItem, Deliverer) |
| GEN-04 | Registro (sign up) | sí | sí | `desarrollado` | POST /api/auth/register + Register.jsx con validación y errores |
| GEN-05 | Login JWT | sí | sí | `desarrollado` | POST /api/auth/login con JWT (24h) + Login.jsx, token en localStorage |
| GEN-06 | Middleware auth | sí | n/a | `desarrollado` | middlewares/auth.js protege rutas POST/PUT/DELETE con Bearer token |
| GEN-07 | Restablecer contraseña | | | `pendiente` | |
| GEN-08 | Errores centralizados | | n/a | `pendiente` | |
| GEN-09 | CRUD + vistas dominio | sí | sí | `desarrollado` | CRUD Locales + Productos (API) + Home (filtros admin activos/inactivos/todos), LocalForm (alta/edición con upload), LocalDetail (productos CRUD inline con upload) |
| GEN-10 | Validaciones HTTP | | n/a | `pendiente` | |
| GEN-11 | Postman | sí | n/a | `desarrollado` | postman/Delivery-API.postman_collection.json con 20 requests, 5 carpetas, casos de error |
| GEN-12 | Evolución esquema | n/a | n/a | `desarrollado` | Migraciones 07 (rename Restaurant→Local), 08 (Deliverer), 09 (DelivererId en Orders) |
| GEN-13 | Deploy Railway + front | | parcial | `pendiente` | |

## Requisitos del dominio

| ID | Título | API | WEB | Estado | Evidencia |
|----|--------|-----|-----|--------|-----------|
| rq-01 | Modelar entidad principal del dominio | n/a | No | `desarrollado` | Modelo Local con isActive (borrado lógico), openingHours, category. Migrado |
| rq-02 | Modelar entidad secundaria o relación | n/a | No | `desarrollado` | Modelos Product, Order, OrderItem, Deliverer con relaciones y FK |
| rq-03 | CRUD del recurso principal de gestión | sí | sí | `desarrollado` | CRUD Locales API + Home (lista con filtros), LocalForm (alta/edición con upload), LocalDetail (detalle + productos CRUD inline), endpoints inactivos/todas/restore, hard-delete con ?force=true |
| rq-04 | CRUD del recurso secundario | | Sí | `pendiente` | |
| rq-05 | Regla de negocio principal | | Parcial | `pendiente` | |
| rq-06 | Regla de negocio complementaria | | Parcial | `pendiente` | |
| rq-07 | Consultas con filtros y búsqueda | | Sí | `pendiente` | |
| rq-08 | Panel o listado principal del dominio | sí | sí | `desarrollado` | GET /api/orders/active + Dashboard.jsx con cambio de estado (solo admin) |
| rq-09 | Flujo transaccional clave del dominio | | Sí | `pendiente` | |
| rq-10 | Funcionalidad avanzada del dominio | | Parcial | `pendiente` | |

## Resumen

| Métrica | Valor |
|---------|-------|
| Total requisitos | 23 |
| Desarrollados | 13 / 23 |
| Porcentaje | 56 % |
| Umbral hito 1 (20%) | ≥ 5 |
| Umbral hito 2 (40%) | ≥ 10 |
| Umbral hito 3 (100%) | 23 |
| ¿Cumple umbral de este hito? | ☒ Sí  ☐ No |
