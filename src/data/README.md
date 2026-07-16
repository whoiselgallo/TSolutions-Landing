# `/src/data` — Datos Estáticos

Datos estáticos y constantes de la aplicación.

## Archivos

| Archivo | Exports | Descripción |
|---|---|---|
| `dashboardData.js` | `roadmapPhases`, `kanbanColumnsV2`, etc. | Datos del roadmap y kanban para el dashboard |

## Uso

```js
import { roadmapPhases } from "../data/dashboardData";
```

## Reglas

- Solo datos estáticos — sin lógica de negocio
- Si un dato cambia dinámicamente, moverlo a un contexto o estado de componente
- Formato: arrays de objetos con estructura consistente y documentada
