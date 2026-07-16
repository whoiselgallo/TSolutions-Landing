# `/src/effects` — Librería de Efectos Visuales

Sistema completo de efectos visuales y hooks corporativos de TSolutions IPIDD.

## Subsistemas

| Carpeta | Tipo | Descripción |
|---|---|---|
| `background/` | Componentes | Fondos animados: Grid3D, ParticleField, ParticleFieldNetwork |
| `branding/` | Componentes | Efectos de marca: LogoPulse, LogoPulseSvg |
| `click/` | Componentes | Efectos de click: RippleButton, Shockwave |
| `loaders/` | Componentes | Indicadores de carga: LoaderIntegral |
| `mouse/` | Componentes | Efectos de mouse: MagneticCard, MouseGlow, MouseTrail |
| `scroll/` | Hooks | Hooks de scroll: useScroll, useParallax, useScrollReveal, useScrollVelocityGlow |
| `text/` | Componentes | Efectos de texto: HeroTitle, NeonText, Typewriter, TypewriterLoop |
| `transitions/` | Componentes | Transiciones de página: PageTransition |

## Barrel Export

```js
import { RippleButton, MouseGlow, NeonText, PageTransition } from "../effects";
```

## Reglas

- Los efectos de background deben usarse con `position: relative` en el contenedor padre
- `PageTransition` debe envolver el contenido completo de una página
- Los hooks de scroll (useScroll, useParallax) solo funcionan en client-side
- Nombres de carpeta en minúscula para compatibilidad Linux/Hostinger
