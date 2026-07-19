# 🟧 TSolutions IPIDD — Manual del Design System V1 & Documentación Técnica

Documentación maestra del **Design System V1**, paquetes reutilizables de UI, efectos visuales, tokens de diseño CSS, variables corporativas y configuración de Tailwind CSS del proyecto **TSolutions Landing**.

---

## 🎨 1. Sistema de Colores Corporativos (Color Tokens)

El sistema de colores de TSolutions utiliza **Naranja Energy** como acento primario predominante, **Negro Profundo / Midnight** para fondos futuristas, y **Aqua Turquesa** para resaltados sutiles.

### 📊 Regla de Predominancia Cromática
* 🟧 **Naranja Energy (#F97316)**: **70% de la identidad** (Botones primarios, brillos, títulos destacados, bordes activos).
* ⬛ **Negro Profundo / Midnight (#04040A / #0A0A14)**: **20% de la interfaz** (Fondos de pantalla, paneles contenedores).
* 🟦 **Aqua Turquesa (#00E5FF)**: **10% sutil** (Micro-interacciones, badges secundarios, acentos sutiles).

### 🛠️ Tabla de Tokens de Color

| Token Tailwind | Variable CSS | Valor Hex | Uso Principal |
| :--- | :--- | :--- | :--- |
| `naranjaEnergy` | `var(--color-naranjaEnergy)` | `#F97316` | Botones primarios, títulos, hover glow, bordes activos |
| `aquaTurquesa` | `var(--color-aquaTurquesa)` | `#00E5FF` | Badges secundarios, enlaces sutiles, detalles de luz |
| `negroProfundo` | `var(--color-negroProfundo)` | `#04040A` | Fondo principal del sitio (`body`), contenedores oscuros |
| `blancoPuro` | `var(--color-blancoPuro)` | `#F0F0F8` | Textos primarios sobre fondo oscuro, elementos claros |
| `midnightPanel` | `var(--color-midnightPanel)` | `#0A0A14` | Tarjetas de dashboard, paneles flotantes |
| `deepGrid` | `var(--color-deepGrid)` | `#0F0F1E` | Rejillas, bordes oscuros, tracks de slider |
| `humo` | `var(--color-humo)` | `#E0E0E0` | Textos atenuados, bordes suaves |
| `dorado` | `var(--color-dorado)` | `#FFD700` | Estados hover de botones primarios |
| `deepBlack` | `var(--color-deepBlack)` | `#04040A` | Alias corporativo para fondo negro profundo |
| `blancoPerla` | `var(--color-blancoPerla)` | `#F0F0F8` | Alias corporativo para blanco puro |

---

## 🔤 2. Tipografía Corporativa (Typography System)

Se emplean tres fuentes Google Fonts registradas en `tailwind.config.js` y `tokens.css`:

```javascript
fontFamily: {
  bruno: ["Bruno Ace", "sans-serif"],
  montserratSlim: ["Montserrat Super Slim", "sans-serif"],
  inter: ["Inter", "sans-serif"],
}
```

### 📋 Guía de Utilización de Tipografías

* **`font-bruno` (Bruno Ace)**: Títulos principales `<h1>` a `<h3>`, botones corporativos, etiquetas del dashboard y badges.
* **`font-montserratSlim`**: Subtítulos ultra delgados corporativos, etiquetas flotantes de campos de formulario.
* **`font-inter`**: Textos de cuerpo, párrafos, tablas corporativas y mensajes contextuales.

---

## 💡 3. Sombras & Efectos de Brillo (Glow System)

Configurados en `boxShadow` dentro de `tailwind.config.js` y expuestos como variables CSS en `tokens.css`:

```javascript
boxShadow: {
  glowEnergy: "0 0 12px rgba(249,115,22,0.35)",
  glowEnergyHover: "0 0 20px rgba(249,115,22,0.55)",
  glowTurquesaSoft: "0 0 12px rgba(0,229,255,0.30)",
  glowTurquesaHover: "0 0 20px rgba(0,229,255,0.55)",
  glowBlancoPulse: "0 0 10px rgba(255,255,255,0.8)",
  card: "0 8px 24px rgba(0,0,0,0.08)",
}
```

Ejemplo de uso en Tailwind: `className="shadow-glowEnergy hover:shadow-glowEnergyHover"`

---

## 🟠 4. Radios & Espaciado (Radii & Spacing)

```javascript
borderRadius: {
  soft: "10px",     // var(--radiusSoft)
  medium: "12px",   // var(--radiusMedium)
  large: "14px",    // var(--radiusLarge)
  full: "999px",    // var(--radiusFull)
}
```

Sistema de espaciado basado en escala de 4px: `spacing: { 1: '4px', 2: '8px', 3: '12px', 4: '16px', 5: '20px', 6: '24px', 7: '28px', 8: '32px' }`.

---

## ⚙️ 5. Animaciones & Keyframes (Animation System)

Mapeadas en `tailwind.config.js`:

| Clase Tailwind | Transición / Animación | Keyframe / Descripción |
| :--- | :--- | :--- |
| `animate-fadeTurquesa` | `0.6s ease-out` | Desvanecimiento de entrada con ascenso de 6px |
| `animate-slideSoft` | `0.6s ease-out` | Desplazamiento desde la izquierda/abajo suave |
| `animate-scaleIn` | `0.6s ease-out` | Escala incremental de 95% a 100% con opacidad |
| `animate-slideLeft` | `0.6s ease-out` | Entrada lateral desde la derecha (40px) |
| `animate-slideRight` | `0.6s ease-out` | Entrada lateral desde la izquierda (-40px) |
| `animate-blurIn` | `0.7s ease-out` | Entrada con desenfoque decreciente de 12px a 0px |
| `animate-zoomOut` | `0.7s ease-out` | Zoom de 110% a 100% |
| `animate-pulse` | `2s infinite` | Pulso suave continuo |

---

## 🧩 6. Librería de Componentes Reutilizables (`src/components/ui`)

Todos los componentes de UI son exportados a través del barrel file **[`src/components/ui/index.js`](file:///T:/TSolutions%20Landing/src/components/ui/index.js)**:

```javascript
import { Button, Card, Input, Select, Slider, Toggle, Modal, Tooltip, Table, Badge, Chip, Avatar } from "../components/ui";
```

### 📦 Catálogo de Componentes de UI

#### 1. `<Button />` ([`Button.jsx`](file:///T:/TSolutions%20Landing/src/components/ui/Button.jsx))
* **Props**: `variant` ("primary" | "secondary" | "ghost" | "naranja" | "turquesa" | "blanco"), `size` ("sm" | "md" | "lg"), `glow` (boolean), `label` (string), `children` (ReactNode), `iconLeft`, `iconRight`.
* **Ejemplo**:
  ```jsx
  <Button variant="primary" glow>Iniciar Proyecto</Button>
  ```

#### 2. `<Card />` ([`Card.jsx`](file:///T:/TSolutions%20Landing/src/components/ui/Card.jsx))
* **Props**: `glow` (boolean, por defecto `false`), `variant` ("dark" | "light" | "turquesa"), `padding` ("sm" | "md" | "lg"), `title`, `footer`, `children`.
* **Ejemplo**:
  ```jsx
  <Card glow={true} title="Tarjeta Naranja">Contenido de la tarjeta</Card>
  ```

#### 3. `<Input />` ([`Input.jsx`](file:///T:/TSolutions%20Landing/src/components/ui/Input.jsx))
* **Props**: `label`, `value`, `onChange`, `glow` (boolean).

#### 4. `<Select />` ([`Select.jsx`](file:///T:/TSolutions%20Landing/src/components/ui/Select.jsx))
* **Props**: `label`, `options` (`[{ label, value }]`), `value`, `onChange`, `glow`.

#### 5. `<Slider />` ([`Slider.jsx`](file:///T:/TSolutions%20Landing/src/components/ui/Slider.jsx))
* **Props**: `label`, `value`, `onChange`, `glow`.

#### 6. `<Toggle />` ([`Toggle.jsx`](file:///T:/TSolutions%20Landing/src/components/ui/Toggle.jsx))
* **Props**: `label`, `checked`, `onChange`.

#### 7. `<Modal />` ([`Modal.jsx`](file:///T:/TSolutions%20Landing/src/components/ui/Modal.jsx))
* **Props**: `open` (boolean), `onClose` (function), `title`, `children`, `glow`.

#### 8. `<Tooltip />` ([`Tooltip.jsx`](file:///T:/TSolutions%20Landing/src/components/ui/Tooltip.jsx))
* **Props**: `text`, `children`.

#### 9. `<Table />` ([`Table.jsx`](file:///T:/TSolutions%20Landing/src/components/ui/Table.jsx))
* **Props**: `columns` (array de títulos), `data` (matriz bidimensional de celdas).

#### 10. `<Badge />` ([`Badge.jsx`](file:///T:/TSolutions%20Landing/src/components/ui/Badge.jsx))
* **Props**: `variant` ("naranja" | "turquesa" | "blanco" | "ghost"), `size`, `glow`, `label`, `children`.

#### 11. `<Chip />` ([`Chip.jsx`](file:///T:/TSolutions%20Landing/src/components/ui/Chip.jsx))
* **Props**: `variant` ("default" | "naranja" | "aqua" | "ghost" | "soft"), `size`, `glow`, `interactive`, `label`, `children`.

#### 12. `<Avatar />` ([`Avatar.jsx`](file:///T:/TSolutions%20Landing/src/components/ui/Avatar.jsx))
* **Props**: `size` ("sm" | "md" | "lg"), `src`, `alt`, `fallback`, `glow`, `border`.

---

## 🔮 7. Efectos Visuales & Interacciones (`src/effects`)

Paquetes de animación avanzada organizados por categoría:

* **`src/effects/text`**: 
  * `NeonText`: Texto resplandeciente con efecto Neón corporativo.
  * `Typewriter`: Escritura mecanográfica paso a paso.
  * `TypewriterLoop`: Bucle infinito de términos tecnológicos.
* **`src/effects/click`**: 
  * `RippleButton`: Botón con onda expansiva de clic tipo Material/Cyberpunk.
* **`src/effects/mouse`**: 
  * `MouseGlow`: Halo de luz naranja que sigue el puntero por la pantalla.
  * `MagneticCard`: Tarjeta con inclinación kinética tridimensional basada en la posición del ratón.
* **`src/effects/background`**: 
  * `Grid3D`: Rejilla perspectiva 3D en constante animación espacial.
  * `ParticleField`: Campo de partículas estelares flotantes en canvas.
* **`src/effects/branding`**: 
  * `LogoPulseSvg`: Isotipo vectorizado con pulso blanco y sombra naranja.
* **`src/effects/loaders`**: 
  * `LoaderIntegral`: Spinner de carga futurista.
* **`src/effects/transitions`**: 
  * `PageTransition`: Envoltorio de cambio de página sin parpadeos.

---

## 📄 8. Estructura CSS Global (`tokens.css` y `index.css`)

### 1. `src/styles/tokens.css`
Declara todas las variables de `:root` para layout, espacio, fuentes, colores hex y keyframes puros de CSS.

```css
:root {
  --color-naranjaEnergy: #F97316;
  --color-aquaTurquesa: #00E5FF;
  --color-negroProfundo: #04040a;
  --color-blancoPuro: #F0F0F8;
  --shadow-glowEnergy: 0 0 12px rgba(249,115,22,0.35);
  ...
}
```

### 2. `src/styles/index.css`
Integra `tokens.css`, las directivas de Tailwind (`@tailwind base; @tailwind components; @tailwind utilities;`) y define utilidades globales como `.container`, `.btn-primary`, `.card`, y `.label-floating`.

---

## 🚀 9. Instrucciones de Compilación y Despliegue

Para construir el paquete listo para Hostinger:

```bash
npm run build
```

El resultado se genera en la carpeta `/dist` e incluye automáticamente los archivos `.htaccess` (para SPA Routing de React Router en Apache) y `contact.php` (conectado a MySQL/leads.csv).

Para generar el archivo comprimido final:

```powershell
Compress-Archive -Path "dist/*", "dist/.htaccess" -DestinationPath "tsolutions-hostinger-deploy.zip" -Force
```

---
*© TSolutions IPIDD — Sistema de Diseño Corporativo V1*
