// ============================================================
// TSolutions IPIDD — /api/gemini.js
// Serverless Function: Proxy seguro hacia Google Gemini AI
// Usa Service Account para autenticación OAuth2 (sin exponer keys en el frontend)
// ============================================================

import { GoogleAuth } from "google-auth-library";

const GEMINI_BASE = "https://generativelanguage.googleapis.com/v1beta";
const DEFAULT_MODEL = "gemini-2.0-flash";

// ---- Obtener access token desde el Service Account ----
async function getAccessToken() {
  const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!serviceAccountJson) throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON no configurado.");

  const credentials = JSON.parse(serviceAccountJson);
  const auth = new GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/generative-language"],
  });
  const client = await auth.getClient();
  const tokenResponse = await client.getAccessToken();
  return tokenResponse.token;
}

// ---- Handler ----
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const {
    prompt,
    systemInstruction,
    model = DEFAULT_MODEL,
    history = [],
    temperature = 0.7,
    maxOutputTokens = 2048,
  } = req.body || {};

  if (!prompt) {
    return res.status(400).json({ error: "El campo 'prompt' es requerido." });
  }

  try {
    const token = await getAccessToken();

    // Construir el cuerpo de la petición a Gemini
    const body = {
      contents: [
        // Historial de conversación previo (multi-turn)
        ...history.map((msg) => ({
          role: msg.role,
          parts: [{ text: msg.text }],
        })),
        // Mensaje actual del usuario
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature,
        maxOutputTokens,
        candidateCount: 1,
      },
    };

    // Instrucción de sistema (si se proporcionó)
    if (systemInstruction) {
      body.systemInstruction = {
        role: "system",
        parts: [{ text: systemInstruction }],
      };
    }

    const geminiRes = await fetch(
      `${GEMINI_BASE}/models/${model}:generateContent`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!geminiRes.ok) {
      const errorText = await geminiRes.text();
      console.error("[gemini] API error:", errorText);
      return res.status(geminiRes.status).json({ error: "Error de Gemini API", details: errorText });
    }

    const data = await geminiRes.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    return res.status(200).json({
      text,
      model,
      finishReason: data?.candidates?.[0]?.finishReason ?? null,
      usageMetadata: data?.usageMetadata ?? null,
    });
  } catch (err) {
    console.error("[gemini] Error:", err);
    return res.status(500).json({ error: err.message });
  }
}
