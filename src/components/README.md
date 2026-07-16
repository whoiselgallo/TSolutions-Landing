# `/src/components` — Sistema de Componentes

Sistema de componentes dividido en 3 capas: UI, Layout y Dashboard.

## Subsistemas

| Carpeta | Propósito | Import |
|---|---|---|
| `ui/` | Librería UI base: Button, Card, Modal, Input, etc. | `from "../components/ui"` |
| `layout/` | Secciones de la landing page: Header, Hero, Footer... | `from "../components/layout"` |
| `dashboard/` | Sistema de dashboard: charts, progress, status | `from "../components/dashboard"` |

## Barrel Export Global

`index.js` re-exporta todo desde los 3 subsistemas:

```js
import { Button, Header, DashboardLayout } from "../components";
```

## Reglas

- Cada componente tiene `export default`
- Cada carpeta tiene un `index.js` que actúa como barrel
- Nunca importar directamente de archivos individuales cuando el barrel está disponible
- Nombres de archivo en PascalCase, carpetas en minúscula
