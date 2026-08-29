# 🤖 Integración de RUA (Real Utility Agent) con WhatsApp Business

Esta guía describe cómo conectar **RUA** a tu cuenta de **WhatsApp Business** oficial a través de la **WhatsApp Cloud API** de Meta.

---

## 📡 1. Endpoints de Webhook Creados

| Entorno | URL del Webhook | Archivo Backend |
| :--- | :--- | :--- |
| **Vercel / Node.js** | `https://tudominio.com/api/whatsapp-webhook` | `api/whatsapp-webhook.js` |
| **Hosting PHP / Apache** | `https://tudominio.com/api/whatsapp-webhook.php` | `public/api/whatsapp-webhook.php` |

---

## ⚙️ 2. Variables de Entorno Requeridas

Agrega estas variables en tu archivo `.env` o en el panel de Vercel / Hostinger:

```env
# Token de Verificación personalizado (el mismo que configuras en Meta Developer Portal)
WHATSAPP_VERIFY_TOKEN="TSOLUTIONS_RUA_VERIFY_TOKEN_2026"

# Token de Acceso Permanente de WhatsApp Cloud API (System User Token de Meta)
WHATSAPP_TOKEN="EAAxxxxxxx..."

# ID del Número de Teléfono de WhatsApp Business (proporcionado por Meta)
WHATSAPP_PHONE_NUMBER_ID="109876543210987"

# API Key de Gemini para el cerebro de RUA
GEMINI_API_KEY="AIzaxxxxxxx..."
```

---

## 🚀 3. Pasos de Configuración en Meta Developer Portal

1. **Crear o Abrir tu App en Meta for Developers:**
   - Ve a [developers.facebook.com](https://developers.facebook.com/) y entra a tu App.
   - En la barra lateral, selecciona **WhatsApp** > **Configuración**.

2. **Configurar el Webhook:**
   - **URL de devolución de llamada (Callback URL):**  
     `https://tsolutionsipidd.com/api/whatsapp-webhook`  
     *(O tu dominio oficial)*
   - **Token de verificación:**  
     `TSOLUTIONS_RUA_VERIFY_TOKEN_2026`
   - Haz clic en **Verificar y Guardar**.

3. **Suscribir Campos del Webhook:**
   - En la sección **Campos del Webhook**, suscríbete a:
     - `messages` (Obligatorio: para recibir mensajes de clientes).

4. **¡Listo!:**
   - Cuando cualquier usuario envíe un mensaje a tu número de WhatsApp Business, Meta enviará el webhook a RUA.
   - **RUA analizará la consulta**, generará la respuesta inteligente con conocimientos de precios, diagnóstico, agenda y e-books, y responderá automáticamente en tiempo real al WhatsApp del cliente.

---

## 💾 4. Base de Datos de Leads por WhatsApp
Todos los mensajes y contactos entrantes quedan registrados automáticamente en:
`data/whatsapp_leads.json` (Nombre del perfil, número de teléfono, consulta y respuesta de RUA).
