# `/src/Routes` — Archivos de Rutas Modulares

Módulos de rutas para el sistema de dashboard. App.jsx centraliza el router.

## Archivos

| Archivo | Export | Rutas que define |
|---|---|---|
| `Dashboard.Routes.jsx` | `DashboardRoutes` | `/dashboard`, `/dashboard/showcase`, `/dashboard/full-demo` |
| `DashboardFullDemo.Routes.jsx` | `DashboardFullDemoRoutes` | `/dashboard/full-demo` |

> **Nota**: Actualmente estas rutas son módulos de referencia. El router principal está en `App.jsx`. Si se requiere modularizar el router, importar y usar estas constantes en App.jsx.

## Reglas

- Los imports de páginas DEBEN usar PascalCase: `"../pages/Dashboard"` (no `"../pages/dashboard"`)
- Siempre envolver el elemento de ruta con `<PageTransition>` para consistencia visual
