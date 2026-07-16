# `/src/effects/background` — Fondos Animados

Componentes de fondo con efectos visuales premium.

## Componentes

| Componente | Props | Descripción |
|---|---|---|
| `Grid3D` | `color`, `opacity` | Grid perspectiva 3D con efecto de profundidad |
| `ParticleField` | `count`, `color`, `speed` | Campo de partículas flotantes |
| `ParticleFieldNetwork` | `count`, `color`, `connectionDistance` | Red de partículas conectadas con líneas |

## Uso

```jsx
import { ParticleFieldNetwork, Grid3D } from "../effects/background";

<div className="relative min-h-screen">
  <ParticleFieldNetwork count={80} color="#00E5FF" />
  <div className="relative z-10">Contenido encima</div>
</div>
```

## Reglas

- El contenedor padre debe tener `position: relative` y `overflow: hidden`
- El contenido va encima del background con `position: relative z-index > 0`
- Estos efectos usan Canvas o CSS — no agregar más de 2 efectos de background por página
