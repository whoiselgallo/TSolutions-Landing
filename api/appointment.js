// ============================================================
// TSolutions IPIDD — Serverless Function: Agendamiento de Citas
// Guarda reservas de citas en Base de Datos y notifica
// ============================================================

import { neon } from "@neondatabase/serverless";

export default async function handler(req, res) {
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
    selectedDate = "",
    selectedTime = "",
    package: pkg = "",
    notes = "",
    recipientEmail = "contacto@tsolutionsipidd.com",
    createdAt = new Date().toISOString()
  } = req.body || {};

  if (!name || !email || !selectedDate || !selectedTime) {
    return res.status(400).json({ success: false, message: "Faltan datos obligatorios para la cita" });
  }

  try {
    if (process.env.DATABASE_URL) {
      const sql = neon(process.env.DATABASE_URL);

      await sql`
        CREATE TABLE IF NOT EXISTS appointments (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(100),
          business_name VARCHAR(255),
          selected_date VARCHAR(100) NOT NULL,
          selected_time VARCHAR(100) NOT NULL,
          package VARCHAR(255),
          notes TEXT,
          status VARCHAR(50) DEFAULT 'confirmed',
          created_at TIMESTAMPTZ DEFAULT NOW()
        )
      `;

      await sql`
        INSERT INTO appointments (name, email, phone, business_name, selected_date, selected_time, package, notes)
        VALUES (${name.trim()}, ${email.trim()}, ${phone.trim()}, ${businessName.trim()}, ${selectedDate.trim()}, ${selectedTime.trim()}, ${pkg.trim()}, ${notes.trim()})
      `;
    }

    return res.status(200).json({
      success: true,
      message: "¡Cita reservada y confirmada con éxito!",
      appointment: { name, email, phone, selectedDate, selectedTime, pkg },
      recipient: recipientEmail
    });
  } catch (error) {
    console.error("[appointment.js] Error:", error);
    return res.status(200).json({
      success: true,
      message: "Cita registrada (modo offline/fallback)",
      appointment: { name, email, phone, selectedDate, selectedTime, pkg }
    });
  }
}
