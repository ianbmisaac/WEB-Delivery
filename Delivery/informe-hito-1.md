# Informe de hito — Proyecto final web (individual)

**Alumno:** Ian Barria Mercado  
**Repositorio:** https://github.com/rinostrozacl/docencia-proyectos-web  
**Tema (# y nombre):** #15 — Delivery / Pedidos delivery  
**Hito:** ☐ 0 — Inicio  ☒ 1 — 20%  ☐ 2 — 40%  ☐ 3 — Entrega final (100%)  
**Fecha:** 01-06-2026

---

## 1. Resumen

Se creó la estructura base del proyecto con backend Express + Sequelize + PostgreSQL y frontend Vite + React. Se implementaron los modelos de datos (User, Restaurant, Order) con sus migraciones y relaciones. El servidor se conecta a PostgreSQL, las migraciones se ejecutan correctamente, y la API responde en `/api/health`. Se completaron 5/23 requisitos (GEN-01, GEN-02, GEN-03, rq-01, rq-02).

---

## 2. Alcance del tema

Sistema de gestión de pedidos para delivery con restaurantes y clientes. Las entidades principales son Restaurante (local) y Pedido, con usuarios autenticados mediante JWT.

---

## 3. Trabajo realizado en este hito

### Hito 0 — Inicio del proyecto

- [x] Tema confirmado con docente
- [x] Repositorio creado con estructura client + API
- [x] README inicial con alcance y cronograma
- [x] Revisión de GEN-01 … GEN-13 y rq-01 … rq-10
- [x] Sin requisitos desarrollados aún (salvo borrador opcional)

### Hito 1 — Revisión del 20%

- Requisitos desarrollados (listar IDs): GEN-01, GEN-02, GEN-03, rq-01, rq-02
- Total: 5 / 23 (**mínimo 5**)
- Matriz de avance adjunta: ☒ Sí  ☐ No

---

## 4. Riesgos y dificultades

| Riesgo | Impacto | Mitigación planificada |
|--------|---------|------------------------|
| Instalación de PostgreSQL en Windows | Alto | Usar winget o binarios portables |
| Dependencia de Railway para producción | Medio | Documentar configuración desde el inicio |
| Curva de aprendizaje Sequelize | Medio | Seguir arquitectura y convenciones del curso |

---

## 5. Próximos pasos (siguiente hito)

1. Implementar autenticación (registro, login, JWT) — GEN-04, GEN-05, GEN-06
2. CRUD de restaurantes y pedidos — rq-03, rq-04
3. Panel de seguimiento de pedidos — rq-08

---

## 6. Diagrama ER (opcional — recomendado en hito 0)

```
User (1) ──→ (N) Order
User (1) ──→ (N) Restaurant
Restaurant (1) ──→ (N) Order
```

---

## 7. Declaración

Confirmo que el trabajo de este hito es individual y el repositorio indicado es el oficial de entrega.

> **Hito 0:** obligatorio, **sin nota**. La calificación sale de hitos **1 (20%)**, **2 (30%)** y **3 (50%)** de la nota final.
