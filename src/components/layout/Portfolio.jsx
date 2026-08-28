import React from "react";

export default function Portfolio({ onSelectPackage }) {
  const packages = [
    {
      level: "Nivel 1",
      name: "Tarjeta Smart",
      subtitle: "El Gancho — Mobile First",
      img: "/assets/iconografia/Smart_web_icon_design_2K_202608271207.jpeg",
      fallback: "/assets/iconografia/tarjeta muestra.jpg",
      price: "$950 MXN",
      model: "Pago único en 1 exhibición",
      description: "\"Smart Web\" vertical (tipo Bio Link) optimizada mobile-first. Incluye cabecera, acciones rápidas en la zona de pulgar, enlaces destacados y bloque interactivo ligero.",
      ticketJustification: "Herramienta táctica de bajo costo para captar ventas inmediatas y evitar que el negocio pierda clientes por falta de un canal digital rápido.",
      variants: "Incluye un máximo de 2 revisiones estéticas sin costo.",
      featured: false
    },
    {
      level: "Nivel 2",
      name: "Tu Negocio en Google",
      subtitle: "Conversión Local & Maps",
      img: "/assets/iconografia/Design_business_logo_for_maps_202608270910.jpeg",
      fallback: "/assets/iconografia/ubicacion google.jpg",
      price: "$2,750 MXN",
      model: "Anticipo 50% y 50% a la entrega",
      description: "Landing Page de sección larga orientada a la conversión y rescate geográfico. Incluye alta, optimización SEO y depuración en Google Maps, unificación de horarios y automatización de WhatsApp Business.",
      ticketJustification: "Detiene las fugas de dinero causadas por clientes que van a direcciones incorrectas, ven horarios falsos o terminan comprando a la competencia.",
      variants: "Incluye 2 revisiones sin costo adicional.",
      featured: false
    },
    {
      level: "Híbrido N1+N2",
      name: "Escala Rápida",
      subtitle: "Smart Web + Conversión Local",
      img: "/assets/iconografia/red de crecimiento.jpg",
      fallback: "/assets/iconografia/innovacion.jpg",
      price: "$3,700 MXN",
      model: "Anticipo 50% y 50% a la entrega",
      description: "Fusión completa de la Smart Web móvil y la Landing Page de conversión local con optimización de mapas.",
      ticketJustification: "Resuelve el caos operativo integral de un solo golpe, ideal para captar tráfico de la zona y automatizar la toma de pedidos.",
      variants: "Beneficio comercial del 75% en complementos y límite de 2 revisiones estéticas gratuitas.",
      featured: true
    },
    {
      level: "Nivel 3",
      name: "Ecosistema Total",
      subtitle: "Comercio Integral & IA",
      img: "/assets/iconografia/ecosistema total.jpg",
      fallback: "/assets/iconografia/Full-stack_tech_agency_icon_design_202608271207.jpeg",
      price: "$5,450 MXN",
      model: "Anticipo 40% + Medio 30% + Entrega 30%",
      description: "Sitio web corporativo completo (hasta 5 páginas), correo corporativo, 3 plantillas editables para redes y Middleware de IA embebido en el backend para optimizar desempeño.",
      ticketJustification: "Centraliza la operación para negocios estructurados, combinando un diseño Full-Stack a la medida con IA como cerebro de ejecución.",
      variants: "Requiere activar un plan de iguala obligatoria de mantenimiento por 9 meses (4, 6 u 8 horas mensuales).",
      featured: false
    },
    {
      level: "E-Commerce",
      name: "E-commerce Total con Logística Integrada",
      subtitle: "Arquitectura Transaccional & Envíos",
      img: "/assets/iconografia/Shopping_cart_icon_ui_design_202608271158.jpeg",
      fallback: "/assets/iconografia/Delivery_truck_icon_design_2K_202608271205.jpeg",
      price: "$9,850 MXN",
      model: "Anticipo 40% + Medio 30% + Entrega 30%",
      description: "Catálogo interactivo, tarjetas de producto, carrito con recuperación automática, menú digital QR, pasarela de pagos y conexión nativa con APIs de logística (Uber Direct / DiDi para locales; DHL / Estafeta para nacionales).",
      ticketJustification: "Transforma el sitio en una máquina automática de despachos, liberando al dueño de triangular envíos manualmente y transparentando los costos logísticos.",
      variants: "Activa una iguala mensual obligatoria por 9 meses para mantenimiento y seguridad 24/7.",
      featured: false,
      wide: true
    }
  ];

  const consultoria = [
    {
      name: "Consultoría Estructural (SOPs y Workflows)",
      img: "/assets/iconografia/consultoria estructural.jpg",
      price: "A cotizar",
      model: "40% / 30% / 30%",
      description: "Diagnóstico interno, mapeo de procesos y documentación de Procedimientos Operativos Estándar (SOPs) y flujos de trabajo.",
      why: "Permite delegar operaciones documentando el 'saber hacer' de la empresa, evitando fallos operativos al expandir sucursales."
    },
    {
      name: "Taller Express Identity Branding & Logotipos",
      img: "/assets/iconografia/identidad de marca.jpg",
      price: "$1,850 MXN",
      model: "50% / 50%",
      description: "Sesión formativa, diseño de logotipo, tipografías, paleta de colores y narrativa de marca (Brand Story).",
      why: "El cliente se apropia de su marca y sabe cómo comunicarla para conectar y vender mejor."
    },
    {
      name: "Manifiesto de Marca y Auditoría Legal",
      img: "/assets/iconografia/Legal_icon_for_tech_agency_202608271205.jpeg",
      price: "$1,550 MXN",
      model: "50% / 50%",
      description: "Consultoría de identidad discursiva (historia, misión, valores) y reporte de viabilidad legal y disponibilidad de registro.",
      why: "Protege la inversión inicial, evitando gastos catastróficos por operar marcas ya registradas por terceros."
    },
    {
      name: "Elevator Pitch Estratégico",
      img: "/assets/iconografia/Call_to_action_icon_design_202608271429.jpeg",
      price: "$850 MXN",
      model: "Pago en 1 exhibición",
      description: "Redacción persuasiva para estructurar la propuesta de valor en un guion de ventas maestro (30-60 seg) para bios y WhatsApp.",
      why: "Estandariza la comunicación comercial para que cualquier prospecto entienda el valor del servicio de inmediato."
    }
  ];

  const complementos = [
    { cat: "Tecnología y Logística", name: "Integración de Envíos Nativos (API Uber/DiDi)", icon: "🛵", img: "/assets/iconografia/Uber_icon_design_for_agency_202608271159.jpeg", price: "$3,500 MXN", pay: "Pago 1 Exhibición" },
    { cat: "Tecnología y Logística", name: "Módulo de Inteligencia Artificial (Backend/Agentes)", icon: "🤖", img: "/assets/iconografia/inteligencia generativa.jpg", price: "$4,500 MXN", pay: "Anticipo 50% / 50%" },
    { cat: "Tecnología y Logística", name: "Autenticación rápida (OAuth Google)", icon: "🔑", img: "/assets/iconografia/oauth2.jpg", price: "$950 MXN", pay: "Pago 1 Exhibición" },
    { cat: "Pasarelas de Pago", name: "Stripe, Mercado Pago, Conekta o PayPal", icon: "💳", img: "/assets/iconografia/Stripe_icon_for_tech_agency_202608271205.jpeg", price: "$1,200 MXN", pay: "Pago por Evento" },
    { cat: "Chatbots Inteligentes", name: "WhatsApp Business (Árbol y pedidos)", icon: "💬", img: "/assets/iconografia/WhatsApp_Business_icon_design_2K_202608271203.jpeg", price: "$3,200 MXN", pay: "Pago 1 Exhibición" },
    { cat: "Chatbots Inteligentes", name: "Landing Page (Calificación de leads y Webhooks)", icon: "🎯", img: "/assets/iconografia/leads.jpg", price: "$2,450 MXN", pay: "Pago 1 Exhibición" },
    { cat: "Chatbots Inteligentes", name: "Telegram (Comandos y catálogos en PDF)", icon: "✈️", img: "/assets/iconografia/Telegram_icon_design_2K_202608271203.jpeg", price: "$1,950 MXN", pay: "Pago 1 Exhibición" },
    { cat: "Chatbots Inteligentes", name: "Smart Web (Widget guiado y FAQs)", icon: "📱", img: "/assets/iconografia/Chatbot.jpg", price: "$1,450 MXN", pay: "Pago 1 Exhibición" },
    { cat: "Activos Físicos", name: "Tarjeta Inteligente NFC vCard", icon: "🏷️", img: "/assets/iconografia/NFC_vcard_icon_design_2K_202608271203.jpeg", price: "$550 MXN c/u", pay: "Pago 1 Exhibición" },
    { cat: "Activos Físicos", name: "Display Acrílico Inteligente (QR/NFC para mostrador)", icon: "🪧", img: "/assets/iconografia/utileria.jpg", price: "$350 MXN c/u", pay: "Pago 1 Exhibición" },
    { cat: "Marketing y Visuales", name: "Producción de Comercial en Video (Locación y post)", icon: "🎬", img: "/assets/iconografia/arte conceptual.jpg", price: "$5,500 MXN", pay: "Anticipo 50% / 50%" },
    { cat: "Marketing y Visuales", name: "Levantamiento de Activos (Sesión fotos/video base)", icon: "📸", img: "/assets/iconografia/Corporate_email_interface_design_2K_202608271208.jpeg", price: "$2,500 MXN", pay: "Anticipo 50% / 50%" },
    { cat: "Marketing y Visuales", name: "Setup de Campaña Publicitaria Ads (No incluye pauta)", icon: "📢", img: "/assets/iconografia/medir impacto.jpg", price: "$2,500 MXN", pay: "Pago 1 Exhibición" },
    { cat: "Marketing y Visuales", name: "Coherencia Visual para Redes (Auditoría Meta/TikTok)", icon: "✨", img: "/assets/iconografia/identidad de marca2.jpg", price: "$1,800 MXN", pay: "Pago 1 Exhibición" },
    { cat: "Marketing y Visuales", name: "Diseño de Carrusel de Marketing (5 Tarjetas)", icon: "📑", img: "/assets/iconografia/orientacion card.jpg", price: "$650 MXN", pay: "Pago 1 Exhibición" }
  ];

  const handleSelect = (packageName) => {
    if (onSelectPackage) {
      onSelectPackage(packageName);
    }
    const el = document.getElementById("contacto");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="portafolio" className="py-20 bg-negroProfundo border-b border-blancoPuro/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* ENCABEZADO PORTAFOLIO */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-naranjaEnergy uppercase tracking-widest">
            PORTAFOLIO COMERCIAL &bull; TSOLUTIONS IPIDD
          </span>
          <h2 className="font-bruno text-3xl sm:text-4xl text-blancoPuro mt-2">
            Ecosistemas Digitales & Paquetes
          </h2>
          <p className="text-humo text-sm sm:text-base mt-3">
            “Tecnología instalada. Conocimiento transferido. Negocios escalados.”
          </p>
        </div>

        {/* GRID DE PAQUETES PRINCIPALES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {packages.map((pkg, i) => (
            <div
              key={i}
              className={`bg-midnightPanel rounded-large p-6 sm:p-7 flex flex-col justify-between border transition-all duration-300 shadow-card group ${
                pkg.featured
                  ? "border-2 border-naranjaEnergy relative shadow-glowEnergy"
                  : "border-white/10 hover:border-naranjaEnergy/50"
              } ${pkg.wide ? "md:col-span-2 lg:col-span-2" : ""}`}
            >
              {pkg.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-naranjaEnergy text-white text-[11px] font-bold uppercase px-4 py-1 rounded-full shadow-glowEnergy z-10">
                  🔥 Más Recomendado
                </div>
              )}

              <div>
                {/* Visual Image Render */}
                <div className="relative w-full h-44 rounded-medium overflow-hidden mb-5 border border-white/10 bg-negroProfundo flex items-center justify-center">
                  <img
                    src={pkg.img}
                    onError={(e) => { e.target.src = pkg.fallback; }}
                    alt={pkg.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnightPanel via-transparent to-transparent"></div>
                  <span className="absolute top-2 right-2 text-[10px] uppercase font-bold px-2.5 py-1 rounded bg-negroProfundo/90 text-naranjaEnergy border border-naranjaEnergy/40 backdrop-blur-sm">
                    {pkg.level}
                  </span>
                </div>

                <h3 className="font-bruno text-xl text-blancoPuro">{pkg.name}</h3>
                <p className="text-xs text-naranjaEnergy font-semibold mb-3">{pkg.subtitle}</p>

                <div className="mb-4">
                  <span className="text-3xl font-bruno text-blancoPuro">{pkg.price}</span>
                  <p className="text-xs text-humo mt-0.5">{pkg.model}</p>
                </div>

                <p className="text-xs text-humo leading-relaxed mb-4">
                  {pkg.description}
                </p>

                <div className="bg-negroProfundo/70 p-3 rounded-medium border border-white/5 mb-4 text-[11px] text-blancoPuro/80">
                  <span className="text-naranjaEnergy font-bold block mb-0.5">💡 Justificación de Ticket:</span>
                  {pkg.ticketJustification}
                </div>

                <p className="text-[11px] text-humo/80 mb-6 italic">
                  * {pkg.variants}
                </p>
              </div>

              <button
                onClick={() => handleSelect(`${pkg.name} (${pkg.price})`)}
                className={`w-full py-3.5 px-4 rounded-medium text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  pkg.featured
                    ? "bg-naranjaEnergy hover:bg-orange-600 text-white shadow-glowEnergy"
                    : "bg-negroProfundo hover:bg-naranjaEnergy hover:text-white text-blancoPuro border border-white/10"
                }`}
              >
                Adquirir {pkg.name}
              </button>
            </div>
          ))}
        </div>

        {/* CONSULTORÍA ESTRATÉGICA Y BRANDING */}
        <div className="pt-12 border-t border-white/10 mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-naranjaEnergy uppercase tracking-widest">
              Metodología & Identidad
            </span>
            <h3 className="font-bruno text-2xl text-blancoPuro mt-1">
              🏛️ Consultoría Estratégica y Branding
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {consultoria.map((c, i) => (
              <div key={i} className="bg-midnightPanel p-5 rounded-large border border-white/10 flex flex-col justify-between shadow-card group">
                <div>
                  <div className="relative w-full h-32 rounded-medium overflow-hidden mb-3 border border-white/10 bg-negroProfundo">
                    <img
                      src={c.img}
                      alt={c.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300 opacity-80 group-hover:opacity-100"
                    />
                  </div>
                  <h4 className="font-bruno text-sm text-blancoPuro mb-1">{c.name}</h4>
                  <p className="text-xs font-bold text-naranjaEnergy mb-0.5">{c.price}</p>
                  <p className="text-[11px] text-humo mb-2">{c.model}</p>
                  <p className="text-xs text-humo leading-relaxed mb-3">{c.description}</p>
                  <p className="text-[11px] text-blancoPuro/70 italic mb-4">💡 {c.why}</p>
                </div>
                <button
                  onClick={() => handleSelect(c.name)}
                  className="w-full py-2.5 bg-negroProfundo hover:bg-naranjaEnergy text-blancoPuro hover:text-white border border-white/10 rounded-medium text-xs font-bold transition-all"
                >
                  Seleccionar
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* MENÚ DE COMPLEMENTOS CON 75% OFF */}
        <div className="pt-12 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold text-naranjaEnergy uppercase tracking-widest">
                ⚙️ A la Carta
              </span>
              <h3 className="font-bruno text-2xl text-blancoPuro mt-1">
                Menú de Complementos Tecnológicos
              </h3>
            </div>
            <div className="bg-naranjaEnergy/15 border border-naranjaEnergy/40 px-4 py-2 rounded-medium text-xs text-naranjaEnergy font-semibold">
              🎁 <strong>75% de descuento preferencial</strong> para clientes del ecosistema
            </div>
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
                {complementos.map((item, i) => (
                  <tr key={i} className="hover:bg-negroProfundo/50 transition-colors">
                    <td className="py-3 px-4 font-semibold text-naranjaEnergy">
                      <span className="mr-1.5">{item.icon}</span> {item.cat}
                    </td>
                    <td className="py-3 px-4 flex items-center gap-2">
                      <div className="w-8 h-8 rounded overflow-hidden border border-white/10 shrink-0 bg-negroProfundo">
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <span>{item.name}</span>
                    </td>
                    <td className="py-3 px-4 font-bruno text-blancoPuro">{item.price}</td>
                    <td className="py-3 px-4 text-humo">{item.pay}</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleSelect(`Complemento: ${item.name} (${item.price})`)}
                        className="text-naranjaEnergy hover:underline font-bold text-xs"
                      >
                        + Agregar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
