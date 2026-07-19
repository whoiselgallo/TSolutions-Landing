# TSolutions IPIDD — Landing Page

Sistema de landing page corporativa con design system, efectos visuales premium y dashboard de métricas.

## Stack Tecnológico

| Tecnología | Versión | Rol |
|---|---|---|
| React | 19.x | Framework UI |
| Vite | 8.x | Bundler y dev server |
| Tailwind CSS | 3.x | Estilos utilitarios |
| React Router DOM | 7.x | Routing SPA |
| Chart.js + react-chartjs-2 | 4.x | Gráficas del dashboard |

## Comandos

```bash
npm install      # instalar dependencias
npm run dev      # servidor de desarrollo (http://localhost:5173)
npm run build    # build de producción → /dist
npm run preview  # previsualizar build de producción
```

## Estructura del proyecto

```
TSolutions Landing/
├── public/           # Assets estáticos (favicon.svg)
├── src/
│   ├── App.jsx       # Router principal (10 rutas)
│   ├── main.jsx      # Entry point
│   ├── Routes/       # Módulos de rutas del dashboard
│   ├── components/   # UI + Layout + Dashboard components
│   ├── context/      # Contextos React globales
│   ├── data/         # Datos estáticos
│   ├── effects/      # Efectos visuales y hooks
│   ├── pages/        # 10 páginas de la aplicación
│   └── styles/       # tokens.css + index.css (Design System)
├── index.html        # HTML raíz con SEO + Google Fonts
├── tailwind.config.js
├── vite.config.js
└── postcss.config.js
```

## Rutas disponibles

| Ruta | Página |
|---|---|
| `/` | Home — Landing principal |
| `/landing` | LandingPreview |
| `/components` | Showcase de componentes UI |
| `/effects` | Demo de efectos visuales |
| `/tokens` | Design System / Tokens |
| `/dashboard` | Dashboard principal |
| `/dashboard/showcase` | Dashboard Showcase |
| `/dashboard/full-demo` | Dashboard Full Demo |
| `/dashboard/preview` | Dashboard Preview |
| `/dashboard/progress` | Progress Dashboard |

## Design System

- **Colores**: naranjaEnergy (#F97316), aquaTurquesa (#00E5FF), negroProfundo (#04040a)
- **Tipografías**: Bruno Ace (headings), Inter (body), Montserrat (slim)
- **Radios**: soft (10px), medium (12px), large (14px), full (999px)
- **Animaciones**: fadeTurquesa, slideSoft, scaleIn, glowPulse

Ver [DESIGN_SYSTEM.md](file:///T:/TSolutions%20Landing/DESIGN_SYSTEM.md) para documentación completa del design system, tokens, componentes reutilizables y variantes.

## Deploy en Hostinger

Ver `README-DEPLOY.md` para instrucciones completas de subida a Hostinger.
