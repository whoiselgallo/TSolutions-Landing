import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import PortfolioAccessModal from "../components/modals/PortfolioAccessModal.jsx";
import CheckoutModal from "../components/ui/CheckoutModal.jsx";

export default function PortfolioPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState("todos"); // todos | paquetes | consultoria | complementos
  const [selectedDiagnostic, setSelectedDiagnostic] = useState(null);
  const [searchComplemento, setSearchComplemento] = useState("");
  const [isGateOpen, setIsGateOpen] = useState(false);

  // Estado del Modal de Pago
  const [checkoutProduct, setCheckoutProduct] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Check if visitor has unlocked the portfolio filter
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const isUnlocked = localStorage.getItem("tsolutions_portfolio_unlocked");
    if (isUnlocked !== "true") {
      setIsGateOpen(true);
    }
  }, []);

  // Read URL query params if user was directed to a specific category or product
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const cat = searchParams.get("cat");
    const paquete = searchParams.get("paquete");
    if (cat && ["todos", "paquetes", "consultoria", "complementos"].includes(cat)) {
      setActiveCategory(cat);
    }
    if (paquete) {
      const el = document.getElementById(paquete);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 300);
      }
    }
  }, [searchParams]);

  const packages = [
    {
      id: "tarjeta-smart",
      level: "Nivel 1",
      name: "Tarjeta Smart",
      subtitle: "El Gancho — Mobile First",
      img: "/assets/iconografia/Smart_web_icon_design_2K_202608271207.jpeg",
      fallback: "/assets/iconografia/tarjetamuestra.jpg",
      price: "$950 MXN",
      model: "Pago único en 1 exhibición",
      description: "\"Smart Web\" vertical (tipo Bio Link) optimizada mobile-first. Incluye cabecera, acciones rápidas en la zona de pulgar, enlaces destacados y bloque interactivo ligero.",
      ticketJustification: "Herramienta táctica de bajo costo para captar ventas inmediatas y evitar que el negocio pierda clientes por falta de un canal digital rápido.",
      variants: "Incluye un máximo de 2 revisiones estéticas sin costo.",
      featured: false,
      badge: "Entrada Rápida",
      idealFor: "Emprendedores y comercios que atienden por WhatsApp y necesitan presencia inmediata."
    },
    {
      id: "negocio-en-google",
      level: "Nivel 2",
      name: "Tu Negocio en Google",
      subtitle: "Conversión Local & Google Maps",
      img: "/assets/iconografia/Design_business_logo_for_maps_202608270910.jpeg",
      fallback: "/assets/iconografia/ubicaciongoogle.jpg",
      price: "$2,750 MXN",
      model: "Anticipo 50% y 50% a la entrega",
      description: "Landing Page de sección larga orientada a la conversión y rescate geográfico. Incluye alta, optimización SEO y depuración en Google Maps, unificación de horarios y automatización de WhatsApp Business.",
      ticketJustification: "Detiene las fugas de dinero causadas por clientes que van a direcciones incorrectas, ven horarios falsos o terminan comprando a la competencia.",
      variants: "Incluye 2 revisiones sin costo adicional.",
      featured: false,
      badge: "Rescate Local",
      idealFor: "Negocios con punto de venta físico, talleres, consultorios y restaurantes."
    },
    {
      id: "escala-rapida",
      level: "Híbrido N1+N2",
      name: "Paquete Híbrido Escala Rápida",
      subtitle: "Smart Web + Conversión Local",
      img: "/assets/iconografia/reddecrecimiento.jpg",
      fallback: "/assets/iconografia/innovacion.jpeg",
      price: "$3,700 MXN",
      model: "Anticipo 50% y 50% a la entrega",
      description: "Fusión completa de la Smart Web móvil y la Landing Page de conversión local con optimización de mapas. Resuelve el caos operativo integral de un solo golpe para captar y tomar pedidos.",
      ticketJustification: "Resuelve el caos operativo integral de un solo golpe, ideal para captar tráfico de la zona y automatizar la toma de pedidos.",
      variants: "Beneficio comercial del 75% en complementos y límite de 2 revisiones estéticas gratuitas.",
      featured: true,
      badge: "🔥 Más Recomendado",
      idealFor: "PYMES que desean dominar su zona geográfica y acelerar pedidos por WhatsApp."
    },
    {
      id: "ecosistema-total",
      level: "Nivel 3",
      name: "Ecosistema Total",
      subtitle: "Comercio Integral & Middleware IA",
      img: "/assets/iconografia/ecosistematotal.jpg",
      fallback: "/assets/iconografia/Full-stack_tech_agency_icon_design_202608271207.jpeg",
      price: "$5,450 MXN",
      model: "Anticipo 40% + Medio 30% + Entrega 30%",
      description: "Sitio web corporativo completo (límite de 5 páginas; cada página adicional se cotiza como complemento), correo corporativo, 3 plantillas editables para redes y Middleware de IA embebido en el backend para optimizar desempeño.",
      ticketJustification: "Centraliza la operación para negocios estructurados, combinando un diseño Full-Stack a la medida con IA como cerebro de ejecución.",
      variants: "Requiere activar un plan de iguala obligatoria de mantenimiento por 9 meses (4, 6 u 8 horas mensuales).",
      featured: false,
      badge: "Cerebro con IA",
      idealFor: "Empresas consolidadas, distribuidoras y firmas de servicios profesionales."
    },
    {
      id: "ecommerce-total",
      level: "E-Commerce",
      name: "E-commerce Total con Logística Integrada",
      subtitle: "Catálogo, Pasarela & Envíos Automáticos",
      img: "/assets/iconografia/Shopping_cart_icon_ui_design_202608271158.jpeg",
      fallback: "/assets/iconografia/Delivery_truck_icon_design_2K_202608271205.jpeg",
      price: "$9,850 MXN",
      model: "Anticipo 40% + Medio 30% + Entrega Final 30%",
      description: "Arquitectura transaccional que incluye catálogo interactivo, tarjetas de producto, carrito con recuperación automática, menú digital QR, pasarela de pagos y conexión nativa con APIs de logística (Uber Direct / Didi para locales; DHL / Estafeta para nacionales e internacionales).",
      ticketJustification: "Transforma el sitio en una máquina automática de despachos, liberando al dueño de triangular envíos manualmente y transparentando los costos logísticos.",
      variants: "Activa una iguala mensual obligatoria por 9 meses para mantenimiento y seguridad 24/7.",
      featured: false,
      badge: "Logística Nativa",
      wide: true,
      idealFor: "Marcas con venta de productos físicos, restaurantes con delivery y tiendas en expansión."
    }
  ];

  const consultoria = [
    {
      id: "consultoria-sops",
      name: "Consultoría Estructural (SOPs y Workflows)",
      subtitle: "Mapeo & Estandarización",
      img: "/assets/iconografia/consultoriaestructural.jpg",
      price: "A cotizar según alcance",
      model: "Anticipo 40% + Medio 30% + Entrega 30%",
      description: "Diagnóstico interno, mapeo de procesos y documentación de Procedimientos Operativos Estándar (SOPs) y flujos de trabajo en plataformas de gestión.",
      ticketJustification: "Permite delegar operaciones documentando el 'saber hacer' de la empresa (ej. recetas), evitando fallos operativos al expandir sucursales."
    },
    {
      id: "taller-branding",
      name: "Taller Express Identity Branding & Logotipos",
      subtitle: "Diseño & Brand Story",
      img: "/assets/iconografia/identidadmarcaprincipal.jpg",
      price: "$1,850 MXN",
      model: "Anticipo 50% y 50% a la entrega",
      description: "Sesión formativa donde el cliente comprende la historia y el mensaje detrás de su marca, diseño de logotipo, tipografías, paleta de colores y narrativa de marca (Brand Story).",
      ticketJustification: "El cliente se apropia de su marca y sabe cómo comunicarla para conectar y vender mejor, alineándose a la filosofía formativa de TSolutions."
    },
    {
      id: "manifiesto-legal",
      name: "Manifiesto de Marca y Auditoría Legal",
      subtitle: "Blindaje & Viabilidad IMPI",
      img: "/assets/iconografia/Legal_icon_for_tech_agency_202608271205.jpeg",
      price: "$1,550 MXN",
      model: "Anticipo 50% y 50% a la entrega",
      description: "Consultoría de identidad discursiva que entrega un manifiesto formal (historia, misión, visión, valores y tono de voz) y un reporte de viabilidad legal y disponibilidad de registro de nombre/logotipo.",
      ticketJustification: "Protege la inversión inicial del negocio, evitando gastos catastróficos por operar marcas ya registradas por terceros."
    },
    {
      id: "elevator-pitch",
      name: "Elevator Pitch Estratégico",
      subtitle: "Copywriting de Alta Conversión",
      img: "/assets/iconografia/Call_to_action_icon_design_202608271429.jpeg",
      price: "$850 MXN",
      model: "Pago en 1 exhibición",
      description: "Redacción persuasiva (copywriting) para estructurar la propuesta de valor en un guion de ventas maestro (30-60 segundos) adaptado para biografías sociales, encabezados web y respuestas rápidas de WhatsApp.",
      ticketJustification: "Estandariza la comunicación comercial para que cualquier prospecto entienda el valor del servicio de inmediato, elevando las tasas de conversión."
    }
  ];

  const complementos = [
    { cat: "Tecnología y Logística", name: "Integración de Envíos Nativos (API Uber/DiDi)", icon: "🛵", img: "/assets/iconografia/Uber_icon_design_for_agency_202608271159.jpeg", price: "$3,500 MXN", priceWithDiscount: "$875 MXN", pay: "Pago 1 Exhibición" },
    { cat: "Tecnología y Logística", name: "Módulo de Inteligencia Artificial (Backend/Agentes)", icon: "🤖", img: "/assets/iconografia/inteligenciagenerativa.jpg", price: "$4,500 MXN", priceWithDiscount: "$1,125 MXN", pay: "Anticipo 50% / 50%" },
    { cat: "Tecnología y Logística", name: "Autenticación rápida (OAuth Google)", icon: "🔑", img: "/assets/iconografia/oauth2.jpg", price: "$950 MXN", priceWithDiscount: "$238 MXN", pay: "Pago 1 Exhibición" },
    { cat: "Pasarelas de Pago", name: "Stripe, Mercado Pago, Conekta o PayPal", icon: "💳", img: "/assets/iconografia/Stripe_icon_for_tech_agency_202608271205.jpeg", price: "$1,200 MXN", priceWithDiscount: "$300 MXN", pay: "Pago por Evento" },
    { cat: "Chatbots Inteligentes", name: "WhatsApp Business (Árbol y pedidos)", icon: "💬", img: "/assets/iconografia/WhatsApp_Business_icon_design_2K_202608271203.jpeg", price: "$3,200 MXN", priceWithDiscount: "$800 MXN", pay: "Pago 1 Exhibición" },
    { cat: "Chatbots Inteligentes", name: "Landing Page (Calificación de leads y Webhooks)", icon: "🎯", img: "/assets/iconografia/leads.jpg", price: "$2,450 MXN", priceWithDiscount: "$612 MXN", pay: "Pago 1 Exhibición" },
    { cat: "Chatbots Inteligentes", name: "Telegram (Comandos y catálogos en PDF)", icon: "✈️", img: "/assets/iconografia/Telegram_icon_design_2K_202608271203.jpeg", price: "$1,950 MXN", priceWithDiscount: "$487 MXN", pay: "Pago 1 Exhibición" },
    { cat: "Chatbots Inteligentes", name: "Smart Web (Widget guiado y FAQs)", icon: "📱", img: "/assets/iconografia/Chatbot.jpg", price: "/assets/iconografia/Chatbot.jpg", priceWithDiscount: "$362 MXN", pay: "Pago 1 Exhibición" },
    { cat: "Activos Físicos", name: "Tarjeta Inteligente NFC vCard", icon: "🏷️", img: "/assets/iconografia/NFC_vcard_icon_design_2K_202608271203.jpeg", price: "$550 MXN c/u", priceWithDiscount: "$138 MXN c/u", pay: "Pago 1 Exhibición" },
    { cat: "Activos Físicos", name: "Display Acrílico Inteligente (QR/NFC Mostrador)", icon: "🪧", img: "/assets/iconografia/utileria.jpg", price: "$350 MXN c/u", priceWithDiscount: "$88 MXN c/u", pay: "Pago 1 Exhibición" },
    { cat: "Marketing y Visuales", name: "Producción de Comercial en Video (Locación & Post)", icon: "🎬", img: "/assets/iconografia/arteconceptual.jpg", price: "$5,500 MXN", priceWithDiscount: "$1,375 MXN", pay: "Anticipo 50% / 50%" },
    { cat: "Marketing y Visuales", name: "Levantamiento de Activos (Sesión fotos/video base)", icon: "📸", img: "/assets/iconografia/Corporate_email_interface_design_2K_202608271208.jpeg", price: "$2,500 MXN", priceWithDiscount: "$625 MXN", pay: "Anticipo 50% / 50%" },
    { cat: "Marketing y Visuales", name: "Setup de Campaña Publicitaria Ads (No incluye pauta)", icon: "📢", img: "/assets/iconografia/medirimpacto.jpg", price: "$2,500 MXN", priceWithDiscount: "$625 MXN", pay: "Pago 1 Exhibición" },
    { cat: "Marketing y Visuales", name: "Coherencia Visual para Redes (Auditoría Meta/TikTok)", icon: "✨", img: "/assets/iconografia/identidaddemarca2.jpg", price: "$1,800 MXN", priceWithDiscount: "$450 MXN", pay: "Pago 1 Exhibición" },
    { cat: "Marketing y Visuales", name: "Diseño de Carrusel de Marketing (5 Tarjetas)", icon: "📑", img: "/assets/iconografia/orientacioncard.jpg", price: "$650 MXN", priceWithDiscount: "$162 MXN", pay: "Pago 1 Exhibición" }
  ];

  const filteredComplementos = complementos.filter(item => 
    item.name.toLowerCase().includes(searchComplemento.toLowerCase()) ||
    item.cat.toLowerCase().includes(searchComplemento.toLowerCase())
  );

  const handleOpenCheckout = (item) => {
    setCheckoutProduct(item);
    setIsCheckoutOpen(true);
  };

  const handleSelectToQuote = (packageName) => {
    navigate(`/?paquete=${encodeURIComponent(packageName)}#contacto`);
  };

  return (
    <div className="bg-negroProfundo text-blancoPuro min-h-screen selection:bg-naranjaEnergy selection:text-white pb-20 sm:pb-12">
      
      {/* Portfolio Access Gate Modal */}
      <PortfolioAccessModal
        isOpen={isGateOpen}
        onClose={() => setIsGateOpen(false)}
        targetUrl="/portafolio"
      />

      {/* Checkout Modal Interactivo */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        product={checkoutProduct}
      />

      {/* ================= HEADER DE NAVEGACIÓN ================= */}
      <header className="w-full border-b border-white/10 bg-negroProfundo/95 backdrop-blur-md sticky top-0 z-40 py-3 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div 
                className="w-10 h-10 border border-naranjaEnergy bg-midnightPanel flex items-center justify-center p-1.5 shadow-glowEnergy group-hover:scale-105 transition-transform"
                style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
              >
                <img 
                  src="/assets/TSolutionslogo/logoTSVG.svg" 
                  onError={(e) => { e.target.src = "/assets/TSolutionslogo/logoWEBP.webp"; }}
                  alt="TSolutions Logo" 
                  className="w-full h-full object-contain" 
                />
              </div>
              <div>
                <div className="font-bruno text-sm sm:text-base tracking-wider text-blancoPuro flex items-center gap-1.5">
                  TSOLUTIONS <span className="text-naranjaEnergy text-xs font-sans font-bold px-1.5 py-0.5 rounded bg-naranjaEnergy/10 border border-naranjaEnergy/30">PORTAFOLIO</span>
                </div>
                <p className="text-[10px] text-humo tracking-widest hidden sm:block">
                  CATÁLOGO COMERCIAL &bull; PRECIOS & SERVICIOS
                </p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/#contacto"
              className="inline-flex items-center gap-2 bg-naranjaEnergy hover:bg-orange-600 text-white px-4 py-2 rounded-medium text-xs font-bold transition shadow-glowEnergy"
            >
              <span>Diagnóstico Gratuito</span>
            </Link>
          </div>

        </div>
      </header>

      {/* ================= HERO BANNER DEL PORTAFOLIO ================= */}
      <section className="py-12 px-4 sm:px-6 border-b border-white/5 bg-gradient-to-b from-midnightPanel/70 to-negroProfundo text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-naranjaEnergy/10 border border-naranjaEnergy/30 text-naranjaEnergy text-xs font-bold mb-4 shadow-inner">
            <span>🏛️ Portafolio Oficial TSolutions IPIDD</span>
          </div>
          <h1 className="font-bruno text-3xl sm:text-5xl text-blancoPuro mb-4 leading-tight">
            Ecosistemas Digitales, Consultoría & Complementos
          </h1>
          <p className="text-sm sm:text-base text-humo max-w-2xl mx-auto leading-relaxed mb-6">
            “Tecnología instalada. Conocimiento transferido. Negocios escalados.”
          </p>
        </div>
      </section>

      {/* ================= CONTENIDO PRINCIPAL ================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        
        {/* 1. SECCIÓN: PAQUETES & ECOSISTEMAS */}
        {(activeCategory === "todos" || activeCategory === "paquetes") && (
          <section className="mb-20">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
              <div>
                <span className="text-xs font-bold text-naranjaEnergy uppercase tracking-widest">
                  INFRAESTRUCTURA &bull; NIVELES 1 AL 3 + ECOMMERCE
                </span>
                <h2 className="font-bruno text-2xl sm:text-3xl text-blancoPuro mt-1">
                  Ecosistemas Digitales y Paquetes Principales
                </h2>
              </div>
              <p className="text-xs text-humo">
                Incluyen pasarelas de pago y transferencia de conocimiento
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  id={pkg.id}
                  className={`bg-midnightPanel rounded-large p-6 sm:p-7 flex flex-col justify-between border transition-all duration-300 shadow-card group ${
                    pkg.featured
                      ? "border-2 border-naranjaEnergy relative shadow-glowEnergy"
                      : "border-white/10 hover:border-naranjaEnergy/50"
                  } ${pkg.wide ? "md:col-span-2 lg:col-span-2" : ""}`}
                >
                  {pkg.featured && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-naranjaEnergy text-white text-[11px] font-bold uppercase px-4 py-1 rounded-full shadow-glowEnergy z-10">
                      {pkg.badge}
                    </div>
                  )}

                  <div>
                    {/* Visual Image Render */}
                    <div className="relative w-full h-64 sm:h-72 rounded-large overflow-hidden mb-6 border border-white/10 bg-negroProfundo/90 flex items-center justify-center p-2 group-hover:border-naranjaEnergy/40 transition-colors shadow-inner">
                      <img
                        src={pkg.img}
                        onError={(e) => { e.target.src = pkg.fallback; }}
                        alt={pkg.name}
                        className="w-full h-full object-contain sm:object-cover rounded-medium transform group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-midnightPanel/80 via-transparent to-transparent pointer-events-none"></div>
                      <span className="absolute top-3 right-3 text-[10px] uppercase font-bold px-3 py-1 rounded-full bg-negroProfundo/90 text-naranjaEnergy border border-naranjaEnergy/40 backdrop-blur-md shadow-glowEnergy">
                        {pkg.level}
                      </span>
                    </div>

                    <h3 className="font-bruno text-xl text-blancoPuro">{pkg.name}</h3>
                    <p className="text-xs text-naranjaEnergy font-semibold mb-3">{pkg.subtitle}</p>

                    <div className="mb-4 bg-negroProfundo/60 p-3 rounded-medium border border-white/5">
                      <span className="text-3xl font-bruno text-blancoPuro">{pkg.price}</span>
                      <p className="text-xs text-humo mt-0.5">{pkg.model}</p>
                    </div>

                    <p className="text-xs text-humo leading-relaxed mb-4">
                      {pkg.description}
                    </p>

                    <div className="bg-negroProfundo/70 p-3 rounded-medium border border-white/5 mb-3 text-[11px] text-blancoPuro/90">
                      <span className="text-naranjaEnergy font-bold block mb-0.5">🎯 Ideal para:</span>
                      {pkg.idealFor}
                    </div>

                    <div className="bg-negroProfundo/70 p-3 rounded-medium border border-white/5 mb-4 text-[11px] text-blancoPuro/80">
                      <span className="text-naranjaEnergy font-bold block mb-0.5">💡 Justificación de Retorno:</span>
                      {pkg.ticketJustification}
                    </div>

                    <p className="text-[11px] text-humo/80 mb-6 italic">
                      * {pkg.variants}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => handleOpenCheckout(pkg)}
                      className="w-full py-3.5 px-4 bg-naranjaEnergy hover:bg-orange-600 text-white font-bruno text-xs rounded-medium shadow-glowEnergy transition flex items-center justify-center gap-2"
                    >
                      <span>💳 Pagar en Línea / Anticipo</span>
                    </button>
                    <button
                      onClick={() => handleSelectToQuote(`${pkg.name} (${pkg.price})`)}
                      className="w-full py-2.5 bg-negroProfundo hover:bg-white/10 text-humo hover:text-white border border-white/10 rounded-medium text-xs font-bold transition text-center"
                    >
                      🚀 Cotizar con Asesor
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 2. SECCIÓN: CONSULTORÍA & BRANDING */}
        {(activeCategory === "todos" || activeCategory === "consultoria") && (
          <section className="mb-20 pt-8 border-t border-white/10">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold text-naranjaEnergy uppercase tracking-widest">
                METODOLOGÍA &bull; BLINDAJE & MARCA
              </span>
              <h2 className="font-bruno text-2xl sm:text-3xl text-blancoPuro mt-1">
                🏛️ Consultoría Estratégica y Branding
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {consultoria.map((c) => (
                <div 
                  key={c.id} 
                  id={c.id}
                  className="bg-midnightPanel p-5 rounded-large border border-white/10 hover:border-naranjaEnergy/40 flex flex-col justify-between shadow-card group transition-all"
                >
                  <div>
                    <div className="relative w-full h-44 rounded-medium overflow-hidden mb-4 border border-white/10 bg-negroProfundo flex items-center justify-center p-2">
                      <img
                        src={c.img}
                        alt={c.name}
                        className="w-full h-full object-contain rounded transform group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                      />
                    </div>
                    <h3 className="font-bruno text-sm text-blancoPuro mb-1 leading-snug">{c.name}</h3>
                    <p className="text-[11px] text-naranjaEnergy font-semibold mb-2">{c.subtitle}</p>
                    <p className="text-sm font-bold text-blancoPuro mb-0.5">{c.price}</p>
                    <p className="text-[10px] text-humo mb-3">{c.model}</p>
                    <p className="text-xs text-humo leading-relaxed mb-3">{c.description}</p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <button
                      onClick={() => handleOpenCheckout(c)}
                      className="w-full py-2.5 bg-naranjaEnergy hover:bg-orange-600 text-white font-bruno text-xs rounded shadow transition text-center"
                    >
                      💳 Adquirir / Pagar
                    </button>
                    <button
                      onClick={() => handleSelectToQuote(c.name)}
                      className="w-full py-2 bg-negroProfundo hover:bg-white/10 text-humo hover:text-white border border-white/10 rounded text-[11px] font-bold transition text-center"
                    >
                      Cotizar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 3. SECCIÓN: MENÚ DE COMPLEMENTOS (75% OFF) */}
        {(activeCategory === "todos" || activeCategory === "complementos") && (
          <section className="pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-xs font-bold text-naranjaEnergy uppercase tracking-widest">
                  ⚙️ A LA CARTA &bull; BENEFICIO EXCLUSIVO
                </span>
                <h2 className="font-bruno text-2xl sm:text-3xl text-blancoPuro mt-1">
                  Menú de Complementos Tecnológicos
                </h2>
              </div>
              <div className="bg-naranjaEnergy/15 border border-naranjaEnergy/40 px-4 py-2.5 rounded-medium text-xs text-naranjaEnergy font-semibold flex items-center gap-2 shadow-inner">
                <span>🎁</span>
                <span><strong>75% de descuento preferencial</strong> para clientes del ecosistema</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-blancoPuro border-collapse bg-midnightPanel rounded-large overflow-hidden border border-white/10 shadow-card">
                <thead className="bg-negroProfundo text-white font-bruno uppercase text-[10px] tracking-wider border-b border-white/10">
                  <tr>
                    <th className="py-4 px-4">Categoría</th>
                    <th className="py-4 px-4">Complemento / Servicio</th>
                    <th className="py-4 px-4">Inversión Regular</th>
                    <th className="py-4 px-4 text-naranjaEnergy">Precio Ecosistema (-75%)</th>
                    <th className="py-4 px-4">Modelo de Pago</th>
                    <th className="py-4 px-4 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredComplementos.map((item, i) => (
                    <tr key={i} className="hover:bg-negroProfundo/50 transition-colors">
                      <td className="py-3 px-4 font-semibold text-naranjaEnergy">
                        <span className="mr-1.5">{item.icon}</span> {item.cat}
                      </td>
                      <td className="py-3 px-4 flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded overflow-hidden border border-white/10 shrink-0 bg-negroProfundo p-0.5">
                          <img src={item.img} alt={item.name} className="w-full h-full object-contain" />
                        </div>
                        <span className="font-medium">{item.name}</span>
                      </td>
                      <td className="py-3 px-4 text-humo line-through">{item.price}</td>
                      <td className="py-3 px-4 font-bruno text-white text-sm bg-naranjaEnergy/5 font-bold text-naranjaEnergy">
                        {item.priceWithDiscount}
                      </td>
                      <td className="py-3 px-4 text-humo">{item.pay}</td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleOpenCheckout({ name: item.name, price: item.priceWithDiscount, model: item.pay })}
                          className="px-3 py-1.5 bg-naranjaEnergy hover:bg-orange-600 text-white rounded text-xs font-bold transition shadow"
                        >
                          Pagar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

      </main>

      {/* ================= FOOTER ================= */}
      <footer className="py-10 bg-negroProfundo text-humo text-xs border-t border-white/5 text-center sm:text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-bruno text-blancoPuro">TSOLUTIONS IPIDD</span> &bull; 
            <span className="ml-2">“Tecnología instalada. Conocimiento transferido. Negocios escalados.”</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/privacidad" className="hover:text-naranjaEnergy transition">Aviso de Privacidad</Link>
            <Link to="/terminos" className="hover:text-naranjaEnergy transition">Términos de Servicio</Link>
            <Link to="/#contacto" className="hover:text-naranjaEnergy transition">Contacto</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
