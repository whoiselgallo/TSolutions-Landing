import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { NeonText, Grid3D, MagneticCard } from "../effects";
import { Button, Modal, Input, Badge } from "../components/ui";
import { Header, Footer } from "../components/layout";

const products = [
  // --- BRANDING & NAMING ---
  {
    id: "logo_express",
    category: "branding",
    title: "Creador Express de Logotipo",
    desc: "Obtén un logotipo e isotipo vectorial profesional con paleta cromática personalizada al instante.",
    priceUsd: 49,
    priceMxn: 980,
    features: [
      "Diseño de logo instantáneo con IA",
      "Formatos SVG vectorial y PNG HD",
      "Paleta de colores corporativos",
      "Manual básico de uso de marca"
    ],
    popular: false,
    icon: "⚡"
  },
  {
    id: "manifiesto",
    category: "branding",
    title: "Manifiesto de Marca (Pilar 1)",
    desc: "Crea la declaración de intenciones y el ADN de tu negocio. Define el propósito, visión y valores.",
    priceUsd: 49,
    priceMxn: 980,
    features: [
      "Redacción estratégica de manifiesto",
      "Definición de valores de marca",
      "Fórmula de propósito central",
      "Exportación en PDF oficial"
    ],
    popular: false,
    icon: "📜"
  },
  {
    id: "pitch",
    category: "branding",
    title: "Elevator Pitch Estratégico (Pilar 2)",
    desc: "Estructura la presentación ideal de tu negocio ante clientes e inversores en 60 segundos.",
    priceUsd: 79,
    priceMxn: 1580,
    features: [
      "Fórmula de gancho comercial",
      "Posicionamiento frente a competidores",
      "3 versiones de longitud del pitch",
      "Feedback de IA para optimizar"
    ],
    popular: false,
    icon: "🎙️"
  },
  {
    id: "voice",
    category: "branding",
    title: "Identidad de Voz y Tono (Pilar 3)",
    desc: "Establece las directrices verbales y el estilo de comunicación único para todo tu equipo.",
    priceUsd: 79,
    priceMxn: 1580,
    features: [
      "Definición de 4 rasgos de voz",
      "Tabla de qué hacer y qué evitar",
      "Ejemplos prácticos adaptados",
      "Manual verbal de uso inmediato"
    ],
    popular: false,
    icon: "🗣️"
  },
  {
    id: "brandbook",
    category: "branding",
    title: "Brandbook de Identidad (Pilar 4)",
    desc: "Manual completo de identidad visual que regula el uso correcto de logotipos, colores y tipografías.",
    priceUsd: 99,
    priceMxn: 1980,
    features: [
      "Directrices de uso del logotipo",
      "Paletas de color CMYK/Pantone/Hex",
      "Jerarquía tipográfica corporativa",
      "Manual oficial descargable en PDF"
    ],
    popular: false,
    icon: "📘"
  },
  {
    id: "complete_bundle",
    category: "branding",
    title: "Brand Pack Completo (Acceso Total)",
    desc: "Acceso ilimitado y permanente a todos los talleres interactivos de creación de marca y editor canvas.",
    priceUsd: 319,
    priceMxn: 6380,
    features: [
      "Acceso ilimitado a los 4 Pilares",
      "Descarga ilimitada de PDFs vectoriales",
      "Uso completo del Editor Canvas",
      "Soporte prioritario de TSolutions"
    ],
    popular: true,
    icon: "👑"
  },
  // --- INTELIGENCIA ARTIFICIAL ---
  {
    id: "ia_estandar",
    category: "ia",
    title: "IA Personalizada (Licencia Estándar)",
    desc: "Asistente inteligente configurado para tu negocio. Automatiza atención al cliente básica y preguntas frecuentes.",
    priceUsd: 149,
    priceMxn: 2980,
    features: [
      "Entrenamiento con tu catálogo de servicios",
      "Widget web flotante personalizable",
      "Soporte para 1,000 conversaciones/mes",
      "Respuestas basadas en tu base de conocimientos"
    ],
    popular: false,
    icon: "🤖"
  },
  {
    id: "ia_premium",
    category: "ia",
    title: "IA Personalizada (Licencia Premium)",
    desc: "Agente avanzado con integraciones complejas. Analiza inventario, procesa órdenes e interactúa con sistemas internos.",
    priceUsd: 399,
    priceMxn: 7980,
    features: [
      "Análisis predictivo de inventario y ventas",
      "Integración vía API con sistemas internos",
      "Conversaciones mensuales ilimitadas",
      "Dashboard interactivo de analítica"
    ],
    popular: true,
    icon: "🧠"
  },
  // --- DESARROLLO WEB & LOGÍSTICA ---
  {
    id: "web_estatico",
    category: "desarrollo",
    title: "Sitio Web Estático / Landing Page",
    desc: "Diseño y desarrollo a medida de página única, ultra rápida, optimizada para móviles y SEO técnico.",
    priceUsd: 199,
    priceMxn: 3980,
    features: [
      "Diseño responsivo único y moderno",
      "Efectos visuales y micro-animaciones",
      "Optimización SEO y velocidad de carga",
      "Formulario de contacto integrado"
    ],
    popular: false,
    icon: "💻"
  },
  {
    id: "ecommerce",
    category: "desarrollo",
    title: "Ecommerce Completo / Menú Digital",
    desc: "Tienda online o catálogo digital interactivo autogestionable con pasarela integrada y carrito de compras.",
    priceUsd: 349,
    priceMxn: 6980,
    features: [
      "Panel de administración de productos",
      "Diseño optimizado para conversión móvil",
      "Carrito de compras interactivo",
      "Menú digital QR para restaurantes"
    ],
    popular: false,
    icon: "🛒"
  },
  {
    id: "integracion_logistica",
    category: "desarrollo",
    title: "Pasarela de Pagos & Logística de Envíos",
    desc: "Conexión de pagos en línea (Stripe/PayPal) e integración logística automatizada con Didi, Rappi, Uber o flota propia.",
    priceUsd: 299,
    priceMxn: 5980,
    features: [
      "Checkout seguro con tarjetas y efectivo",
      "Cálculo automático de costos de envío",
      "Despacho automatizado vía APIs",
      "Rastreo en tiempo real para clientes"
    ],
    popular: true,
    icon: "🚚"
  },
  // --- PRODUCCIÓN AUDIOVISUAL ---
  {
    id: "produccion_podcast",
    category: "audiovisual",
    title: "Producción de Podcast Profesional",
    desc: "Edición y optimización completa de tus episodios. Incluye edición de audio/video y snippets para redes.",
    priceUsd: 199,
    priceMxn: 3980,
    features: [
      "Edición de audio y eliminación de ruido",
      "Cortes dinámicos para formato video (YouTube/TikTok)",
      "Hasta 3 clips/shorts de regalo por episodio",
      "Diseño de portada y material promocional"
    ],
    popular: false,
    icon: "🎙️"
  },
  {
    id: "produccion_video",
    category: "audiovisual",
    title: "Producción de Videos de Marca",
    desc: "Videos promocionales dinámicos para redes sociales, explicativos de producto o institucionales.",
    priceUsd: 129,
    priceMxn: 2580,
    features: [
      "Guion de ventas optimizado con IA",
      "Edición dinámica con efectos modernos",
      "Voz en off profesional / Locución",
      "Efectos de sonido y música licenciada"
    ],
    popular: false,
    icon: "🎬"
  },
  // --- CONSULTORÍA ---
  {
    id: "consultoria_1on1",
    category: "consultoria",
    title: "Consultoría Estratégica 1-on-1",
    desc: "Sesión virtual privada de 1 hora con nuestro equipo experto para auditar tu negocio, arquitectura digital y escalabilidad.",
    priceUsd: 99,
    priceMxn: 1980,
    features: [
      "Auditoría técnica de sistemas e IA",
      "Estrategia de marca y crecimiento comercial",
      "Grabación de sesión y notas de acción",
      "Plan de integración personalizado posterior"
    ],
    popular: false,
    icon: "👨‍💻"
  },
  {
    id: "membership",
    category: "consultoria",
    title: "Membresía Mensual Pro TSolutions",
    desc: "Soporte técnico prioritario mensual, consultoría exprés y mantenimiento preventivo para tu infraestructura digital.",
    priceUsd: 39,
    priceMxn: 780,
    features: [
      "Soporte por chat prioritario (RUA + Equipo)",
      "Monitoreo de uptime y seguridad semanal",
      "1 hora mensual de soporte técnico de código",
      "Descuento de 15% en desarrollos futuros"
    ],
    popular: false,
    icon: "🤝"
  },
  {
    id: "custom_payment",
    category: "consultoria",
    title: "Pago Personalizado / A la Medida",
    desc: "Ingresa el concepto y el monto acordado con tu consultor para realizar un pago a la medida.",
    priceUsd: 0,
    priceMxn: 0,
    features: [
      "Monto flexible acordado",
      "Soporta pago en efectivo (OXXO)",
      "Facturación fiscal CFDI 4.0 inmediata",
      "Procesamiento seguro por Stripe"
    ],
    popular: false,
    icon: "💳"
  },
  {
    id: "cash_payment_presencial",
    category: "consultoria",
    title: "Pago en Efectivo (Presencial)",
    desc: "Registra cobros físicos en efectivo. Captura concepto y monto para emitir el código de venta manual en Stripe y permitir facturación CFDI.",
    priceUsd: 0,
    priceMxn: 0,
    features: [
      "Cobros físicos sin cantidad fija",
      "Registro de venta manual en Stripe",
      "Generación de código de venta único",
      "Facturación fiscal CFDI 4.0 inmediata"
    ],
    popular: false,
    icon: "💵"
  }
];

const categories = [
  { id: "all", name: "Todos" },
  { id: "branding", name: "Branding & Naming" },
  { id: "ia", name: "Inteligencia Artificial" },
  { id: "desarrollo", name: "Desarrollo & Logística" },
  { id: "audiovisual", name: "Producción de Video" },
  { id: "consultoria", name: "Consultoría" }
];

export default function Store() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("all");
  const [currency, setCurrency] = useState("usd");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [emailInput, setEmailInput] = useState(localStorage.getItem("ts_user_email") || "");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Estados de Pago Personalizado
  const [customAmount, setCustomAmount] = useState("");
  const [customConcept, setCustomConcept] = useState("");
  const [cardError, setCardError] = useState("");

  // Estados de Facturación SAT
  const [wantsInvoice, setWantsInvoice] = useState(false);
  const [rfc, setRfc] = useState(localStorage.getItem("ts_billing_rfc") || "");
  const [legalName, setLegalName] = useState(localStorage.getItem("ts_billing_legalName") || "");
  const [taxSystem, setTaxSystem] = useState(localStorage.getItem("ts_billing_taxSystem") || "625");
  const [zip, setZip] = useState(localStorage.getItem("ts_billing_zip") || "");
  const [usoCfdi, setUsoCfdi] = useState(localStorage.getItem("ts_billing_usoCfdi") || "G03");
  
  // Modales de estado de compra
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [purchasedItemName, setPurchasedItemName] = useState("");
  const [invoiceRequested, setInvoiceRequested] = useState(false);
  const [manualCode, setManualCode] = useState("");

  useEffect(() => {
    const status = searchParams.get("status");
    const itemId = searchParams.get("itemId");
    const wantsInvoiceParam = searchParams.get("wantsInvoice");
    const codeParam = searchParams.get("manual_code");
    if (status === "success" && itemId) {
      const prod = products.find(p => p.id === itemId);
      setPurchasedItemName(prod ? prod.title : itemId);
      setInvoiceRequested(wantsInvoiceParam === "true");
      if (codeParam) {
        setManualCode(codeParam);
      } else {
        setManualCode("");
      }
      setSuccessModalOpen(true);
      // Limpiar parámetros de la URL
      searchParams.delete("status");
      searchParams.delete("itemId");
      searchParams.delete("wantsInvoice");
      searchParams.delete("manual_code");
      setSearchParams(searchParams);
    } else if (status === "cancel" && itemId) {
      const prod = products.find(p => p.id === itemId);
      setPurchasedItemName(prod ? prod.title : itemId);
      setCancelModalOpen(true);
      searchParams.delete("status");
      searchParams.delete("itemId");
      searchParams.delete("wantsInvoice");
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);

  const handleOpenCheckout = (product) => {
    setCardError("");
    if (product.id === "custom_payment" || product.id === "cash_payment_presencial") {
      if (!customConcept || !customConcept.trim()) {
        setCardError("Por favor, ingresa el concepto del pago.");
        return;
      }
      const amountFloat = parseFloat(customAmount);
      if (isNaN(amountFloat) || amountFloat <= 0) {
        setCardError("Por favor, ingresa un monto válido mayor a cero.");
        return;
      }
    }
    setSelectedProduct(product);
    setCheckoutModalOpen(true);
    setWantsInvoice(false);
    setErrorMsg("");
  };

  const handleProceedToPayment = async (e) => {
    e.preventDefault();
    if (!emailInput) {
      setErrorMsg("Por favor, ingresa tu correo electrónico.");
      return;
    }

    if (wantsInvoice) {
      if (!rfc || rfc.trim().length < 12 || rfc.trim().length > 13) {
        setErrorMsg("Por favor, ingresa un RFC válido (12 o 13 caracteres).");
        return;
      }
      if (!legalName || !legalName.trim()) {
        setErrorMsg("Por favor, ingresa tu Razón Social o Nombre completo.");
        return;
      }
      if (!zip || zip.trim().length !== 5) {
        setErrorMsg("Por favor, ingresa un Código Postal válido (5 dígitos).");
        return;
      }
      localStorage.setItem("ts_billing_rfc", rfc.trim());
      localStorage.setItem("ts_billing_legalName", legalName.trim());
      localStorage.setItem("ts_billing_taxSystem", taxSystem);
      localStorage.setItem("ts_billing_zip", zip.trim());
      localStorage.setItem("ts_billing_usoCfdi", usoCfdi);
    }

    localStorage.setItem("ts_user_email", emailInput);
    setLoading(true);
    setErrorMsg("");

    try {
      const payload = {
        itemId: selectedProduct.id,
        currency: currency,
        email: emailInput,
        wantsInvoice,
        rfc: rfc.trim(),
        legalName: legalName.trim(),
        taxSystem,
        zip: zip.trim(),
        usoCfdi
      };

      if (selectedProduct.id === "custom_payment" || selectedProduct.id === "cash_payment_presencial") {
        payload.customAmount = parseFloat(customAmount);
        payload.customName = selectedProduct.id === "cash_payment_presencial"
          ? `[Efectivo Presencial] ${customConcept.trim()}`
          : (customConcept.trim() || "Pago Personalizado TSolutions");
      }

      const response = await fetch("api/create-checkout-session.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      setLoading(false);

      if (data.url) {
        setCheckoutModalOpen(false);
        // Redirigir a la pasarela (sea Stripe real o simulación mock)
        window.location.href = data.url;
      } else {
        setErrorMsg(data.message || "Error al iniciar la sesión de pago.");
      }
    } catch (err) {
      setLoading(false);
      setErrorMsg("Ocurrió un error al comunicarse con la pasarela de pagos.");
    }
  };

  const filteredProducts = activeCategory === "all"
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="relative min-h-screen bg-negroProfundo text-blancoPuro font-inter overflow-hidden flex flex-col justify-between">
      {/* Background interactivo */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Grid3D />
      </div>
      <div className="fixed inset-0 bg-gradient-to-b from-negroProfundo/40 via-negroProfundo/90 to-negroProfundo z-0 pointer-events-none" />

      {/* Header global */}
      <Header />

      {/* Contenedor Principal */}
      <main className="relative z-10 flex-grow px-6 py-16 max-w-7xl mx-auto w-full">
        {/* Cabecera */}
        <div className="text-center mb-16 animate-blurIn">
          <Badge variant="naranja" glow className="mb-4 font-bruno uppercase tracking-widest text-xs">
            Ecosistema TSolutions
          </Badge>
          <h1 className="font-bruno text-4xl md:text-6xl mb-6 text-white leading-tight">
            Tienda de <NeonText variant="cta" glow>Soluciones</NeonText> Digitales
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Adquiere acceso inmediato a nuestras herramientas inteligentes de branding, servicios a medida de desarrollo, automatización IA y consultoría especializada.
          </p>
        </div>

        {/* Controles de Catálogo */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 border-b border-white/5 pb-8">
          {/* Tabs Categorías */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full font-bruno text-xs tracking-wider border transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-naranjaEnergy border-naranjaEnergy text-negroProfundo shadow-glowEnergy"
                    : "border-white/10 text-white/70 hover:border-naranjaEnergy/40 hover:text-white"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Switcher de Moneda */}
          <div className="flex items-center gap-3 bg-midnightPanel border border-white/10 p-1.5 rounded-full">
            <button
              onClick={() => setCurrency("usd")}
              className={`px-4 py-1.5 rounded-full font-bruno text-xs transition-all duration-300 ${
                currency === "usd"
                  ? "bg-naranjaEnergy text-negroProfundo font-bold shadow-glowEnergy"
                  : "text-white/60 hover:text-white"
              }`}
            >
              USD
            </button>
            <button
              onClick={() => setCurrency("mxn")}
              className={`px-4 py-1.5 rounded-full font-bruno text-xs transition-all duration-300 ${
                currency === "mxn"
                  ? "bg-naranjaEnergy text-negroProfundo font-bold shadow-glowEnergy"
                  : "text-white/60 hover:text-white"
              }`}
            >
              MXN
            </button>
          </div>
        </div>

        {/* Rejilla de Productos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((prod) => (
            <div key={prod.id} className="h-full relative group">
              {prod.popular && (
                <span className="absolute -top-3.5 right-6 z-25 bg-aquaTurquesa text-negroProfundo font-bruno text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow-[0_0_12px_rgba(0,229,255,0.4)]">
                  Popular 🔥
                </span>
              )}
              <MagneticCard
                intensity={15}
                glow={true}
                className={`
                  h-full p-8 rounded-large bg-midnightPanel/80 backdrop-blur-md border flex flex-col justify-between transition-all duration-300
                  ${prod.popular ? "border-aquaTurquesa/30 hover:border-aquaTurquesa/60" : "border-white/10 hover:border-naranjaEnergy/40"}
                `}
              >
                <div>
                  {/* Icono & Título */}
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-4xl">{prod.icon}</span>
                    <Badge variant={prod.category === "ia" ? "turquesa" : "naranja"} size="sm" className="font-bruno text-[10px]">
                      {categories.find(c => c.id === prod.category)?.name}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-bruno text-white mb-3 group-hover:text-naranjaEnergy transition-colors">
                    {prod.title}
                  </h3>
                  {prod.id === "custom_payment" || prod.id === "cash_payment_presencial" ? (
                    <div className="space-y-4 mb-6 bg-white/5 p-4 rounded-medium border border-white/5">
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-400 uppercase font-bruno">Concepto de Pago</label>
                        <input
                          type="text"
                          placeholder="Ej. Anticipo desarrollo"
                          value={customConcept}
                          onChange={(e) => setCustomConcept(e.target.value)}
                          className="w-full bg-midnightPanel text-blancoPuro border border-deepGrid rounded-medium px-3 py-2 text-xs outline-none focus:border-naranjaEnergy transition duration-200"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-400 uppercase font-bruno">Monto</label>
                        <input
                          type="number"
                          placeholder="0.00"
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value)}
                          className="w-full bg-midnightPanel text-blancoPuro border border-deepGrid rounded-medium px-3 py-2 text-xs outline-none focus:border-naranjaEnergy transition duration-200"
                        />
                      </div>
                      {cardError && (
                        <div className="text-[10px] text-red-400 mt-1">
                          ⚠️ {cardError}
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-sm leading-relaxed mb-6 font-inter">
                      {prod.desc}
                    </p>
                  )}

                  {/* Características */}
                  <ul className="space-y-3 mb-8">
                    {prod.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-gray-300 font-inter">
                        <span className="text-naranjaEnergy mt-0.5">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Precio & CTA */}
                <div>
                  <div className="border-t border-white/5 pt-6 mb-6 flex items-baseline justify-between">
                    <span className="text-xs text-gray-500 uppercase tracking-widest font-bruno">Precio</span>
                    <div className="text-right">
                      <span className="text-2xl font-bruno text-white font-bold">
                        {prod.id === "custom_payment" || prod.id === "cash_payment_presencial" ? (
                          customAmount ? `$${parseFloat(customAmount).toLocaleString()} ${currency.toUpperCase()}` : `$0.00 ${currency.toUpperCase()}`
                        ) : (
                          currency === "usd" ? `$${prod.priceUsd} USD` : `$${prod.priceMxn} MXN`
                        )}
                      </span>
                      {prod.id !== "custom_payment" && prod.id !== "cash_payment_presencial" && (
                        <span className="block text-[10px] text-gray-400 mt-1 font-inter">
                          {currency === "usd" ? `(~ ${prod.priceMxn} MXN)` : `(~ ${prod.priceUsd} USD)`}
                        </span>
                      )}
                      {currency === "mxn" && (
                        <span className="block text-[10px] text-aquaTurquesa mt-1 font-bruno">
                          💵 Pago en OXXO / Efectivo disponible
                        </span>
                      )}
                    </div>
                  </div>

                  <Button
                    variant={prod.popular ? "turquesa" : "naranja"}
                    glow={true}
                    className="w-full font-bruno uppercase tracking-wider py-3.5 text-xs text-negroProfundo hover:scale-[1.02] active:scale-[0.98] transition-transform"
                    onClick={() => handleOpenCheckout(prod)}
                  >
                    {prod.id === "custom_payment" ? "Pagar Concepto" : "Adquirir Ahora"}
                  </Button>
                </div>
              </MagneticCard>
            </div>
          ))}
        </div>
      </main>

      {/* Footer global */}
      <Footer />

      {/* MODAL DE CHECKOUT STRIPE */}
      <Modal
        open={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        title="Pasarela Segura TSolutions"
        glow={true}
      >
        {selectedProduct && (
          <form onSubmit={handleProceedToPayment} className="space-y-6 pt-4 font-inter text-sm">
            <div className="bg-white/5 p-4 rounded-medium border border-white/10">
              <span className="text-xs text-gray-400 uppercase tracking-wider block mb-1 font-bruno">Producto</span>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{selectedProduct.icon}</span>
                <span className="font-bruno text-white text-base font-bold">
                  {selectedProduct.id === "custom_payment" ? customConcept : selectedProduct.title}
                </span>
              </div>
              <div className="flex justify-between items-baseline mt-4 border-t border-white/5 pt-3">
                <span className="text-xs text-gray-400 font-bruno">Total a pagar:</span>
                <span className="text-xl font-bruno text-naranjaEnergy font-black">
                  {selectedProduct.id === "custom_payment" ? (
                    `$${parseFloat(customAmount).toFixed(2)} ${currency.toUpperCase()}`
                  ) : (
                    currency === "usd" ? `$${selectedProduct.priceUsd}.00 USD` : `$${selectedProduct.priceMxn}.00 MXN`
                  )}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="checkout-email" className="block text-xs text-gray-300 font-bruno">
                Correo Electrónico de Facturación
              </label>
              <Input
                id="checkout-email"
                type="email"
                placeholder="tu@correo.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                glow={true}
                required
                className="w-full"
              />
              <span className="text-[10px] text-gray-500 block leading-tight mt-1">
                Utilizaremos este correo para enviarte las credenciales, accesos y comprobantes de tu compra.
              </span>
            </div>

            {/* Facturación SAT */}
            <div className="border-t border-white/5 pt-4">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={wantsInvoice}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setWantsInvoice(checked);
                    if (checked) {
                      if (!rfc) setRfc("GAAJ8703126A0");
                      if (!legalName) setLegalName("JAVIER EDUARDO GALLARDO ARREDONDO");
                      if (!zip) setZip("21600");
                    }
                  }}
                  className="rounded border-white/10 text-naranjaEnergy focus:ring-0 focus:ring-offset-0 bg-midnightPanel w-4 h-4"
                />
                <span className="text-xs text-gray-300 font-bruno">¿Requieres Factura Fiscal (CFDI 4.0)?</span>
              </label>

              {wantsInvoice && (
                <div className="mt-4 space-y-4 animate-scaleIn bg-white/5 p-4 rounded-medium border border-white/5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-400 uppercase font-bruno">RFC</label>
                      <input
                        type="text"
                        placeholder="Ej. GAAJ8703126A0"
                        value={rfc}
                        onChange={(e) => setRfc(e.target.value.toUpperCase())}
                        maxLength={13}
                        className="w-full bg-midnightPanel text-blancoPuro border border-deepGrid rounded-medium px-3 py-2 text-xs outline-none focus:border-naranjaEnergy transition duration-200"
                        required={wantsInvoice}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-400 uppercase font-bruno">Código Postal</label>
                      <input
                        type="text"
                        placeholder="Ej. 21600"
                        value={zip}
                        onChange={(e) => setZip(e.target.value.replace(/\D/g, ""))}
                        maxLength={5}
                        className="w-full bg-midnightPanel text-blancoPuro border border-deepGrid rounded-medium px-3 py-2 text-xs outline-none focus:border-naranjaEnergy transition duration-200"
                        required={wantsInvoice}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-400 uppercase font-bruno">Nombre o Razón Social</label>
                    <input
                      type="text"
                      placeholder="Ej. JAVIER EDUARDO GALLARDO ARREDONDO"
                      value={legalName}
                      onChange={(e) => setLegalName(e.target.value.toUpperCase())}
                      className="w-full bg-midnightPanel text-blancoPuro border border-deepGrid rounded-medium px-3 py-2 text-xs outline-none focus:border-naranjaEnergy transition duration-200"
                      required={wantsInvoice}
                    />
                    <span className="text-[9px] text-gray-500 block leading-tight">
                      Tal como aparece en la Constancia de Situación Fiscal (sin agregar S.A. de C.V., etc.).
                    </span>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-400 uppercase font-bruno">Régimen Fiscal</label>
                    <select
                      value={taxSystem}
                      onChange={(e) => setTaxSystem(e.target.value)}
                      className="w-full bg-midnightPanel text-blancoPuro border border-deepGrid rounded-medium px-3 py-2 text-xs outline-none focus:border-naranjaEnergy transition duration-200"
                      required={wantsInvoice}
                    >
                      <option value="625">625 - Actividades Empresariales con Plataformas Tecnológicas</option>
                      <option value="601">601 - General de Ley Personas Morales</option>
                      <option value="612">612 - Personas Físicas con Actividades Empresariales y Profesionales</option>
                      <option value="626">626 - Régimen Simplificado de Confianza (RESICO)</option>
                      <option value="605">605 - Sueldos y Salarios e Ingresos Asimilados</option>
                      <option value="616">616 - Sin obligaciones fiscales</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-400 uppercase font-bruno">Uso de CFDI</label>
                    <select
                      value={usoCfdi}
                      onChange={(e) => setUsoCfdi(e.target.value)}
                      className="w-full bg-midnightPanel text-blancoPuro border border-deepGrid rounded-medium px-3 py-2 text-xs outline-none focus:border-naranjaEnergy transition duration-200"
                      required={wantsInvoice}
                    >
                      <option value="G03">G03 - Gastos en general</option>
                      <option value="CP01">CP01 - Sin efectos fiscales</option>
                      <option value="I08">I08 - Otras inversiones</option>
                      <option value="D01">D01 - Honorarios médicos, dentales y hospitalarios</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {errorMsg && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-medium text-xs">
                ⚠️ {errorMsg}
              </div>
            )}

            <Button
              type="submit"
              variant="naranja"
              glow={true}
              disabled={loading}
              className="w-full font-bruno uppercase tracking-wider py-4 text-xs text-negroProfundo"
            >
              {loading ? "Procesando..." : "Proceder al Pago Seguro"}
            </Button>
          </form>
        )}
      </Modal>

      {/* MODAL DE ÉXITO DE COMPRA */}
      <Modal
        open={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
        title="¡Gracias por tu compra!"
        glow={true}
      >
        <div className="space-y-4 pt-4 text-center font-inter">
          <div className="w-16 h-16 bg-naranjaEnergy/25 border border-naranjaEnergy text-4xl flex items-center justify-center rounded-full mx-auto animate-scaleIn shadow-[0_0_20px_rgba(249,115,22,0.4)]">
            🎉
          </div>
          <h3 className="font-bruno text-lg text-white mt-4">
            Pago Procesado Correctamente
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            {manualCode ? (
              <span>
                Registro de pago en efectivo procesado y validado mediante Stripe (Venta Manual).
              </span>
            ) : (
              <span>
                Tu transacción para adquirir <strong>{purchasedItemName}</strong> se ha completado de forma segura a través de Stripe.
              </span>
            )}
          </p>
          {manualCode && (
            <div className="p-3 bg-naranjaEnergy/10 border border-naranjaEnergy/30 rounded-medium text-xs text-center text-naranjaEnergy font-bruno">
              CÓDIGO DE VENTA MANUAL: <span className="text-white font-bold">{manualCode}</span>
            </div>
          )}
          <div className="bg-white/5 p-4 rounded-medium text-xs text-gray-300 border border-white/5 max-w-sm mx-auto text-left leading-relaxed">
            ✔️ Se ha enviado una confirmación de pago a tu correo.<br />
            ✔️ El sistema de base de datos de TSolutions ha registrado tu acceso.<br />
            {invoiceRequested && (
              <span className="text-aquaTurquesa font-semibold">
                ✔️ Tu factura CFDI 4.0 está siendo timbrada y se enviará en formato PDF y XML en unos minutos a tu correo.<br />
              </span>
            )}
            ✔️ Si adquiriste consultoría, te llegará un enlace de reserva en breve.
          </div>
        </div>
      </Modal>

      {/* MODAL DE CANCELACIÓN DE COMPRA */}
      <Modal
        open={cancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
        title="Transacción Cancelada"
        glow={false}
      >
        <div className="space-y-4 pt-4 text-center font-inter">
          <div className="w-16 h-16 bg-white/5 border border-white/20 text-4xl flex items-center justify-center rounded-full mx-auto animate-scaleIn">
            ❌
          </div>
          <h3 className="font-bruno text-lg text-white mt-4">
            Proceso de Pago Cancelado
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Has cancelado el proceso de cobro para <strong>{purchasedItemName}</strong>. No se ha realizado ningún cargo a tu tarjeta de crédito o débito.
          </p>
          <p className="text-xs text-gray-500">
            Si tuviste algún inconveniente o deseas utilizar otro método de pago, no dudes en contactar a soporte de TSolutions.
          </p>
        </div>
      </Modal>
    </div>
  );
}
