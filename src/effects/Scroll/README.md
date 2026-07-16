# `/src/effects/scroll` — Hooks de Scroll

Hooks personalizados para efectos de scroll y parallax.

## Hooks

| Hook | Descripción | Retorna |
|---|---|---|
| `useScroll` | Detecta posición Y del scroll | `{ scrollY, scrollDirection }` |
| `useParallax` | Efecto parallax basado en scroll | `{ offset }` |
| `useScrollReveal` | Reveal de elemento al entrar en viewport | `{ ref, isVisible }` |
| `useScrollVelocityGlow` | Glow que aumenta con la velocidad de scroll | `{ glowIntensity }` |
| `useDashboardScroll` | Scroll especial para el dashboard | Estado interno |

## Uso

```js
import { useScrollReveal, useParallax } from "../effects/scroll";

function MyComponent() {
  const { ref, isVisible } = useScrollReveal();
  return <div ref={ref} className={isVisible ? "opacity-100" : "opacity-0"}>...</div>;
}
```
