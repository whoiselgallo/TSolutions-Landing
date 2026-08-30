import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

export function generateClientId(projectName, phone) {
  const cleanName = (projectName || "PRJ").replace(/[^a-zA-Z]/g, "").toUpperCase();
  const namePrefix = cleanName.padEnd(3, "X").substring(0, 3);
  const cleanPhone = (phone || "0000").replace(/[^0-9]/g, "");
  const phoneSuffix = cleanPhone.length >= 4 ? cleanPhone.slice(-4) : cleanPhone.padStart(4, "0");
  const homoclave = Math.floor(100 + Math.random() * 900);
  return `${namePrefix}-${phoneSuffix}-${homoclave}`;
}

export default function KickoffAgendaPage() {
  const [searchParams] = useSearchParams();

  const [clientName, setClientName] = useState(searchParams.get("nombre") || "");
  const [projectName, setProjectName] = useState(searchParams.get("empresa") || searchParams.get("proyecto") || "");
  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [phone, setPhone] = useState(searchParams.get("telefono") || "");
  const [selectedPlan, setSelectedPlan] = useState(searchParams.get("plan") || "Paquete Híbrido Escala Rápida ($3,700 MXN - Esquema 50/50)");
  const [paymentScheme, setPaymentScheme] = useState("50_50"); // 50_50 | 40_30_30 | 100_contado
  const [depositStatus, setDepositStatus] = useState("pagado"); // pagado | transferencia_proceso | por_pagar
  const [paymentRef, setPaymentRef] = useState("");

  const [availableDays, setAvailableDays] = useState([]);
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);
  const [selectedTime, setSelectedTime] = useState("10:00 AM");

  const [status, setStatus] = useState("idle");
  const [confirmedProject, setConfirmedProject] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Días hábiles disponibles a partir de mañana
    const days = [];
    const today = new Date();
    const formatter = new Intl.DateTimeFormat("es-MX", { weekday: "long", day: "numeric", month: "short" });
    let count = 0;
    let offset = 1;
    while (count < 5) {
      const d = new Date(today);
      d.setDate(today.getDate() + offset);
      if (d.getDay() !== 0) {
        const capitalized = formatter.format(d).charAt(0).toUpperCase() + formatter.format(d).slice(1);
        days.push({
          id: count,
          dateObj: d,
          label: count === 0 ? `Mañana (${capitalized})` : capitalized,
          fullDate: d.toLocaleDateString("es-MX", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
          badge: count === 0 ? "🔥 Inicio Rápido" : "📅 Disponible"
        });
        count++;
      }
      offset++;
    }
    setAvailableDays(days);
  }, []);

  const handleBooking = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const clientId = generateClientId(projectName || clientName, phone);
    const chosenDay = availableDays[selectedDayIdx];

    const projectData = {
      clientId,
      clientName: clientName.trim(),
      projectName: projectName.trim() || clientName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      plan: selectedPlan,
      paymentScheme,
      depositStatus,
      paymentRef: paymentRef.trim() || "Validado por Comprobante",
      kickoffDate: chosenDay?.fullDate || chosenDay?.label,
      kickoffTime: selectedTime,
      stage: "Kickoff & Arquitectura Inicial",
      progressPercent: 20,
      tasks: [
        { id: 1, text: "Sesión de Kickoff y Alineación de Alcance", done: true },
        { id: 2, text: "Recepción de Activos de Marca y Accesos", done: false },
        { id: 3, text: "Maquetación de Arquitectura y Mockups", done: false },
        { id: 4, text: "Integración de Pasarelas y Logística", done: false },
        { id: 5, text: "Capacitación Andragógica y Entrega de Constancia", done: false }
      ],
      totalAmount: selectedPlan.includes("9,850") ? 9850 : selectedPlan.includes("5,450") ? 5450 : selectedPlan.includes("3,700") ? 3700 : selectedPlan.includes("2,750") ? 2750 : 950,
      depositPaid: depositStatus === "pagado" ? (selectedPlan.includes("9,850") ? 3940 : selectedPlan.includes("5,450") ? 2725 : 1850) : 0,
      depositVerified: depositStatus === "pagado",
      createdAt: new Date().toISOString()
    };

    // Guardar en Dashboard Pro Local y Base de Datos
    try {
      const existing = JSON.parse(localStorage.getItem("tsolutions_pro_projects") || "[]");
      existing.unshift(projectData);
      localStorage.setItem("tsolutions_pro_projects", JSON.stringify(existing));
      localStorage.setItem("tsolutions_current_client_id", clientId);

      await fetch("/api/projects-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      }).catch(() => {});

      setConfirmedProject(projectData);
      setStatus("success");
    } catch (err) {
      setConfirmedProject(projectData);
      setStatus("success");
    }
  };

  if (status === "success" && confirmedProject) {
    return (
      <div className="bg-negroProfundo text-blancoPuro min-h-screen pb-16">
        <header className="w-full border-b border-white/10 bg-midnightPanel py-4 px-6 text-center">
          <span className="font-bruno text-base text-blancoPuro">TSOLUTIONS <span className="text-naranjaEnergy text-xs border border-naranjaEnergy px-2 py-0.5 rounded">KICKOFF CONFIRMADO</span></span>
        </header>

        <main className="max-w-3xl mx-auto px-4 py-10 text-center">
          <div className="bg-midnightPanel p-8 sm:p-10 rounded-large border-2 border-naranjaEnergy shadow-glowEnergy">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border-2 border-emerald-400 text-3xl flex items-center justify-center mx-auto mb-4 animate-bounce">✓</div>
            
            <span className="text-xs font-bold text-naranjaEnergy uppercase tracking-widest block mb-1">PROYECTO REGISTRADO EN SISTEMA</span>
            <h1 className="font-bruno text-2xl sm:text-3xl text-blancoPuro mb-4">¡Sesión de Kickoff Agendada con Éxito!</h1>

            {/* IDENTIFICADOR ÚNICO DESTACADO */}
            <div className="bg-negroProfundo p-5 rounded-large border border-naranjaEnergy/60 max-w-md mx-auto mb-6 shadow-inner">
              <span className="text-[11px] text-humo uppercase block mb-1">Tu Identificador Único de Cliente:</span>
              <span className="font-mono text-2xl sm:text-3xl font-extrabold text-naranjaEnergy tracking-widest block py-1 bg-midnightPanel rounded border border-white/10 shadow-glowEnergy">
                {confirmedProject.clientId}
              </span>
              <p className="text-[10px] text-humo mt-2">Guarda este código para consultar el avance de tu proyecto, pagos y soporte técnico en el Portal del Cliente.</p>
            </div>

            <div className="bg-negroProfundo/70 p-5 rounded-medium border border-white/10 text-left text-xs max-w-md mx-auto mb-6 space-y-2">
              <div><span className="text-humo">Fecha de Kickoff:</span> <strong className="text-blancoPuro">{confirmedProject.kickoffDate} a las {confirmedProject.kickoffTime}</strong></div>
              <div><span className="text-humo">Proyecto:</span> <strong className="text-blancoPuro">{confirmedProject.projectName} ({confirmedProject.plan})</strong></div>
              <div><span className="text-humo">Lugar:</span> <strong className="text-emerald-400">Google Meet (1 hora de alineación técnica)</strong></div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link to={`/portal-cliente?id=${confirmedProject.clientId}`} className="px-6 py-3.5 bg-naranjaEnergy hover:bg-orange-600 text-white font-bruno text-xs rounded-medium shadow-glowEnergy">
                🚀 Entrar a Mi Portal de Cliente
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-negroProfundo text-blancoPuro min-h-screen pb-16">
      <header className="w-full border-b border-white/10 bg-midnightPanel py-4 px-6 text-center">
        <span className="font-bruno text-base text-blancoPuro">TSOLUTIONS <span className="text-naranjaEnergy text-xs bg-naranjaEnergy/10 border border-naranjaEnergy/30 px-2 py-0.5 rounded">SESIÓN PRIVADA DE KICKOFF</span></span>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="font-bruno text-2xl sm:text-3xl text-blancoPuro">Arranque Técnico: <span className="text-naranjaEnergy">Sesión de Kickoff</span></h1>
          <p className="text-xs text-humo mt-2 max-w-xl mx-auto">Esta agenda es exclusiva para clientes con contrato o proyecto en proceso de inicio formal.</p>
        </div>

        <form onSubmit={handleBooking} className="bg-midnightPanel p-6 sm:p-8 rounded-large border border-white/10 shadow-card space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase mb-1">Nombre Completo *</label>
              <input type="text" required value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Ej. Juan Pérez" className="w-full bg-negroProfundo border border-white/10 rounded-medium px-3.5 py-2.5 text-xs text-blancoPuro focus:outline-none focus:border-naranjaEnergy" />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase mb-1">Nombre del Negocio / Proyecto Base *</label>
              <input type="text" required value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="Ej. Ferretería El Águila" className="w-full bg-negroProfundo border border-white/10 rounded-medium px-3.5 py-2.5 text-xs text-blancoPuro focus:outline-none focus:border-naranjaEnergy" />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase mb-1">Correo Electrónico *</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@correo.com" className="w-full bg-negroProfundo border border-white/10 rounded-medium px-3.5 py-2.5 text-xs text-blancoPuro focus:outline-none focus:border-naranjaEnergy" />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase mb-1">WhatsApp *</label>
              <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+52 55 1234 5678" className="w-full bg-negroProfundo border border-white/10 rounded-medium px-3.5 py-2.5 text-xs text-blancoPuro focus:outline-none focus:border-naranjaEnergy" />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase mb-1">Paquete Contratado *</label>
            <select value={selectedPlan} onChange={(e) => setSelectedPlan(e.target.value)} className="w-full bg-negroProfundo border border-white/10 rounded-medium px-3.5 py-2.5 text-xs text-blancoPuro">
              <option value="Paquete Híbrido Escala Rápida ($3,700 MXN - Esquema 50/50)">Paquete Híbrido Escala Rápida ($3,700 MXN - Anticipo 50/50)</option>
              <option value="Ecosistema Total ($5,450 MXN - Esquema 50/50)">Ecosistema Total ($5,450 MXN - Esquema 50/50)</option>
              <option value="E-commerce Total con Logística ($9,850 MXN - Esquema 40/30/30)">E-commerce Total con Logística ($9,850 MXN - Esquema 40/30/30)</option>
              <option value="Tu Negocio en Google ($2,750 MXN)">Tu Negocio en Google ($2,750 MXN)</option>
              <option value="Tarjeta Smart ($950 MXN - Contado)">Tarjeta Smart ($950 MXN - Contado)</option>
            </select>
          </div>

          {/* VERIFICACIÓN DE ANTICIPO */}
          <div className="p-4 rounded-medium bg-amber-500/10 border border-amber-500/40 text-xs space-y-2">
            <span className="font-bruno text-amber-300 block">⚠️ Verificación Obligatoria de Anticipo</span>
            <p className="text-humo text-[11px]">Para los proyectos 50/50 o 40/30/30, el anticipo debe estar pagado antes de iniciar la reunión de Kickoff.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-[10px] uppercase font-bold text-blancoPuro mb-1">Estado de Pago del Anticipo:</label>
                <select value={depositStatus} onChange={(e) => setDepositStatus(e.target.value)} className="w-full bg-negroProfundo border border-white/10 rounded px-2.5 py-2 text-xs text-blancoPuro">
                  <option value="pagado">✓ Anticipo Ya Pagado / Validado</option>
                  <option value="transferencia_proceso">Transferencia en proceso</option>
                  <option value="por_pagar">Pagaré antes de la sesión</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-blancoPuro mb-1">Folio o Ref. de Pago (Opcional):</label>
                <input type="text" value={paymentRef} onChange={(e) => setPaymentRef(e.target.value)} placeholder="Ej. STRIPE-9821 o Transf. BBVA" className="w-full bg-negroProfundo border border-white/10 rounded px-2.5 py-2 text-xs text-blancoPuro" />
              </div>
            </div>
          </div>

          {/* DÍA Y HORA */}
          <div>
            <label className="block text-[11px] font-bold uppercase mb-2">Selecciona Fecha y Hora de Kickoff:</label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-3">
              {availableDays.map((day, idx) => (
                <button type="button" key={day.id} onClick={() => setSelectedDayIdx(idx)} className={`p-2.5 rounded border text-left text-xs ${selectedDayIdx === idx ? "bg-naranjaEnergy text-white font-bold border-naranjaEnergy" : "bg-negroProfundo border-white/10 text-humo"}`}>
                  <span className="text-[9px] block">{day.badge}</span>
                  <strong className="block">{day.label}</strong>
                </button>
              ))}
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {["09:00 AM", "10:30 AM", "12:00 PM", "03:30 PM", "05:00 PM", "06:30 PM"].map((t) => (
                <button type="button" key={t} onClick={() => setSelectedTime(t)} className={`py-2 rounded border text-center text-xs font-mono ${selectedTime === t ? "bg-naranjaEnergy text-white font-bold" : "bg-negroProfundo border-white/10 text-humo"}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" disabled={status === "loading"} className="w-full py-4 bg-naranjaEnergy hover:bg-orange-600 text-white font-bruno text-sm rounded-medium shadow-glowEnergy transition">
            {status === "loading" ? "Generando ID y Agendando..." : "🚀 Confirmar Kickoff y Generar Identificador de Proyecto"}
          </button>
        </form>
      </main>
    </div>
  );
}
