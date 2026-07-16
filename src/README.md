# `/src` — Directorio Principal de TSolutions IPIDD

Contiene todo el código fuente de la aplicación React.

## Flujo de datos

```
main.jsx → App.jsx → Router → Pages → Components/Effects
```

## Estructura

| Archivo / Carpeta | Descripción |
|---|---|
| `main.jsx` | Entry point. Monta `<App />` en `#root` con React.StrictMode |
| `App.jsx` | Router principal. Define todas las rutas con react-router-dom |
| `Routes/` | Archivos de rutas modulares (Dashboard, FullDemo) |
| `assets/` | Imágenes, íconos y recursos estáticos |
| `components/` | Componentes reutilizables: UI, Layout, Dashboard |
| `context/` | Contextos React globales (DashboardContext) |
| `data/` | Datos estáticos de la aplicación |
| `effects/` | Efectos visuales: animaciones, transiciones, scroll |
| `pages/` | Páginas completas montadas por el Router |
| `styles/` | CSS global (tokens.css, index.css) |

## Reglas de uso

- Importar componentes desde sus barrel exports: `../components/layout`, `../components/ui`, `../components/dashboard`
- Los estilos globales se cargan en `main.jsx` via `./styles/index.css`
- Cada nueva página debe registrarse en `App.jsx`
