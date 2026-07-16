# `/src/effects/transitions` — Transiciones de Página

Sistema de transiciones de entrada/salida para páginas y secciones.

## Componentes

| Componente | Props | Descripción |
|---|---|---|
| `PageTransition` | `type`, `direction`, `speed`, `glow`, `children` | Envuelve contenido con animación de entrada CSS |

## Props de PageTransition

| Prop | Valores | Default | Descripción |
|---|---|---|---|
| `type` | `"fade"`, `"slide"`, `"scale"` | `"fade"` | Tipo de animación |
| `direction` | `"up"`, `"down"`, `"left"`, `"right"` | `"up"` | Dirección (solo para slide) |
| `speed` | `"slow"`, `"normal"`, `"fast"` | `"normal"` | Velocidad de la transición |
| `glow` | `boolean` | `false` | Activa shadow-glowTurquesaSoft |

## Uso

```jsx
import PageTransition from "../effects/transitions/PageTransition";

<PageTransition type="slide" direction="up" speed="slow" glow>
  <MiPagina />
</PageTransition>
```

## Funcionamiento

Usa CSS `transition-all` con estados `opacity-0` → `opacity-100`. El estado inicial se pinta en el primer render, y tras 30ms cambia al estado visible para disparar la transición.
