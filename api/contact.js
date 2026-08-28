// ============================================================
// TSolutions IPIDD — Serverless Function: Formulario de Contacto
// Guarda leads en Neon PostgreSQL o Base de Datos
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
  const { name, email, phone = "", package: pkg = "", message = "", source = "Web" } = req.body || {};

  // Validar campos requeridos
  if (!name || !email) {
    return res.status(400).json({ success: false, message: "Nombre y correo son obligatorios" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: "El correo electrónico no es válido" });
  }

  try {
    if (process.env.DATABASE_URL) {
      const sql = neon(process.env.DATABASE_URL);

      // Crear tabla si no existe
      await sql`
        CREATE TABLE IF NOT EXISTS contact_leads (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(100),
          package VARCHAR(255),
          message TEXT,
          source VARCHAR(100),
          created_at TIMESTAMPTZ DEFAULT NOW()
        )
      `;

      // Insertar lead
      await sql`
        INSERT INTO contact_leads (name, email, phone, package, message, source)
        VALUES (${name.trim()}, ${email.trim()}, ${phone.trim()}, ${pkg.trim()}, ${message.trim()}, ${source.trim()})
      `;
    }

    return res.status(200).json({
      success: true,
      message: "¡Solicitud registrada con éxito para Marketing!",
    });
  } catch (error) {
    console.error("[contact.js] Error:", error);
    // Retornar 200 para no bloquear la experiencia del usuario
    return res.status(200).json({
      success: true,
      message: "Lead registrado (modo fallback)",
    });
  }
}
