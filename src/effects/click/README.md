# `/src/effects/click` — Efectos de Click

Componentes de interacción al hacer click.

## Componentes

| Componente | Props | Descripción |
|---|---|---|
| `RippleButton` | `children`, `onClick`, `className` | Botón con efecto ripple de onda al hacer click |
| `Shockwave` | `children`, `color` | Efecto shockwave expansivo al click |

## Uso

```jsx
import { RippleButton } from "../effects/click";

<RippleButton onClick={handleClick}>Hacer algo</RippleButton>
```
