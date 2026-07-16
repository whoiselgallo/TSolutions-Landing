# `/src/context` — Contextos React Globales

Contextos de React para estado compartido entre componentes.

## Archivos

| Archivo | Context | Descripción |
|---|---|---|
| `DashboardContext.jsx` | `DashboardContext` | Estado global del dashboard: progreso, métricas, configuración |

## Uso

```jsx
import { DashboardContext } from "../context/DashboardContext";
import { useContext } from "react";

function MiComponente() {
  const { progress, setProgress } = useContext(DashboardContext);
  return <div>{progress}%</div>;
}

// Proveedor en el layout o página raíz del dashboard:
import { DashboardProvider } from "../context/DashboardContext";
<DashboardProvider><Dashboard /></DashboardProvider>
```

## Reglas

- Cada contexto debe tener su propio archivo
- Siempre exportar tanto el `Context` como el `Provider`
- Solo usar para estado verdaderamente global — preferir props para estado local
