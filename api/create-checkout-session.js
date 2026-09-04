// ============================================================
// TSolutions IPIDD — Serverless Function: Crear Sesión de Pago
// Integra Stripe Checkout + registro de ventas en Neon PostgreSQL
// Genera código de acceso cifrado para cada producto
// ============================================================

import { neon } from "@neondatabase/serverless";
import Stripe from "stripe";
import { randomBytes } from "crypto";

// ---- Catálogo Oficial de Paquetes y Precios TSolutions IPIDD ----
const PRICES = {
  // --- PAQUETES PRINCIPALES ---
  tarjeta_smart:          { name: "Nivel 1: Tarjeta Smart (El Gancho)",                    usd: 4900,   mxn: 95000  },
  negocio_google:         { name: "Nivel 2: Tu Negocio en Google (Conversión Local)",      usd: 14000,  mxn: 275000 },
  escala_rapida:          { name: "Paquete Híbrido Escala Rápida (N1 + N2)",               usd: 18900,  mxn: 370000 },
  ecosistema_total:       { name: "Nivel 3: Ecosistema Total (Comercio Integral)",         usd: 27900,  mxn: 545000 },
  ecommerce_total:        { name: "E-commerce Total con Logística Integrada",              usd: 49900,  mxn: 985000 },

  // --- ANTICIPOS FRACCIONADOS (50% / 40%) ---
  anticipo_negocio_google:{ name: "Anticipo 50%: Tu Negocio en Google",                    usd: 7000,   mxn: 137500 },
  anticipo_escala_rapida: { name: "Anticipo 50%: Paquete Híbrido Escala Rápida",           usd: 9450,   mxn: 185000 },
  anticipo_ecosistema:    { name: "Anticipo 40%: Ecosistema Total",                        usd: 11160,  mxn: 218000 },
  anticipo_ecommerce:     { name: "Anticipo 40%: E-commerce Total con Logística",          usd: 19960,  mxn: 394000 },

  // --- CONSULTORÍA ESTRATÉGICA & BRANDING ---
  consultoria_estructural:{ name: "Consultoría Estructural (SOPs y Workflows)",            usd: 25000,  mxn: 500000 },
  taller_branding:        { name: "Taller Express Identity Branding & Logotipos",          usd: 9500,   mxn: 185000 },
  manifiesto_legal:       { name: "Manifiesto de Marca y Auditoría Legal",                 usd: 7900,   mxn: 155000 },
  elevator_pitch:         { name: "Elevator Pitch Estratégico",                            usd: 4500,   mxn: 85000  },

  // --- MENÚ DE COMPLEMENTOS A LA CARTA ---
  complemento_envios:     { name: "Integración de Envíos Nativos (API Uber/DiDi)",         usd: 17500,  mxn: 350000 },
  complemento_ia:         { name: "Módulo de Inteligencia Artificial (Backend/Agentes)",   usd: 22500,  mxn: 450000 },
  complemento_oauth:      { name: "Autenticación Rápida (OAuth Google)",                   usd: 4900,   mxn: 95000  },
  complemento_pasarelas:  { name: "Pasarelas de Pago (Stripe/Mercado Pago)",               usd: 6000,   mxn: 120000 },
  complemento_chatbot_wa: { name: "Chatbot WhatsApp Business",                            usd: 16000,  mxn: 320000 },
  complemento_chatbot_landing:{ name: "Chatbot Landing Page",                              usd: 12500,  mxn: 245000 },
  complemento_chatbot_telegram:{ name: "Chatbot Telegram",                                 usd: 9900,   mxn: 195000 },
  complemento_chatbot_smart:{ name: "Smart Web Chatbot",                                   usd: 7500,   mxn: 145000 },
  complemento_nfc:        { name: "Tarjeta Inteligente NFC vCard",                         usd: 2900,   mxn: 55000  },
  complemento_display:    { name: "Display Acrílico Inteligente (QR/NFC)",                 usd: 1900,   mxn: 35000  },
  complemento_video:      { name: "Producción de Comercial en Video",                      usd: 27500,  mxn: 550000 },

  // --- BRANDING LEGACY & COMPATIBILIDAD ---
  logo_express:           { name: "Creador Express de Logotipo",                           usd: 4900,   mxn: 98000  },
  manifiesto:             { name: "Manifiesto de Marca (Pilar 1)",                          usd: 4900,   mxn: 98000  },
  pitch:                  { name: "Elevator Pitch Estratégico (Pilar 2)",                  usd: 7900,   mxn: 158000 },
  voice:                  { name: "Identidad de Voz y Tono (Pilar 3)",                     usd: 7900,   mxn: 158000 },
  brandbook:              { name: "Brandbook de Identidad (Pilar 4)",                      usd: 9900,   mxn: 198000 },
  complete_bundle:        { name: "Brand Pack Completo (Acceso Total)",                    usd: 31900,  mxn: 638000 },
  membership:             { name: "Membresía Mensual Pro TSolutions",                      usd: 3900,   mxn: 78000  },
};

// ---- Mapa de producto → URL de acceso ----
const ACCESS_URLS = {
  tarjeta_smart:          "https://tsolutions.com.mx/acceso",
  negocio_google:         "https://tsolutions.com.mx/acceso",
  escala_rapida:          "https://tsolutions.com.mx/acceso",
  ecosistema_total:       "https://tsolutions.com.mx/acceso",
  ecommerce_total:        "https://tsolutions.com.mx/acceso",
  logo_express:           "https://tsolutions.com.mx/brand-builder",
  manifiesto:             "https://tsolutions.com.mx/brand-builder",
  pitch:                  "https://tsolutions.com.mx/brand-builder",
  voice:                  "https://tsolutions.com.mx/brand-builder",
  brandbook:              "https://tsolutions.com.mx/brand-builder",
  complete_bundle:        "https://tsolutions.com.mx/brand-builder",
};

// ---- Generar código único cifrado ----
function generateAccessCode() {
  return "TS-" + randomBytes(5).toString("hex").toUpperCase();
}

// ---- Helper: inicializar tablas en Neon ----
async function initTables(sql) {
  if (!sql) return;
  try {
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
  } catch (err) {
    console.warn("[initTables] Warning:", err.message);
  }
}

// ---- Helper: registrar venta + generar código de acceso ----
async function createAccessCode({ itemId, itemName, email, sql }) {
  const code = generateAccessCode();
  const accessUrl = ACCESS_URLS[itemId] || "https://tsolutions.com.mx/acceso";
  if (sql) {
    try {
      await sql`
        INSERT INTO access_codes (code, item_id, item_name, email, access_url)
        VALUES (${code}, ${itemId}, ${itemName}, ${email ?? null}, ${accessUrl})
      `;
    } catch (err) {
      console.error("[createAccessCode] Neon error:", err);
    }
  }
  return code;
}

async function logSaleToNeon({ itemId, itemName, amount, currency, email, paymentType, stripeId, wantsInvoice, rfc, legalName }) {
  if (!process.env.DATABASE_URL) return;
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
    itemId = "escala_rapida",
    currency: rawCurrency = "mxn",
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

  const currency = ["usd", "mxn"].includes(rawCurrency) ? rawCurrency : "mxn";
  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  const origin = req.headers.origin || "https://tsolutions.com.mx";

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
    item = PRICES[itemId] ?? PRICES["escala_rapida"];
  }
  const amount = item[currency];

  // ---- Modo simulación si no hay clave de Stripe ----
  if (!stripeSecret || stripeSecret === "sk_test_mock" || stripeSecret.includes("sk_test_placeholder")) {
    const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null;
    await initTables(sql);
    const accessCode = await createAccessCode({ itemId, itemName: item.name, email, sql });

    let successUrl = `${origin}/gracias?status=success&itemId=${itemId}&wantsInvoice=${wantsInvoice ? "true" : "false"}&access_code=${accessCode}`;
    return res.status(200).json({ status: "mock", message: "Simulación de pasarela activa", url: successUrl, access_code: accessCode });
  }

  const stripe = new Stripe(stripeSecret, { apiVersion: "2024-06-20" });

  // ---- Stripe Checkout Session (Tarjetas de Crédito / Débito / OXXO) ----
  try {
    const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null;
    await initTables(sql);
    const accessCode = await createAccessCode({ itemId, itemName: item.name, email, sql });

    const successUrl = `${origin}/gracias?session_id={CHECKOUT_SESSION_ID}&itemId=${itemId}&wantsInvoice=${wantsInvoice ? "true" : "false"}&access_code=${accessCode}`;
    const cancelUrl = `${origin}/#portafolio`;

    const sessionParams = {
      mode: itemId === "membership" ? "subscription" : "payment",
      line_items: [{
        price_data: {
          currency,
          product_data: { 
            name: `TSolutions IPIDD: ${item.name}`,
            description: "Tecnología instalada. Conocimiento transferido. Negocios escalados.",
          },
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
