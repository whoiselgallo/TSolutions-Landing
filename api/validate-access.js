// ============================================================
// TSolutions — /api/validate-access.js
// Valida un código de acceso contra la tabla access_codes en Neon
// ============================================================
import { neon } from "@neondatabase/serverless";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  const code = (req.query.code || req.body?.code || "").trim().toUpperCase();

  if (!code) {
    return res.status(400).json({ valid: false, message: "Código requerido." });
  }

  try {
    const sql = neon(process.env.DATABASE_URL);

    // Crear tabla si todavía no existe
    await sql`
      CREATE TABLE IF NOT EXISTS access_codes (
        id         SERIAL PRIMARY KEY,
        code       VARCHAR(64) UNIQUE NOT NULL,
        item_id    VARCHAR(100) NOT NULL,
        item_name  TEXT,
        email      VARCHAR(255),
        access_url TEXT NOT NULL,
        used       BOOLEAN DEFAULT FALSE,
        used_at    TIMESTAMPTZ,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        expires_at TIMESTAMPTZ
      )
    `;

    const rows = await sql`
      SELECT * FROM access_codes WHERE UPPER(code) = ${code} LIMIT 1
    `;

    if (rows.length === 0) {
      return res.status(404).json({ valid: false, message: "Código no encontrado. Verifica e intenta de nuevo." });
    }

    const entry = rows[0];

    // Verificar expiración
    if (entry.expires_at && new Date(entry.expires_at) < new Date()) {
      return res.status(403).json({ valid: false, message: "Este código ha expirado." });
    }

    // Marcar como usado (si no lo está)
    if (!entry.used) {
      await sql`
        UPDATE access_codes
        SET used = TRUE, used_at = NOW()
        WHERE id = ${entry.id}
      `;
    }

    return res.status(200).json({
      valid: true,
      access_url: entry.access_url,
      item_id: entry.item_id,
      item_name: entry.item_name,
      email: entry.email,
      used: entry.used,
    });
  } catch (err) {
    console.error("[validate-access] Neon error:", err);
    return res.status(500).json({ valid: false, message: "Error del servidor. Intenta más tarde." });
  }
}
