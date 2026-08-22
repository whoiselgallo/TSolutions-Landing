// ============================================================
// TSolutions IPIDD — Serverless Function: Formulario de Contacto
// Guarda leads en Neon PostgreSQL (serverless)
// ============================================================

import { neon } from "@neondatabase/serverless";

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Método no permitido" });
  }

  // Leer datos del body
  const { name, email, message } = req.body || {};

  // Validar campos
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "Todos los campos son obligatorios" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: "El correo electrónico no es válido" });
  }

  try {
    // Conectar a Neon PostgreSQL
    const sql = neon(process.env.DATABASE_URL);

    // Crear tabla si no existe
    await sql`
      CREATE TABLE IF NOT EXISTS contact_leads (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    // Insertar lead
    await sql`
      INSERT INTO contact_leads (name, email, message)
      VALUES (${name.trim()}, ${email.trim()}, ${message.trim()})
    `;

    return res.status(200).json({
      success: true,
      message: "¡Solicitud registrada con éxito en Base de Datos!",
    });
  } catch (error) {
    console.error("[contact.js] Error Neon:", error);
    return res.status(500).json({
      success: false,
      message: "Error del servidor al procesar la solicitud",
    });
  }
}
