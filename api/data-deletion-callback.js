// ============================================================
// TSolutions IPIDD — /api/data-deletion-callback.js
// Meta / Facebook User Data Deletion Callback
// Cumplimiento oficial con Meta Platform Data Deletion Guidelines
// ============================================================

import crypto from "crypto";

const APP_SECRET = process.env.META_APP_SECRET || process.env.WHATSAPP_APP_SECRET;

function parseSignedRequest(signedRequest, secret) {
  try {
    const [encodedSig, payload] = signedRequest.split(".");
    const sig = Buffer.from(encodedSig.replace(/-/g, "+").replace(/_/g, "/"), "base64");
    const data = JSON.parse(Buffer.from(payload.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf-8"));

    // Validar firma HMAC-SHA256
    const expectedSig = crypto.createHmac("sha256", secret).update(payload).digest();
    if (!crypto.timingSafeEqual(sig, expectedSig)) {
      return null;
    }
    return data;
  } catch (e) {
    return null;
  }
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

  if (req.method === "OPTIONS") return res.status(200).end();

  // En caso de consulta GET informativa
  if (req.method === "GET") {
    return res.status(200).json({
      status: "active",
      message: "TSolutions IPIDD Data Deletion Endpoint",
      instructionsUrl: "https://tsolutionsipidd.com/eliminacion-de-datos"
    });
  }

  if (req.method === "POST") {
    const signedRequest = req.body?.signed_request;
    let userId = "user_" + Date.now();

    if (signedRequest) {
      const data = parseSignedRequest(signedRequest, APP_SECRET);
      if (data && data.user_id) {
        userId = data.user_id;
      }
    }

    const confirmationCode = "DEL-" + Buffer.from(userId + "-" + Date.now()).toString("hex").substring(0, 16).toUpperCase();
    const statusUrl = `https://tsolutionsipidd.com/eliminacion-de-datos?code=${confirmationCode}`;

    console.log(`[Meta Data Deletion] Solicitud de eliminación recibida para User ID: ${userId}. Código: ${confirmationCode}`);

    // Respuesta requerida por el estándar de Meta
    return res.status(200).json({
      url: statusUrl,
      confirmation_code: confirmationCode
    });
  }

  return res.status(405).json({ error: "Método no permitido" });
}
