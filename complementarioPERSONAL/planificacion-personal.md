# Planificación Personal — Proyecto Delivery

**Alumno:** Ian Barria Mercado
**Tema:** #15 — Pedidos Delivery
**Stack:** React 18 + Vite (JS) · Node + Express + Sequelize · PostgreSQL · JWT · Railway + Vercel
**Total requisitos:** 23 (13 GEN + 10 rq)

---

## Hitos y evaluación

| Hito | Requisitos | % Nota | Entrega |
|------|-----------|--------|---------|
| 0    | 0/23      | 0%     | Inicio: repo, estructura, informe |
| 1    | ≥5/23     | 20%    | GEN-01,02,03 + rq-01,02 |
| 2    | ≥10/23    | 30%    | + GEN-04,05,06 + rq-03,08 |
| 3    | 23/23     | 50%    | + todo lo demás + deploy |

## Distribución de requisitos por hito

### Hito 0 — Inicio (sin nota)
- [x] Tema confirmado con docente
- [x] Repositorio creado con estructura `client/` + `server/`
- [x] `server/` inicializado con Express + Sequelize
- [ ] `client/` inicializado con Vite + React
- [ ] Conexión a BD local funcional (PostgreSQL)
- [ ] Migración inicial: tabla `Users`
- [ ] `.gitignore` (node_modules, .env, dist, build)
- [ ] `.env.example` con variables comentadas
- [ ] `README.md` con stack, instalación, ejecución local
- [ ] Tag git: `entrega-hito-0`
- [ ] Informe de inicio (plantilla)

### Hito 1 — Revisión 20%
- [ ] **GEN-01:** README completo + estructura repo
- [ ] **GEN-02:** Variables de entorno + `.env.example`
- [ ] **GEN-03:** Migraciones Sequelize (Users, Locals, Products, Orders, OrderItems, Deliverers)
- [ ] **rq-01:** Modelo Local (entidad principal)
- [ ] **rq-02:** Modelo Order + OrderItem (entidad secundaria)
- [ ] Matriz de avance con ≥5/23
- [ ] Tag git: `entrega-hito-1`

### Hito 2 — Revisión 40%
- [ ] **GEN-04:** Registro de usuario (API + UI)
- [ ] **GEN-05:** Login + JWT (API + UI)
- [ ] **GEN-06:** Middleware authenticate en rutas protegidas
- [ ] **rq-03:** CRUD Locales con UI
- [ ] **rq-08:** Panel de seguimiento de pedidos activos
- [ ] Matriz de avance con ≥10/23
- [ ] Demo local (capturas o video)
- [ ] Tag git: `entrega-hito-2`

### Hito 3 — Entrega final 100% + Deploy
- [ ] **GEN-07:** Restablecer contraseña (API + UI)
- [ ] **GEN-08:** Manejo centralizado de errores
- [ ] **GEN-09:** CRUD REST completo + pantallas web
- [ ] **GEN-10:** Validaciones de entrada y reglas HTTP
- [ ] **GEN-11:** Colección Postman exportada
- [ ] **GEN-12:** Evolución de esquema (migración extra)
- [ ] **GEN-13:** Deploy Railway (API+BD) + Vercel (Front)
- [ ] **rq-04:** CRUD Pedidos (API + UI)
- [ ] **rq-05:** Regla: no cancelar pedido en en_camino/entregado
- [ ] **rq-06:** Regla: total coherente con items
- [ ] **rq-07:** Filtros: pedidos por estado o cliente
- [ ] **rq-09:** Flujo: crear pedido con dirección + items + tracking
- [ ] **rq-10:** Asignar repartidor + ETA simulado
- [ ] Matriz completa 23/23
- [ ] URLs de producción en README
- [ ] Tag git: `entrega-hito-3`

---

## Notas
- Cada requisito = API funcionando + UI conectada (si aplica `[WEB]`)
- Errores HTTP mostrados al usuario, no solo console.error
- Sin secretos en el repositorio
- Commit frecuente, tag por hito
