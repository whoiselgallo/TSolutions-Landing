// ============================================================
// TSolutions IPIDD — Serverless Function: Crear Sesión de Pago
// Integra Stripe Checkout + registro de ventas en Neon PostgreSQL
// Genera código de acceso cifrado para cada producto
// ============================================================

import { neon } from "@neondatabase/serverless";
import Stripe from "stripe";
import { randomBytes } from "crypto";

// ---- Catálogo de precios ----
const PRICES = {
  logo_express:           { name: "Creador Express de Logotipo",                          usd: 4900,  mxn: 98000  },
  manifiesto:             { name: "Manifiesto de Marca (Pilar 1)",                         usd: 4900,  mxn: 98000  },
  pitch:                  { name: "Elevator Pitch Estratégico (Pilar 2)",                 usd: 7900,  mxn: 158000 },
  voice:                  { name: "Identidad de Voz y Tono (Pilar 3)",                    usd: 7900,  mxn: 158000 },
  brandbook:              { name: "Brandbook de Identidad (Pilar 4)",                     usd: 9900,  mxn: 198000 },
  complete_bundle:        { name: "Brand Pack Completo (Acceso Total)",                   usd: 31900, mxn: 638000 },
  ia_estandar:            { name: "IA Personalizada para tu negocio (Licencia Estándar)", usd: 14900, mxn: 298000 },
  ia_premium:             { name: "IA Personalizada para tu negocio (Licencia Premium)",  usd: 39900, mxn: 798000 },
  web_estatico:           { name: "Desarrollo de Sitio Web Estático / Landing Page",      usd: 19900, mxn: 398000 },
  ecommerce:              { name: "Ecommerce Completo / Menú Digital",                     usd: 34900, mxn: 698000 },
  integracion_logistica:  { name: "Integración de Pasarela de Pagos & Logística",         usd: 29900, mxn: 598000 },
  produccion_podcast:     { name: "Producción de Podcast Profesional",                    usd: 19900, mxn: 398000 },
  produccion_video:       { name: "Producción de Videos de Marca / Promocionales",        usd: 12900, mxn: 258000 },
  consultoria_1on1:       { name: "Consultoría Estratégica 1-on-1 (Sesión de 1 Hora)",    usd: 9900,  mxn: 198000 },
  membership:             { name: "Membresía Mensual Pro TSolutions",                     usd: 3900,  mxn: 78000  },
};

// ---- Mapa de producto → URL de acceso ----
const ACCESS_URLS = {
  logo_express:          "https://identidad.tsolutionsipidd.com",
  manifiesto:            "https://identidad.tsolutionsipidd.com",
  pitch:                 "https://identidad.tsolutionsipidd.com",
  voice:                 "https://identidad.tsolutionsipidd.com",
  brandbook:             "https://identidad.tsolutionsipidd.com",
  complete_bundle:       "https://identidad.tsolutionsipidd.com",
  ia_estandar:           "https://tsolutionsipidd.com/consultoria",
  ia_premium:            "https://tsolutionsipidd.com/consultoria",
  web_estatico:          "https://tsolutionsipidd.com/consultoria",
  ecommerce:             "https://tsolutionsipidd.com/consultoria",
  integracion_logistica: "https://tsolutionsipidd.com/consultoria",
  produccion_podcast:    "https://tsolutionsipidd.com/consultoria",
  produccion_video:      "https://tsolutionsipidd.com/consultoria",
  consultoria_1on1:      "https://tsolutionsipidd.com/consultoria",
  membership:            "https://tsolutionsipidd.com/consultoria",
  custom_payment:        "https://tsolutionsipidd.com",
  cash_payment_presencial: "https://tsolutionsipidd.com",
};

// ---- Generar código único cifrado ----
function generateAccessCode() {
  return "TS-" + randomBytes(5).toString("hex").toUpperCase();
}

// ---- Helper: inicializar tablas en Neon ----
async function initTables(sql) {
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
}

// ---- Helper: registrar venta + generar código de acceso ----
async function createAccessCode({ itemId, itemName, email, sql }) {
  const code = generateAccessCode();
  const accessUrl = ACCESS_URLS[itemId] || "https://tsolutionsipidd.com";
  try {
    await sql`
      INSERT INTO access_codes (code, item_id, item_name, email, access_url)
      VALUES (${code}, ${itemId}, ${itemName}, ${email ?? null}, ${accessUrl})
    `;
  } catch (err) {
    console.error("[createAccessCode] Neon error:", err);
  }
  return code;
}

async function logSaleToNeon({ itemId, itemName, amount, currency, email, paymentType, stripeId, wantsInvoice, rfc, legalName }) {
  try {
    const sql = neon(process.env.DATABASE_URL);
    await initTables(sql);
    await sql`
      INSERT INTO ventas (item_id, item_name, amount, currency, email, payment_type, stripe_id, wants_invoice, rfc, legal_name)
      VALUES (
        ${itemId}, ${itemName}, ${amount}, ${currency}, ${email},
        ${paymentType}, ${stripeId},
        ${wantsInvoice ?? false}, ${rfc ?? null}, ${legalName ?? null}
      )
    `;
  } catch (err) {
    console.error("[logSaleToNeon] Error:", err);
  }
}

// ---- Handler principal ----
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") {
    return res.status(405).json({ status: "error", message: "Método no permitido" });
  }

  const {
    itemId = "complete_bundle",
    currency: rawCurrency = "usd",
    email,
    customAmount,
    customName,
    wantsInvoice,
    rfc,
    legalName,
    taxSystem,
    zip,
    usoCfdi,
  } = req.body || {};

  const currency = ["usd", "mxn"].includes(rawCurrency) ? rawCurrency : "usd";
  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  const origin = req.headers.origin || "https://tsolutionsipidd.com";

  // ---- Resolver ítem ----
  let item;
  if (itemId === "custom_payment" || itemId === "cash_payment_presencial") {
    const amt = parseFloat(customAmount ?? 0);
    if (amt <= 0) {
      return res.status(400).json({ status: "error", message: "El monto personalizado debe ser mayor a cero." });
    }
    item = {
      name: customName?.trim() || (itemId === "cash_payment_presencial" ? "Pago en Efectivo Presencial" : "Pago Personalizado TSolutions"),
      usd: Math.round(amt * 100),
      mxn: Math.round(amt * 100),
    };
  } else {
    item = PRICES[itemId] ?? PRICES["complete_bundle"];
  }
  const amount = item[currency];

  // ---- Modo simulación ----
  if (!stripeSecret || stripeSecret === "sk_test_mock") {
    const sql = neon(process.env.DATABASE_URL);
    await initTables(sql);
    const accessCode = await createAccessCode({ itemId, itemName: item.name, email, sql });

    let successUrl = `${origin}/?status=success&itemId=${itemId}&wantsInvoice=${wantsInvoice ? "true" : "false"}&access_code=${accessCode}`;
    if (itemId === "cash_payment_presencial") {
      const manualCode = "TS-CASH-" + randomBytes(4).toString("hex").toUpperCase();
      successUrl += `&manual_code=${manualCode}`;
    }
    return res.status(200).json({ status: "mock", message: "Simulación activa", url: successUrl, access_code: accessCode });
  }

  const stripe = new Stripe(stripeSecret, { apiVersion: "2024-06-20" });

  // ---- Pago en efectivo / presencial (out of band) ----
  if (itemId === "cash_payment_presencial") {
    try {
      const customerEmail = email || "cliente_presencial@tsolutionsipidd.com";
      const customer = await stripe.customers.create({ email: customerEmail, name: legalName || "Cliente Presencial" });
      await stripe.invoiceItems.create({ customer: customer.id, amount, currency, description: item.name });
      const invoice = await stripe.invoices.create({
        customer: customer.id,
        auto_advance: false,
        metadata: { payment_type: "cash_manual", wants_invoice: wantsInvoice ? "true" : "false" },
      });
      await stripe.invoices.finalizeInvoice(invoice.id);
      await stripe.invoices.pay(invoice.id, { paid_out_of_band: true });

      const sql = neon(process.env.DATABASE_URL);
      await initTables(sql);
      const accessCode = await createAccessCode({ itemId, itemName: item.name, email: customerEmail, sql });
      await logSaleToNeon({ itemId, itemName: item.name, amount, currency, email: customerEmail, paymentType: "cash_presencial", stripeId: invoice.id, wantsInvoice, rfc, legalName });

      const successUrl = `${origin}/?status=success&itemId=${itemId}&wantsInvoice=${wantsInvoice ? "true" : "false"}&manual_code=${invoice.id}&access_code=${accessCode}`;
      return res.status(200).json({ status: "ok", id: invoice.id, url: successUrl, access_code: accessCode });
    } catch (err) {
      console.error("[cash presencial] Stripe error:", err);
      return res.status(500).json({ status: "error", message: err.message });
    }
  }

  // ---- Stripe Checkout Session (flujo normal) ----
  try {
    const sql = neon(process.env.DATABASE_URL);
    await initTables(sql);
    const accessCode = await createAccessCode({ itemId, itemName: item.name, email, sql });

    const successUrl = `${origin}/?status=success&itemId=${itemId}&wantsInvoice=${wantsInvoice ? "true" : "false"}&access_code=${accessCode}`;
    const cancelUrl = `${origin}/?status=cancel&itemId=${itemId}`;

    const sessionParams = {
      mode: itemId === "membership" ? "subscription" : "payment",
      line_items: [{
        price_data: {
          currency,
          product_data: { name: item.name },
          unit_amount: amount,
          ...(itemId === "membership" ? { recurring: { interval: "month" } } : {}),
        },
        quantity: 1,
      }],
      success_url: successUrl,
      cancel_url: cancelUrl,
      client_reference_id: itemId,
      payment_method_types: currency === "mxn" ? ["card", "oxxo"] : ["card"],
      metadata: {
        itemId,
        access_code: accessCode,
        wants_invoice: wantsInvoice ? "true" : "false",
        rfc: rfc ?? "",
        razon_social: legalName ?? "",
        regimen_fiscal: taxSystem ?? "",
        postal_code: zip ?? "",
        uso_cfdi: usoCfdi ?? "",
        email: email ?? "",
      },
    };

    if (email) sessionParams.customer_email = email;

    const session = await stripe.checkout.sessions.create(sessionParams);
    await logSaleToNeon({ itemId, itemName: item.name, amount, currency, email, paymentType: "stripe_checkout", stripeId: session.id, wantsInvoice, rfc, legalName });

    return res.status(200).json({ status: "ok", id: session.id, url: session.url, access_code: accessCode });
  } catch (err) {
    console.error("[checkout session] Stripe error:", err);
    return res.status(500).json({ status: "error", message: err.message });
  }
}
