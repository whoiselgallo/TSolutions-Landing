// ============================================================
// TSolutions IPIDD — /api/gemini.js
// Serverless Function: Proxy seguro hacia Google Gemini AI
// Multi-model resilience: gemini-2.5-flash -> gemini-2.0-flash -> gemini-1.5-flash
// ============================================================

import { GoogleAuth } from "google-auth-library";

const GEMINI_BASE = "https://generativelanguage.googleapis.com/v1beta";

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
    history = [],
    temperature = 0.7,
    maxOutputTokens = 1024,
  } = req.body || {};

  if (!prompt) {
    return res.status(400).json({ error: "El campo 'prompt' es requerido." });
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

  if (!apiKey && !process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    console.warn("[Gemini API] Falta GEMINI_API_KEY en variables de entorno.");
    return res.status(500).json({ error: "Falta configurar GEMINI_API_KEY en las variables de entorno del servidor." });
  }

  const token = await getAccessToken();
  const modelsToTry = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash"];
  let lastErrorMessage = "";

  const payload = {
    contents: [
      ...history.map((msg) => ({
        role: msg.role === "assistant" ? "model" : msg.role,
        parts: [{ text: msg.text }],
      })),
      { role: "user", parts: [{ text: prompt }] },
    ],
    generationConfig: {
      temperature,
      maxOutputTokens,
    },
  };

  if (systemInstruction) {
    payload.systemInstruction = {
      role: "system",
      parts: [{ text: systemInstruction }],
    };
  }

  for (const model of modelsToTry) {
    try {
      let url = `${GEMINI_BASE}/models/${model}:generateContent`;
      const headers = { "Content-Type": "application/json" };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      } else if (apiKey) {
        url += `?key=${apiKey}`;
      }

      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (candidateText) {
          return res.status(200).json({ text: candidateText, modelUsed: model });
        }
      } else {
        const errText = await response.text();
        lastErrorMessage = `HTTP ${response.status}: ${errText}`;
        console.error(`[Gemini Proxy ${model} Error] ${lastErrorMessage}`);
      }
    } catch (modelErr) {
      lastErrorMessage = modelErr.message;
      console.error(`[Gemini Proxy ${model} Exception]`, modelErr);
    }
  }

  // Si todos los modelos fallaron, retornar error explícito 500
  return res.status(500).json({ error: `Fallo al generar respuesta con Gemini AI. Detalle: ${lastErrorMessage}` });
}
