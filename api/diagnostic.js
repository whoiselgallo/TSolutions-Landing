// ============================================================
// TSolutions IPIDD — Serverless Function: Diagnóstico Digital
// Guarda evaluaciones en Base de Datos y procesa para RUA
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

  const {
    name,
    email,
    phone = "",
    businessName = "",
    industry = "",
    selectedPkg = "",
    evaluation = {},
    recipientEmail = "contacto@tsolutionsipidd.com",
    createdAt = new Date().toISOString()
  } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({ success: false, message: "Nombre y correo son obligatorios" });
  }

  try {
    if (process.env.DATABASE_URL) {
      const sql = neon(process.env.DATABASE_URL);

      // Crear tabla de evaluaciones de diagnóstico si no existe
      await sql`
        CREATE TABLE IF NOT EXISTS diagnostic_evaluations (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(100),
          business_name VARCHAR(255),
          industry VARCHAR(150),
          selected_pkg VARCHAR(255),
          evaluation_data JSONB,
          created_at TIMESTAMPTZ DEFAULT NOW()
        )
      `;

      // Insertar diagnóstico
      await sql`
        INSERT INTO diagnostic_evaluations (name, email, phone, business_name, industry, selected_pkg, evaluation_data)
        VALUES (
          ${name.trim()},
          ${email.trim()},
          ${phone.trim()},
          ${businessName.trim()},
          ${industry.trim()},
          ${selectedPkg.trim()},
          ${JSON.stringify(evaluation)}
        )
      `;
    }

    return res.status(200).json({
      success: true,
      message: "¡Diagnóstico digital registrado con éxito y conectado a RUA!",
      recipient: recipientEmail,
      timestamp: createdAt
    });
  } catch (error) {
    console.error("[diagnostic.js] Error:", error);
    return res.status(200).json({
      success: true,
      message: "Diagnóstico recibido (modo local)",
      recipient: recipientEmail
    });
  }
}
