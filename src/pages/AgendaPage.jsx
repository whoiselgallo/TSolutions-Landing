import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export default function AgendaPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Datos precargados del cliente
  const [name, setName] = useState(searchParams.get("nombre") || "");
  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [phone, setPhone] = useState(searchParams.get("telefono") || searchParams.get("phone") || "");
  const [businessName, setBusinessName] = useState(searchParams.get("empresa") || "");
  const [pkg, setPkg] = useState(searchParams.get("paquete") || "Diagnóstico Estratégico");
  const [notes, setNotes] = useState("");

  // Estado de Selección de Cita
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);
  const [selectedTime, setSelectedTime] = useState("10:00 AM");
  const [status, setStatus] = useState("idle"); // idle | loading | error
  const [errorMsg, setErrorMsg] = useState("");

  // Días dinámicos disponibles (Próximos 3 días hábiles)
  const [availableDays, setAvailableDays] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    try {
      const storedDiag = localStorage.getItem("tsolutions_latest_diagnostic");
      if (storedDiag) {
        const parsed = JSON.parse(storedDiag);
        if (!name && parsed.name) setName(parsed.name);
        if (!email && parsed.email) setEmail(parsed.email);
        if (!phone && parsed.phone) setPhone(parsed.phone);
        if (!businessName && parsed.businessName) setBusinessName(parsed.businessName);
        if (!pkg && parsed.selectedPkg) setPkg(parsed.selectedPkg);
      } else {
        const storedLead = localStorage.getItem("tsolutions_lead_contact");
        if (storedLead) {
          const parsed = JSON.parse(storedLead);
          if (!name && parsed.name) setName(parsed.name);
          if (!email && parsed.email) setEmail(parsed.email);
          if (!phone && parsed.phone) setPhone(parsed.phone);
          if (!pkg && parsed.package) setPkg(parsed.package);
        }
      }
    } catch (e) {}

    // Calcular próximos 3 días con fechas exactas
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
  }, []);

  const timeSlots = [
    { time: "10:00 AM", hour24: 10, min: 0, period: "Mañana" },
    { time: "11:30 AM", hour24: 11, min: 30, period: "Mañana" },
    { time: "01:00 PM", hour24: 13, min: 0, period: "Tarde" },
    { time: "04:00 PM", hour24: 16, min: 0, period: "Tarde" },
    { time: "05:30 PM", hour24: 17, min: 30, period: "Tarde" },
    { time: "07:00 PM", hour24: 19, min: 0, period: "Noche" }
  ];

  // Generador de URL de Google Calendar con campos 100% pre-llenados
  const generateGoogleCalendarUrl = (chosenDay, chosenSlot) => {
    const d = chosenDay?.dateObj ? new Date(chosenDay.dateObj) : new Date();
    d.setHours(chosenSlot.hour24, chosenSlot.min, 0, 0);

    const endDate = new Date(d);
    endDate.setMinutes(d.getMinutes() + 25); // 25 min session

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
- Empresa / Negocio: ${businessName || "N/A"}
- Correo: ${email}
- Teléfono / WhatsApp: ${phone}
- Paquete de Interés: ${pkg}
- Notas: ${notes || "Revisión de Diagnóstico de Madurez Digital"}

OBJETIVOS DE LA SESIÓN:
1. Análisis de fugas operativas en Google Maps, WhatsApp y pedidos.
2. Presentación de arquitectura recomendada a la medida.
3. Plan de capacitación andragógica y constancia de dominio tecnológico.

"Tecnología instalada. Conocimiento transferido. Negocios escalados."
Soporte: contacto@tsolutionsipidd.com | www.tsolutionsipidd.com`;

    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startISO}/${endISO}&details=${encodeURIComponent(eventDetails)}&location=${encodeURIComponent("Google Meet (Enlace en confirmación)")}&add=${encodeURIComponent(email ? `${email},contacto@tsolutionsipidd.com` : "contacto@tsolutionsipidd.com")}`;

    return gcalUrl;
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone) {
      setStatus("error");
      setErrorMsg("Por favor, verifica que tu nombre, correo y WhatsApp estén completos.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

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
      // 1. Guardar en Base de Datos y Notificar a contacto@tsolutionsipidd.com
      await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointmentPayload),
      }).catch(() => {});

      // 2. Guardar reserva en localStorage
      localStorage.setItem("tsolutions_confirmed_appointment", JSON.stringify(appointmentPayload));

      // 3. Abrir Google Calendar pre-llenado automáticamente en pestaña nueva
      try {
        window.open(gcalDirectUrl, "_blank", "noopener,noreferrer");
      } catch (errPop) {}

      // 4. Redirigir al cliente a la biblioteca de E-books
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
                TSOLUTIONS <span className="text-naranjaEnergy text-xs font-sans font-bold px-1.5 py-0.5 rounded bg-naranjaEnergy/10 border border-naranjaEnergy/30">AGENDA</span>
              </div>
              <p className="text-[10px] text-humo tracking-widest hidden sm:block">
                ENTREGA DE RESULTADOS &bull; SESIÓN 1 A 1 (20 MIN)
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

      {/* ================= HERO DE SELECCIÓN ================= */}
      <section className="py-10 sm:py-14 px-4 sm:px-6 text-center relative border-b border-blancoPuro/5 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-naranjaEnergy/15 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-midnightPanel border border-naranjaEnergy/40 text-naranjaEnergy text-xs font-semibold mb-3 shadow-glowEnergy">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Google Calendar Sync Automático &bull; Sesión 1 a 1 de 20 Minutos</span>
          </div>

          <h1 className="font-bruno text-2xl sm:text-4xl text-blancoPuro leading-tight mb-3">
            Selecciona tu <span className="text-naranjaEnergy">Día y Horario</span>
          </h1>

          <p className="font-inter text-xs sm:text-sm text-humo max-w-2xl mx-auto leading-relaxed">
            Al presionar el botón de reserva, <strong>el sistema llenará de forma automática todos los datos requeridos en Google Calendar</strong> y recibirás la invitación con enlace a Google Meet en tu correo.
          </p>
        </div>
      </section>

      {/* ================= INTERFAZ NATIVA DE RESERVA ================= */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        
        <form onSubmit={handleBooking} className="space-y-6">
          
          {errorMsg && (
            <div className="p-4 rounded-medium bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs sm:text-sm font-semibold text-center">
              ✕ {errorMsg}
            </div>
          )}

          {/* 1. SELECCIÓN DE DÍA (PRÓXIMOS 3 DÍAS) */}
          <div className="bg-midnightPanel p-5 sm:p-7 rounded-large border border-naranjaEnergy/40 shadow-card">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
              <div>
                <span className="text-xs font-bold text-naranjaEnergy uppercase tracking-widest block">
                  PASO 1
                </span>
                <h2 className="font-bruno text-base sm:text-lg text-blancoPuro">
                  📅 Selecciona uno de los Próximos 3 Días
                </h2>
              </div>
              <span className="text-[11px] text-emerald-400 font-bold hidden sm:block">
                ⚡ Sincronización Inmediata
              </span>
            </div>

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
                    {selectedDayIdx === idx ? "✓ Día Seleccionado" : "Click para elegir"}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. SELECCIÓN DE HORARIO */}
          <div className="bg-midnightPanel p-5 sm:p-7 rounded-large border border-white/10 shadow-card">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
              <div>
                <span className="text-xs font-bold text-naranjaEnergy uppercase tracking-widest block">
                  PASO 2
                </span>
                <h2 className="font-bruno text-base sm:text-lg text-blancoPuro">
                  ⏰ Elige la Hora para tu Sesión de 20 Min
                </h2>
              </div>
              <span className="text-xs text-humo">
                Zona Horaria: Centro de México (GMT-6)
              </span>
            </div>

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

          {/* 3. CONFIRMACIÓN DIRECTA CON TUS DATOS AUTO-LLENADOS */}
          <div className="bg-midnightPanel p-5 sm:p-7 rounded-large border border-white/10 shadow-card space-y-4">
            <div className="border-b border-white/10 pb-3">
              <span className="text-xs font-bold text-naranjaEnergy uppercase tracking-widest block">
                PASO 3
              </span>
              <h2 className="font-bruno text-base sm:text-lg text-blancoPuro">
                👤 Datos para Auto-Llenado en Google Calendar
              </h2>
              <p className="text-xs text-humo mt-0.5">
                Estos datos se integrarán automáticamente en los campos requeridos de Google Calendar:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-blancoPuro uppercase tracking-wider mb-1.5">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu Nombre"
                  className="w-full bg-negroProfundo border border-white/10 rounded-medium px-3.5 py-2.5 text-xs text-blancoPuro focus:outline-none focus:border-naranjaEnergy"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-blancoPuro uppercase tracking-wider mb-1.5">
                  Empresa / Negocio
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Nombre de tu negocio"
                  className="w-full bg-negroProfundo border border-white/10 rounded-medium px-3.5 py-2.5 text-xs text-blancoPuro focus:outline-none focus:border-naranjaEnergy"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-blancoPuro uppercase tracking-wider mb-1.5">
                  Correo Electrónico (Google Calendar & Meet) *
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

            <div>
              <label className="block text-[11px] font-bold text-blancoPuro uppercase tracking-wider mb-1.5">
                Notas adicionales o temas prioritarios a tratar (Opcional)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ej. Revisar cotización de E-commerce y rescate en Google Maps"
                className="w-full bg-negroProfundo border border-white/10 rounded-medium px-3.5 py-2.5 text-xs text-blancoPuro focus:outline-none focus:border-naranjaEnergy"
              />
            </div>
          </div>

          {/* BOTÓN FINAL DE CONFIRMACIÓN Y AUTO-LLENADO */}
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
              ⚡ Al hacer clic, se abrirá la invitación con todos tus datos en <strong>Google Calendar</strong> y serás redirigido a la <strong>Descarga Gratuita de nuestros 3 E-books Oficiales</strong>.
            </div>
          </div>

        </form>

      </main>

    </div>
  );
}
