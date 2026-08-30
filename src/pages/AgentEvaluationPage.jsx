import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function AgentEvaluationPage() {
  const [searchParams] = useSearchParams();

  // Datos del Cliente y Agente
  const [clientName, setClientName] = useState(searchParams.get("nombre") || "");
  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [phone, setPhone] = useState(searchParams.get("telefono") || searchParams.get("phone") || "");
  const [agentName, setAgentName] = useState(searchParams.get("agente") || "Estratega Tecnológico TSolutions");

  // Calificación del Agente (1-5)
  const [rating, setRating] = useState(5);
  const [clarityRating, setClarityRating] = useState("Excelente");
  const [andragogyRating, setAndragogyRating] = useState("Muy Alta");

  // Pregunta Crítica: ¿Contrató algún plan y por qué?
  const [didHire, setDidHire] = useState("si_contratado"); // si_contratado | si_proceso | evaluando | no_contrato
  const [selectedPlan, setSelectedPlan] = useState("Paquete Híbrido Escala Rápida ($3,700 MXN - Anticipo 50/50)");
  const [hireReason, setHireReason] = useState("");
  const [feedbackNotes, setFeedbackNotes] = useState("");

  // Agendamiento de Segunda Cita (1 Semana Después para Entrega del Plan Estratégico)
  const [availableDays, setAvailableDays] = useState([]);
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);
  const [selectedTime, setSelectedTime] = useState("11:00 AM");

  // Estado del Envío
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const [confirmedData, setConfirmedData] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Cargar datos previos de diagnóstico o citas
    try {
      const storedDiag = localStorage.getItem("tsolutions_latest_diagnostic");
      const storedLead = localStorage.getItem("tsolutions_lead_contact");
      const parsed = storedDiag ? JSON.parse(storedDiag) : storedLead ? JSON.parse(storedLead) : null;
      if (parsed) {
        if (!clientName && parsed.name) setClientName(parsed.name);
        if (!email && parsed.email) setEmail(parsed.email);
        if (!phone && parsed.phone) setPhone(parsed.phone);
        if (parsed.selectedPkg || parsed.package) setSelectedPlan(parsed.selectedPkg || parsed.package);
      }
    } catch (e) {}

    // Calcular días disponibles exactamente 1 semana después (7 a 10 días adelante)
    const days = [];
    const today = new Date();
    const formatter = new Intl.DateTimeFormat("es-MX", { weekday: "long", day: "numeric", month: "short" });

    // Empezamos 7 días después para dar tiempo a la elaboración del Plan Estratégico
    let count = 0;
    let offset = 7;
    while (count < 4) {
      const d = new Date(today);
      d.setDate(today.getDate() + offset);
      // Evitar domingos
      if (d.getDay() !== 0) {
        const dateStr = formatter.format(d);
        const capitalized = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
        days.push({
          id: count,
          dateObj: d,
          label: count === 0 ? `En 1 Semana (${capitalized})` : capitalized,
          fullDate: d.toLocaleDateString("es-MX", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
          badge: count === 0 ? "🎯 Fecha Recomendada" : "📅 Horario Disponible"
        });
        count++;
      }
      offset++;
    }
    setAvailableDays(days);
  }, []);

  const timeSlots = [
    "10:00 AM",
    "11:30 AM",
    "01:00 PM",
    "04:00 PM",
    "05:30 PM",
    "07:00 PM"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!clientName.trim() || !email.trim() || !phone.trim() || !hireReason.trim()) {
      setStatus("error");
      setErrorMsg("Por favor, completa tus datos de contacto y el motivo de tu decisión de contratación.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    const chosenDay = availableDays[selectedDayIdx];
    const payload = {
      clientName: clientName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      agentName,
      rating,
      clarityRating,
      andragogyRating,
      didHire,
      selectedPlan,
      hireReason: hireReason.trim(),
      feedbackNotes: feedbackNotes.trim(),
      nextMeetingDate: chosenDay?.fullDate || chosenDay?.label || "En 1 semana",
      nextMeetingTime: selectedTime,
      submittedAt: new Date().toISOString()
    };

    try {
      await fetch("/api/agent-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => {});

      localStorage.setItem("tsolutions_agent_evaluation", JSON.stringify(payload));
      setConfirmedData(payload);
      setStatus("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      localStorage.setItem("tsolutions_agent_evaluation", JSON.stringify(payload));
      setConfirmedData(payload);
      setStatus("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // ================= PANTALLA DE ÉXITO TRAS ENVIAR =================
  if (status === "success" && confirmedData) {
    const isAnticipoRequired = confirmedData.selectedPlan.includes("50/50") || confirmedData.selectedPlan.includes("40/30/30") || confirmedData.selectedPlan.includes("Híbrido") || confirmedData.selectedPlan.includes("Ecosistema") || confirmedData.selectedPlan.includes("E-commerce");

    return (
      <div className="bg-negroProfundo text-blancoPuro min-h-screen selection:bg-naranjaEnergy selection:text-white pb-20 sm:pb-12">
        {/* HEADER */}
        <header className="w-full border-b border-white/10 bg-negroProfundo/95 backdrop-blur-md py-3.5 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div 
                className="w-10 h-10 border border-naranjaEnergy bg-midnightPanel flex items-center justify-center p-1.5 shadow-glowEnergy"
                style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
              >
                <img src="/assets/TSolutionslogo/logoTSVG.svg" alt="TSolutions Logo" className="w-full h-full object-contain" />
              </div>
              <div className="font-bruno text-sm sm:text-base text-blancoPuro">
                TSOLUTIONS <span className="text-naranjaEnergy text-xs font-sans font-bold px-1.5 py-0.5 rounded bg-naranjaEnergy/10 border border-naranjaEnergy/30">CONFIRMACIÓN</span>
              </div>
            </Link>
            <Link to="/" className="text-xs bg-midnightPanel text-blancoPuro border border-white/10 px-4 py-2 rounded-medium font-bold">
              ← Inicio
            </Link>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          <div className="bg-midnightPanel p-8 sm:p-12 rounded-large border border-naranjaEnergy/50 shadow-glowEnergy text-center relative overflow-hidden">
            
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-300 flex items-center justify-center text-4xl mx-auto mb-6 shadow-glowEnergy animate-bounce">
              ✓
            </div>

            <span className="text-xs font-bold text-naranjaEnergy uppercase tracking-widest block mb-2">
              EVALUACIÓN REGISTRADA CON ÉXITO
            </span>

            <h1 className="font-bruno text-2xl sm:text-4xl text-blancoPuro mb-4">
              ¡Muchas Gracias por tu Feedback, <span className="text-naranjaEnergy">{confirmedData.clientName}</span>!
            </h1>

            <p className="text-humo text-xs sm:text-sm max-w-xl mx-auto leading-relaxed mb-8">
              Tu evaluación sobre el servicio de <strong>{confirmedData.agentName}</strong> ha sido enviada a la Dirección de Calidad y Estrategia en <strong>contacto@tsolutionsipidd.com</strong>.
            </p>

            {/* RESUMEN DE LA SEGUNDA CITA AGENDADA */}
            <div className="bg-negroProfundo p-6 rounded-large border border-white/10 text-left max-w-xl mx-auto mb-8 shadow-inner space-y-3 text-xs">
              <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                <span className="text-base">📅</span>
                <h3 className="font-bruno text-sm text-blancoPuro">
                  Segunda Reunión: Entrega del Plan Estratégico
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <span className="text-humo block text-[11px]">Fecha de Sesión:</span>
                  <strong className="text-blancoPuro">{confirmedData.nextMeetingDate}</strong>
                </div>
                <div>
                  <span className="text-humo block text-[11px]">Horario:</span>
                  <strong className="text-naranjaEnergy font-bold">{confirmedData.nextMeetingTime} (Centro de México)</strong>
                </div>
                <div>
                  <span className="text-humo block text-[11px]">Plan / Proyecto:</span>
                  <strong className="text-blancoPuro">{confirmedData.selectedPlan}</strong>
                </div>
                <div>
                  <span className="text-humo block text-[11px]">Modalidad:</span>
                  <strong className="text-emerald-400">Google Meet 1 a 1</strong>
                </div>
              </div>
            </div>

            {/* AVISO IMPORTANTE DE ANTICIPO PAGADO */}
            {isAnticipoRequired && (
              <div className="bg-amber-500/15 border-2 border-amber-400/60 p-6 rounded-large text-left max-w-xl mx-auto mb-8 shadow-card">
                <div className="flex items-center gap-2.5 text-amber-300 font-bruno text-xs sm:text-sm mb-2">
                  <span className="text-lg">⚠️</span>
                  <span>RECORDATORIO OBLIGATORIO DE POLÍTICA DE ANTICIPO</span>
                </div>
                <p className="text-xs text-blancoPuro/90 leading-relaxed">
                  Para proyectos bajo esquemas <strong>50/50</strong> o <strong>40/30/30</strong>, el anticipo correspondiente <strong>ya debe estar cubierto y validado antes de la hora de inicio de esta segunda reunión</strong>.
                </p>
                <p className="text-[11px] text-humo mt-2">
                  Esto permite al equipo de arquitectura tecnológica liberar la infraestructura, los accesos preliminares y presentar el plan de despliegue operativo en tiempo y forma.
                </p>
                <div className="mt-4 pt-3 border-t border-amber-400/20 flex flex-wrap items-center justify-between gap-3">
                  <a
                    href="https://wa.me/5215512345678?text=Hola,%20deseo%20confirmar%20el%20pago%20de%20mi%20anticipo%20para%20la%20sesi%C3%B3n%20de%20Plan%20Estrat%C3%A9gico"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-medium text-xs shadow-card transition"
                  >
                    <span>💬 Enviar Comprobante por WhatsApp</span>
                  </a>
                  <span className="text-[10px] text-humo">contacto@tsolutionsipidd.com</span>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/"
                className="w-full sm:w-auto px-8 py-3.5 bg-naranjaEnergy hover:bg-orange-600 text-white font-bruno text-xs sm:text-sm rounded-medium shadow-glowEnergy transition"
              >
                ← Volver al Inicio
              </Link>
              <Link
                to="/ebooks"
                className="w-full sm:w-auto px-6 py-3.5 bg-negroProfundo hover:bg-midnightPanel text-blancoPuro border border-white/10 rounded-medium text-xs font-bold transition"
              >
                📚 Ir a E-books Gratuitos
              </Link>
            </div>

          </div>
        </main>
      </div>
    );
  }

  // ================= FORMULARIO PRINCIPAL DE EVALUACIÓN =================
  return (
    <div className="bg-negroProfundo text-blancoPuro min-h-screen selection:bg-naranjaEnergy selection:text-white pb-20 sm:pb-12">
      
      {/* HEADER */}
      <header className="w-full border-b border-white/10 bg-negroProfundo/95 backdrop-blur-md sticky top-0 z-50 py-3.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div 
              className="w-10 h-10 border border-naranjaEnergy bg-midnightPanel flex items-center justify-center p-1.5 shadow-glowEnergy group-hover:scale-105 transition-transform"
              style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
            >
              <img src="/assets/TSolutionslogo/logoTSVG.svg" alt="TSolutions Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="font-bruno text-sm sm:text-base tracking-wider text-blancoPuro flex items-center gap-1.5">
                TSOLUTIONS <span className="text-naranjaEnergy text-xs font-sans font-bold px-1.5 py-0.5 rounded bg-naranjaEnergy/10 border border-naranjaEnergy/30">CALIDAD</span>
              </div>
              <p className="text-[10px] text-humo tracking-widest hidden sm:block">
                EVALUACIÓN DE SERVICIO &bull; ENTREGA DE RESULTADOS
              </p>
            </div>
          </Link>

          <Link to="/" className="text-xs bg-midnightPanel hover:bg-negroProfundo text-blancoPuro border border-white/10 px-4 py-2 rounded-medium font-bold transition">
            ← Inicio
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="py-10 sm:py-14 px-4 sm:px-6 text-center relative border-b border-blancoPuro/5 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-naranjaEnergy/15 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-midnightPanel border border-naranjaEnergy/40 text-naranjaEnergy text-xs font-semibold mb-3 shadow-glowEnergy">
            <span>⭐ Control de Calidad &bull; Sesión de Resultados</span>
          </div>

          <h1 className="font-bruno text-2xl sm:text-4xl text-blancoPuro leading-tight mb-3">
            Evaluación del Servicio & <span className="text-naranjaEnergy">Segunda Reunión</span>
          </h1>

          <p className="font-inter text-xs sm:text-sm text-humo max-w-2xl mx-auto leading-relaxed">
            Tu opinión nos ayuda a perfeccionar la entrega de resultados y habilitar tu <strong>sesión de Plan Estratégico en 1 semana</strong>.
          </p>
        </div>
      </section>

      {/* FORMULARIO */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {errorMsg && (
            <div className="p-4 rounded-medium bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs sm:text-sm font-semibold text-center">
              ✕ {errorMsg}
            </div>
          )}

          {/* 1. DATOS DEL CLIENTE Y AGENTE */}
          <div className="bg-midnightPanel p-6 sm:p-8 rounded-large border border-white/10 shadow-card space-y-4">
            <div className="border-b border-white/10 pb-3">
              <span className="text-xs font-bold text-naranjaEnergy uppercase tracking-widest block">
                SECCIÓN 1
              </span>
              <h2 className="font-bruno text-base sm:text-lg text-blancoPuro">
                👤 Datos de la Sesión y del Agente
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-blancoPuro uppercase tracking-wider mb-1.5">
                  Tu Nombre Completo *
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Ej. Juan Pérez"
                  className="w-full bg-negroProfundo border border-white/10 rounded-medium px-3.5 py-2.5 text-xs text-blancoPuro focus:outline-none focus:border-naranjaEnergy"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-blancoPuro uppercase tracking-wider mb-1.5">
                  Nombre del Agente / Estratega que te atendió
                </label>
                <input
                  type="text"
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                  placeholder="Ej. Estratega Tecnológico TSolutions"
                  className="w-full bg-negroProfundo border border-white/10 rounded-medium px-3.5 py-2.5 text-xs text-blancoPuro focus:outline-none focus:border-naranjaEnergy"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-blancoPuro uppercase tracking-wider mb-1.5">
                  Correo Electrónico *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  className="w-full bg-negroProfundo border border-white/10 rounded-medium px-3.5 py-2.5 text-xs text-blancoPuro focus:outline-none focus:border-naranjaEnergy"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-blancoPuro uppercase tracking-wider mb-1.5">
                  Teléfono / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+52 55 1234 5678"
                  className="w-full bg-negroProfundo border border-white/10 rounded-medium px-3.5 py-2.5 text-xs text-blancoPuro focus:outline-none focus:border-naranjaEnergy"
                />
              </div>
            </div>
          </div>

          {/* 2. CALIFICACIÓN DEL AGENTE */}
          <div className="bg-midnightPanel p-6 sm:p-8 rounded-large border border-white/10 shadow-card space-y-5">
            <div className="border-b border-white/10 pb-3">
              <span className="text-xs font-bold text-naranjaEnergy uppercase tracking-widest block">
                SECCIÓN 2
              </span>
              <h2 className="font-bruno text-base sm:text-lg text-blancoPuro">
                ⭐ Calificación del Servicio del Estratega
              </h2>
            </div>

            <div>
              <label className="block text-xs font-bold text-blancoPuro uppercase tracking-wider mb-3">
                1. ¿Cómo calificas en general la atención y el reporte entregado por el agente?
              </label>
              <div className="flex items-center gap-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className={`w-12 h-12 rounded-large border text-xl flex items-center justify-center transition-all ${
                      rating >= star
                        ? "bg-naranjaEnergy text-white border-naranjaEnergy shadow-glowEnergy scale-105"
                        : "bg-negroProfundo border-white/10 text-humo hover:border-naranjaEnergy/50"
                    }`}
                  >
                    ★
                  </button>
                ))}
                <span className="text-xs font-bold text-naranjaEnergy ml-2">
                  {rating === 5 ? "¡Excelente! (5/5)" : rating === 4 ? "Muy Bueno (4/5)" : rating === 3 ? "Regular (3/5)" : "Por Mejorar"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-[11px] font-bold text-blancoPuro uppercase tracking-wider mb-1.5">
                  Claridad en el Diagnóstico de Fugas Operativas:
                </label>
                <select
                  value={clarityRating}
                  onChange={(e) => setClarityRating(e.target.value)}
                  className="w-full bg-negroProfundo border border-white/10 rounded-medium px-3.5 py-2.5 text-xs text-blancoPuro focus:outline-none focus:border-naranjaEnergy"
                >
                  <option value="Excelente">Totalmente claro y revelador</option>
                  <option value="Bueno">Bueno, entendí los puntos clave</option>
                  <option value="Regular">Quedaron algunas dudas menores</option>
                  <option value="Confuso">No me quedó claro</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-blancoPuro uppercase tracking-wider mb-1.5">
                  Empatía y Enfoque Andragógico del Agente:
                </label>
                <select
                  value={andragogyRating}
                  onChange={(e) => setAndragogyRating(e.target.value)}
                  className="w-full bg-negroProfundo border border-white/10 rounded-medium px-3.5 py-2.5 text-xs text-blancoPuro focus:outline-none focus:border-naranjaEnergy"
                >
                  <option value="Muy Alta">Excelente paciencia y resolución de dudas</option>
                  <option value="Alta">Buena disposición y profesionalismo</option>
                  <option value="Media">Aceptable</option>
                  <option value="Baja">Poco paciente o muy técnico</option>
                </select>
              </div>
            </div>
          </div>

          {/* 3. PREGUNTA CRÍTICA: ¿CONTRATÓ ALGÚN PLAN Y POR QUÉ? */}
          <div className="bg-midnightPanel p-6 sm:p-8 rounded-large border-2 border-naranjaEnergy/60 shadow-glowEnergy space-y-5 relative">
            <div className="border-b border-white/10 pb-3">
              <span className="text-xs font-bold text-naranjaEnergy uppercase tracking-widest block">
                SECCIÓN 3 &bull; PREGUNTA CLAVE DE CONTRATACIÓN
              </span>
              <h2 className="font-bruno text-base sm:text-lg text-blancoPuro">
                💼 Estado de Contratación de tu Proyecto
              </h2>
            </div>

            <div>
              <label className="block text-xs font-bold text-blancoPuro uppercase tracking-wider mb-2.5">
                ¿Decidiste contratar o avanzar con algún plan de TSolutions IPIDD? *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: "si_contratado", label: "✅ Sí, ya contraté / cubrí mi anticipo", badge: "Confirmado" },
                  { id: "si_proceso", label: "⏳ Sí, contrataré en las próximas 24-48 hrs", badge: "Por Cerrar" },
                  { id: "evaluando", label: "🤔 Aún lo estoy evaluando con mi equipo", badge: "En Análisis" },
                  { id: "no_contrato", label: "❌ Por ahora no contrataré", badge: "Pausado" },
                ].map((opt) => (
                  <button
                    type="button"
                    key={opt.id}
                    onClick={() => setDidHire(opt.id)}
                    className={`p-3.5 rounded-medium border text-left text-xs transition-all flex items-center justify-between ${
                      didHire === opt.id
                        ? "bg-naranjaEnergy/20 border-naranjaEnergy text-white font-bold shadow-glowEnergy"
                        : "bg-negroProfundo border-white/10 text-blancoPuro/80 hover:border-naranjaEnergy/40"
                    }`}
                  >
                    <span>{opt.label}</span>
                    <span className="text-[10px] text-naranjaEnergy font-mono px-2 py-0.5 rounded bg-naranjaEnergy/10 border border-naranjaEnergy/30">
                      {opt.badge}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-blancoPuro uppercase tracking-wider mb-1.5">
                Paquete contratado o de mayor interés:
              </label>
              <select
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
                className="w-full bg-negroProfundo border border-white/10 rounded-medium px-4 py-3 text-xs sm:text-sm text-blancoPuro focus:outline-none focus:border-naranjaEnergy"
              >
                <option value="Paquete Híbrido Escala Rápida ($3,700 MXN - Anticipo 50/50)">Paquete Híbrido Escala Rápida ($3,700 MXN - Anticipo 50/50) — Recomendado</option>
                <option value="Tu Negocio en Google ($2,750 MXN)">Nivel 2: Tu Negocio en Google ($2,750 MXN)</option>
                <option value="Tarjeta Smart ($950 MXN - Pago único)">Nivel 1: Tarjeta Smart ($950 MXN - Pago único)</option>
                <option value="Ecosistema Total ($5,450 MXN - Anticipo 50/50)">Nivel 3: Ecosistema Total ($5,450 MXN - Anticipo 50/50)</option>
                <option value="E-commerce Total con Logística ($9,850 MXN - Esquema 40/30/30)">E-commerce Total con Logística ($9,850 MXN - Esquema 40/30/30)</option>
                <option value="Consultoría Estructural (SOPs)">Consultoría Estructural de Procesos y SOPs</option>
                <option value="Brand Builder & Identidad ($1,850 MXN)">Brand Builder & Taller de Marca ($1,850 MXN)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-blancoPuro uppercase tracking-wider mb-1.5">
                ¿Por qué? / ¿Cuáles fueron los motivos principales de tu decisión? *
              </label>
              <textarea
                required
                rows="3"
                value={hireReason}
                onChange={(e) => setHireReason(e.target.value)}
                placeholder="Ej. Contraté porque la claridad del paquete híbrido y el rescate en Maps resolvieron justo el cuello de botella que teníamos en pedidos... (o si no contrataste, qué factor te hizo falta)"
                className="w-full bg-negroProfundo border border-white/10 rounded-medium p-3.5 text-xs sm:text-sm text-blancoPuro placeholder-humo/60 focus:outline-none focus:border-naranjaEnergy"
              ></textarea>
            </div>
          </div>

          {/* 4. AGENDAR SEGUNDA CITA: ENTREGA DE PLAN ESTRATÉGICO (1 SEMANA DESPUÉS) */}
          <div className="bg-midnightPanel p-6 sm:p-8 rounded-large border border-white/10 shadow-card space-y-6">
            <div className="border-b border-white/10 pb-3">
              <span className="text-xs font-bold text-naranjaEnergy uppercase tracking-widest block">
                SECCIÓN 4 &bull; CONTINUIDAD DE TU PROYECTO
              </span>
              <h2 className="font-bruno text-base sm:text-lg text-blancoPuro">
                🗓️ Agenda tu Segunda Reunión: Entrega del Plan Estratégico (1 Semana Después)
              </h2>
              <p className="text-xs text-humo mt-1">
                Abrimos las fechas a partir de 7 días posteriores para que nuestro equipo de ingeniería y arquitectura elabore tu plan estratégico detallado.
              </p>
            </div>

            {/* SELECCIÓN DE DÍA */}
            <div>
              <label className="block text-xs font-bold text-blancoPuro uppercase tracking-wider mb-2.5">
                1. Elige tu Día (Disponibles a partir de 1 semana):
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {availableDays.map((day, idx) => (
                  <button
                    type="button"
                    key={day.id}
                    onClick={() => setSelectedDayIdx(idx)}
                    className={`p-3.5 rounded-medium border text-left transition-all ${
                      selectedDayIdx === idx
                        ? "bg-naranjaEnergy/20 border-2 border-naranjaEnergy text-white shadow-glowEnergy"
                        : "bg-negroProfundo border-white/10 text-blancoPuro/80 hover:border-naranjaEnergy/40"
                    }`}
                  >
                    <span className="text-[9px] font-bold text-naranjaEnergy block uppercase mb-1">{day.badge}</span>
                    <strong className="font-bruno text-xs text-blancoPuro block">{day.label}</strong>
                  </button>
                ))}
              </div>
            </div>

            {/* SELECCIÓN DE HORA */}
            <div>
              <label className="block text-xs font-bold text-blancoPuro uppercase tracking-wider mb-2.5">
                2. Elige el Horario (Centro de México):
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
                {timeSlots.map((slot) => (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => setSelectedTime(slot)}
                    className={`py-2.5 px-2 rounded-medium border text-center transition-all text-xs font-bruno ${
                      selectedTime === slot
                        ? "bg-naranjaEnergy text-white font-bold border-naranjaEnergy shadow-glowEnergy"
                        : "bg-negroProfundo border-white/10 text-blancoPuro/80 hover:border-naranjaEnergy/50"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* AVISO IMPORTANTE: ANTICIPO PAGADO ANTES DE LA 2DA REUNIÓN */}
            <div className="bg-amber-500/15 border-2 border-amber-400/60 p-5 rounded-large text-left space-y-2">
              <div className="flex items-center gap-2 text-amber-300 font-bruno text-xs sm:text-sm">
                <span>⚠️</span>
                <span>POLÍTICA OBLIGATORIA PARA ESQUEMAS 50/50 Y 40/30/30</span>
              </div>
              <p className="text-xs text-blancoPuro/90 leading-relaxed">
                Para los proyectos contratados en modalidad <strong>50/50</strong> (Paquete Híbrido, Ecosistema Total) y <strong>40/30/30</strong> (E-commerce Total), <strong>el anticipo correspondiente ya debe estar pagado antes de la hora de inicio de esta segunda reunión</strong>.
              </p>
              <p className="text-[11px] text-humo leading-relaxed">
                En esta sesión se presentan los accesos de arquitectura, manuales iniciales y la maqueta operativa lista para desarrollo, por lo que el anticipo formaliza el arranque técnico.
              </p>
            </div>
          </div>

          {/* 5. BOTÓN DE ENVÍO */}
          <div className="space-y-3 pt-2">
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-4 px-8 bg-naranjaEnergy hover:bg-orange-600 text-white font-bruno text-base sm:text-lg rounded-medium shadow-glowEnergy hover:shadow-glowEnergyHover transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{status === "loading" ? "Registrando Evaluación..." : "🚀 Enviar Evaluación y Confirmar Segunda Reunión"}</span>
              <span>→</span>
            </button>

            <p className="text-[11px] text-center text-humo">
              🔒 Tu retroalimentación es confidencial y se procesa directamente por el área de Dirección Tecnológica de TSolutions IPIDD.
            </p>
          </div>

        </form>
      </main>

    </div>
  );
}
