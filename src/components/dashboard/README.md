# `/src/components/dashboard` — Sistema de Dashboard

Componentes especializados para la visualización de datos y métricas corporativas.

## Componentes

| Archivo | Props | Descripción |
|---|---|---|
| `DashboardLayout.jsx` | `children` | Wrapper oscuro con padding y título de sección |
| `ProgressBar.jsx` | `progress: number` | Barra de progreso horizontal (0–100%) |
| `AnalyticsChart.jsx` | `data: [{name, design, functional}]` | Gráfica de barras usando Chart.js |
| `StatusPanel.jsx` | `tokens`, `interactivity`, `components` | Panel de badges de estado del sistema |
| `Dashboard.jsx` | — | Página completa de dashboard (importada por páginas) |
| `data.js` | — | Datos estáticos para demos |
| `dashboardData.js` | — | Datos exportados como named exports |
| `index.js` | — | Barrel export |

## Uso

```jsx
import { DashboardLayout, ProgressBar, AnalyticsChart, StatusPanel } from "../components/dashboard";

<DashboardLayout>
  <ProgressBar progress={75} />
  <AnalyticsChart data={[{ name: "Button", design: 100, functional: 100 }]} />
  <StatusPanel
    tokens="✔ Tokens completos"
    interactivity="✔ Interactividad activa"
    components="✔ Componentes optimizados"
  />
</DashboardLayout>
```

## Reglas

- `AnalyticsChart` requiere `chart.js` y `react-chartjs-2` instalados
- `DashboardLayout` provee fondo `negroProfundo` — no anidar otro layout oscuro
- `StatusPanel` muestra solo los props que recibe (renderizado condicional)
