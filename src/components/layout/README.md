# `/src/components/layout` — Secciones de la Landing Page

Contiene los 6 componentes que forman la estructura visual de la landing page principal.

## Componentes

| Archivo | Descripción | Ruta de uso |
|---|---|---|
| `Header.jsx` | Navbar sticky con logo, links NavLink y menú hamburger responsive | Todas las páginas |
| `Hero.jsx` | Sección hero con título, subtítulo y CTA | Home, LandingPreview |
| `Features.jsx` | Grid de características — acepta prop `items[]` | Home, LandingPreview |
| `Showcase.jsx` | Showcase de productos — acepta prop `title` e `items[]` | Home, LandingPreview |
| `Contact.jsx` | Sección de contacto — acepta `title` y `description` | Home, LandingPreview |
| `Footer.jsx` | Pie de página con copyright | Todas las páginas |
| `index.js` | Barrel export de todos los componentes | Barrel |

## Conexión en el router

El `Header` usa `react-router-dom NavLink`, por lo que requiere estar dentro de `<BrowserRouter>`. App.jsx provee el contexto de router.

## Uso

```jsx
import { Header, Hero, Features, Showcase, Contact, Footer } from "../components/layout";

<Header />
<Hero title="Título" subtitle="Subtítulo" ctaLabel="CTA" />
<Features items={[{ title: "...", description: "..." }]} />
<Showcase title="Productos" items={[{ name: "...", description: "..." }]} />
<Contact title="Contacto" description="..." />
<Footer />
```

## Reglas

- `Header` SIEMPRE debe estar dentro del contexto de BrowserRouter (App.jsx provee este contexto)
- Los componentes usan tokens CSS de `styles/tokens.css` — nunca hardcodear colores
- `Features` y `Showcase` son componentes controlados por props — ideal para datos externos
