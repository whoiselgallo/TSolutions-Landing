# `/src/styles` — Sistema de Estilos Global

Dos archivos CSS que forman el Design System de TSolutions IPIDD.

## Archivos

| Archivo | Descripción |
|---|---|
| `tokens.css` | Variables CSS (`:root`) — colores, tipografías, radios, sombras, animaciones, spacing |
| `index.css` | Archivo maestro — importa tokens.css, Tailwind directives y clases utilitarias globales |

## Carga en la app

```js
// main.jsx
import "./styles/index.css"; // carga tokens + tailwind + estilos globales
```

## Tokens disponibles

### Colores
```css
var(--color-naranjaEnergy)   /* #F97316 */
var(--color-aquaTurquesa)    /* #00E5FF */
var(--color-negroProfundo)   /* #04040a */
var(--color-blancoPuro)      /* #F0F0F8 */
var(--color-midnightPanel)   /* #0a0a14 */
var(--color-dorado)          /* #FFD700 */
```

### En Tailwind
Los tokens están registrados en `tailwind.config.js`:
```
bg-negroProfundo, text-aquaTurquesa, border-naranjaEnergy, shadow-glowTurquesaSoft...
```

## Reglas

- NUNCA hardcodear colores en componentes — siempre usar tokens CSS o clases Tailwind
- Al agregar nuevos tokens: primero en `tokens.css` (:root), luego registrar en `tailwind.config.js`
- `index.css` es el único archivo que debe importarse en `main.jsx`
