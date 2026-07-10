# 📘 **TSolutions IPIDD — Botones (Design System V1)**

Los botones son uno de los componentes centrales del sistema de diseño.  
Transmiten el estilo **futurista elegante**, con **glow turquesa**, **tipografía Bruno Ace**, y **bordes suavemente redondeados**.

---

## 🟧 **1. Variantes disponibles**

### ### **1.1 Botón Primario — Naranja Energy**
Uso principal para acciones destacadas.

```jsx
<Button variant="primary">Primario</Button>
```

**Características:**
- Fondo: `naranjaEnergy`
- Texto: `blancoPuro`
- Glow: `blancoPulse` + `turquesaSoft`
- Hover: `turquesaHover`
- Tipografía: `Bruno Ace`

---

### ### **1.2 Botón Secundario — Aqua Turquesa**
Acciones secundarias o complementarias.

```jsx
<Button variant="secondary">Secundario</Button>
```

**Características:**
- Fondo: `aquaTurquesa`
- Texto: `negroProfundo`
- Glow blanco + turquesa
- Hover turquesa brillante

---

### ### **1.3 Botón Fantasma — Negro Profundo**
Ideal para fondos claros o secciones minimalistas.

```jsx
<Button variant="ghost">Fantasma</Button>
```

**Características:**
- Fondo transparente
- Borde negro profundo
- Hover: fondo negro + texto blanco
- Glow turquesa suave

---

### ### **1.4 Outline Turquesa**
Botón elegante para acciones secundarias.

```jsx
<Button variant="outlineTurquesa">Outline Turquesa</Button>
```

**Características:**
- Borde turquesa
- Texto turquesa
- Hover: fondo turquesa + texto negro

---

### ### **1.5 Outline Blanco**
Ideal para fondos oscuros.

```jsx
<Button variant="outlineBlanco">Outline Blanco</Button>
```

**Características:**
- Borde blanco puro
- Texto blanco
- Hover: fondo blanco + texto negro

---

## 🟦 **2. Tamaños**

### ### **2.1 Tamaño estándar (md)**

```jsx
<Button size="md">Acción</Button>
```

- Padding medio  
- Tipografía Bruno Ace  
- Uso general en toda la interfaz  

---

### ### **2.2 Mini**

```jsx
<Button size="mini">Mini</Button>
```

- Compacto  
- Ideal para chips, toolbars o acciones rápidas  

---

### ### **2.3 XL (Hero Button)**

```jsx
<Button size="xl">XL Button</Button>
```

- Tipografía Montserrat Super Slim  
- Tamaño gigante para secciones hero  
- Letter-spacing negativo  
- Glow blanco + turquesa  

---

## 🟣 **3. Botón con ícono**

```jsx
<Button icon>Acción</Button>
```

**Características:**
- Ícono circular blanco con glow turquesa  
- Separación de 12px  
- Ideal para acciones visuales  

---

## 🧩 **4. Props disponibles**

| Prop | Tipo | Descripción |
|------|------|-------------|
| `variant` | string | Define el estilo del botón (`primary`, `secondary`, `ghost`, `outlineTurquesa`, `outlineBlanco`) |
| `size` | string | Tamaño del botón (`md`, `mini`, `xl`) |
| `icon` | boolean | Activa el ícono circular blanco |
| `children` | node | Texto o contenido del botón |
| `...props` | any | Atributos adicionales (`onClick`, `type`, etc.) |

---

## 🧩 **5. Código del componente**

```jsx
export function Button({
  children,
  variant = "primary",
  size = "md",
  icon = null,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-3 font-bruno tracking-brunoMedium transition shadow-turquesaSoft rounded-medium";

  const variants = {
    primary:
      "bg-naranjaEnergy text-blancoPuro shadow-blancoPulse hover:shadow-turquesaHover hover:bg-[#fb8a2f]",
    secondary:
      "bg-aquaTurquesa text-negroProfundo shadow-blancoPulse hover:shadow-turquesaHover hover:bg-[#4ef2ff]",
    ghost:
      "bg-transparent text-negroProfundo border-2 border-negroProfundo hover:bg-negroProfundo hover:text-blancoPuro hover:shadow-turquesaHover",
    outlineTurquesa:
      "border-2 border-aquaTurquesa text-aquaTurquesa hover:bg-aquaTurquesa hover:text-negroProfundo hover:shadow-turquesaHover",
    outlineBlanco:
      "border-2 border-blancoPuro text-blancoPuro hover:bg-blancoPuro hover:text-negroProfundo hover:shadow-turquesaHover",
  };

  const sizes = {
    md: "px-6 py-3 text-base",
    mini: "px-3 py-1 text-sm rounded-soft",
    xl: "px-10 py-6 text-[90px] font-montserratSlim tracking-tightSlim rounded-large",
  };

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]}`} {...props}>
      {icon && (
        <span className="w-5 h-5 bg-blancoPuro rounded-full shadow-turquesaSoft"></span>
      )}
      {children}
    </button>
  );
}
```




**El componente `Card.jsx`** totalmente alineado con tu **Design System V1 Cards

Está limpio, modular y listo para integrarse en tu landing.

---

# 🎨 `src/components/ui/Card.jsx`

```jsx
export function Card({ title, children }) {
  return (
    <div className="bg-blancoPuro rounded-large shadow-card shadow-turquesaSoft p-6">
      {title && (
        <h3 className="font-bruno font-brunoHeavy tracking-brunoMedium text-negroProfundo mb-3">
          {title}
        </h3>
      )}

      <div className="font-inter text-negroProfundo">
        {children}
      </div>
    </div>
  );
}
```

---

# 📘 Documentación (Markdown)

Aquí tienes el **MD oficial** para tu manual del Design System.

---

# 📘 **TSolutions IPIDD — Card (Tarjeta)**

La tarjeta es un contenedor visual utilizado para agrupar contenido de forma clara y elegante.  
Su diseño sigue los principios del sistema: **futurismo elegante**, **glow turquesa**, **bordes suaves** y **tipografía corporativa**.

---

## 🟦 **1. Uso general**

```jsx
<Card title="Título del módulo">
  Contenido descriptivo del módulo.
</Card>
```

---

## 🎨 **2. Estilos oficiales**

| Token | Valor | Descripción |
|-------|--------|-------------|
| `bg-blancoPuro` | #FFFFFF | Fondo limpio y corporativo |
| `rounded-large` | 14px | Bordes suaves y modernos |
| `shadow-card` | 0 8px 24px rgba(0,0,0,0.08) | Sombra difusa |
| `shadow-turquesaSoft` | glow turquesa | Identidad tecnológica |
| `font-bruno` | Bruno Ace | Títulos |
| `font-inter` | Inter | Cuerpo del contenido |
| `tracking-brunoMedium` | 0.5px | Espaciado elegante |

---

## 🧩 **3. Props disponibles**

| Prop | Tipo | Descripción |
|------|------|-------------|
| `title` | string | Título de la tarjeta (opcional) |
| `children` | node | Contenido interno |

---

## 🧱 **4. Código del componente**

```jsx
export function Card({ title, children }) {
  return (
    <div className="bg-blancoPuro rounded-large shadow-card shadow-turquesaSoft p-6">
      {title && (
        <h3 className="font-bruno font-brunoHeavy tracking-brunoMedium text-negroProfundo mb-3">
          {title}
        </h3>
      )}

      <div className="font-inter text-negroProfundo">
        {children}
      </div>
    </div>
  );
}
```

---

## 🧪 **5. Ejemplos de uso**

### ✔ Tarjeta simple
```jsx
<Card>
  Texto dentro de la tarjeta.
</Card>
```

### ✔ Tarjeta con título
```jsx
<Card title="Información importante">
  Aquí va el contenido del módulo.
</Card>
```

### ✔ Tarjeta con contenido complejo
```jsx
<Card title="Estadísticas">
  <p>Usuarios activos: 1200</p>
  <Button variant="secondary">Ver más</Button>
</Card>
```
