# Matriz de avance — Proyecto final web

**Alumno:** Ian Barria Mercado
**Tema # / slug:** Delivery / https://github.com/rinostrozacl/docencia-proyectos-web/blob/main/proyectos/15-delivery/lista-requerimientos.md
**Hito:** ☐ 1 — 20% (≥5/23)  ☒ 2 — 40% (≥10/23)  ☐ 3 — 100% (23/23)  
**Fecha:** 01-06-2026

Leyenda estado: `pendiente` | `en progreso` | `desarrollado`  
API / WEB: `sí` | `no` | `parcial` | `n/a`

## Requisitos generales

| ID | Título | API | WEB | Estado | Evidencia |
|----|--------|-----|-----|--------|-----------|
| GEN-01 | Estructura y README | n/a | n/a | `desarrollado` | README con stack, instalación, variables, estructura, .gitignore |
| GEN-02 | Variables de entorno | n/a | n/a | `desarrollado` | .env.example comentado, tabla de variables en README |
| GEN-03 | BD y migraciones | n/a | n/a | `desarrollado` | Migraciones User, Restaurant, Order ejecutadas. Conexión verificada |
| GEN-04 | Registro (sign up) | sí | sí | `desarrollado` | POST /api/auth/register + pantalla Register |
| GEN-05 | Login JWT | sí | sí | `desarrollado` | POST /api/auth/login con JWT + pantalla Login |
| GEN-06 | Middleware auth | sí | n/a | `desarrollado` | middlewares/auth.js protege rutas POST/PUT/DELETE |
| GEN-07 | Restablecer contraseña | | | `pendiente` | |
| GEN-08 | Errores centralizados | | n/a | `pendiente` | |
| GEN-09 | CRUD + vistas dominio | | | `pendiente` | |
| GEN-10 | Validaciones HTTP | | n/a | `pendiente` | |
| GEN-11 | Postman | | n/a | `pendiente` | |
| GEN-12 | Evolución esquema | | n/a | `pendiente` | |
| GEN-13 | Deploy Railway + front | | parcial | `pendiente` | |

## Requisitos del dominio

| ID | Título | API | WEB | Estado | Evidencia |
|----|--------|-----|-----|--------|-----------|
| rq-01 | Modelar entidad principal del dominio | n/a | No | `desarrollado` | Modelo Restaurant + migración. Documentado en README |
| rq-02 | Modelar entidad secundaria o relación | n/a | No | `desarrollado` | Modelo Order + migración. Relación N:1 con User y Restaurant |
| rq-03 | CRUD del recurso principal de gestión | sí | sí | `desarrollado` | CRUD Restaurants API + pantalla Home lista locales |
| rq-04 | CRUD del recurso secundario | | Sí | `pendiente` | |
| rq-05 | Regla de negocio principal | | Parcial | `pendiente` | |
| rq-06 | Regla de negocio complementaria | | Parcial | `pendiente` | |
| rq-07 | Consultas con filtros y búsqueda | | Sí | `pendiente` | |
| rq-08 | Panel o listado principal del dominio | sí | sí | `desarrollado` | GET /api/orders con auth + Dashboard con cambio de estado |
| rq-09 | Flujo transaccional clave del dominio | | Sí | `pendiente` | |
| rq-10 | Funcionalidad avanzada del dominio | | Parcial | `pendiente` | |

## Resumen

| Métrica | Valor |
|---------|-------|
| Total requisitos | 23 |
| Desarrollados | 10 / 23 |
| Porcentaje | 43 % |
| Umbral hito 1 (20%) | ≥ 5 |
| Umbral hito 2 (40%) | ≥ 10 |
| Umbral hito 3 (100%) | 23 |
| ¿Cumple umbral de este hito? | ☒ Sí  ☐ No |
