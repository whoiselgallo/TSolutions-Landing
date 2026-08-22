// ============================================================
// 🧠 Lógica de Conexión de Inteligencia Artificial (Servicio)
// ============================================================

/**
 * Servicio unificado para interactuar con APIs de IA,
 * ya sea OpenAI, Gemini, Dify, Make, n8n, etc.
 * 
 * Actualmente configurado como un Mock para pruebas de UI,
 * pero listo para recibir llamadas HTTP reales (fetch/axios).
 */
// Usaremos variables de entorno para no exponer la llave en GitHub
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

export const aiService = {
  /**
   * Enviar mensaje a Gemini
   */
  async sendMessage(message, context = {}) {
    try {
      const response = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }],
          systemInstruction: {
            parts: [{ text: "Eres FerreBot, el asistente experto en ferreterías de TSolutions. Eres conciso, amigable y usas emojis." }]
          }
        })
      });

      if (!response.ok) throw new Error("Error en la API de Gemini");

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error("[Gemini Error]", error);
      return "Hubo un error de conexión con mi red neuronal. Intenta de nuevo más tarde.";
    }
  },

  /**
   * Disparar un Workflow automatizado (ej. en Make o n8n)
   * @param {string} workflowId - ID del workflow
   * @param {object} payload - Datos a enviar al webhook
   */
  async triggerWorkflow(workflowId, payload) {
    console.log(`[Workflow Trigger] ID: ${workflowId}`, payload);
    // return fetch(`https://hook.us1.make.com/${workflowId}`, { ... })
    return Promise.resolve({ success: true, message: "Workflow ejecutado exitosamente" });
  }
};
