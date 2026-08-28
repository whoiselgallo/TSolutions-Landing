import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export default function EbooksPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const clientName = searchParams.get("nombre") || "";
  const isCitaConfirmada = searchParams.get("cita") === "confirmada";

  const [downloadingEbook, setDownloadingEbook] = useState(null);
  const [activeModalEbook, setActiveModalEbook] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const ebooks = [
    {
      id: "branding",
      category: "Branding & Identidad",
      icon: "🎨",
      tag: "Volumen 1",
      title: "Arquitectura de Marca: Cómo Construir una Identidad que Venda Sin Rogar Descuentos",
      subtitle: "Manual estratégico para pasar de un negocio genérico a una marca con narrativa, autoridad y blindaje legal.",
      img: "/assets/iconografia/identidaddemarca.jpeg",
      fallback: "/assets/iconografia/identidaddemarca2.jpeg",
      pages: "36 Páginas",
      format: "PDF Interactivo",
      chapters: [
        "1. El Síndrome del Negocio Invisible: Por qué un logo bonito no basta.",
        "2. Narrativa de Marca (Brand Story) y el Elevator Pitch Maestro en 30 segundos.",
        "3. Coherencia Visual, Tipografía y Paleta de Colores que Transmiten Confianza.",
        "4. Auditoría Legal: Cómo Proteger tu Marca ante el IMPI antes de que te la roben."
      ],
      description: "Descubre cómo las marcas líderes cobran 3 veces más que su competencia gracias a una identidad impecable y una narrativa que conecta con la psicología del comprador."
    },
    {
      id: "digitalizacion",
      category: "Operaciones & Andragogía",
      icon: "🚀",
      tag: "Volumen 2",
      title: "El Manual Anticaos: Erradica el Desorden en Google Maps, WhatsApp y Pedidos Manuales",
      subtitle: "Guía definitiva para PYMES: Cómo erradicar la resistencia al cambio y capacitar a tu equipo con principios andragógicos.",
      img: "/assets/iconografia/Kaizen_tech_icon_design_2K_202608271201.jpeg",
      fallback: "/assets/iconografia/Developer_icon_design_for_agency_202608271202.jpeg",
      pages: "42 Páginas",
      format: "PDF Interactivo",
      chapters: [
        "1. El Rescate Geográfico: Cómo dejar de perder clientes en Google Maps y SEO Local.",
        "2. Del Caos de Audios al Cierre Automatizado en WhatsApp Business.",
        "3. Los 3 Dominios Andragógicos: Erradicar la resistencia al cambio en tu personal.",
        "4. Procedimientos Operativos Estándar (SOPs): Que el negocio funcione sin ti."
      ],
      description: "Aprende la metodología exacta de TSolutions IPIDD para erradicar cuellos de botella y lograr que tus empleados operen la tecnología con soltura e independencia."
    },
    {
      id: "ecommerce",
      category: "E-Commerce & Logística",
      icon: "📦",
      tag: "Volumen 3",
      title: "De Mostrador Local a Máquina de Despachos: Automatización de Envíos con Uber Direct y Pasarelas de Cobro",
      subtitle: "La guía paso a paso para vender por internet sin triangular repartidores a mano ni pagar comisiones abusivas.",
      img: "/assets/iconografia/Shopping_cart_icon_ui_design_202608271158.jpeg",
      fallback: "/assets/iconografia/Delivery_truck_icon_design_2K_202608271205.jpeg",
      pages: "48 Páginas",
      format: "PDF Interactivo",
      chapters: [
        "1. La Muerte del Carrito Tradicional: Experiencias de Compra Mobile-First en Zona de Pulgar.",
        "2. Logística Nativa: Conexión con APIs de Uber Direct, DiDi y DHL para despachos en 3 clics.",
        "3. Pasarelas de Pago Seguras (Stripe, Mercado Pago) y el uso de la Terminal Point Mini.",
        "4. Recuperación de Carritos y Fidelización de Clientes Automatizada."
      ],
      description: "Conoce los secretos para convertir tu sitio web en una central logística automatizada que despacha pedidos locales en minutos y cobros con tarjeta blindados."
    }
  ];

  // Función de Descarga y Redirección a la Página de Agradecimiento
  const handleDownloadAndRedirect = (ebook) => {
    setDownloadingEbook(ebook.id);

    // Guardar ebook descargado en localStorage
    try {
      localStorage.setItem("tsolutions_downloaded_ebook", JSON.stringify(ebook));
    } catch (e) {}

    // Simular descarga de archivo (o crear blob descargable)
    const element = document.createElement("a");
    const fileContent = `====================================================\nTSOLUTIONS IPIDD - BIBLIOTECA DIGITAL DE ESTRATEGIA\n====================================================\n\nTÍTULO: ${ebook.title}\nCATEGORÍA: ${ebook.category}\nFORMATO: ${ebook.format} - ${ebook.pages}\n\nRESUMEN:\n${ebook.description}\n\nÍNDICE DE CAPÍTULOS:\n${ebook.chapters.join("\n")}\n\n====================================================\n"Tecnología instalada. Conocimiento transferido. Negocios escalados."\nContacto: contacto@tsolutionsipidd.com | www.tsolutionsipidd.com\n====================================================`;
    const file = new Blob([fileContent], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = `TSolutions_${ebook.id.toUpperCase()}_Ebook.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    // Redirigir inmediatamente a la página de agradecimiento oficial
    setTimeout(() => {
      navigate(`/gracias?ebook=${ebook.id}&nombre=${encodeURIComponent(clientName)}`);
    }, 600);
  };

  return (
    <div className="bg-negroProfundo text-blancoPuro min-h-screen selection:bg-naranjaEnergy selection:text-white pb-20 sm:pb-12">
      
      {/* ================= HEADER ================= */}
      <header className="w-full border-b border-white/10 bg-negroProfundo/95 backdrop-blur-md sticky top-0 z-50 py-3 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
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
                TSOLUTIONS <span className="text-naranjaEnergy text-xs font-sans font-bold px-1.5 py-0.5 rounded bg-naranjaEnergy/10 border border-naranjaEnergy/30">E-BOOKS</span>
              </div>
              <p className="text-[10px] text-humo tracking-widest hidden sm:block">
                BIBLIOTECA OFICIAL &bull; DESCARGA GRATUITA
              </p>
            </div>
          </Link>

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

      {/* ================= HERO DE E-BOOKS ================= */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 text-center relative border-b border-blancoPuro/5 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-naranjaEnergy/15 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          
          {isCitaConfirmada && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold mb-4 shadow-card">
              <span>✓ ¡Tu cita de Entrega de Resultados ha quedado reservada!</span>
            </div>
          )}

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-midnightPanel border border-naranjaEnergy/40 text-naranjaEnergy text-xs font-semibold mb-4 shadow-glowEnergy block sm:inline-block">
            <span>🎁 Recursos Estratégicos &bull; 100% Gratuitos</span>
          </div>

          <h1 className="font-bruno text-3xl sm:text-5xl text-blancoPuro leading-tight mb-4">
            Biblioteca Digital de <span className="text-naranjaEnergy">E-books Estratégicos</span>
          </h1>

          <p className="font-inter text-sm sm:text-base text-humo max-w-2xl mx-auto leading-relaxed mb-6">
            Descarga nuestros 3 manuales maestros sobre <strong>Branding</strong>, <strong>Digitalización Anticaos</strong> y <strong>E-commerce con Logística Automatizada</strong>. Conocimiento práctico para acelerar la transformación de tu empresa.
          </p>
        </div>
      </section>

      {/* ================= CATÁLOGO DE LOS 3 E-BOOKS ================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {ebooks.map((ebook) => (
            <div 
              key={ebook.id}
              className="bg-midnightPanel rounded-large border border-white/10 hover:border-naranjaEnergy/50 transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between shadow-card group"
            >
              <div>
                {/* Portada / Render 3D */}
                <div className="relative w-full h-64 sm:h-72 rounded-large overflow-hidden mb-6 border border-white/10 bg-negroProfundo p-2 flex items-center justify-center shadow-inner group-hover:border-naranjaEnergy/40 transition-colors">
                  <img
                    src={ebook.img}
                    onError={(e) => { e.target.src = ebook.fallback; }}
                    alt={ebook.title}
                    className="w-full h-full object-contain rounded-medium transform group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
                  />
                  <span className="absolute top-3 left-3 text-[10px] font-bold uppercase px-3 py-1 rounded-full bg-naranjaEnergy text-white shadow-glowEnergy">
                    {ebook.tag}
                  </span>
                  <span className="absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-negroProfundo/90 text-emerald-300 border border-emerald-500/40">
                    GRATIS
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-naranjaEnergy font-bold mb-2">
                  <span>{ebook.icon}</span>
                  <span>{ebook.category}</span>
                  <span className="text-humo text-[11px]">&bull; {ebook.pages}</span>
                </div>

                <h2 className="font-bruno text-lg sm:text-xl text-blancoPuro mb-2 leading-snug">
                  {ebook.title}
                </h2>

                <p className="text-xs text-humo leading-relaxed mb-4">
                  {ebook.subtitle}
                </p>

                {/* ÍNDICE DESTACADO */}
                <div className="bg-negroProfundo/70 p-3.5 rounded-medium border border-white/5 mb-6 text-[11px] space-y-1.5">
                  <strong className="text-blancoPuro block text-xs font-semibold mb-1">
                    📖 Contenido Principal:
                  </strong>
                  {ebook.chapters.map((ch, i) => (
                    <p key={i} className="text-humo/90 leading-tight">
                      &bull; {ch}
                    </p>
                  ))}
                </div>
              </div>

              {/* BOTONES DE ACCIÓN */}
              <div className="space-y-2.5 pt-4 border-t border-white/5">
                <button
                  onClick={() => handleDownloadAndRedirect(ebook)}
                  disabled={downloadingEbook === ebook.id}
                  className="w-full py-3.5 px-4 bg-naranjaEnergy hover:bg-orange-600 text-white font-bruno text-xs sm:text-sm rounded-medium shadow-glowEnergy hover:shadow-glowEnergyHover transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                >
                  <span>{downloadingEbook === ebook.id ? "Descargando..." : "📥 Descargar E-book Gratis"}</span>
                  <span>→</span>
                </button>
                <p className="text-[10px] text-center text-humo">
                  Descarga instantánea + acceso a la comunidad TSolutions
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* BANNER FINAL */}
        <div className="mt-16 bg-gradient-to-r from-midnightPanel via-negroProfundo to-midnightPanel p-8 sm:p-10 rounded-large border border-naranjaEnergy/30 text-center shadow-card">
          <h3 className="font-bruno text-xl sm:text-2xl text-blancoPuro mb-2">
            ¿Aún no agendas tu sesión 1 a 1 de entrega de resultados?
          </h3>
          <p className="text-humo text-xs sm:text-sm max-w-xl mx-auto mb-6">
            Aprovecha tus 20 minutos con el Estratega Tecnológico para revisar tus dudas sobre estos e-books y trazar tu plan de acción.
          </p>
          <Link
            to="/agenda"
            className="inline-flex items-center gap-2 bg-blancoPuro hover:bg-blancoPerla text-negroProfundo font-bruno text-xs sm:text-sm px-6 py-3.5 rounded-medium transition-all shadow-card"
          >
            <span>📅 Ir a la Agenda de Citas</span>
            <span>→</span>
          </Link>
        </div>

      </main>

    </div>
  );
}
