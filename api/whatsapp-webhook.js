// ============================================================
// TSolutions IPIDD — /api/whatsapp-webhook.js
// Integración Oficial de RUA (Real Utility Agent) con WhatsApp Business API
// ============================================================

import fs from "fs";
import path from "path";

const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN || process.env.META_WHATSAPP_TOKEN;
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || "TSOLUTIONS_RUA_VERIFY_TOKEN_2026";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

// Sistema de Conocimiento RUA para WhatsApp Business
const RUA_SYSTEM_PROMPT = `Eres RUA 🤖 (Real Utility Agent), el asistente oficial de Inteligencia Artificial y Estratega Tecnológico de TSolutions IPIDD.
Atiendes a prospectos y clientes directamente en WhatsApp Business.

Nuestra Promesa de Valor:
“Tecnología instalada. Conocimiento transferido. Negocios escalados.”

Información Clave de TSolutions IPIDD:
- 💳 Nivel 1: Tarjeta Smart ($950 MXN) — Bio link mobile-first en zona de pulgar para captar ventas por WhatsApp.
- 📍 Nivel 2: Tu Negocio en Google ($2,750 MXN) — Rescate geográfico y posicionamiento SEO Local en Google Maps.
- 🔥 Paquete Híbrido Escala Rápida ($3,700 MXN) — Smart Web + Google Maps + automatización (El más pedido).
- 🌐 Nivel 3: Ecosistema Total ($5,450 MXN) — Sitio web multi-sección, pasarela de pago y correos corporativos.
- 📦 E-commerce Total con Logística ($9,850 MXN) — Tienda transaccional con APIs de Uber Direct / DHL y cobros online.
- 🎁 REGALO ESPECIAL: En la contratación de pasarelas o E-commerce, incluimos una Terminal Point Mini de Mercado Pago de REGALO.
- 🏛️ Consultoría Estructural (SOPs): Documentación de flujos de trabajo y procesos operativos.
- 🎨 Brand Builder ($1,850 MXN): Logotipo, manual de identidad y narrativa comercial.
- 🎓 Constancia de Aprendizaje: Capacitación andragógica en 3 dominios para que el equipo opere con autonomía.
- 🧭 Diagnóstico Gratuito: https://tsolutionsipidd.com/diagnostico
- 📅 Agenda de Resultados (Sesión 20 min): https://tsolutionsipidd.com/agenda
- 📚 3 E-books Gratuitos: https://tsolutionsipidd.com/ebooks

Reglas de Respuesta en WhatsApp:
- Sé ágil, cálido, profesional, seguro y enfocado en negocios (máximo 2 a 4 párrafos cortos).
- Usa emojis con buen gusto y saltos de línea para facilitar la lectura en móviles.
- Si el cliente pregunta qué le conviene, recomiéndale el Diagnóstico Digital Gratuito o el Paquete Híbrido.`;

// Motor de Respuestas de Respaldo RUA (Fallback Offline Inmediato)
function getOfflineRuaResponse(userText) {
  const text = (userText || "").toLowerCase();

  if (text.includes("precio") || text.includes("costo") || text.includes("cuanto") || text.includes("paquete")) {
    return "¡Hola! En *TSolutions IPIDD* manejamos precios transparentes y sin letras chiquitas:\n\n" +
      "• 💳 *Tarjeta Smart:* $950 MXN (Mobile-first para WhatsApp)\n" +
      "• 📍 *Tu Negocio en Google:* $2,750 MXN (Rescate en Google Maps)\n" +
      "• 🔥 *Híbrido Escala Rápida:* $3,700 MXN (Smart Web + Maps - El más pedido)\n" +
      "• 🌐 *Ecosistema Total:* $5,450 MXN (Sitio web + Correos corporativos)\n" +
      "• 📦 *E-commerce Total:* $9,850 MXN (Con envíos Uber Direct y *Terminal Point Mini de regalo* 🎁)\n\n" +
      "¿Te gustaría que te recomiende el paquete ideal para tu negocio?";
  }

  if (text.includes("diagnostico") || text.includes("diagnóstico") || text.includes("empezar") || text.includes("auditoria")) {
    return "¡Excelente! Para evaluar las fugas operativas de tu negocio en Google Maps, WhatsApp y pedidos, diseñamos nuestro *Diagnóstico Digital de 2 minutos*:\n\n" +
      "👉 Llénalo aquí: https://tsolutionsipidd.com/diagnostico\n\n" +
      "Al completarlo, te agendaremos una sesión 1 a 1 de 20 min con un Estratega Tecnológico para entregarte tus resultados sin costo.";
  }

  if (text.includes("agenda") || text.includes("cita") || text.includes("horario") || text.includes("sesion")) {
    return "¡Listo! Puedes apartar tu *Sesión Estratégica 1 a 1 de 20 minutos* directamente en nuestra agenda oficial:\n\n" +
      "👉 Elige tu horario: https://tsolutionsipidd.com/agenda\n\n" +
      "Revisaremos tu modelo de negocio y cómo automatizar tu operación.";
  }

  if (text.includes("ebook") || text.includes("libro") || text.includes("gratis") || text.includes("descarga")) {
    return "¡Sí! Tenemos *3 E-books Oficiales Gratuitos* listos para descargar:\n\n" +
      "1. 🎨 *Arquitectura de Marca: Cómo Construir una Identidad que Venda*\n" +
      "2. 🚀 *El Manual Anticaos: Erradica el Desorden en Maps y WhatsApp*\n" +
      "3. 📦 *De Mostrador a Máquina de Despachos: E-commerce con Uber Direct*\n\n" +
      "👉 Descárgalos gratis aquí: https://tsolutionsipidd.com/ebooks";
  }

  return "¡Hola! Soy *RUA 🤖 (Real Utility Agent)*, el asesor de inteligencia artificial de *TSolutions IPIDD*.\n\n" +
    "Estoy aquí para ayudarte a digitalizar tu negocio, erradicar cuellos de botella en pedidos y capacitar a tu equipo.\n\n" +
    "¿En qué te puedo apoyar hoy?\n" +
    "1️⃣ Cotizar un paquete web o tienda online\n" +
    "2️⃣ Iniciar Diagnóstico de Fugas Operativas\n" +
    "3️⃣ Agendar sesión de 20 min con un Estratega";
}

// Generador con Gemini AI
async function generateAIResponse(userMessage, senderPhone) {
  if (!GEMINI_API_KEY) {
    return getOfflineRuaResponse(userMessage);
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
    const payload = {
      contents: [{ role: "user", parts: [{ text: userMessage }] }],
      systemInstruction: { role: "system", parts: [{ text: RUA_SYSTEM_PROMPT }] },
      generationConfig: { temperature: 0.7, maxOutputTokens: 600 }
    };

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      return getOfflineRuaResponse(userMessage);
    }

    const data = await response.json();
    const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return candidateText || getOfflineRuaResponse(userMessage);
  } catch (err) {
    return getOfflineRuaResponse(userMessage);
  }
}

// Enviar mensaje a WhatsApp vía Meta Graph API
async function sendWhatsAppMessage(recipientPhone, messageText) {
  if (!WHATSAPP_TOKEN || !WHATSAPP_PHONE_NUMBER_ID) {
    console.log(`[WhatsApp Simulation] Para: ${recipientPhone} -> Mensaje: ${messageText}`);
    return { success: true, simulated: true };
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
        const fromNumber = message.from; // Teléfono del prospecto
        const userText = message.text?.body || "";
        const contactProfile = changes?.contacts?.[0]?.profile?.name || "Prospecto";

        console.log(`[WhatsApp Inbound] De: ${contactProfile} (${fromNumber}): "${userText}"`);

        // Generar respuesta con el cerebro de RUA
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
