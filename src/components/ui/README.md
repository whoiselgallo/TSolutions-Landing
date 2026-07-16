# `/src/components/ui` — Librería UI Base

Colección de 16 componentes UI reutilizables con tokens corporativos TSolutions IPIDD.

## Componentes

| Componente | Archivo | Descripción |
|---|---|---|
| `Button` | Button.jsx | Botón con variantes: primary, secondary, ghost, turquesa, naranja |
| `Card` | Card.jsx | Tarjeta con soporte `glow` y variantes de fondo |
| `Input` | Input.jsx | Campo de texto con label flotante y soporte `glow` |
| `Select` | Select.jsx | Dropdown con opciones, label y glow |
| `Slider` | Slider.jsx | Control deslizante con label |
| `Toggle` | Toggle.jsx | Interruptor on/off |
| `Modal` | Modal.jsx | Ventana modal con `open`, `onClose`, `title` |
| `Tooltip` | Tooltip.jsx | Tooltip hover con `text` prop |
| `Loader` | Loader.jsx | Indicador de carga animado |
| `Table` | Table.jsx | Tabla con `columns[]` y `data[][]` |
| `Chip` | Chip.jsx | Etiqueta pequeña con variantes |
| `Badge` | Badge.jsx | Badge con variantes: turquesa, naranja, blanco, ghost |
| `Avatar` | Avatar.jsx | Avatar circular con iniciales o imagen |
| `Navbar` | Navbar.jsx | Barra de navegación horizontal |
| `Sidebar` | Sidebar.jsx | Panel lateral colapsable |
| `FormGroup` | FormGroup.jsx | Agrupador de campos de formulario |

## Configuración

`ui.config.js` — fuente de verdad para variantes, tamaños y efectos (exportado como `UIConfig`).

## Uso

```jsx
import { Button, Card, Modal, Badge } from "../components/ui";

<Button variant="primary">Guardar</Button>
<Card glow>Contenido de tarjeta</Card>
<Badge variant="turquesa">Activo</Badge>
```

## Reglas

- Siempre usar variantes definidas en `ui.config.js`
- El prop `glow` activa `shadow-glowTurquesaSoft` + `hover:shadow-glowTurquesaHover`
- Importar desde el barrel `index.js` (minúscula), nunca directamente del archivo
- Los tokens de color vienen de `styles/tokens.css` vía variables CSS
