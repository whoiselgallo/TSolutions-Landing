# `/src/pages` — Páginas de la Aplicación

10 páginas completas, cada una registrada como ruta en `App.jsx`.

## Mapa de rutas

| Página | Ruta | Descripción |
|---|---|---|
| `Home.jsx` | `/` | Landing page principal con Header + PageTransition + todas las secciones |
| `LandingPreview.jsx` | `/landing` | Preview de la landing con PageTransition type=fade |
| `ComponentsPreview.jsx` | `/components` | Showcase interactivo de todos los componentes UI |
| `EffectsPreview.jsx` | `/effects` | Demo de efectos visuales: background, mouse, text, click |
| `TokensPreview.jsx` | `/tokens` | Visualización del design system: colores, tipografía, radios, sombras |
| `Dashboard.jsx` | `/dashboard` | Dashboard principal con ProgressBar + AnalyticsChart + StatusPanel |
| `DashboardShowcase.jsx` | `/dashboard/showcase` | Versión showcase del dashboard |
| `DashboardFullDemo.jsx` | `/dashboard/full-demo` | Demo completo con métricas, actividad y rendimiento |
| `DashboardPreview.jsx` | `/dashboard/preview` | Vista previa del dashboard |
| `ProgressDashboard.jsx` | `/dashboard/progress` | Dashboard de progreso del proyecto |

## Cómo agregar una nueva página

1. Crear `src/pages/NuevaPagina.jsx` con `export default function NuevaPagina()`
2. Importarla en `App.jsx`
3. Agregar `<Route path="/nueva-ruta" element={<NuevaPagina />} />`

## Reglas

- Cada página usa `PageTransition` para animaciones de entrada
- No importar directamente componentes individuales — usar los barrel exports
- El `Header` solo aparece una vez por página (importado en cada página que lo necesite)
