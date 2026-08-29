import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import PortfolioAccessModal from "../components/modals/PortfolioAccessModal.jsx";

export default function PortfolioPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState("todos"); // todos | paquetes | consultoria | complementos
  const [selectedDiagnostic, setSelectedDiagnostic] = useState(null);
  const [searchComplemento, setSearchComplemento] = useState("");
  const [isGateOpen, setIsGateOpen] = useState(false);

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
      subtitle: "Conversión Local & Maps",
      img: "/assets/iconografia/Design_business_logo_for_maps_202608270910.jpeg",
      fallback: "/assets/iconografia/ubicaciongoogle.jpg",
      price: "$2,750 MXN",
      model: "Anticipo 50% y 50% a la entrega",
      description: "Landing Page de sección larga orientada a la conversión y rescate geográfico. Incluye alta, optimización SEO y depuración en Google Maps, unificación de horarios y automatización de WhatsApp Business.",
      ticketJustification: "Detiene las fugas de dinero causadas por clientes que van a direcciones incorrectas, ven horarios falsos o terminan comprando a la competencia.",
      variants: "Incluye 2 revisiones sin costo adicional.",
      featured: false,
      badge: "SEO Local",
      idealFor: "Talleres, ferreterías, consultorios o locales físicos que sufren fugas en Maps."
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
      description: "Fusión completa de la Smart Web móvil y la Landing Page de conversión local con optimización de mapas y canal centralizado.",
      ticketJustification: "Resuelve el caos operativo integral de un solo golpe, ideal para captar tráfico de la zona y automatizar la toma de pedidos.",
      variants: "Beneficio comercial del 75% en complementos y límite de 2 revisiones estéticas gratuitas.",
      featured: true,
      badge: "🔥 Más Recomendado",
      idealFor: "Negocios listos para captar clientes de su zona y cerrar pedidos ágilmente en móvil."
    },
    {
      id: "ecosistema-total",
      level: "Nivel 3",
      name: "Ecosistema Total",
      subtitle: "Comercio Integral & IA",
      img: "/assets/iconografia/ecosistematotal.jpeg",
      fallback: "/assets/iconografia/Full-stack_tech_agency_icon_design_202608271207.jpeg",
      price: "$5,450 MXN",
      model: "Anticipo 40% + Medio 30% + Entrega 30%",
      description: "Sitio web corporativo completo (hasta 5 páginas), correo corporativo, 3 plantillas editables para redes y Middleware de IA embebido en el backend para optimizar desempeño.",
      ticketJustification: "Centraliza la operación para negocios estructurados, combinando un diseño Full-Stack a la medida con IA como cerebro de ejecución.",
      variants: "Requiere activar un plan de iguala obligatoria de mantenimiento por 9 meses (4, 6 u 8 horas mensuales).",
      featured: false,
      badge: "Corporativo + IA",
      idealFor: "Empresas en expansión que requieren presencia corporativa formal y soporte técnico continuo."
    },
    {
      id: "ecommerce-total",
      level: "E-Commerce",
      name: "E-commerce Total con Logística Integrada",
      subtitle: "Arquitectura Transaccional & Envíos",
      img: "/assets/iconografia/Shopping_cart_icon_ui_design_202608271158.jpeg",
      fallback: "/assets/iconografia/Delivery_truck_icon_design_2K_202608271205.jpeg",
      price: "$9,850 MXN",
      model: "Anticipo 40% + Medio 30% + Entrega 30%",
      description: "Catálogo interactivo, tarjetas de producto, carrito con recuperación automática, menú digital QR, pasarela de pagos (incluye Terminal Point Mini de Mercado Pago de regalo) y conexión nativa con APIs de logística (Uber Direct / DiDi para locales; DHL / Estafeta para nacionales).",
      ticketJustification: "Transforma el sitio en una máquina automática de despachos, liberando al dueño de triangular envíos manualmente y transparentando los costos logísticos.",
      variants: "Activa una iguala mensual obligatoria por 9 meses para mantenimiento y seguridad 24/7.",
      featured: false,
      wide: true,
      badge: "Logística Nativa",
      idealFor: "Tiendas y distribuidoras que necesitan automatizar cobros con tarjetas y despacho de paquetería."
    }
  ];

  const consultoria = [
    {
      id: "consultoria-sops",
      name: "Consultoría Estructural (SOPs y Workflows)",
      img: "/assets/iconografia/consultoriaestructural.jpeg",
      price: "A cotizar",
      model: "40% / 30% / 30%",
      description: "Diagnóstico interno, mapeo de procesos y documentación de Procedimientos Operativos Estándar (SOPs) y flujos de trabajo.",
      why: "Permite delegar operaciones documentando el 'saber hacer' de la empresa, evitando fallos operativos al expandir sucursales.",
      tag: "Operaciones & Procesos"
    },
    {
      id: "taller-branding",
      name: "Taller Express Identity Branding & Logotipos",
      img: "/assets/iconografia/identidaddemarca.jpeg",
      price: "$1,850 MXN",
      model: "50% / 50%",
      description: "Sesión formativa, diseño de logotipo, tipografías, paleta de colores y narrativa de marca (Brand Story).",
      why: "El cliente se apropia de su marca y sabe cómo comunicarla para conectar y vender mejor.",
      tag: "Identidad Visual"
    },
    {
      id: "manifiesto-legal",
      name: "Manifiesto de Marca y Auditoría Legal",
      img: "/assets/iconografia/Legal_icon_for_tech_agency_202608271205.jpeg",
      price: "$1,550 MXN",
      model: "50% / 50%",
      description: "Consultoría de identidad discursiva (historia, misión, valores) y reporte de viabilidad legal y disponibilidad de registro.",
      why: "Protege la inversión inicial, evitando gastos catastróficos por operar marcas ya registradas por terceros.",
      tag: "Protección de Marca"
    },
    {
      id: "elevator-pitch",
      name: "Elevator Pitch Estratégico",
      img: "/assets/iconografia/Call_to_action_icon_design_202608271429.jpeg",
      price: "$850 MXN",
      model: "Pago en 1 exhibición",
      description: "Redacción persuasiva para estructurar la propuesta de valor en un guion de ventas maestro (30-60 seg) para bios y WhatsApp.",
      why: "Estandariza la comunicación comercial para que cualquier prospecto entienda el valor del servicio de inmediato.",
      tag: "Guion de Ventas"
    }
  ];

  const complementos = [
    { cat: "Tecnología y Logística", name: "Integración de Envíos Nativos (API Uber/DiDi)", icon: "🛵", img: "/assets/iconografia/Uber_icon_design_for_agency_202608271159.jpeg", price: "$3,500 MXN", pay: "Pago 1 Exhibición" },
    { cat: "Tecnología y Logística", name: "Módulo de Inteligencia Artificial (Backend/Agentes)", icon: "🤖", img: "/assets/iconografia/inteligenciagenerativa.jpg", price: "$4,500 MXN", pay: "Anticipo 50% / 50%" },
    { cat: "Tecnología y Logística", name: "Autenticación rápida (OAuth Google)", icon: "🔑", img: "/assets/iconografia/oauth2.jpg", price: "$950 MXN", pay: "Pago 1 Exhibición" },
    { cat: "Pasarelas de Pago", name: "Stripe, Mercado Pago, Conekta o PayPal", bonus: "🎁 Incluye Terminal Point Mini de Mercado Pago de REGALO", icon: "💳", img: "/assets/iconografia/Stripe_icon_for_tech_agency_202608271205.jpeg", price: "$1,200 MXN", pay: "Pago por Evento" },
    { cat: "Chatbots Inteligentes", name: "WhatsApp Business (Árbol y pedidos)", icon: "💬", img: "/assets/iconografia/WhatsApp_Business_icon_design_2K_202608271203.jpeg", price: "$3,200 MXN", pay: "Pago 1 Exhibición" },
    { cat: "Chatbots Inteligentes", name: "Landing Page (Calificación de leads y Webhooks)", icon: "🎯", img: "/assets/iconografia/leads.jpeg", price: "$2,450 MXN", pay: "Pago 1 Exhibición" },
    { cat: "Chatbots Inteligentes", name: "Telegram (Comandos y catálogos en PDF)", icon: "✈️", img: "/assets/iconografia/Telegram_icon_design_2K_202608271203.jpeg", price: "$1,950 MXN", pay: "Pago 1 Exhibición" },
    { cat: "Chatbots Inteligentes", name: "Smart Web (Widget guiado y FAQs)", icon: "📱", img: "/assets/iconografia/Chatbot.jpeg", price: "$1,450 MXN", pay: "Pago 1 Exhibición" },
    { cat: "Activos Físicos", name: "Tarjeta Inteligente NFC vCard", icon: "🏷️", img: "/assets/iconografia/NFC_vcard_icon_design_2K_202608271203.jpeg", price: "$550 MXN c/u", pay: "Pago 1 Exhibición" },
    { cat: "Activos Físicos", name: "Display Acrílico Inteligente (QR/NFC para mostrador)", icon: "🪧", img: "/assets/iconografia/utileria.jpeg", price: "$350 MXN c/u", pay: "Pago 1 Exhibición" },
    { cat: "Marketing y Visuales", name: "Producción de Comercial en Video (Locación y post)", icon: "🎬", img: "/assets/iconografia/arteconceptual.jpg", price: "$5,500 MXN", pay: "Anticipo 50% / 50%" },
    { cat: "Marketing y Visuales", name: "Levantamiento de Activos (Sesión fotos/video base)", icon: "📸", img: "/assets/iconografia/Corporate_email_interface_design_2K_202608271208.jpeg", price: "$2,500 MXN", pay: "Anticipo 50% / 50%" },
    { cat: "Marketing y Visuales", name: "Setup de Campaña Publicitaria Ads (No incluye pauta)", icon: "📢", img: "/assets/iconografia/medirimpacto.jpeg", price: "$2,500 MXN", pay: "Pago 1 Exhibición" },
    { cat: "Marketing y Visuales", name: "Coherencia Visual para Redes (Auditoría Meta/TikTok)", icon: "✨", img: "/assets/iconografia/identidaddemarca2.jpeg", price: "$1,800 MXN", pay: "Pago 1 Exhibición" },
    { cat: "Marketing y Visuales", name: "Diseño de Carrusel de Marketing (5 Tarjetas)", icon: "📑", img: "/assets/iconografia/orientacioncard.jpg", price: "$650 MXN", pay: "Pago 1 Exhibición" }
  ];

  const filteredComplementos = complementos.filter(item => 
    item.name.toLowerCase().includes(searchComplemento.toLowerCase()) ||
    item.cat.toLowerCase().includes(searchComplemento.toLowerCase())
  );

  // Quick diagnostic recommendations
  const diagnosticOptions = [
    {
      id: "diag-1",
      title: "No tengo presencia digital / Solo vendo por WhatsApp",
      recommendation: "Tarjeta Smart ($950 MXN) o Paquete Híbrido Escala Rápida",
      targetId: "tarjeta-smart",
      targetPkg: "Tarjeta Smart ($950 MXN)"
    },
    {
      id: "diag-2",
      title: "Tengo local físico pero la gente no me encuentra en Google Maps",
      recommendation: "Nivel 2: Tu Negocio en Google ($2,750 MXN)",
      targetId: "negocio-en-google",
      targetPkg: "Tu Negocio en Google ($2,750 MXN)"
    },
    {
      id: "diag-3",
      title: "Quiero vender productos en línea y automatizar envíos locales/nacionales",
      recommendation: "E-commerce Total con Logística Integrada ($9,850 MXN)",
      targetId: "ecommerce-total",
      targetPkg: "E-commerce Total Logística ($9,850 MXN)"
    },
    {
      id: "diag-4",
      title: "Quiero estructurar procesos, capacitar a mi equipo o crear mi marca",
      recommendation: "Consultoría Estructural & Taller Express Branding",
      targetId: "consultoria-sops",
      targetPkg: "Consultoría Estructural (SOPs)"
    }
  ];

  const handleSelectToQuote = (packageName) => {
    navigate(`/?paquete=${encodeURIComponent(packageName)}#contacto`);
  };

  return (
    <div className="bg-negroProfundo text-blancoPuro min-h-screen selection:bg-naranjaEnergy selection:text-white pb-20 sm:pb-12">
      
      {/* Portfolio Access Gate Modal (Filtro Nombre, Correo, Teléfono) */}
      <PortfolioAccessModal
        isOpen={isGateOpen}
        onClose={() => setIsGateOpen(false)}
        targetUrl="/portafolio"
      />

      {/* ================= HEADER DE NAVEGACIÓN ================= */}
      <header className="w-full border-b border-white/10 bg-negroProfundo/95 backdrop-blur-md sticky top-0 z-50 py-3 px-4 sm:px-8">
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
              to="/" 
              className="text-xs bg-midnightPanel hover:bg-negroProfundo text-blancoPuro border border-white/10 px-4 py-2 rounded-medium font-bold transition"
            >
              ← Volver al Inicio
            </Link>
          </div>

        </div>
      </header>

      {/* ================= HERO DE PORTAFOLIO ================= */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 text-center relative border-b border-blancoPuro/5 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-naranjaEnergy/15 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-midnightPanel border border-naranjaEnergy/40 text-naranjaEnergy text-xs font-semibold mb-4 shadow-glowEnergy">
            <span>📦 Catálogo Oficial &bull; Precios Transparentes</span>
          </div>
          
          <h1 className="font-bruno text-3xl sm:text-5xl text-blancoPuro leading-tight mb-4">
            Portafolio de <span className="text-naranjaEnergy">Soluciones Digitales</span>
          </h1>
          
          <p className="font-inter text-sm sm:text-base text-humo max-w-2xl mx-auto mb-8 leading-relaxed">
            “Tecnología instalada. Conocimiento transferido. Negocios escalados.”<br />
            Explora nuestros paquetes llave en mano, consultoría estratégica y servicios a la carta sin letras chiquitas.
          </p>

          {/* ================= ASISTENTE: ¿NO SABES POR DÓNDE EMPEZAR? ================= */}
          <div className="bg-midnightPanel/90 border border-naranjaEnergy/40 rounded-large p-5 sm:p-6 text-left shadow-card max-w-3xl mx-auto backdrop-blur-md">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="text-xl">🧭</span>
              <div>
                <h2 className="font-bruno text-sm sm:text-base text-blancoPuro">
                  ¿No estás seguro por dónde empezar?
                </h2>
                <p className="text-xs text-humo">
                  Selecciona la situación actual de tu negocio y te recomendaremos el paquete ideal:
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-4">
              {diagnosticOptions.map((diag) => (
                <button
                  key={diag.id}
                  onClick={() => {
                    setSelectedDiagnostic(diag);
                    setActiveCategory("todos");
                    const el = document.getElementById(diag.targetId);
                    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                  }}
                  className={`p-3 rounded-medium border text-left text-xs transition-all flex flex-col justify-between ${
                    selectedDiagnostic?.id === diag.id
                      ? "bg-naranjaEnergy/20 border-naranjaEnergy text-blancoPuro font-bold shadow-glowEnergy"
                      : "bg-negroProfundo/80 border-white/10 text-blancoPuro/80 hover:border-naranjaEnergy/60 hover:text-white"
                  }`}
                >
                  <span className="mb-2">{diag.title}</span>
                  <span className="text-[11px] text-naranjaEnergy font-semibold">
                    👉 Ver: {diag.recommendation}
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ================= BARRA DE CATEGORÍAS ================= */}
      <div className="sticky top-[58px] z-40 bg-negroProfundo/90 backdrop-blur-md border-b border-white/10 py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center sm:justify-start gap-2 sm:gap-3 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            onClick={() => setActiveCategory("todos")}
            className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide whitespace-nowrap transition-all ${
              activeCategory === "todos"
                ? "bg-naranjaEnergy text-white shadow-glowEnergy"
                : "bg-midnightPanel text-humo hover:text-blancoPuro border border-white/10"
            }`}
          >
            🌟 Ver Todo el Portafolio
          </button>
          <button
            onClick={() => setActiveCategory("paquetes")}
            className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide whitespace-nowrap transition-all ${
              activeCategory === "paquetes"
                ? "bg-naranjaEnergy text-white shadow-glowEnergy"
                : "bg-midnightPanel text-humo hover:text-blancoPuro border border-white/10"
            }`}
          >
            🚀 Paquetes & Ecosistemas
          </button>
          <button
            onClick={() => setActiveCategory("consultoria")}
            className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide whitespace-nowrap transition-all ${
              activeCategory === "consultoria"
                ? "bg-naranjaEnergy text-white shadow-glowEnergy"
                : "bg-midnightPanel text-humo hover:text-blancoPuro border border-white/10"
            }`}
          >
            🏛️ Consultoría & Branding
          </button>
          <button
            onClick={() => setActiveCategory("complementos")}
            className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide whitespace-nowrap transition-all ${
              activeCategory === "complementos"
                ? "bg-naranjaEnergy text-white shadow-glowEnergy"
                : "bg-midnightPanel text-humo hover:text-blancoPuro border border-white/10"
            }`}
          >
            ⚙️ Complementos (75% OFF)
          </button>
        </div>
      </div>

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
                Incluyen transferencia de conocimiento y constancia de aprendizaje
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
                    {/* Visual Image Render — Ampliado y completo */}
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

                  <button
                    onClick={() => handleSelectToQuote(`${pkg.name} (${pkg.price})`)}
                    className={`w-full py-3.5 px-4 rounded-medium text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                      pkg.featured
                        ? "bg-naranjaEnergy hover:bg-orange-600 text-white shadow-glowEnergy"
                        : "bg-negroProfundo hover:bg-naranjaEnergy hover:text-white text-blancoPuro border border-white/10"
                    }`}
                  >
                    🚀 Cotizar {pkg.name}
                  </button>
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
              <p className="text-xs sm:text-sm text-humo mt-2">
                Estandariza tu operación, blinda tu identidad legal y profesionaliza el discurso de ventas de tu equipo.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {consultoria.map((c) => (
                <div 
                  key={c.id} 
                  id={c.id}
                  className="bg-midnightPanel p-5 rounded-large border border-white/10 hover:border-naranjaEnergy/40 flex flex-col justify-between shadow-card group transition-all"
                >
                  <div>
                    {/* Visual Image Render — Ampliado */}
                    <div className="relative w-full h-52 sm:h-56 rounded-large overflow-hidden mb-4 border border-white/10 bg-negroProfundo p-2 flex items-center justify-center shadow-inner">
                      <img
                        src={c.img}
                        alt={c.name}
                        className="w-full h-full object-contain rounded-medium transform group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                      />
                      <span className="absolute bottom-2 left-2 text-[9px] uppercase font-bold px-2.5 py-1 rounded-full bg-negroProfundo/90 text-naranjaEnergy border border-naranjaEnergy/30 shadow-card">
                        {c.tag}
                      </span>
                    </div>
                    <h3 className="font-bruno text-sm text-blancoPuro mb-1">{c.name}</h3>
                    <p className="text-sm font-bold text-naranjaEnergy mb-0.5">{c.price}</p>
                    <p className="text-[11px] text-humo mb-2">{c.model}</p>
                    <p className="text-xs text-humo leading-relaxed mb-3">{c.description}</p>
                    <p className="text-[11px] text-blancoPuro/80 bg-negroProfundo/50 p-2.5 rounded border border-white/5 mb-4">
                      💡 <strong>Por qué se paga solo:</strong> {c.why}
                    </p>
                  </div>
                  <button
                    onClick={() => handleSelectToQuote(c.name)}
                    className="w-full py-2.5 bg-negroProfundo hover:bg-naranjaEnergy text-blancoPuro hover:text-white border border-white/10 rounded-medium text-xs font-bold transition-all"
                  >
                    Seleccionar y Cotizar
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 3. SECCIÓN: COMPLEMENTOS TECNOLÓGICOS */}
        {(activeCategory === "todos" || activeCategory === "complementos") && (
          <section className="pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-xs font-bold text-naranjaEnergy uppercase tracking-widest">
                  SERVICIOS A LA CARTA &bull; MÓDULOS ESPECÍFICOS
                </span>
                <h2 className="font-bruno text-2xl sm:text-3xl text-blancoPuro mt-1">
                  Menú de Complementos Tecnológicos
                </h2>
              </div>
              <div className="bg-naranjaEnergy/15 border border-naranjaEnergy/40 px-4 py-2.5 rounded-medium text-xs text-naranjaEnergy font-semibold">
                🎁 <strong>75% de descuento preferencial</strong> para clientes que activen cualquier paquete
              </div>
            </div>

            {/* BUSCADOR DE COMPLEMENTOS */}
            <div className="mb-6 max-w-md">
              <input
                type="text"
                value={searchComplemento}
                onChange={(e) => setSearchComplemento(e.target.value)}
                placeholder="🔍 Filtrar por nombre o categoría (ej. WhatsApp, Envíos, Stripe)..."
                className="w-full bg-midnightPanel border border-white/10 rounded-medium px-4 py-2.5 text-xs text-blancoPuro placeholder-humo/60 focus:outline-none focus:border-naranjaEnergy"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-blancoPuro border-collapse bg-midnightPanel rounded-large overflow-hidden border border-white/10">
                <thead className="bg-negroProfundo text-white font-bruno uppercase text-[10px] tracking-wider border-b border-white/10">
                  <tr>
                    <th className="py-3.5 px-4">Categoría</th>
                    <th className="py-3.5 px-4">Complemento / Servicio</th>
                    <th className="py-3.5 px-4">Inversión Regular</th>
                    <th className="py-3.5 px-4">Modelo de Pago</th>
                    <th className="py-3.5 px-4 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredComplementos.map((item, i) => (
                    <tr key={i} className="hover:bg-negroProfundo/50 transition-colors">
                      <td className="py-3 px-4 font-semibold text-naranjaEnergy whitespace-nowrap">
                        <span className="mr-1.5">{item.icon}</span> {item.cat}
                      </td>
                      <td className="py-3 px-4 flex items-center gap-3">
                        {/* Thumbnail ampliado */}
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-medium overflow-hidden border border-white/10 shrink-0 bg-negroProfundo p-1 shadow-card flex items-center justify-center">
                          <img src={item.img} alt={item.name} className="w-full h-full object-contain rounded" />
                        </div>
                        <div>
                          <span className="font-medium text-blancoPuro block">{item.name}</span>
                          {item.bonus && (
                            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded mt-1">
                              {item.bonus}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 font-bruno text-blancoPuro whitespace-nowrap">{item.price}</td>
                      <td className="py-3 px-4 text-humo whitespace-nowrap">{item.pay}</td>
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <button
                          onClick={() => handleSelectToQuote(`Complemento: ${item.name} (${item.price})`)}
                          className="bg-naranjaEnergy/20 hover:bg-naranjaEnergy text-naranjaEnergy hover:text-white px-3 py-1.5 rounded text-xs font-bold transition"
                        >
                          + Cotizar
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredComplementos.length === 0 && (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-humo">
                        No se encontraron complementos con ese término.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* BANNER INFERIOR DE CONVERSIÓN */}
        <div className="mt-20 bg-gradient-to-r from-midnightPanel via-negroProfundo to-midnightPanel p-8 sm:p-12 rounded-large border border-naranjaEnergy/30 text-center shadow-card relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-bruno text-2xl sm:text-3xl text-blancoPuro mb-3">
              ¿Listo para transformar tu negocio?
            </h2>
            <p className="text-humo text-xs sm:text-sm mb-6">
              Recibe un diagnóstico personalizado sin costo y descubre el plan exacto para tu modelo de negocio.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="/#contacto"
                className="w-full sm:w-auto px-8 py-4 bg-naranjaEnergy hover:bg-orange-600 text-white font-bruno text-sm rounded-medium shadow-glowEnergy transition flex items-center justify-center gap-2"
              >
                <span>🚀 Iniciar Diagnóstico de Fugas Operativas</span>
                <span>→</span>
              </a>
              <Link
                to="/"
                className="w-full sm:w-auto px-6 py-4 bg-negroProfundo hover:bg-midnightPanel text-blancoPuro border border-white/10 rounded-medium text-xs font-bold transition"
              >
                ← Volver al Inicio
              </Link>
            </div>
          </div>
        </div>

      </main>

    </div>
  );
}
