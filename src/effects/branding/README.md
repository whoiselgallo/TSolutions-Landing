# `/src/effects/branding` — Efectos de Marca

Componentes de identidad visual animada de TSolutions IPIDD.

## Componentes

| Componente | Props | Descripción |
|---|---|---|
| `LogoPulse` | `size`, `color` | Logo con efecto pulse/glow animado en CSS |
| `LogoPulseSvg` | `size`, `primaryColor`, `secondaryColor` | Logo SVG con animación de pulso corporativa |

## Uso

```jsx
import { LogoPulseSvg } from "../effects/branding";

<LogoPulseSvg size={120} primaryColor="#00E5FF" secondaryColor="#F97316" />
```
