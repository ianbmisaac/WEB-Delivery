# Checklist Consolidado por Hito

Usa `- [x]` para marcar tareas completadas.

---

## Hito 0 — Inicio del proyecto

### Repositorio y estructura
- [ ] Repositorio creado en GitHub
- [ ] Carpeta `server/` con package.json
- [ ] Carpeta `client/` con Vite + React
- [ ] `.gitignore` con node_modules, .env, dist, build
- [ ] `.env.example` con variables comentadas
- [ ] `README.md` con descripción, stack, instalación, ejecución

### Backend base
- [ ] Express configurado (app.js con cors, json, rutas)
- [ ] Conexión Sequelize a PostgreSQL local
- [ ] Modelo User creado
- [ ] Migración create-users ejecutable

### Frontend base
- [ ] Vite + React funcionando
- [ ] react-router-dom instalado
- [ ] axios instalado y configurado

### Entrega
- [ ] Informe de inicio completado
- [ ] Tag `entrega-hito-0` creado
- [ ] Repositorio compartido con docente

---

## Hito 1 — Revisión 20% (≥5/23)

### GEN-01: Estructura y README
- [ ] README con secciones: descripción, stack, instalación, variables, ejecución
- [ ] `.gitignore` completo
- [ ] Estructura `client/` + `server/` visible

### GEN-02: Variables de entorno
- [ ] `.env.example` presente sin secretos
- [ ] README explica variables local y producción
- [ ] `.env` en `.gitignore`

### GEN-03: BD y migraciones
- [ ] Conexión verificada al arrancar API
- [ ] Migraciones en carpeta `migrations/`
- [ ] README indica comando de migración
- [ ] Migraciones ejecutables en entorno limpio

### rq-01: Modelo Local
- [ ] Modelo Local en Sequelize
- [ ] Migración create-locals
- [ ] Campos: name, address, phone, category, openingHours, image, active

### rq-02: Modelo Order + OrderItem
- [ ] Modelo Order con FK a User y Local
- [ ] Modelo OrderItem con FK a Order y Product
- [ ] Migraciones create-orders, create-order-items
- [ ] Asociaciones definidas

### Entrega hito 1
- [ ] Matriz de avance con ≥5 requisitos marcados
- [ ] Tag `entrega-hito-1`

---

## Hito 2 — Revisión 40% (≥10/23)

### GEN-04: Registro
- [ ] POST /auth/register funcional
- [ ] Contraseña hasheada con bcrypt
- [ ] Pantalla Register en front
- [ ] Errores 400/409 visibles en UI

### GEN-05: Login JWT
- [ ] POST /auth/login devuelve JWT
- [ ] 401 si credenciales incorrectas
- [ ] Pantalla Login en front
- [ ] Logout limpia sesión

### GEN-06: Middleware auth
- [ ] Rutas protegidas rechazan sin token → 401
- [ ] Token expirado/inválido → 401
- [ ] Documentado qué rutas son públicas

### rq-03: CRUD Locales
- [ ] API: GET, POST, PUT, DELETE /api/v1/locals
- [ ] Front: Listar locales (Home)
- [ ] Front: Crear/editar local (admin)
- [ ] Front: Desactivar local

### rq-08: Panel pedidos activos
- [ ] API: GET /api/v1/orders/active
- [ ] Front: Tablero con pedidos activos
- [ ] Front: Cambiar estado del pedido

### Entrega hito 2
- [ ] Matriz con ≥10 requisitos
- [ ] Demo local (capturas o video)
- [ ] Tag `entrega-hito-2`

---

## Hito 3 — Entrega final 100% + Deploy

### GEN-07: Reset contraseña
- [ ] POST /auth/forgot-password genera token
- [ ] POST /auth/reset-password actualiza password
- [ ] Tokens expiran (1h)
- [ ] Pantallas: solicitar y restablecer

### GEN-08: Error handler
- [ ] 404 para recurso inexistente
- [ ] 500 sin stack trace en producción
- [ ] Validaciones devuelven 400/422 con mensaje
- [ ] Formato JSON uniforme

### GEN-09: CRUD REST + UI
- [ ] CRUD API verificado en Postman
- [ ] Listado y alta/edición en UI
- [ ] UI refleja errores de API

### GEN-10: Validaciones
- [ ] 400/422 por datos inválidos
- [ ] 409 por conflictos de negocio
- [ ] Mensajes útiles en JSON

### GEN-11: Postman
- [ ] Archivo JSON en `postman/`
- [ ] Flujo auth automatizable
- [ ] Casos de error (401, 409/422)

### GEN-12: Evolución esquema
- [ ] Nueva migración versionada
- [ ] Descripción del cambio en README
- [ ] Endpoints/UI actualizados

### GEN-13: Deploy
- [ ] URL API Railway en README
- [ ] Front público carga y consume API
- [ ] CORS configurado
- [ ] Migraciones aplicadas en BD de producción

### rq-04: CRUD Pedidos
- [ ] API: CRUD /api/v1/orders
- [ ] Front: Mis pedidos con lista
- [ ] Front: Detalle del pedido

### rq-05: No cancelar en_camino/entregado
- [ ] API rechaza cancelación → 409
- [ ] Front muestra error al usuario

### rq-06: Total coherente
- [ ] Total calculado = SUM(items.quantity * price)
- [ ] Validado al crear pedido

### rq-07: Filtros
- [ ] API: filtros por estado, userId, localId
- [ ] Front: select/filtro en Mis Pedidos

### rq-09: Flujo crear pedido
- [ ] API: POST /orders con transacción
- [ ] Front: Carrito → dirección → confirmar
- [ ] Tracking en UI (barra de progreso)

### rq-10: Asignar repartidor + ETA
- [ ] API: asignar repartidor a pedido
- [ ] API: ETA simulado (15-45 min)
- [ ] Front: mostrar repartidor y ETA

### Entrega final
- [ ] Matriz completa 23/23
- [ ] README con URLs de producción
- [ ] Postman funcional contra API deployada
- [ ] Demo en URL pública
- [ ] Tag `entrega-hito-3`
