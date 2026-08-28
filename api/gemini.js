// ============================================================
// TSolutions IPIDD — /api/gemini.js
// Serverless Function: Proxy seguro hacia Google Gemini AI
// Soporta GEMINI_API_KEY, VITE_GEMINI_API_KEY y GOOGLE_SERVICE_ACCOUNT_JSON
// ============================================================

import { GoogleAuth } from "google-auth-library";

const GEMINI_BASE = "https://generativelanguage.googleapis.com/v1beta";
const DEFAULT_MODEL = "gemini-2.0-flash";

// ---- Obtener access token desde el Service Account (si existe) ----
async function getAccessToken() {
  const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!serviceAccountJson) return null;

  try {
    const credentials = JSON.parse(serviceAccountJson);
    const auth = new GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/generative-language"],
    });
    const client = await auth.getClient();
    const tokenResponse = await client.getAccessToken();
    return tokenResponse.token;
  } catch (e) {
    console.error("[gemini] Error en Service Account:", e);
    return null;
  }
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

  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

  try {
    const token = await getAccessToken();

    // Construir el cuerpo de la petición a Gemini
    const body = {
      contents: [
        // Historial de conversación previo (multi-turn)
        ...history.map((msg) => ({
          role: msg.role === "assistant" ? "model" : msg.role,
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

    let url = `${GEMINI_BASE}/models/${model}:generateContent`;
    const headers = { "Content-Type": "application/json" };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    } else if (apiKey) {
      url += `?key=${apiKey}`;
    } else {
      // Retornar respuesta descriptiva para activar fallback inteligente
      return res.status(200).json({
        text: null,
        fallback: true,
        message: "API Key o Service Account no configurado en entorno del servidor."
      });
    }

    const geminiRes = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    if (!geminiRes.ok) {
      const errorText = await geminiRes.text();
      console.error("[gemini] API error:", errorText);
      return res.status(200).json({
        text: null,
        fallback: true,
        details: errorText
      });
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
    console.error("[gemini] Error general:", err);
    return res.status(200).json({
      text: null,
      fallback: true,
      error: err.message
    });
  }
}
