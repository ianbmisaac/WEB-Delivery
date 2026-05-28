# Informe de hito — Proyecto final web (individual)

**Alumno:** Ian Barria Mercado  
**Repositorio:** https://github.com/ianbmisaac/WEB-Delivery.git  
**Tema (# y nombre):** #15 — Pedidos Delivery  
**Hito:** ☑ 0 — Inicio  ☐ 1 — 20%  ☐ 2 — 40%  ☐ 3 — Entrega final (100%)  
**Fecha:** 27/05/2026

---

## 1. Resumen

Se inicializó el repositorio del proyecto con estructura backend/frontend. El backend se configuró con Node.js + Express + Sequelize apuntando a PostgreSQL, con migración inicial de la tabla Users y conexión a base de datos local verificada. El frontend se inició con Vite + React. Se crearon los README, `.gitignore` raíz y `.env.example` documentado. El proyecto está listo para comenzar el desarrollo de requisitos del Hito 1.

---

## 2. Alcance del tema

Sistema web para gestión de pedidos de delivery. Entidades principales: Users, Locals, Products, Orders, OrderItems, Deliverers. Los clientes podrán crear pedidos con items y dirección de entrega, hacer seguimiento del estado, y asignar repartidores con ETA simulado.

---

## 3. Trabajo realizado en este hito

### Hito 0 — Inicio del proyecto

- [x] Tema confirmado con docente
- [x] Repositorio creado con estructura client + API
- [x] README inicial con alcance y cronograma
- [x] Revisión de GEN-01 … GEN-13 y rq-01 … rq-10
- [x] Sin requisitos desarrollados aún (salvo borrador opcional)

### Hito 1 — Revisión del 20%

- Requisitos desarrollados (listar IDs): _________________________
- Total: ___ / 23 (**mínimo 5**)
- Matriz de avance adjunta: ☐ Sí  ☐ No

### Hito 2 — Revisión del 40%

- Requisitos desarrollados (listar IDs): _________________________
- Total: ___ / 23 (**mínimo 10**)
- Demo para revisión: ☐ capturas  ☐ video  ☐ enlace
- Retroalimentación recibida: _________________________

### Hito 3 — Entrega final (100% + deploy)

- Total: ___ / 23 (**23 obligatorio**)
- URLs producción (API + front): _________________________
- Plataforma del front: ☐ Railway  ☐ Vercel  ☐ Netlify
- Demo en URL pública: _________________________

---

## 4. Riesgos y dificultades

| Riesgo | Impacto | Mitigación planificada |
|--------|---------|------------------------|
| Configuración de Sequelize con JS en vez de JSON | Retraso en inicio | Se corrigió el models/index.js para que apunte a config.js |
| Conexión a BD local | Bloqueante | Verificada y funcionando con PostgreSQL activo |

---

## 5. Próximos pasos (siguiente hito)

1. GEN-01: README completo + estructura repo
2. GEN-02: Variables de entorno + .env.example
3. GEN-03: Migraciones Sequelize (Locals, Products, Orders, OrderItems, Deliverers)
4. rq-01: Modelo Local
5. rq-02: Modelo Order + OrderItem

---

## 6. Diagrama ER (opcional — recomendado en hito 0)

Entidades planificadas:

- **User** — usuarios del sistema (clientes, repartidores, admins)
- **Local** — comercios o restaurantes registrados
- **Product** — productos que ofrece cada local
- **Order** — pedido realizado por un cliente
- **OrderItem** — detalle de productos en un pedido
- **Deliverer** — repartidores con disponibilidad y ubicación

---

## 7. Declaración

Confirmo que el trabajo de este hito es individual y el repositorio indicado es el oficial de entrega.

> **Hito 0:** obligatorio, **sin nota**. La calificación sale de hitos **1 (20%)**, **2 (30%)** y **3 (50%)** de la nota final.
