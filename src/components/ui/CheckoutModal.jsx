import React, { useState } from "react";

export default function CheckoutModal({ isOpen, onClose, product }) {
  if (!isOpen || !product) return null;

  const [paymentType, setPaymentType] = useState("anticipo"); // "full" | "anticipo"
  const [gateway, setGateway] = useState("stripe"); // "stripe" | "spei" | "whatsapp"
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [wantsInvoice, setWantsInvoice] = useState(false);
  const [rfc, setRfc] = useState("");
  const [legalName, setLegalName] = useState("");
  const [speiConfirmed, setSpeiConfirmed] = useState(false);

  // Normalizar precio
  const rawPriceStr = String(product.price || "950");
  const parsedPrice = parseFloat(rawPriceStr.replace(/[^0-9.]/g, "")) || 950;

  // Determinar si aplica anticipo
  const isAnticipoEligible = product.model && (product.model.includes("50%") || product.model.includes("40%") || product.model.includes("Anticipo"));
  const anticipoPercent = product.model && product.model.includes("40%") ? 0.40 : 0.50;
  const anticipoAmount = Math.round(parsedPrice * anticipoPercent);

  const finalAmount = paymentType === "anticipo" && isAnticipoEligible ? anticipoAmount : parsedPrice;

  // Generar itemId para la API
  const getItemId = () => {
    const pName = (product.name || "").toLowerCase();
    let baseId = "escala_rapida";
    if (pName.includes("smart")) baseId = "tarjeta_smart";
    else if (pName.includes("google")) baseId = "negocio_google";
    else if (pName.includes("híbrido") || pName.includes("escala")) baseId = "escala_rapida";
    else if (pName.includes("total") && pName.includes("comercio")) baseId = "ecosistema_total";
    else if (pName.includes("commerce") || pName.includes("logística")) baseId = "ecommerce_total";
    else if (pName.includes("estructural") || pName.includes("sop")) baseId = "consultoria_estructural";
    else if (pName.includes("branding") || pName.includes("logotipo")) baseId = "taller_branding";
    else if (pName.includes("manifiesto") || pName.includes("legal")) baseId = "manifiesto_legal";
    else if (pName.includes("pitch")) baseId = "elevator_pitch";
    else if (pName.includes("envío")) baseId = "complemento_envios";
    else if (pName.includes("ia")) baseId = "complemento_ia";

    if (paymentType === "anticipo" && isAnticipoEligible) {
      if (baseId === "negocio_google") return "anticipo_negocio_google";
      if (baseId === "escala_rapida") return "anticipo_escala_rapida";
      if (baseId === "ecosistema_total") return "anticipo_ecosistema";
      if (baseId === "ecommerce_total") return "anticipo_ecommerce";
    }

    return baseId;
  };

  const handleProceed = async (e) => {
    e.preventDefault();

    if (gateway === "whatsapp") {
      const msg = `Hola TSolutions, deseo adquirir el paquete *${product.name}* (${paymentType === "anticipo" ? "Anticipo" : "Pago Total"}: $${finalAmount.toLocaleString()} MXN). Mi nombre es ${name || "Cliente"} y mi correo es ${email || "sin registrar"}.`;
      window.open(`https://wa.me/5215512345678?text=${encodeURIComponent(msg)}`, "_blank");
      onClose();
      return;
    }

    if (gateway === "spei") {
      setSpeiConfirmed(true);
      return;
    }

    // Stripe Checkout
    if (!email) {
      alert("Por favor ingresa tu correo para enviarte el comprobante y clave de acceso.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemId: getItemId(),
          currency: "mxn",
          email,
          customAmount: finalAmount,
          customName: `${product.name} (${paymentType === "anticipo" ? "Anticipo" : "Total"})`,
          wantsInvoice,
          rfc,
          legalName,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Iniciando pasarela de pago segura...");
      }
    } catch (err) {
      console.error(err);
      alert("Redirigiendo a pasarela...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-midnightPanel border-2 border-naranjaEnergy/50 rounded-large max-w-lg w-full p-6 sm:p-8 shadow-glowEnergy relative max-h-[92vh] overflow-y-auto">
        
        {/* BOTÓN CERRAR */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-humo hover:text-white text-lg font-bold p-1 transition"
        >
          ✕
        </button>

        {/* ENCABEZADO DEL MODAL */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
          <div className="w-12 h-12 rounded-medium bg-naranjaEnergy/20 border border-naranjaEnergy/40 flex items-center justify-center text-2xl shadow-glowEnergy shrink-0">
            💳
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-naranjaEnergy tracking-widest block">
              Pasarela de Pago Segura
            </span>
            <h3 className="font-bruno text-lg text-blancoPuro">{product.name}</h3>
          </div>
        </div>

        {speiConfirmed ? (
          /* VISTA INSTRUCCIONES SPEI */
          <div className="space-y-4 text-left animate-fadeIn">
            <div className="p-4 rounded-medium bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs">
              <span className="font-bold block mb-1">🏦 Datos para Transferencia SPEI Inmediata:</span>
              <p>Tu orden ha sido registrada. Realiza la transferencia por el monto exacto para iniciar:</p>
            </div>

            <div className="bg-negroProfundo p-4 rounded-medium border border-white/10 space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-humo">Banco Receptor:</span>
                <span className="font-bold text-white">BBVA México</span>
              </div>
              <div className="flex justify-between">
                <span className="text-humo">Beneficiario:</span>
                <span className="font-bold text-white">TSolutions IPIDD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-humo">CLABE Interbancaria:</span>
                <span className="font-bold text-naranjaEnergy select-all">012180001234567890</span>
              </div>
              <div className="flex justify-between">
                <span className="text-humo">Monto a Transferir:</span>
                <span className="font-bold text-emerald-400 font-bruno text-sm">${finalAmount.toLocaleString()} MXN</span>
              </div>
              <div className="flex justify-between">
                <span className="text-humo">Concepto / Referencia:</span>
                <span className="font-bold text-white select-all">{name ? name.split(" ")[0] : "Cliente"} - {product.name.slice(0, 15)}</span>
              </div>
            </div>

            <p className="text-[11px] text-humo leading-relaxed">
              Una vez realizada tu transferencia, envía el comprobante por WhatsApp al <strong>+52 55 1234 5678</strong> para activar tu proyecto de inmediato.
            </p>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  const msg = `Hola, ya realicé mi transferencia SPEI de $${finalAmount.toLocaleString()} MXN para el paquete ${product.name}.`;
                  window.open(`https://wa.me/5215512345678?text=${encodeURIComponent(msg)}`, "_blank");
                  onClose();
                }}
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-medium text-xs transition text-center"
              >
                💬 Enviar Comprobante por WhatsApp
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-3 bg-negroProfundo hover:bg-white/10 text-humo rounded-medium text-xs font-bold border border-white/10"
              >
                Listo
              </button>
            </div>
          </div>
        ) : (
          /* FORMULARIO DE CHECKOUT */
          <form onSubmit={handleProceed} className="space-y-5">
            
            {/* SELECTOR DE PAGO (ANTICIPO VS 100%) */}
            {isAnticipoEligible && (
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentType("anticipo")}
                  className={`p-3 rounded-medium border text-left transition ${
                    paymentType === "anticipo"
                      ? "bg-naranjaEnergy/20 border-naranjaEnergy text-white shadow-glowEnergy"
                      : "bg-negroProfundo border-white/10 text-humo hover:text-white"
                  }`}
                >
                  <span className="text-[10px] uppercase font-bold text-naranjaEnergy block">Pagar Anticipo ({(anticipoPercent * 100)}%)</span>
                  <span className="font-bruno text-sm text-blancoPuro">${anticipoAmount.toLocaleString()} MXN</span>
                  <span className="text-[10px] text-humo block mt-0.5">Inicio de desarrollo</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentType("full")}
                  className={`p-3 rounded-medium border text-left transition ${
                    paymentType === "full"
                      ? "bg-naranjaEnergy/20 border-naranjaEnergy text-white shadow-glowEnergy"
                      : "bg-negroProfundo border-white/10 text-humo hover:text-white"
                  }`}
                >
                  <span className="text-[10px] uppercase font-bold text-emerald-400 block">Pago Completo (100%)</span>
                  <span className="font-bruno text-sm text-blancoPuro">${parsedPrice.toLocaleString()} MXN</span>
                  <span className="text-[10px] text-humo block mt-0.5">Liquidación total</span>
                </button>
              </div>
            )}

            {/* DATOS DEL CLIENTE */}
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-humo uppercase tracking-wider mb-1">
                  Nombre Completo o Razón Social *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej. Carlos Martínez"
                  className="w-full bg-negroProfundo border border-white/10 rounded-medium px-3.5 py-2.5 text-xs text-blancoPuro focus:outline-none focus:border-naranjaEnergy"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-humo uppercase tracking-wider mb-1">
                  Correo Electrónico (para comprobante y acceso) *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="carlos@empresa.com"
                  className="w-full bg-negroProfundo border border-white/10 rounded-medium px-3.5 py-2.5 text-xs text-blancoPuro focus:outline-none focus:border-naranjaEnergy"
                />
              </div>
            </div>

            {/* SELECCIÓN DE MÉTODO DE PAGO */}
            <div>
              <label className="block text-[10px] font-bold text-humo uppercase tracking-wider mb-2">
                Selecciona Método de Pago:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setGateway("stripe")}
                  className={`p-2.5 rounded-medium border text-xs font-bold flex flex-col items-center justify-center gap-1 transition ${
                    gateway === "stripe"
                      ? "border-naranjaEnergy bg-naranjaEnergy/20 text-white shadow-glowEnergy"
                      : "border-white/10 bg-negroProfundo text-humo hover:text-white"
                  }`}
                >
                  <span className="text-base">💳</span>
                  <span className="text-[11px]">Tarjeta / OXXO</span>
                </button>

                <button
                  type="button"
                  onClick={() => setGateway("spei")}
                  className={`p-2.5 rounded-medium border text-xs font-bold flex flex-col items-center justify-center gap-1 transition ${
                    gateway === "spei"
                      ? "border-emerald-500 bg-emerald-500/20 text-white shadow"
                      : "border-white/10 bg-negroProfundo text-humo hover:text-white"
                  }`}
                >
                  <span className="text-base">🏦</span>
                  <span className="text-[11px]">SPEI Directo</span>
                </button>

                <button
                  type="button"
                  onClick={() => setGateway("whatsapp")}
                  className={`p-2.5 rounded-medium border text-xs font-bold flex flex-col items-center justify-center gap-1 transition ${
                    gateway === "whatsapp"
                      ? "border-emerald-500 bg-emerald-600/30 text-white"
                      : "border-white/10 bg-negroProfundo text-humo hover:text-white"
                  }`}
                >
                  <span className="text-base">💬</span>
                  <span className="text-[11px]">WhatsApp</span>
                </button>
              </div>
            </div>

            {/* OPCIÓN DE FACTURACIÓN */}
            <div className="pt-2 border-t border-white/10">
              <label className="flex items-center gap-2 text-xs text-humo cursor-pointer">
                <input
                  type="checkbox"
                  checked={wantsInvoice}
                  onChange={(e) => setWantsInvoice(e.target.checked)}
                  className="rounded accent-naranjaEnergy"
                />
                <span>Deseo factura fiscal (CFDI) para este pago</span>
              </label>

              {wantsInvoice && (
                <div className="grid grid-cols-2 gap-3 mt-3 animate-fadeIn">
                  <input
                    type="text"
                    required={wantsInvoice}
                    value={rfc}
                    onChange={(e) => setRfc(e.target.value.toUpperCase())}
                    placeholder="RFC (ej. TSO190101XYZ)"
                    className="bg-negroProfundo border border-white/10 rounded px-3 py-2 text-xs text-blancoPuro uppercase font-mono"
                  />
                  <input
                    type="text"
                    required={wantsInvoice}
                    value={legalName}
                    onChange={(e) => setLegalName(e.target.value)}
                    placeholder="Razón Social"
                    className="bg-negroProfundo border border-white/10 rounded px-3 py-2 text-xs text-blancoPuro"
                  />
                </div>
              )}
            </div>

            {/* BOTÓN PRINCIPAL DE COBRO */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-naranjaEnergy hover:bg-orange-600 text-white font-bruno text-sm rounded-medium shadow-glowEnergy transition transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
            >
              <span>{loading ? "Conectando con Pasarela..." : `🔒 Pagar $${finalAmount.toLocaleString()} MXN`}</span>
            </button>

            <p className="text-[10px] text-center text-humo">
              Cifrado SSL de 256 bits. Pagos procesados de forma 100% segura.
            </p>
          </form>
        )}

      </div>
    </div>
  );
}
