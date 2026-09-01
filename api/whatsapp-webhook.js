// ============================================================
// TSolutions IPIDD — /api/whatsapp-webhook.js
// Integración Oficial de RUA (Real Utility Agent) con WhatsApp Business API
// Respuestas 100% en Vivo con Gemini AI (SIN Presets Genéricos)
// ============================================================

import fs from "fs";
import path from "path";

const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || "TSOLUTIONS_RUA_VERIFY_TOKEN_2026";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

// Sistema de Conocimiento RUA para WhatsApp Business
const RUA_SYSTEM_PROMPT = `Eres RUA 🤖 (Real Utility Agent), el estratega tecnológico y asistente inteligente oficial de TSolutions IPIDD.
Atiendes en tiempo real a dueños de negocios, directores y emprendedores en WhatsApp Business.

Filosofía Institucional:
“Tecnología instalada. Conocimiento transferido. Negocios escalados.”

Soluciones y Catálogo de Precios Transparentes:
- 💳 Tarjeta Smart ($950 MXN): Bio link móvil de 1 sola sección en zona de pulgar para captar y cerrar ventas por WhatsApp en 1 toque.
- 📍 Tu Negocio en Google ($2,750 MXN): Rescate de ficha en Google Maps, unificación de horarios, depuración de fotos y posicionamiento SEO Local.
- 🔥 Paquete Híbrido Escala Rápida ($3,700 MXN): Smart Web + Google Maps optimizado (Nuestro paquete más vendido para PYMEs).
- 🌐 Ecosistema Total ($5,450 MXN): Sitio web corporativo multi-sección, pasarela de cobro integrada, correos corporativos y Middleware de IA backend.
- 📦 E-commerce Total con Logística ($9,850 MXN): Tienda transaccional con APIs de Uber Direct / DiDi para entregas locales y cobros automáticos.
- 🎁 REGALO ESPECIAL: En la contratación de pasarelas de cobro o E-commerce, regalamos una Terminal Point Mini de Mercado Pago para cobros físicos en local.
- 🏛️ Consultoría Estructural (SOPs): Mapeo de procesos y manuales operativos para eliminar el desorden operativo.
- 🎨 Brand Builder ($1,850 MXN): Logotipo, paleta cromática, manual de identidad y narrativa comercial.
- 🎓 Constancia de Aprendizaje Tecnológico: Capacitación andragógica al personal para que el cliente sea 100% independiente (cero código huérfano).

Enlaces Oficiales para compartir:
- 🧭 Diagnóstico de Fugas Operativas (2 min): https://tsolutionsipidd.com/diagnostico
- 📅 Agenda de Sesión de 20 min con un Estratega: https://tsolutionsipidd.com/agenda
- 📚 3 E-books Gratuitos: https://tsolutionsipidd.com/ebooks
- 💼 Portafolio y Casos de Éxito: https://tsolutionsipidd.com/portafolio

Reglas de Comunicación en WhatsApp:
- Responde de forma personalizada analizando exactamente lo que el usuario pregunta. NUNCA uses respuestas fijas predeterminadas.
- Tono: Seguro, ejecutivo, entusiasta, cálido y enfocado en rentabilidad para negocios.
- Formato: Mensajes ágiles (2 a 3 párrafos cortos), emojis bien colocados y saltos de línea legibles en celulares.`;

// Generador Inteligente con Gemini AI (Si falla, reporta el error explícito)
async function generateAIResponse(userMessage, senderPhone) {
  if (!GEMINI_API_KEY || GEMINI_API_KEY.trim() === "") {
    return "⚠️ [Error RUA]: La clave GEMINI_API_KEY no está configurada en el servidor. No es posible generar respuesta de IA.";
  }

  const modelsToTry = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash"];
  let lastErrorDetail = "";

  for (const model of modelsToTry) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
      const payload = {
        contents: [{ role: "user", parts: [{ text: userMessage }] }],
        systemInstruction: { role: "system", parts: [{ text: RUA_SYSTEM_PROMPT }] },
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 600,
        }
      };

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (aiText && aiText.trim()) {
          console.log(`[RUA WhatsApp AI] Respuesta generada exitosamente con ${model}`);
          return aiText;
        }
      } else {
        const errText = await response.text();
        lastErrorDetail = `HTTP ${response.status}: ${errText}`;
        console.error(`[Gemini ${model} Error] ${lastErrorDetail}`);
      }
    } catch (err) {
      lastErrorDetail = err.message;
      console.error(`[Gemini ${model} Exception]`, err);
    }
  }

  // En caso de fallo total de la IA, retornar el error explícito sin presets
  return `⚠️ [Error RUA]: No fue posible conectar con el motor de Inteligencia Artificial (Gemini AI). Detalle: ${lastErrorDetail || "Fallo de conexión o cuota de API excedida"}.`;
}

// Enviar mensaje a WhatsApp vía Meta Graph API
async function sendWhatsAppMessage(recipientPhone, messageText) {
  if (!WHATSAPP_TOKEN || !WHATSAPP_PHONE_NUMBER_ID) {
    console.error(`[WhatsApp Error] Faltan WHATSAPP_TOKEN o WHATSAPP_PHONE_NUMBER_ID.`);
    return { error: "Faltan credenciales de WhatsApp en el servidor." };
  }

  try {
    const url = `https://graph.facebook.com/v19.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${WHATSAPP_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: recipientPhone,
        type: "text",
        text: { preview_url: true, body: messageText }
      })
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("[WhatsApp API Error]", error);
    return { error: error.message };
  }
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

  if (req.method === "OPTIONS") return res.status(200).end();

  // 1. VERIFICACIÓN DE WEBHOOK (GET - Meta Challenge)
  if (req.method === "GET") {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("[WhatsApp Webhook] Verificado con éxito por Meta.");
      return res.status(200).send(challenge);
    }
    return res.status(403).json({ error: "Token de verificación inválido" });
  }

  // 2. RECEPCIÓN DE MENSAJES DE WHATSAPP (POST)
  if (req.method === "POST") {
    const body = req.body || {};

    try {
      const entry = body.entry?.[0];
      const changes = entry?.changes?.[0]?.value;
      const message = changes?.messages?.[0];

      if (message && message.type === "text") {
        const fromNumber = message.from;
        const userText = message.text?.body || "";
        const contactProfile = changes?.contacts?.[0]?.profile?.name || "Prospecto";

        console.log(`[WhatsApp Inbound] De: ${contactProfile} (${fromNumber}): "${userText}"`);

        // Generar respuesta con IA en vivo (o reportar error)
        const ruaReply = await generateAIResponse(userText, fromNumber);

        // Enviar respuesta por WhatsApp
        await sendWhatsAppMessage(fromNumber, ruaReply);

        // Guardar lead de WhatsApp en el registro local
        try {
          const leadsDir = path.join(process.cwd(), "data");
          if (!fs.existsSync(leadsDir)) fs.mkdirSync(leadsDir, { recursive: true });
          const logFile = path.join(leadsDir, "whatsapp_leads.json");
          
          let existingLogs = [];
          if (fs.existsSync(logFile)) {
            existingLogs = JSON.parse(fs.readFileSync(logFile, "utf-8") || "[]");
          }
          existingLogs.push({
            name: contactProfile,
            phone: fromNumber,
            message: userText,
            ruaResponse: ruaReply,
            timestamp: new Date().toISOString()
          });
          fs.writeFileSync(logFile, JSON.stringify(existingLogs.slice(-100), null, 2), "utf-8");
        } catch (fileErr) {}

        return res.status(200).json({ status: "success", replySent: true });
      }

      return res.status(200).json({ status: "ignored_or_status_update" });
    } catch (err) {
      console.error("[WhatsApp Webhook Error]", err);
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: "Método no permitido" });
}
