import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export default function DigitalDiagnostic() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Datos de contacto previos (si vienen de la Landing)
  const [name, setName] = useState(searchParams.get("nombre") || "");
  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [phone, setPhone] = useState(searchParams.get("telefono") || searchParams.get("phone") || "");
  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry] = useState("Comercio / Tienda Local");
  const [selectedPkg, setSelectedPkg] = useState(searchParams.get("paquete") || "Diagnóstico Gratuito / No sé por dónde empezar");

  // Preguntas de Madurez Operativa & Digital
  const [mapsStatus, setMapsStatus] = useState("Desactualizado o con dirección errónea");
  const [webPresence, setWebPresence] = useState("Solo redes sociales (Facebook / Instagram)");
  const [ordersFlow, setOrdersFlow] = useState("WhatsApp manual (audios, fotos y notas)");
  const [responseFriction, setResponseFriction] = useState("Sí, perdemos ventas por no responder al instante");
  const [paymentMethods, setPaymentMethods] = useState("Solo efectivo y transferencias manuales");
  const [shippingMethod, setShippingMethod] = useState("Triangulación manual por mensajes con repartidores");
  const [teamTraining, setTeamTraining] = useState("Falta de capacitación y resistencia al cambio");
  const [sopsStatus, setSopsStatus] = useState("No documentado (todo está en la cabeza del dueño/equipo)");
  const [mainObstacle, setMainObstacle] = useState("");

  const [status, setStatus] = useState("idle"); // idle | loading | error
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone) {
      setStatus("error");
      setErrorMsg("Por favor, completa tus datos de contacto.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    const diagnosticPayload = {
      name,
      email,
      phone,
      businessName,
      industry,
      selectedPkg,
      evaluation: {
        mapsStatus,
        webPresence,
        ordersFlow,
        responseFriction,
        paymentMethods,
        shippingMethod,
        teamTraining,
        sopsStatus,
        mainObstacle,
      },
      recipientEmail: "contacto@tsolutionsipidd.com",
      createdAt: new Date().toISOString()
    };

    try {
      // 1. Guardar en Base de datos y enviar notificación por email corporativo
      await fetch("/api/diagnostic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(diagnosticPayload),
      }).catch(() => {});

      // 2. Guardar también en fallback de contacto
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          package: selectedPkg,
          message: `[DIAGNÓSTICO DIGITAL] Empresa: ${businessName || "N/A"} (${industry}). Maps: ${mapsStatus}. Pedidos: ${ordersFlow}. Fricción: ${mainObstacle || "N/A"}. Envíos: ${shippingMethod}.`,
        }),
      }).catch(() => {});

      // 3. Calcular score preliminar
      let calculatedScore = 65;
      if (mapsStatus.includes("verificada") || mapsStatus.includes("actualizada")) calculatedScore += 10;
      if (paymentMethods.includes("Terminal") || paymentMethods.includes("digitales")) calculatedScore += 10;
      if (ordersFlow.includes("catálogo") || ordersFlow.includes("sistema")) calculatedScore += 10;
      diagnosticPayload.calculatedScore = calculatedScore;

      // Guardar en localStorage para análisis en vivo de RUA y resultados
      localStorage.setItem("tsolutions_latest_diagnostic", JSON.stringify(diagnosticPayload));

      // 4. Redirigir a la página de resultados interactivos
      navigate(`/diagnostico-resultados?nombre=${encodeURIComponent(name)}&score=${calculatedScore}`);

    } catch (err) {
      localStorage.setItem("tsolutions_latest_diagnostic", JSON.stringify(diagnosticPayload));
      navigate(`/diagnostico-resultados?nombre=${encodeURIComponent(name)}`);
    }
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
                TSOLUTIONS <span className="text-naranjaEnergy text-xs font-sans font-bold px-1.5 py-0.5 rounded bg-naranjaEnergy/10 border border-naranjaEnergy/30">DIAGNÓSTICO</span>
              </div>
              <p className="text-[10px] text-humo tracking-widest hidden sm:block">
                EVALUACIÓN DE MADUREZ DIGITAL & FUGAS OPERATIVAS
              </p>
            </div>
          </Link>

          <Link 
            to="/" 
            className="text-xs bg-midnightPanel hover:bg-negroProfundo text-blancoPuro border border-white/10 px-4 py-2 rounded-medium font-bold transition"
          >
            ← Volver al Inicio
          </Link>
        </div>
      </header>

      {/* ================= HERO DEL FORMULARIO ================= */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 text-center relative border-b border-blancoPuro/5 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-naranjaEnergy/15 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-midnightPanel border border-naranjaEnergy/40 text-naranjaEnergy text-xs font-semibold mb-4 shadow-glowEnergy">
            <span>🧠 Auditoría Estratégica &bull; Conectada con RUA Agent</span>
          </div>

          <h1 className="font-bruno text-3xl sm:text-4xl text-blancoPuro leading-tight mb-4">
            Diagnóstico de <span className="text-naranjaEnergy">Madurez Digital</span>
          </h1>

          <p className="font-inter text-sm sm:text-base text-humo leading-relaxed mb-4">
            Responde estas preguntas clave (toma menos de 2 minutos). Nuestro motor de evaluación y equipo de consultores detectarán tus puntos ciegos y generarán tu reporte personalizado.
          </p>

          <div className="inline-flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1.5 rounded-full">
            <span>🔒 Las respuestas se guardan en base de datos y se notifican a contacto@tsolutionsipidd.com</span>
          </div>
        </div>
      </section>

      {/* ================= FORMULARIO COMPLETO ================= */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {errorMsg && (
            <div className="p-4 rounded-medium bg-rose-500/20 border border-rose-500/40 text-rose-300 text-sm font-semibold text-center">
              ✕ {errorMsg}
            </div>
          )}

          {/* 1. SECCIÓN: DATOS DE CONTACTO Y NEGOCIO */}
          <div className="bg-midnightPanel p-6 sm:p-8 rounded-large border border-white/10 shadow-card space-y-5">
            <div className="border-b border-white/10 pb-3">
              <span className="text-xs font-bold text-naranjaEnergy uppercase tracking-widest">
                PASO 1 DE 4
              </span>
              <h2 className="font-bruno text-lg text-blancoPuro">
                👤 Datos Generales del Negocio
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-blancoPuro uppercase tracking-wider mb-2">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej. Carlos Mendoza"
                  className="w-full bg-negroProfundo border border-white/10 rounded-medium px-4 py-3 text-sm text-blancoPuro placeholder-humo/60 focus:outline-none focus:border-naranjaEnergy"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-blancoPuro uppercase tracking-wider mb-2">
                  Nombre de tu Empresa / Negocio
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Ej. Refaccionaria Mendoza"
                  className="w-full bg-negroProfundo border border-white/10 rounded-medium px-4 py-3 text-sm text-blancoPuro placeholder-humo/60 focus:outline-none focus:border-naranjaEnergy"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-blancoPuro uppercase tracking-wider mb-2">
                  Correo Electrónico *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="carlos@negocio.com"
                  className="w-full bg-negroProfundo border border-white/10 rounded-medium px-4 py-3 text-sm text-blancoPuro placeholder-humo/60 focus:outline-none focus:border-naranjaEnergy"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-blancoPuro uppercase tracking-wider mb-2">
                  Teléfono / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+52 55 1234 5678"
                  className="w-full bg-negroProfundo border border-white/10 rounded-medium px-4 py-3 text-sm text-blancoPuro placeholder-humo/60 focus:outline-none focus:border-naranjaEnergy"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-blancoPuro uppercase tracking-wider mb-2">
                  Giro o Industria
                </label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full bg-negroProfundo border border-white/10 rounded-medium px-4 py-3 text-sm text-blancoPuro focus:outline-none focus:border-naranjaEnergy"
                >
                  <option value="Comercio / Tienda Local">Comercio / Tienda Local</option>
                  <option value="Ferretería / Taller / Refacciones">Ferretería / Taller / Refacciones</option>
                  <option value="Restaurante / Cafetería / Alimentos">Restaurante / Cafetería / Alimentos</option>
                  <option value="Servicios Profesionales / Consultoría">Servicios Profesionales / Consultoría</option>
                  <option value="Salud / Belleza / Consultorio">Salud / Belleza / Consultorio</option>
                  <option value="Distribuidora / Mayorista / B2B">Distribuidora / Mayorista / B2B</option>
                  <option value="Otro">Otro giro</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-blancoPuro uppercase tracking-wider mb-2">
                  Paquete Inicial de Interés
                </label>
                <select
                  value={selectedPkg}
                  onChange={(e) => setSelectedPkg(e.target.value)}
                  className="w-full bg-negroProfundo border border-white/10 rounded-medium px-4 py-3 text-sm text-blancoPuro focus:outline-none focus:border-naranjaEnergy"
                >
                  <option value="Diagnóstico Gratuito / No sé por dónde empezar">🧭 Diagnóstico Gratuito / No sé por dónde empezar</option>
                  <option value="Tarjeta Smart ($950 MXN)">Nivel 1: Tarjeta Smart ($950 MXN)</option>
                  <option value="Tu Negocio en Google ($2,750 MXN)">Nivel 2: Tu Negocio en Google ($2,750 MXN)</option>
                  <option value="Paquete Híbrido Escala Rápida ($3,700 MXN)">Paquete Híbrido Escala Rápida ($3,700 MXN)</option>
                  <option value="Ecosistema Total ($5,450 MXN)">Nivel 3: Ecosistema Total ($5,450 MXN)</option>
                  <option value="E-commerce Total con Logística ($9,850 MXN)">E-commerce Total con Logística ($9,850 MXN)</option>
                  <option value="Consultoría Estructural (SOPs)">Consultoría Estructural (SOPs)</option>
                  <option value="Taller Express Branding ($1,850 MXN)">Taller Express Branding ($1,850 MXN)</option>
                </select>
              </div>
            </div>
          </div>

          {/* 2. SECCIÓN: PRESENCIA LOCAL & GOOGLE MAPS */}
          <div className="bg-midnightPanel p-6 sm:p-8 rounded-large border border-white/10 shadow-card space-y-5">
            <div className="border-b border-white/10 pb-3">
              <span className="text-xs font-bold text-naranjaEnergy uppercase tracking-widest">
                PASO 2 DE 4
              </span>
              <h2 className="font-bruno text-lg text-blancoPuro">
                📍 Presencia Local & Canales Digitales
              </h2>
            </div>

            <div>
              <label className="block text-xs font-bold text-blancoPuro uppercase tracking-wider mb-2">
                ¿Cuál es la situación actual de tu negocio en Google Maps?
              </label>
              <div className="space-y-2">
                {[
                  "Desactualizado o con dirección errónea (clientes reportan que no nos encuentran)",
                  "Aparece pero no está optimizado ni tiene catálogo ni automatización de WhatsApp",
                  "No aparece en Google Maps en absoluto",
                  "Totalmente verificado, con horario unificado y bien calificado"
                ].map((opt) => (
                  <label key={opt} className={`flex items-center gap-3 p-3.5 rounded-medium border cursor-pointer text-xs transition ${
                    mapsStatus === opt 
                      ? "bg-naranjaEnergy/15 border-naranjaEnergy text-white font-bold" 
                      : "bg-negroProfundo border-white/5 text-blancoPuro/80 hover:border-white/20"
                  }`}>
                    <input 
                      type="radio" 
                      name="mapsStatus" 
                      checked={mapsStatus === opt} 
                      onChange={() => setMapsStatus(opt)} 
                      className="accent-naranjaEnergy"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-blancoPuro uppercase tracking-wider mb-2">
                ¿Qué presencia web tienes en este momento?
              </label>
              <div className="space-y-2">
                {[
                  "Solo redes sociales (Facebook / Instagram / TikTok)",
                  "No tengo página web ni bio link",
                  "Tengo un sitio web pero está desactualizado o el equipo no cuenta con capacitación para operarlo",
                  "Tengo sitio web o landing page moderna y activa"
                ].map((opt) => (
                  <label key={opt} className={`flex items-center gap-3 p-3.5 rounded-medium border cursor-pointer text-xs transition ${
                    webPresence === opt 
                      ? "bg-naranjaEnergy/15 border-naranjaEnergy text-white font-bold" 
                      : "bg-negroProfundo border-white/5 text-blancoPuro/80 hover:border-white/20"
                  }`}>
                    <input 
                      type="radio" 
                      name="webPresence" 
                      checked={webPresence === opt} 
                      onChange={() => setWebPresence(opt)} 
                      className="accent-naranjaEnergy"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* 3. SECCIÓN: OPERACIÓN, PEDIDOS & LOGÍSTICA */}
          <div className="bg-midnightPanel p-6 sm:p-8 rounded-large border border-white/10 shadow-card space-y-5">
            <div className="border-b border-white/10 pb-3">
              <span className="text-xs font-bold text-naranjaEnergy uppercase tracking-widest">
                PASO 3 DE 4
              </span>
              <h2 className="font-bruno text-lg text-blancoPuro">
                📦 Operación, Pedidos y Métodos de Cobro
              </h2>
            </div>

            <div>
              <label className="block text-xs font-bold text-blancoPuro uppercase tracking-wider mb-2">
                ¿Cómo atienden y toman pedidos actualmente?
              </label>
              <div className="space-y-2">
                {[
                  "WhatsApp manual (audios, fotos de productos y notas escritas a mano)",
                  "Directo en mostrador / mostrador físico únicamente",
                  "Chatbot básico o respuestas rápidas de WhatsApp Business",
                  "Catálogo online automatizado con carrito y confirmación directa"
                ].map((opt) => (
                  <label key={opt} className={`flex items-center gap-3 p-3.5 rounded-medium border cursor-pointer text-xs transition ${
                    ordersFlow === opt 
                      ? "bg-naranjaEnergy/15 border-naranjaEnergy text-white font-bold" 
                      : "bg-negroProfundo border-white/5 text-blancoPuro/80 hover:border-white/20"
                  }`}>
                    <input 
                      type="radio" 
                      name="ordersFlow" 
                      checked={ordersFlow === opt} 
                      onChange={() => setOrdersFlow(opt)} 
                      className="accent-naranjaEnergy"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-blancoPuro uppercase tracking-wider mb-2">
                ¿Cómo despachan envíos locales o foráneos?
              </label>
              <div className="space-y-2">
                {[
                  "Triangulación manual por mensajes con repartidores propios o taxis de aplicación",
                  "No realizamos envíos a domicilio (solo recolección en tienda)",
                  "Paquetería tradicional yendo a sucursal (DHL, Estafeta, etc.)",
                  "Integración automática con APIs de paquetería / Uber Direct"
                ].map((opt) => (
                  <label key={opt} className={`flex items-center gap-3 p-3.5 rounded-medium border cursor-pointer text-xs transition ${
                    shippingMethod === opt 
                      ? "bg-naranjaEnergy/15 border-naranjaEnergy text-white font-bold" 
                      : "bg-negroProfundo border-white/5 text-blancoPuro/80 hover:border-white/20"
                  }`}>
                    <input 
                      type="radio" 
                      name="shippingMethod" 
                      checked={shippingMethod === opt} 
                      onChange={() => setShippingMethod(opt)} 
                      className="accent-naranjaEnergy"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* 4. SECCIÓN: EQUIPO & OBSTÁCULO PRINCIPAL */}
          <div className="bg-midnightPanel p-6 sm:p-8 rounded-large border border-white/10 shadow-card space-y-5">
            <div className="border-b border-white/10 pb-3">
              <span className="text-xs font-bold text-naranjaEnergy uppercase tracking-widest">
                PASO 4 DE 4
              </span>
              <h2 className="font-bruno text-lg text-blancoPuro">
                🎓 Equipo, Procesos y Mayor Fricción
              </h2>
            </div>

            <div>
              <label className="block text-xs font-bold text-blancoPuro uppercase tracking-wider mb-2">
                ¿Tu equipo de trabajo domina la tecnología actual?
              </label>
              <div className="space-y-2">
                {[
                  "Falta capacitación y existe resistencia al cambio entre los empleados",
                  "Solo el dueño sabe cómo se hace todo; si falta, la operación se detiene",
                  "Manejo básico pero sin procesos estandarizados ni manuales",
                  "Equipo capacitado y con constancia de habilidades tecnológicas"
                ].map((opt) => (
                  <label key={opt} className={`flex items-center gap-3 p-3.5 rounded-medium border cursor-pointer text-xs transition ${
                    teamTraining === opt 
                      ? "bg-naranjaEnergy/15 border-naranjaEnergy text-white font-bold" 
                      : "bg-negroProfundo border-white/5 text-blancoPuro/80 hover:border-white/20"
                  }`}>
                    <input 
                      type="radio" 
                      name="teamTraining" 
                      checked={teamTraining === opt} 
                      onChange={() => setTeamTraining(opt)} 
                      className="accent-naranjaEnergy"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-blancoPuro uppercase tracking-wider mb-2">
                ¿Cuál es la principal fuga de dinero o cuello de botella que deseas erradicar este mes?
              </label>
              <textarea
                rows="3"
                value={mainObstacle}
                onChange={(e) => setMainObstacle(e.target.value)}
                placeholder="Ej. Perdemos clientes porque tardamos 40 minutos en cotizar por WhatsApp y los repartidores nos cobran de más..."
                className="w-full bg-negroProfundo border border-white/10 rounded-medium p-4 text-sm text-blancoPuro placeholder-humo/60 focus:outline-none focus:border-naranjaEnergy"
              ></textarea>
            </div>
          </div>

          {/* BOTÓN FINAL DE ENVÍO */}
          <div className="space-y-3">
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-4 px-8 bg-naranjaEnergy hover:bg-orange-600 text-white font-bruno text-base sm:text-lg rounded-medium shadow-glowEnergy hover:shadow-glowEnergyHover transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <span>{status === "loading" ? "Procesando Diagnóstico con RUA..." : "🚀 Enviar y Evaluar Diagnóstico con RUA"}</span>
              <span>→</span>
            </button>
            <p className="text-[11px] text-center text-humo">
              Al enviar, tus respuestas se guardarán en nuestra base de datos, se enviará una copia a <strong>contacto@tsolutionsipidd.com</strong> y pasarás a la entrega de resultados y agenda en vivo.
            </p>
          </div>

        </form>

      </main>

    </div>
  );
}
