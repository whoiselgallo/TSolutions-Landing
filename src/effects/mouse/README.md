# `/src/effects/mouse` — Efectos de Mouse

Componentes reactivos al movimiento del cursor.

## Componentes

| Componente | Props | Descripción |
|---|---|---|
| `MagneticCard` | `children`, `strength` | Tarjeta que sigue magnéticamente al cursor |
| `MouseGlow` | `color`, `size` | Halo de luz que sigue al cursor por la pantalla |
| `MouseTrail` | `color`, `count` | Rastro de partículas detrás del cursor |

## Uso

```jsx
import { MouseGlow, MagneticCard } from "../effects/mouse";

// MouseGlow va en el layout raíz
<MouseGlow color="aquaTurquesa" />

// MagneticCard envuelve cualquier elemento
<MagneticCard><Button>Hover me</Button></MagneticCard>
```

## Nota

`MouseGlow` y `MouseTrail` deben colocarse en un contenedor con `position: relative` o a nivel de página.
