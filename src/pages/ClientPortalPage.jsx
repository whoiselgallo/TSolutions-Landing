import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";

export default function ClientPortalPage() {
  const [searchParams] = useSearchParams();

  // ================= CAPA 1: AUTENTICACIÓN POR CORREO (CUALQUIER DOMINIO) =================
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [authError, setAuthError] = useState("");

  // ================= CAPA 2: IDENTIFICACIÓN POR IDENTIFICADOR ÚNICO =================
  const [inputCode, setInputCode] = useState(searchParams.get("id") || "");
  const [isCodeActivated, setIsCodeActivated] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [codeError, setCodeError] = useState("");

  // Pestaña activa del portal del cliente
  const [activeTab, setActiveTab] = useState("resumen"); // resumen | contrato | financiero | garantia | capacitacion | tickets

  // Nuevo ticket del cliente
  const [ticketTitle, setTicketTitle] = useState("");
  const [ticketPriority, setTicketPriority] = useState("Media");
  const [ticketSuccess, setTicketSuccess] = useState("");

  // Cargar sesión previa de cliente
  useEffect(() => {
    const savedClientEmail = localStorage.getItem("tsolutions_client_email");
    const savedAuth = localStorage.getItem("tsolutions_client_authenticated");
    if (savedAuth === "true" && savedClientEmail) {
      setIsAuthenticated(true);
      setAuthEmail(savedClientEmail);

      // Si ya tenía un código activado en sesión o URL
      const initialId = searchParams.get("id") || localStorage.getItem("tsolutions_active_client_id");
      if (initialId) {
        setInputCode(initialId);
        activateClientProject(initialId, savedClientEmail);
      }
    }
  }, [searchParams]);

  // Manejar Login / Registro de Contraseña
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setAuthError("");

    const emailTrimmed = authEmail.trim().toLowerCase();
    if (!emailTrimmed || !emailTrimmed.includes("@")) {
      setAuthError("Por favor ingresa un correo electrónico válido.");
      return;
    }

    // Verificar si el correo ya tiene una contraseña registrada
    const registeredUsers = JSON.parse(localStorage.getItem("tsolutions_registered_clients") || "{}");
    const existingPassword = registeredUsers[emailTrimmed];

    if (!existingPassword) {
      // Primer inicio de sesión: debe crear su contraseña
      if (!isFirstLogin) {
        setIsFirstLogin(true);
        setAuthError("Bienvenido. Como es tu primer inicio de sesión, por favor crea tu contraseña segura.");
        return;
      }

      if (authPassword.length < 6) {
        setAuthError("La contraseña debe tener al menos 6 caracteres.");
        return;
      }
      if (authPassword !== confirmPassword) {
        setAuthError("Las contraseñas no coinciden.");
        return;
      }

      // Guardar contraseña creada
      registeredUsers[emailTrimmed] = authPassword;
      localStorage.setItem("tsolutions_registered_clients", JSON.stringify(registeredUsers));
    } else {
      // Usuario recurrente: validar contraseña
      if (authPassword !== existingPassword) {
        setAuthError("Contraseña incorrecta. Verifica tus credenciales.");
        return;
      }
    }

    // Autenticación exitosa Capa 1
    setIsAuthenticated(true);
    localStorage.setItem("tsolutions_client_email", emailTrimmed);
    localStorage.setItem("tsolutions_client_authenticated", "true");

    // Si viene con ID en URL, activarlo de inmediato
    const initialId = searchParams.get("id") || localStorage.getItem("tsolutions_active_client_id");
    if (initialId) {
      activateClientProject(initialId, emailTrimmed);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsCodeActivated(false);
    setActiveProject(null);
    localStorage.removeItem("tsolutions_client_authenticated");
    localStorage.removeItem("tsolutions_active_client_id");
    setAuthPassword("");
    setConfirmPassword("");
  };

  // ================= ACTIVAR EXPEDIENTE MEDIANTE IDENTIFICADOR ÚNICO =================
  const activateClientProject = (codeToActivate, userEmail) => {
    const code = (codeToActivate || inputCode).trim().toUpperCase();
    if (!code) {
      setCodeError("Ingresa tu Identificador Único (formato XXX-0000-000).");
      return;
    }

    setCodeError("");
    const stored = JSON.parse(localStorage.getItem("tsolutions_pro_projects") || "[]");
    
    // Proyecto demo de respaldo en caso de prueba
    const defaultDemos = [
      {
        clientId: "FER-5678-842",
        projectName: "Ferretería El Águila",
        clientName: "Carlos Mendoza",
        phone: "+52 55 1234 5678",
        email: "carlos@ferreaguila.com",
        plan: "Paquete Híbrido Escala Rápida",
        scheme: "50/50",
        totalAmount: 3700,
        depositPaid: 1850,
        pendingBalance: 1850,
        depositStatus: "Pagado",
        contractFolio: "CONTRATO-TS-2026-0842",
        contractSignedDate: "28 de Agosto de 2026",
        slaCoverage: "30 Días de Garantía de Estabilización y Soporte Correctivo",
        intellectualPropertyClause: "Transferencia total de código, dominio y credenciales al cliente al finiquito. Cero código huérfano.",
        progress: 65,
        stage: "Integración de Smart Web & Google Maps",
        kickoffDate: "Jueves 4 Sep, 10:00 AM",
        trainingAndragogy: {
          status: "En Proceso",
          hoursCompleted: 2,
          totalHours: 4,
          certifiedMembers: ["Carlos Mendoza (Director General)", "Mariana López (Operaciones)"],
          topics: ["Administración de Perfil en Google Maps", "Gestión de Pedidos en Zona de Pulgar", "Actualización de Catálogos"]
        },
        tickets: [
          { id: "TCK-101", title: "Actualización de logo en alta resolución", status: "Resuelto", priority: "Baja", date: "2026-08-28" }
        ],
        tasks: [
          { id: 1, text: "Sesión de Kickoff y Alineación de Alcance", done: true },
          { id: 2, text: "Configuración de Google Maps y SEO Local", done: true },
          { id: 3, text: "Smart Web vertical conectada a WhatsApp", done: false },
          { id: 4, text: "Capacitación andragógica y entrega de constancia", done: false }
        ]
      }
    ];

    const allProjects = [...stored, ...defaultDemos];
    const found = allProjects.find(p => p.clientId?.toUpperCase() === code);

    if (found) {
      setActiveProject(found);
      setIsCodeActivated(true);
      localStorage.setItem("tsolutions_active_client_id", code);
    } else {
      setCodeError(`No se encontró ningún expediente activo con el ID ${code}. Revisa tu código o consulta a contacto@tsolutionsipidd.com.`);
    }
  };

  // Crear ticket de soporte desde el portal
  const handleCreateTicket = (e) => {
    e.preventDefault();
    if (!ticketTitle.trim() || !activeProject) return;

    const newTck = {
      id: `TCK-${Math.floor(100 + Math.random() * 900)}`,
      title: ticketTitle.trim(),
      status: "Abierto",
      priority: ticketPriority,
      date: new Date().toLocaleDateString("es-MX")
    };

    const updatedProject = {
      ...activeProject,
      tickets: [...(activeProject.tickets || []), newTck]
    };

    setActiveProject(updatedProject);

    // Persistir en local
    const stored = JSON.parse(localStorage.getItem("tsolutions_pro_projects") || "[]");
    const updatedList = stored.map(p => p.clientId === activeProject.clientId ? updatedProject : p);
    localStorage.setItem("tsolutions_pro_projects", JSON.stringify(updatedList));

    setTicketSuccess(`✓ Ticket #${newTck.id} registrado con éxito. El área técnica lo atenderá de acuerdo al SLA de tu garantía.`);
    setTicketTitle("");
    setTimeout(() => setTicketSuccess(""), 6000);
  };

  // ================= PANTALLA CAPA 1: LOGIN / REGISTRO POR CORREO =================
  if (!isAuthenticated) {
    return (
      <div className="bg-negroProfundo text-blancoPuro min-h-screen flex flex-col justify-center items-center px-4 py-12 selection:bg-naranjaEnergy selection:text-white">
        <div className="max-w-md w-full bg-midnightPanel p-8 rounded-large border border-white/10 shadow-card text-center relative overflow-hidden">
          
          <div 
            className="w-14 h-14 border border-naranjaEnergy bg-negroProfundo flex items-center justify-center p-2.5 shadow-glowEnergy mx-auto mb-4"
            style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
          >
            <img src="/assets/TSolutionslogo/logoTSVG.svg" alt="TSolutions Logo" className="w-full h-full object-contain" />
          </div>

          <span className="text-[10px] font-bold text-naranjaEnergy uppercase tracking-widest block mb-1">
            PORTAL DEL CLIENTE &bull; CAPA 1
          </span>
          <h1 className="font-bruno text-xl sm:text-2xl text-blancoPuro mb-2">
            Acceso a tu <span className="text-naranjaEnergy">Expediente de Proyecto</span>
          </h1>
          <p className="text-xs text-humo mb-6">
            Inicia sesión con tu correo electrónico (se acepta cualquier dominio: Gmail, Outlook, empresa, etc.).
          </p>

          {authError && (
            <div className="p-3.5 mb-5 rounded-medium bg-naranjaEnergy/15 border border-naranjaEnergy/40 text-naranjaEnergy text-xs text-left">
              {authError}
            </div>
          )}

          <form onSubmit={handleAuthSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-blancoPuro mb-1">
                Tu Correo Electrónico *
              </label>
              <input
                type="email"
                required
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                placeholder="tu@correo.com"
                className="w-full bg-negroProfundo border border-white/15 rounded-medium px-3.5 py-2.5 text-xs text-blancoPuro focus:outline-none focus:border-naranjaEnergy"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-blancoPuro mb-1">
                {isFirstLogin ? "Crea tu Contraseña Segura *" : "Tu Contraseña *"}
              </label>
              <input
                type="password"
                required
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                className="w-full bg-negroProfundo border border-white/15 rounded-medium px-3.5 py-2.5 text-xs text-blancoPuro focus:outline-none focus:border-naranjaEnergy"
              />
            </div>

            {isFirstLogin && (
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-blancoPuro mb-1">
                  Confirma tu Contraseña *
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repite tu contraseña"
                  className="w-full bg-negroProfundo border border-white/15 rounded-medium px-3.5 py-2.5 text-xs text-blancoPuro focus:outline-none focus:border-naranjaEnergy"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-naranjaEnergy hover:bg-orange-600 text-white font-bruno text-xs sm:text-sm rounded-medium shadow-glowEnergy transition-all cursor-pointer mt-2"
            >
              {isFirstLogin ? "✨ Crear Contraseña y Entrar" : "🚀 Iniciar Sesión de Cliente"}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center text-[11px]">
            <Link to="/" className="text-humo hover:text-white transition">← Volver al Inicio</Link>
            <Link to="/dashboard-pro" className="text-humo/60 hover:text-humo">Acceso Admin</Link>
          </div>
        </div>
      </div>
    );
  }

  // ================= PANTALLA CAPA 2: ACTIVACIÓN POR IDENTIFICADOR ÚNICO =================
  if (!isCodeActivated || !activeProject) {
    return (
      <div className="bg-negroProfundo text-blancoPuro min-h-screen pb-16">
        <header className="w-full border-b border-white/10 bg-midnightPanel py-3.5 px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bruno text-sm text-blancoPuro">TSOLUTIONS <span className="text-naranjaEnergy text-xs border border-naranjaEnergy px-1.5 py-0.5 rounded">PORTAL CLIENTE</span></span>
            <span className="text-[11px] text-humo hidden sm:inline">&bull; Sesión: {authEmail}</span>
          </div>
          <button onClick={handleLogout} className="text-xs bg-negroProfundo border border-white/10 px-3 py-1.5 rounded font-bold text-humo hover:text-white">
            Cerrar Sesión
          </button>
        </header>

        <main className="max-w-xl mx-auto px-4 py-12 text-center">
          <div className="bg-midnightPanel p-8 rounded-large border border-naranjaEnergy/40 shadow-glowEnergy space-y-4">
            <div className="w-12 h-12 rounded-full bg-naranjaEnergy/20 text-naranjaEnergy border border-naranjaEnergy/40 flex items-center justify-center text-xl mx-auto mb-2">
              🔑
            </div>
            
            <span className="text-[10px] font-bold text-naranjaEnergy uppercase tracking-widest block">
              CAPA 2 &bull; IDENTIFICACIÓN DE PROYECTO
            </span>

            <h1 className="font-bruno text-xl sm:text-2xl text-blancoPuro">
              Activa tu Expediente de Proyecto
            </h1>

            <p className="text-xs text-humo leading-relaxed">
              Introduce el <strong>Identificador Único</strong> que se te asignó en tu confirmación de Kickoff o contrato (formato <code>XXX-0000-000</code>).
            </p>

            {codeError && (
              <div className="p-3 rounded bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs text-left">
                ✕ {codeError}
              </div>
            )}

            <form onSubmit={(e) => { e.preventDefault(); activateClientProject(); }} className="space-y-3 pt-2 text-left">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-blancoPuro mb-1">
                  Identificador Único de Cliente *
                </label>
                <input
                  type="text"
                  required
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  placeholder="Ej. FER-5678-842"
                  className="w-full bg-negroProfundo border border-white/15 rounded-medium px-4 py-3 text-sm text-blancoPuro font-mono uppercase focus:outline-none focus:border-naranjaEnergy tracking-wider"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-naranjaEnergy hover:bg-orange-600 text-white font-bruno text-xs sm:text-sm rounded-medium shadow-glowEnergy transition-all cursor-pointer"
              >
                🔓 Desbloquear y Ver Información Legal & Avance
              </button>
            </form>

            <div className="pt-4 border-t border-white/10 text-[11px] text-humo">
              ¿No tienes tu código a la mano? Solicítalo vía WhatsApp a <strong className="text-blancoPuro">contacto@tsolutionsipidd.com</strong>.
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ================= EXPEDIENTE COMPLETO DESBLOQUEADO (INFORMACIÓN LEGAL Y AVANCE) =================
  return (
    <div className="bg-negroProfundo text-blancoPuro min-h-screen pb-16">
      
      {/* HEADER DEL PORTAL */}
      <header className="w-full border-b border-white/10 bg-midnightPanel py-3.5 px-6 sticky top-0 z-40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-bruno text-sm sm:text-base text-blancoPuro">TSOLUTIONS <span className="text-naranjaEnergy text-xs bg-naranjaEnergy/20 px-2 py-0.5 rounded border border-naranjaEnergy/40">EXPEDIENTE DIGITAL</span></span>
          <span className="font-mono text-xs font-bold text-naranjaEnergy bg-negroProfundo px-2.5 py-1 rounded border border-white/10">
            {activeProject.clientId}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-humo hidden sm:inline">{authEmail}</span>
          <button onClick={handleLogout} className="text-xs bg-negroProfundo border border-white/10 px-3 py-1.5 rounded font-bold text-humo hover:text-white transition">
            Cerrar Sesión
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        
        {/* RESUMEN SUPERIOR DEL PROYECTO */}
        <div className="bg-midnightPanel p-6 rounded-large border border-white/10 shadow-card flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-[10px] font-bold text-naranjaEnergy uppercase tracking-widest block mb-1">PROYECTO ACTIVO EN EJECUCIÓN</span>
            <h1 className="font-bruno text-xl sm:text-2xl text-blancoPuro">{activeProject.projectName}</h1>
            <p className="text-xs text-humo mt-0.5">Titular: <strong>{activeProject.clientName}</strong> &bull; Plan: <strong className="text-naranjaEnergy">{activeProject.plan}</strong></p>
          </div>
          <div className="text-left sm:text-right text-xs bg-negroProfundo/80 p-3 rounded border border-white/10">
            <span className="text-humo block text-[10px]">PRÓXIMA SESIÓN TÉCNICA:</span>
            <strong className="text-emerald-400 font-mono text-xs sm:text-sm">{activeProject.kickoffDate} ({activeProject.kickoffTime || "10:00 AM"})</strong>
          </div>
        </div>

        {/* NAVEGACIÓN DE SECCIONES LEGALES Y DE AVANCE */}
        <div className="flex gap-2 border-b border-white/10 pb-2 overflow-x-auto text-xs font-bold">
          <button onClick={() => setActiveTab("resumen")} className={`px-4 py-2 rounded-t whitespace-nowrap ${activeTab === "resumen" ? "bg-naranjaEnergy text-white" : "text-humo hover:text-white"}`}>📈 Avance & Trazabilidad</button>
          <button onClick={() => setActiveTab("contrato")} className={`px-4 py-2 rounded-t whitespace-nowrap ${activeTab === "contrato" ? "bg-naranjaEnergy text-white" : "text-humo hover:text-white"}`}>📑 Alcance & Cláusulas Legales</button>
          <button onClick={() => setActiveTab("financiero")} className={`px-4 py-2 rounded-t whitespace-nowrap ${activeTab === "financiero" ? "bg-naranjaEnergy text-white" : "text-humo hover:text-white"}`}>💳 Desglose Financiero & Pagos</button>
          <button onClick={() => setActiveTab("garantia")} className={`px-4 py-2 rounded-t whitespace-nowrap ${activeTab === "garantia" ? "bg-naranjaEnergy text-white" : "text-humo hover:text-white"}`}>🛡️ Garantía & SLA</button>
          <button onClick={() => setActiveTab("capacitacion")} className={`px-4 py-2 rounded-t whitespace-nowrap ${activeTab === "capacitacion" ? "bg-naranjaEnergy text-white" : "text-humo hover:text-white"}`}>🎓 Constancia Andragógica</button>
          <button onClick={() => setActiveTab("tickets")} className={`px-4 py-2 rounded-t whitespace-nowrap ${activeTab === "tickets" ? "bg-naranjaEnergy text-white" : "text-humo hover:text-white"}`}>🛠️ Tickets & Soporte</button>
        </div>

        {/* SECCIÓN 1: AVANCE & TRAZABILIDAD */}
        {activeTab === "resumen" && (
          <div className="bg-midnightPanel p-6 rounded-large border border-white/10 shadow-card space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bruno text-base text-blancoPuro">Progreso Real del Despliegue</h3>
                <span className="text-xs text-humo">Fase actual: <strong className="text-naranjaEnergy">{activeProject.stage}</strong></span>
              </div>
              <span className="font-mono text-2xl font-black text-naranjaEnergy">{activeProject.progress || 20}%</span>
            </div>

            <div className="w-full h-3.5 bg-negroProfundo rounded-full overflow-hidden border border-white/10">
              <div className="h-full bg-gradient-to-r from-orange-600 via-naranjaEnergy to-emerald-400 transition-all duration-500" style={{ width: `${activeProject.progress || 20}%` }}></div>
            </div>

            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-naranjaEnergy uppercase tracking-widest block">Entregables y Registro de Actividades:</span>
              {(activeProject.tasks || []).map((t) => (
                <div key={t.id} className="p-3.5 rounded-medium bg-negroProfundo border border-white/5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className={t.done ? "text-emerald-400 font-bold" : "text-humo"}>{t.done ? "✓" : "⏳"}</span>
                    <span className={t.done ? "text-blancoPuro font-semibold" : "text-humo"}>{t.text}</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${t.done ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-white/5 text-humo"}`}>
                    {t.done ? "Completado" : "En Desarrollo"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECCIÓN 2: ALCANCE & CLÁUSULAS LEGALES */}
        {activeTab === "contrato" && (
          <div className="bg-midnightPanel p-6 sm:p-8 rounded-large border border-white/10 shadow-card space-y-5 text-xs">
            <div className="border-b border-white/10 pb-3 flex justify-between items-center">
              <div>
                <h3 className="font-bruno text-base text-blancoPuro">Expediente Contractual y Alcance de Servicio</h3>
                <span className="text-[11px] text-humo">Folio Digital: <strong className="font-mono text-blancoPuro">{activeProject.contractFolio || "CONTRATO-TS-2026-ACTIVO"}</strong></span>
              </div>
              <span className="text-[10px] px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">VIGENTE Y FIRMADO</span>
            </div>

            <div className="space-y-4 leading-relaxed text-blancoPuro/90">
              <div className="p-4 rounded bg-negroProfundo border border-white/5">
                <strong className="text-naranjaEnergy block mb-1">1. Objeto y Alcance del Paquete Contratado:</strong>
                <p className="text-humo">Desarrollo, configuración, integración técnica y puesta en marcha de la infraestructura digital correspondiente al <strong>{activeProject.plan}</strong> para la unidad de negocio <strong>{activeProject.projectName}</strong>.</p>
              </div>

              <div className="p-4 rounded bg-negroProfundo border border-white/5">
                <strong className="text-naranjaEnergy block mb-1">2. Cláusula de Propiedad Intelectual e Independencia Operativa:</strong>
                <p className="text-humo">TSolutions IPIDD transfiere la titularidad completa de los accesos, configuraciones y código al cliente al cubrir el finiquito del proyecto. Erradicamos la dependencia tecnológica forzada: el cliente es dueño 100% de sus activos.</p>
              </div>

              <div className="p-4 rounded bg-negroProfundo border border-white/5">
                <strong className="text-naranjaEnergy block mb-1">3. Tiempos de Entrega y Compromiso Técnico:</strong>
                <p className="text-humo">El despliegue operativo y la entrega final se realizan conforme a las fechas acordadas en la sesión de Kickoff, sujetas a la validación de activos proporcionados por el cliente.</p>
              </div>
            </div>
          </div>
        )}

        {/* SECCIÓN 3: DESGLOSE FINANCIERO */}
        {activeTab === "financiero" && (
          <div className="bg-midnightPanel p-6 sm:p-8 rounded-large border border-white/10 shadow-card space-y-6">
            <h3 className="font-bruno text-base text-blancoPuro border-b border-white/10 pb-3">Estado de Cuenta y Esquema de Pagos</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded bg-negroProfundo border border-white/10">
                <span className="text-[10px] text-humo uppercase font-bold">Total del Contrato</span>
                <strong className="text-xl font-bruno text-blancoPuro block mt-1">${activeProject.totalAmount?.toLocaleString()} MXN</strong>
                <span className="text-[10px] text-humo mt-1 block">Esquema: {activeProject.scheme || "50/50"}</span>
              </div>
              <div className="p-4 rounded bg-negroProfundo border border-emerald-500/40">
                <span className="text-[10px] text-emerald-400 uppercase font-bold">Anticipo Cubierto</span>
                <strong className="text-xl font-bruno text-emerald-400 block mt-1">✓ ${activeProject.depositPaid?.toLocaleString()} MXN</strong>
                <span className="text-[10px] text-emerald-300 mt-1 block">Validado y en orden</span>
              </div>
              <div className="p-4 rounded bg-negroProfundo border border-amber-500/40">
                <span className="text-[10px] text-amber-300 uppercase font-bold">Saldo al Despliegue</span>
                <strong className="text-xl font-bruno text-amber-300 block mt-1">${((activeProject.totalAmount || 0) - (activeProject.depositPaid || 0)).toLocaleString()} MXN</strong>
                <span className="text-[10px] text-humo mt-1 block">Exigible a la entrega final</span>
              </div>
            </div>

            <div className="p-4 rounded bg-negroProfundo/70 border border-white/5 text-xs text-humo flex items-center justify-between">
              <div>
                <strong className="text-blancoPuro block">¿Requieres Factura Fiscal (CFDI)?</strong>
                <span>Envía tu Constancia de Situación Fiscal actualizada a facturacion@tsolutionsipidd.com</span>
              </div>
              <a href="mailto:facturacion@tsolutionsipidd.com" className="px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-blancoPuro text-xs font-bold transition">
                Solicitar Factura
              </a>
            </div>
          </div>
        )}

        {/* SECCIÓN 4: GARANTÍA & SLA */}
        {activeTab === "garantia" && (
          <div className="bg-midnightPanel p-6 sm:p-8 rounded-large border border-white/10 shadow-card space-y-5 text-xs leading-relaxed">
            <h3 className="font-bruno text-base text-blancoPuro border-b border-white/10 pb-3">Póliza de Garantía & Acuerdo de Nivel de Servicio (SLA)</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded bg-negroProfundo border border-white/5 space-y-2">
                <strong className="text-emerald-400 font-bold block text-sm">🛡️ Cobertura de Garantía Post-Lanzamiento</strong>
                <p className="text-humo">Tu proyecto incluye <strong>30 días naturales de garantía de estabilización</strong> a partir del despliegue final para corregir cualquier anomalía técnica, desajuste de diseño o configuración sin costo adicional.</p>
              </div>

              <div className="p-4 rounded bg-negroProfundo border border-white/5 space-y-2">
                <strong className="text-naranjaEnergy font-bold block text-sm">⏱️ Tiempos de Respuesta a Incidencias (SLA)</strong>
                <ul className="text-humo space-y-1">
                  <li>• <strong>Incidencias Críticas (Fallo en cobros o caídas):</strong> &lt; 4 horas hábiles.</li>
                  <li>• <strong>Ajustes Normales / Dudas Operativas:</strong> &lt; 24 horas hábiles.</li>
                  <li>• <strong>Canal prioritario:</strong> Vía ticket en este portal o WhatsApp directivo.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* SECCIÓN 5: CAPACITACIÓN ANDRAGÓGICA */}
        {activeTab === "capacitacion" && (
          <div className="bg-midnightPanel p-6 sm:p-8 rounded-large border border-white/10 shadow-card space-y-5 text-xs">
            <div className="border-b border-white/10 pb-3 flex justify-between items-center">
              <div>
                <h3 className="font-bruno text-base text-blancoPuro">Constancia de Transferencia Andragógica de Conocimiento</h3>
                <span className="text-[11px] text-humo">Certificación de Dominio Operativo para el Equipo del Cliente</span>
              </div>
              <span className="text-[10px] px-2.5 py-1 rounded bg-naranjaEnergy/20 text-naranjaEnergy border border-naranjaEnergy/40 font-bold">METODOLOGÍA TSOLUTIONS</span>
            </div>

            <div className="p-4 rounded bg-negroProfundo border border-white/5 space-y-3">
              <p className="text-blancoPuro leading-relaxed">
                En TSolutions IPIDD no dejamos software abandonado. Capacitamos a los colaboradores clave de <strong>{activeProject.projectName}</strong> para asegurar su autonomía completa en la operación de pedidos, cobros y administración.
              </p>

              <div className="pt-2 border-t border-white/10">
                <strong className="text-naranjaEnergy block mb-1">Módulos de Capacitación Incluidos:</strong>
                <ul className="text-humo list-disc list-inside space-y-1">
                  <li>Administración del Perfil de Negocio en Google Maps y SEO Local.</li>
                  <li>Gestión y despacho de pedidos rápidos en zona de pulgar por WhatsApp.</li>
                  <li>Uso de pasarelas de pago y conciliación de cobros con Terminal Point Mini.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* SECCIÓN 6: TICKETS & SOPORTE */}
        {activeTab === "tickets" && (
          <div className="bg-midnightPanel p-6 sm:p-8 rounded-large border border-white/10 shadow-card space-y-6">
            <div className="border-b border-white/10 pb-3">
              <h3 className="font-bruno text-base text-blancoPuro">Consolidación de Tickets de Soporte y Reporte de Errores</h3>
              <p className="text-xs text-humo mt-1">Levanta cualquier duda, ajuste o reporte técnico con trazabilidad y folio legal.</p>
            </div>

            {ticketSuccess && (
              <div className="p-3.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
                {ticketSuccess}
              </div>
            )}

            {/* FORMULARIO DE NUEVO TICKET */}
            <form onSubmit={handleCreateTicket} className="p-4 rounded-medium bg-negroProfundo border border-white/10 space-y-3">
              <span className="text-xs font-bold text-naranjaEnergy uppercase block">📝 Levantar Nuevo Ticket de Soporte:</span>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  required
                  value={ticketTitle}
                  onChange={(e) => setTicketTitle(e.target.value)}
                  placeholder="Describe la incidencia o solicitud de ajuste..."
                  className="flex-1 bg-midnightPanel border border-white/15 rounded px-3.5 py-2.5 text-xs text-blancoPuro focus:outline-none focus:border-naranjaEnergy"
                />
                <select
                  value={ticketPriority}
                  onChange={(e) => setTicketPriority(e.target.value)}
                  className="bg-midnightPanel border border-white/15 rounded px-3 py-2.5 text-xs text-blancoPuro"
                >
                  <option value="Baja">Prioridad Baja</option>
                  <option value="Media">Prioridad Media</option>
                  <option value="Alta">🔥 Prioridad Alta / Urgente</option>
                </select>
                <button
                  type="submit"
                  className="bg-naranjaEnergy hover:bg-orange-600 text-white font-bold text-xs px-5 py-2.5 rounded shadow-glowEnergy transition cursor-pointer"
                >
                  Enviar Ticket
                </button>
              </div>
            </form>

            {/* LISTADO DE TICKETS DEL CLIENTE */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-blancoPuro uppercase block">Historial de Tickets de tu Proyecto:</span>
              {(activeProject.tickets || []).length === 0 ? (
                <p className="text-xs text-humo">No tienes tickets pendientes. Tu proyecto está al día sin incidencias.</p>
              ) : (
                (activeProject.tickets || []).map((t) => (
                  <div key={t.id} className="p-3.5 rounded bg-negroProfundo border border-white/5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] text-naranjaEnergy bg-naranjaEnergy/10 px-2 py-0.5 rounded border border-naranjaEnergy/30">{t.id}</span>
                      <strong className="text-blancoPuro">{t.title}</strong>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${t.priority === "Alta" ? "bg-rose-500/20 text-rose-300 border border-rose-500/40" : "bg-white/10 text-humo"}`}>{t.priority}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold">{t.status}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
