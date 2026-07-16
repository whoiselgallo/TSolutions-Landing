# `/src/effects/text` — Efectos de Texto

Componentes para animaciones tipográficas avanzadas.

## Componentes

| Componente | Props | Descripción |
|---|---|---|
| `HeroTitle` | `text`, `className` | Título hero con animación de entrada |
| `NeonText` | `text`, `color`, `className` | Texto con efecto neon glow |
| `Typewriter` | `text`, `speed` | Efecto máquina de escribir una sola vez |
| `TypewriterLoop` | `texts[]`, `speed` | Ciclo de textos con efecto typewriter |

## Uso

```jsx
import { NeonText, TypewriterLoop } from "../effects/text";

<NeonText text="TSolutions" color="aquaTurquesa" />
<TypewriterLoop texts={["Innovación", "Tecnología", "Futuro"]} speed={80} />
```
