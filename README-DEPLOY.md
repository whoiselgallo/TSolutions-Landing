# 🚀 README-DEPLOY.md — Guía de Deploy en Hostinger

## Contenido de la carpeta `/dist`

La carpeta `/dist` contiene el build de producción listo para subir a Hostinger.

| Archivo / Carpeta | Descripción |
|---|---|
| `index.html` | HTML principal con SEO, Google Fonts y meta tags |
| `.htaccess` | Configuración Apache para SPA routing + cache + seguridad |
| `assets/` | CSS, JS y assets compilados y optimizados |
| `favicon.svg` | Favicon corporativo SVG |

---

## Pasos para subir a Hostinger

### Método 1: File Manager (recomendado para sitios nuevos)

1. Entra a tu panel de Hostinger → **hPanel**
2. Ve a **Websites → Administrar → File Manager**
3. Navega hasta `public_html/`
4. **Sube TODOS los archivos de `/dist`** (incluyendo `.htaccess` — puede estar oculto, asegúrate de que se transfiere)
5. Si ya hay archivos en `public_html/`, elimínalos primero
6. Verifica que el `.htaccess` esté en la raíz de `public_html/`

### Método 2: FTP / SFTP

```bash
# Conectar via FTP (obtén las credenciales en hPanel → FTP Accounts)
ftp tu-servidor.hostinger.com

# Subir contenido de /dist a public_html/
put dist/* public_html/
put dist/.htaccess public_html/.htaccess
```

### Método 3: Git + Deploy Automático (si tienes plan Business o superior)

```bash
# En tu repositorio GitHub, conecta el repo en hPanel → Git
# Hostinger desplegará automáticamente al hacer push
git add .
git commit -m "deploy: production build"
git push origin main
```

---

## Verificación post-deploy

1. **URL raíz** (`tudominio.com`) → debe mostrar la Landing Page
2. **Ruta anidada** (`tudominio.com/dashboard`) → debe funcionar con F5/refresh
3. **Favicon** → debe aparecer en la pestaña del navegador
4. **Fuentes** → Bruno Ace, Inter y Montserrat deben cargar correctamente

Si las rutas anidadas dan 404 al recargar, verifica que `.htaccess` se subió correctamente.

---

## Configuración del dominio en Hostinger

1. hPanel → **Dominios** → Selecciona tu dominio
2. Asegúrate que apunta al `public_html/` donde subiste los archivos
3. Activa **SSL/HTTPS** en hPanel → **SSL** → Let'\''s Encrypt (gratis)

---

## Actualizar el sitio

Para actualizar el sitio después de cambios:

```bash
# En tu máquina local
npm run build

# Sube el nuevo contenido de /dist a public_html/
# (sobreescribe los archivos anteriores)
```

---

## Variables de entorno

Si en el futuro agregas APIs o servicios externos:
1. Crea `.env` en la raíz del proyecto con `VITE_` prefix:
   ```
   VITE_API_URL=https://api.tsolutions.com
   ```
2. En el código usar: `import.meta.env.VITE_API_URL`
3. **NUNCA** subir `.env` a producción — Hostinger no procesa `.env` de Vite
4. Para variables de producción, configure directamente en el código o usa un backend separado

---

## Soporte

- Documentación Hostinger: https://support.hostinger.com
- Documentación Vite Deploy: https://vitejs.dev/guide/static-deploy
