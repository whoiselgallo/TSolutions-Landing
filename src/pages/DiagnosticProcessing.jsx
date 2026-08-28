import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export default function DiagnosticProcessing() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [name, setName] = useState(searchParams.get("nombre") || "Empresario");
  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [phone, setPhone] = useState(searchParams.get("telefono") || searchParams.get("phone") || "");
  const [businessName, setBusinessName] = useState(searchParams.get("empresa") || "");
  const [pkg, setPkg] = useState(searchParams.get("paquete") || "Diagnóstico Estratégico");
  const [notes, setNotes] = useState("");

  const [progress, setProgress] = useState(25);
  const [stage, setStage] = useState("Analizando infraestructura y presencia en Google Maps...");

  // Estado de Selección de Cita
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);
  const [selectedTime, setSelectedTime] = useState("10:00 AM");
  const [status, setStatus] = useState("idle"); // idle | loading | error
  const [availableDays, setAvailableDays] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    try {
      const stored = localStorage.getItem("tsolutions_latest_diagnostic");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.name) setName(parsed.name);
        if (parsed.email) setEmail(parsed.email);
        if (parsed.phone) setPhone(parsed.phone);
        if (parsed.businessName) setBusinessName(parsed.businessName);
        if (parsed.selectedPkg) setPkg(parsed.selectedPkg);
      }
    } catch (e) {}

    const timer1 = setTimeout(() => {
      setProgress(55);
      setStage("RUA Agent: Mapeando cuellos de botella en WhatsApp y logística...");
    }, 1000);

    const timer2 = setTimeout(() => {
      setProgress(85);
      setStage("Sincronizando con base de datos y notificando a contacto@tsolutionsipidd.com...");
    }, 2000);

    const timer3 = setTimeout(() => {
      setProgress(100);
      setStage("✓ Evaluación preliminar completada. Listo para reservar sesión de entrega.");
    }, 3000);

    // Calcular próximos 3 días
    const days = [];
    const today = new Date();
    const formatter = new Intl.DateTimeFormat("es-MX", { weekday: "long", day: "numeric", month: "short" });

    let count = 0;
    let offset = 1;
    while (count < 3) {
      const d = new Date(today);
      d.setDate(today.getDate() + offset);
      const dateStr = formatter.format(d);
      const capitalized = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
      
      days.push({
        id: count,
        dateObj: d,
        label: count === 0 ? `Mañana (${capitalized})` : capitalized,
        fullDate: d.toLocaleDateString("es-MX", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
        isoDate: d.toISOString().split("T")[0],
        badge: count === 0 ? "🔥 Mayor Disponibilidad" : count === 1 ? "⚡ Pocos Lugares" : "📅 Últimos Horarios"
      });
      count++;
      offset++;
    }
    setAvailableDays(days);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const timeSlots = [
    { time: "10:00 AM", hour24: 10, min: 0, period: "Mañana" },
    { time: "11:30 AM", hour24: 11, min: 30, period: "Mañana" },
    { time: "01:00 PM", hour24: 13, min: 0, period: "Tarde" },
    { time: "04:00 PM", hour24: 16, min: 0, period: "Tarde" },
    { time: "05:30 PM", hour24: 17, min: 30, period: "Tarde" },
    { time: "07:00 PM", hour24: 19, min: 0, period: "Noche" }
  ];

  const generateGoogleCalendarUrl = (chosenDay, chosenSlot) => {
    const d = chosenDay?.dateObj ? new Date(chosenDay.dateObj) : new Date();
    d.setHours(chosenSlot.hour24, chosenSlot.min, 0, 0);

    const endDate = new Date(d);
    endDate.setMinutes(d.getMinutes() + 25);

    const formatGCalDate = (date) => {
      return date.toISOString().replace(/-|:|\.\d+/g, "");
    };

    const startISO = formatGCalDate(d);
    const endISO = formatGCalDate(endDate);

    const eventTitle = `🚀 Sesión Estratégica TSolutions IPIDD - ${name || "Cliente"}`;
    const eventDetails = `SESIÓN ESTRATÉGICA 1 A 1 (20 MIN) - ENTREGA DE RESULTADOS
====================================================
PROSPECTO:
- Nombre: ${name}
- Empresa: ${businessName || "N/A"}
- Correo: ${email}
- WhatsApp: ${phone}
- Paquete de Interés: ${pkg}
- Notas: ${notes || "Revisión de Diagnóstico de Madurez Digital"}

OBJETIVOS:
1. Análisis de fugas en Google Maps, WhatsApp y logística.
2. Presentación de arquitectura recomendada.
3. Plan de capacitación andragógica.

"Tecnología instalada. Conocimiento transferido. Negocios escalados."
Contacto: contacto@tsolutionsipidd.com`;

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startISO}/${endISO}&details=${encodeURIComponent(eventDetails)}&location=${encodeURIComponent("Google Meet (Enlace en confirmación)")}&add=${encodeURIComponent(email ? `${email},contacto@tsolutionsipidd.com` : "contacto@tsolutionsipidd.com")}`;
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const chosenDay = availableDays[selectedDayIdx];
    const chosenSlot = timeSlots.find(s => s.time === selectedTime) || timeSlots[0];
    const gcalDirectUrl = generateGoogleCalendarUrl(chosenDay, chosenSlot);

    const appointmentPayload = {
      name,
      email,
      phone,
      businessName,
      selectedDate: chosenDay?.fullDate || chosenDay?.label || "Próximo día hábil",
      selectedTime,
      package: pkg,
      notes,
      gcalUrl: gcalDirectUrl,
      createdAt: new Date().toISOString()
    };

    try {
      await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointmentPayload),
      }).catch(() => {});

      localStorage.setItem("tsolutions_confirmed_appointment", JSON.stringify(appointmentPayload));
      
      try {
        window.open(gcalDirectUrl, "_blank", "noopener,noreferrer");
      } catch (errPop) {}

      navigate(`/ebooks?nombre=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&cita=confirmada`);
    } catch (err) {
      localStorage.setItem("tsolutions_confirmed_appointment", JSON.stringify(appointmentPayload));
      try {
        window.open(gcalDirectUrl, "_blank", "noopener,noreferrer");
      } catch (errPop) {}
      navigate(`/ebooks?nombre=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&cita=confirmada`);
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
                TSOLUTIONS <span className="text-naranjaEnergy text-xs font-sans font-bold px-1.5 py-0.5 rounded bg-naranjaEnergy/10 border border-naranjaEnergy/30">RUA ENGINE</span>
              </div>
              <p className="text-[10px] text-humo tracking-widest hidden sm:block">
                EVALUACIÓN EN PROCESO &bull; SESIÓN 1 A 1
              </p>
            </div>
          </Link>

          <Link 
            to="/" 
            className="text-xs bg-midnightPanel hover:bg-negroProfundo text-blancoPuro border border-white/10 px-4 py-2 rounded-medium font-bold transition"
          >
            ← Inicio
          </Link>
        </div>
      </header>

      {/* ================= PROCESAMIENTO & AVISO AL CLIENTE ================= */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        
        {/* BANNER PRINCIPAL DE AVISO DE INFORMACIÓN */}
        <div className="bg-midnightPanel p-6 sm:p-10 rounded-large border border-naranjaEnergy/40 shadow-glowEnergy text-center relative overflow-hidden mb-10">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-naranjaEnergy/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-naranjaEnergy/20 border-2 border-naranjaEnergy text-naranjaEnergy flex items-center justify-center text-3xl mx-auto mb-4 shadow-glowEnergy animate-bounce">
            🧠
          </div>

          <span className="text-xs font-bold text-naranjaEnergy uppercase tracking-widest block mb-1">
            ESTADO DEL DIAGNÓSTICO EN TIEMPO REAL
          </span>

          <h1 className="font-bruno text-2xl sm:text-4xl text-blancoPuro mb-3">
            ¡Información Recibida con Éxito, <span className="text-naranjaEnergy">{name}</span>!
          </h1>

          <p className="text-humo text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed mb-6">
            Tus respuestas han sido ingresadas en nuestra base de datos conectada a <strong>RUA (Real Utility Agent)</strong> y notificadas al equipo técnico en <strong>contacto@tsolutionsipidd.com</strong>.
          </p>

          {/* BARRA DE PROGRESO DE LA EVALUACIÓN */}
          <div className="max-w-xl mx-auto bg-negroProfundo p-4 rounded-medium border border-white/10 mb-6 text-left">
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="text-blancoPuro font-semibold">{stage}</span>
              <span className="text-naranjaEnergy font-mono font-bold">{progress}%</span>
            </div>
            <div className="w-full h-2.5 bg-midnightPanel rounded-full overflow-hidden border border-white/5">
              <div 
                className="h-full bg-gradient-to-r from-orange-600 via-naranjaEnergy to-emerald-400 transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* LO QUE ESTÁ SUCEDIENDO CON TU INFORMACIÓN */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto text-left text-xs mb-8">
            <div className="p-3.5 rounded-medium bg-negroProfundo/70 border border-white/5">
              <span className="text-naranjaEnergy font-bold block mb-1">1. Registro en BD RUA</span>
              <p className="text-humo text-[11px]">Tus métricas fueron almacenadas en el sistema para cruce de patrones y benchmarking.</p>
            </div>
            <div className="p-3.5 rounded-medium bg-negroProfundo/70 border border-white/5">
              <span className="text-naranjaEnergy font-bold block mb-1">2. Notificación Inmediata</span>
              <p className="text-humo text-[11px]">El expediente completo fue enviado a contacto@tsolutionsipidd.com para su revisión.</p>
            </div>
            <div className="p-3.5 rounded-medium bg-negroProfundo/70 border border-white/5">
              <span className="text-naranjaEnergy font-bold block mb-1">3. Sesión de Resultados</span>
              <p className="text-humo text-[11px]">Un Estratega Tecnológico te entregará el reporte de 20 minutos en vivo.</p>
            </div>
          </div>

          {/* BOTÓN CTA PRINCIPAL HACIA LA AGENDA */}
          <a
            href="#agenda-directa"
            className="inline-flex items-center gap-2 bg-naranjaEnergy hover:bg-orange-600 text-white font-bruno text-sm sm:text-base px-8 py-4 rounded-medium shadow-glowEnergy hover:shadow-glowEnergyHover transition-all transform hover:-translate-y-0.5"
          >
            <span>📅 Agendar Cita para Entrega de Resultados (20 min)</span>
            <span>↓</span>
          </a>
        </div>

        {/* ================= SECCIÓN DE AGENDA NATIVA (PRÓXIMOS 3 DÍAS) ================= */}
        <section id="agenda-directa" className="bg-midnightPanel p-6 sm:p-8 rounded-large border border-naranjaEnergy/40 shadow-card space-y-6">
          
          <div className="border-b border-white/10 pb-4">
            <span className="text-xs font-bold text-naranjaEnergy uppercase tracking-widest">
              PASO FINAL: APARTA TU LUGAR
            </span>
            <h2 className="font-bruno text-xl sm:text-2xl text-blancoPuro mt-1 flex items-center gap-2">
              <span>🗓️ Selección de Día y Horario para Entrega de Resultados</span>
            </h2>
            <p className="text-xs text-humo mt-1">
              Elige entre los próximos 3 días hábiles. Al confirmar, <strong>se auto-llenará la cita en Google Calendar</strong> y recibirás la invitación con Google Meet.
            </p>
          </div>

          <form onSubmit={handleBooking} className="space-y-6">
            {/* DÍAS DISPONIBLES */}
            <div>
              <label className="block text-xs font-bold text-blancoPuro uppercase tracking-wider mb-2.5">
                1. Elige tu Día de Preferencia:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {availableDays.map((day, idx) => (
                  <button
                    type="button"
                    key={day.id}
                    onClick={() => setSelectedDayIdx(idx)}
                    className={`p-4 rounded-medium border text-left transition-all relative flex flex-col justify-between ${
                      selectedDayIdx === idx
                        ? "bg-naranjaEnergy/20 border-2 border-naranjaEnergy shadow-glowEnergy text-white scale-[1.02]"
                        : "bg-negroProfundo border-white/10 text-blancoPuro/80 hover:border-naranjaEnergy/50"
                    }`}
                  >
                    <span className="text-[10px] font-bold text-naranjaEnergy uppercase tracking-wider mb-1 block">
                      {day.badge}
                    </span>
                    <strong className="font-bruno text-sm sm:text-base text-blancoPuro block mb-1">
                      {day.label}
                    </strong>
                    <span className="text-[11px] text-humo">
                      {selectedDayIdx === idx ? "✓ Seleccionado" : "Click para elegir"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* HORAS DISPONIBLES */}
            <div>
              <label className="block text-xs font-bold text-blancoPuro uppercase tracking-wider mb-2.5">
                2. Elige la Hora (Centro de México):
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
                {timeSlots.map((slot) => (
                  <button
                    type="button"
                    key={slot.time}
                    onClick={() => setSelectedTime(slot.time)}
                    className={`py-3 px-2 rounded-medium border text-center transition-all ${
                      selectedTime === slot.time
                        ? "bg-naranjaEnergy text-white font-bold border-naranjaEnergy shadow-glowEnergy scale-105"
                        : "bg-negroProfundo border-white/10 text-blancoPuro/90 hover:border-naranjaEnergy/60 hover:text-white"
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-bruno block">{slot.time}</span>
                    <span className="text-[10px] text-humo block mt-0.5">{slot.period}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* CONFIRMACIÓN DE DATOS AUTO-LLENADOS */}
            <div className="p-4 bg-negroProfundo/70 rounded-medium border border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-humo block text-[11px]">Asistente:</span>
                <strong className="text-blancoPuro">{name}</strong>
              </div>
              <div>
                <span className="text-humo block text-[11px]">Correo Meet:</span>
                <strong className="text-blancoPuro">{email || "Se enviará confirmación"}</strong>
              </div>
              <div>
                <span className="text-humo block text-[11px]">WhatsApp:</span>
                <strong className="text-blancoPuro">{phone || "Registrado"}</strong>
              </div>
            </div>

            {/* BOTÓN RESERVA */}
            <div className="space-y-3 pt-2">
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-4 px-8 bg-naranjaEnergy hover:bg-orange-600 text-white font-bruno text-base sm:text-lg rounded-medium shadow-glowEnergy hover:shadow-glowEnergyHover transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <span>{status === "loading" ? "Auto-Llenando Google Calendar..." : "📅 Confirmar, Sincronizar Google Calendar y Desbloquear E-books"}</span>
                <span>→</span>
              </button>

              <div className="bg-naranjaEnergy/10 border border-naranjaEnergy/30 p-3 rounded-medium text-center text-xs text-blancoPuro/90">
                🎁 Al reservar tu cita, se abrirá la invitación en <strong>Google Calendar</strong> y serás redirigido a la <strong>Descarga Inmediata de nuestros 3 E-books Oficiales</strong>.
              </div>
            </div>
          </form>

        </section>

      </main>

    </div>
  );
}
