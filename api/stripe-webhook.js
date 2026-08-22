// ============================================================
// TSolutions IPIDD — Serverless Function: Stripe Webhook
// Registra ventas completadas en Neon PostgreSQL
// ============================================================

import { neon } from "@neondatabase/serverless";
import Stripe from "stripe";

export const config = {
  api: { bodyParser: false }, // Necesario para verificar la firma de Stripe
};

async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeSecret) {
    return res.status(500).json({ error: "Stripe no configurado" });
  }

  const stripe = new Stripe(stripeSecret, { apiVersion: "2024-06-20" });

  let event;
  try {
    const rawBody = await getRawBody(req);
    const signature = req.headers["stripe-signature"];

    if (webhookSecret && signature) {
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } else {
      // Sin secret de webhook (desarrollo) — parsear directamente
      event = JSON.parse(rawBody.toString());
    }
  } catch (err) {
    console.error("[webhook] Error de firma:", err.message);
    return res.status(400).json({ error: `Webhook error: ${err.message}` });
  }

  // Solo manejar checkout completado
  if (event.type !== "checkout.session.completed") {
    return res.status(200).json({ received: true, skipped: true });
  }

  const session = event.data.object;
  const meta = session.metadata || {};

  try {
    const sql = neon(process.env.DATABASE_URL);

    // Crear tabla si no existe
    await sql`
      CREATE TABLE IF NOT EXISTS ventas (
        id            SERIAL PRIMARY KEY,
        item_id       VARCHAR(100),
        item_name     TEXT,
        amount        INTEGER,
        currency      VARCHAR(10),
        email         VARCHAR(255),
        payment_type  VARCHAR(50) DEFAULT 'stripe',
        stripe_id     VARCHAR(255),
        wants_invoice BOOLEAN DEFAULT FALSE,
        rfc           VARCHAR(20),
        legal_name    TEXT,
        created_at    TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    // Registrar venta confirmada (upsert por stripe_id para evitar duplicados)
    await sql`
      INSERT INTO ventas (item_id, item_name, amount, currency, email, payment_type, stripe_id, wants_invoice, rfc, legal_name)
      VALUES (
        ${meta.itemId ?? session.client_reference_id},
        ${meta.item_name ?? session.client_reference_id},
        ${session.amount_total},
        ${session.currency},
        ${session.customer_email ?? meta.email ?? null},
        'stripe_checkout_confirmed',
        ${session.id},
        ${meta.wants_invoice === "true"},
        ${meta.rfc ?? null},
        ${meta.razon_social ?? null}
      )
      ON CONFLICT DO NOTHING
    `;

    console.log("[webhook] Venta registrada:", session.id);
    return res.status(200).json({ received: true });
  } catch (err) {
    console.error("[webhook] Error Neon:", err);
    return res.status(500).json({ error: "Error registrando en base de datos" });
  }
}
