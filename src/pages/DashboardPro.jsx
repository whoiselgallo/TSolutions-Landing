import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function DashboardPro() {
  // Autenticación Administrativa por Correo Organizacional
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const [activeTab, setActiveTab] = useState("proyectos"); // proyectos | financiero | tickets | contratos
  const [searchId, setSearchId] = useState("");

  const [projects, setProjects] = useState([
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
      progress: 65,
      stage: "Integración de WhatsApp & Maps",
      kickoffDate: "Jueves 4 Sep, 10:00 AM",
      slaCoverage: "Garantía Activa (30 días)",
      trainingCompleted: true,
      tickets: [
        { id: "TCK-101", title: "Actualización de logo en alta resolución", status: "Resuelto", priority: "Baja" }
      ],
      tasks: [
        { id: 1, text: "Sesión de Kickoff completada", done: true },
        { id: 2, text: "Configuración de Google Maps y SEO Local", done: true },
        { id: 3, text: "Smart Web vertical conectada a WhatsApp", done: false },
        { id: 4, text: "Capacitación andragógica y constancia", done: false }
      ]
    },
    {
      clientId: "CUE-4321-193",
      projectName: "La Cueva del Güero",
      clientName: "Roberto Garza",
      phone: "+52 33 9876 4321",
      email: "contacto@cuevadelguero.mx",
      plan: "E-commerce Total con Logística",
      scheme: "40/30/30",
      totalAmount: 9850,
      depositPaid: 3940,
      pendingBalance: 5910,
      depositStatus: "Pagado",
      progress: 40,
      stage: "Integración API Uber Direct",
      kickoffDate: "Lunes 8 Sep, 11:30 AM",
      slaCoverage: "Garantía Activa (30 días)",
      trainingCompleted: false,
      tickets: [
        { id: "TCK-102", title: "Configurar API Key de Uber Direct en ambiente staging", status: "En Proceso", priority: "Alta" }
      ],
      tasks: [
        { id: 1, text: "Sesión de Kickoff completada", done: true },
        { id: 2, text: "Catálogo de productos cargado", done: true },
        { id: 3, text: "Pasarela Stripe y Point Mini de regalo configurada", done: false },
        { id: 4, text: "Pruebas de despacho en 3 clics", done: false }
      ]
    }
  ]);

  // Nuevo ticket
  const [newTicketTitle, setNewTicketTitle] = useState("");
  const [newTicketTarget, setNewTicketTarget] = useState("");
  const [newTicketPriority, setNewTicketPriority] = useState("Media");

  useEffect(() => {
    // Verificar si ya hay sesión administrativa activa
    const savedAdmin = localStorage.getItem("tsolutions_admin_session");
    if (savedAdmin) {
      setIsAdminAuthenticated(true);
      setAdminEmail(savedAdmin);
    }

    try {
      const stored = localStorage.getItem("tsolutions_pro_projects");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.length > 0) setProjects(parsed);
      }
    } catch (e) {}
  }, []);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setAuthError("");

    const emailTrimmed = adminEmail.trim().toLowerCase();

    // Validación por correo organizacional @tsolutionsipidd.com o administrador
    const isOrganizational = emailTrimmed.endsWith("@tsolutionsipidd.com") || emailTrimmed === "contacto@tsolutionsipidd.com" || emailTrimmed === "admin@tsolutionsipidd.com";

    if (!isOrganizational) {
      setAuthError("Acceso denegado: Se requiere un correo corporativo organizacional (@tsolutionsipidd.com).");
      return;
    }

    if (adminPassword.length < 4) {
      setAuthError("Ingresa tu contraseña o código de acceso administrativo.");
      return;
    }

    // Autenticación exitosa
    setIsAdminAuthenticated(true);
    localStorage.setItem("tsolutions_admin_session", emailTrimmed);
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem("tsolutions_admin_session");
    setAdminPassword("");
  };

  const filteredProjects = searchId.trim()
    ? projects.filter(p => p.clientId?.toLowerCase().includes(searchId.toLowerCase()) || p.projectName?.toLowerCase().includes(searchId.toLowerCase()))
    : projects;

  const totalRevenue = projects.reduce((acc, p) => acc + (p.totalAmount || 0), 0);
  const totalDeposits = projects.reduce((acc, p) => acc + (p.depositPaid || 0), 0);
  const totalPending = projects.reduce((acc, p) => acc + (p.pendingBalance || ((p.totalAmount || 0) - (p.depositPaid || 0))), 0);

  const handleAddTicket = (e) => {
    e.preventDefault();
    if (!newTicketTitle || !newTicketTarget) return;

    const updated = projects.map(p => {
      if (p.clientId === newTicketTarget) {
        const tck = {
          id: `TCK-${Math.floor(100 + Math.random() * 900)}`,
          title: newTicketTitle,
          status: "Abierto",
          priority: newTicketPriority
        };
        return { ...p, tickets: [...(p.tickets || []), tck] };
      }
      return p;
    });

    setProjects(updated);
    localStorage.setItem("tsolutions_pro_projects", JSON.stringify(updated));
    setNewTicketTitle("");
  };

  const handleToggleTask = (clientIndex, taskId) => {
    const updated = [...projects];
    const client = updated[clientIndex];
    client.tasks = (client.tasks || []).map(t => t.id === taskId ? { ...t, done: !t.done } : t);
    const completedCount = client.tasks.filter(t => t.done).length;
    client.progress = Math.round((completedCount / client.tasks.length) * 100);
    setProjects(updated);
    localStorage.setItem("tsolutions_pro_projects", JSON.stringify(updated));
  };

  // ================= PANTALLA DE LOGIN ADMINISTRATIVO ORGANIZACIONAL =================
  if (!isAdminAuthenticated) {
    return (
      <div className="bg-negroProfundo text-blancoPuro min-h-screen flex flex-col justify-center items-center px-4 py-12 selection:bg-naranjaEnergy selection:text-white">
        <div className="max-w-md w-full bg-midnightPanel p-8 rounded-large border border-naranjaEnergy/50 shadow-glowEnergy text-center relative overflow-hidden">
          
          <div 
            className="w-14 h-14 border border-naranjaEnergy bg-negroProfundo flex items-center justify-center p-2.5 shadow-glowEnergy mx-auto mb-4"
            style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
          >
            <img src="/assets/TSolutionslogo/logoTSVG.svg" alt="TSolutions Logo" className="w-full h-full object-contain" />
          </div>

          <span className="text-[10px] font-bold text-naranjaEnergy uppercase tracking-widest block mb-1">
            CONTROL ADMINISTRATIVO PRIVADO
          </span>
          <h1 className="font-bruno text-xl sm:text-2xl text-blancoPuro mb-2">
            TSolutions <span className="text-naranjaEnergy">Dashboard Pro</span>
          </h1>
          <p className="text-xs text-humo mb-6">
            Autenticación exclusiva para personal de dirección y arquitectura mediante correo organizacional.
          </p>

          {authError && (
            <div className="p-3.5 mb-5 rounded-medium bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs text-left">
              ✕ {authError}
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-blancoPuro mb-1">
                Correo Organizacional (@tsolutionsipidd.com)
              </label>
              <input
                type="email"
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="direccion@tsolutionsipidd.com"
                className="w-full bg-negroProfundo border border-white/15 rounded-medium px-3.5 py-2.5 text-xs text-blancoPuro focus:outline-none focus:border-naranjaEnergy"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-blancoPuro mb-1">
                Contraseña / Token de Seguridad
              </label>
              <input
                type="password"
                required
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-negroProfundo border border-white/15 rounded-medium px-3.5 py-2.5 text-xs text-blancoPuro focus:outline-none focus:border-naranjaEnergy"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-naranjaEnergy hover:bg-orange-600 text-white font-bruno text-xs sm:text-sm rounded-medium shadow-glowEnergy transition-all cursor-pointer mt-2"
            >
              🔒 Iniciar Sesión Administrativa
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center text-[11px]">
            <Link to="/" className="text-humo hover:text-white transition">← Volver al Sitio</Link>
            <Link to="/portal-cliente" className="text-naranjaEnergy hover:underline">Acceso para Clientes →</Link>
          </div>
        </div>
      </div>
    );
  }

  // ================= TABLERO ADMINISTRATIVO AUTENTICADO =================
  return (
    <div className="bg-negroProfundo text-blancoPuro min-h-screen pb-16">
      
      {/* HEADER DASHBOARD PRO */}
      <header className="w-full border-b border-white/10 bg-midnightPanel py-3.5 px-6 sticky top-0 z-40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-bruno text-base text-blancoPuro">TSOLUTIONS <span className="text-naranjaEnergy text-xs bg-naranjaEnergy/20 px-2 py-0.5 rounded border border-naranjaEnergy/40">ADMIN PRO</span></span>
          <span className="text-[10px] text-humo hidden sm:inline">&bull; Sesión: <strong className="text-blancoPuro">{adminEmail}</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/kickoff-agenda" className="text-xs bg-naranjaEnergy text-white font-bold px-3 py-1.5 rounded shadow-glowEnergy">+ Nueva Agenda Kickoff</Link>
          <button onClick={handleAdminLogout} className="text-xs bg-negroProfundo hover:bg-rose-500/20 text-humo hover:text-rose-300 border border-white/10 px-3 py-1.5 rounded font-bold transition">
            Cerrar Sesión
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        
        {/* BUSCADOR 360° POR IDENTIFICADOR ÚNICO */}
        <div className="bg-midnightPanel p-4 rounded-large border border-naranjaEnergy/40 shadow-glowEnergy mb-6 flex flex-col sm:flex-row items-center gap-3">
          <span className="text-xs font-bold text-naranjaEnergy uppercase tracking-widest shrink-0">🔍 Consulta por ID Único:</span>
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Ingresa ID (ej. FER-5678-842) o nombre del proyecto..."
            className="flex-1 bg-negroProfundo border border-white/15 rounded-medium px-4 py-2.5 text-xs text-blancoPuro focus:outline-none focus:border-naranjaEnergy font-mono"
          />
          {searchId && <button onClick={() => setSearchId("")} className="text-xs text-humo hover:text-white px-2">Limpiar</button>}
        </div>

        {/* METRICAS Y KPIS GENERALES */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-midnightPanel p-4 rounded-large border border-white/10">
            <span className="text-[10px] text-humo uppercase font-bold">Proyectos Activos</span>
            <strong className="text-2xl font-bruno text-blancoPuro block mt-1">{projects.length}</strong>
          </div>
          <div className="bg-midnightPanel p-4 rounded-large border border-white/10">
            <span className="text-[10px] text-humo uppercase font-bold">Ingresos Totales</span>
            <strong className="text-2xl font-bruno text-emerald-400 block mt-1">${totalRevenue.toLocaleString()} MXN</strong>
          </div>
          <div className="bg-midnightPanel p-4 rounded-large border border-white/10">
            <span className="text-[10px] text-humo uppercase font-bold">Anticipos Cobrados</span>
            <strong className="text-2xl font-bruno text-naranjaEnergy block mt-1">${totalDeposits.toLocaleString()} MXN</strong>
          </div>
          <div className="bg-midnightPanel p-4 rounded-large border border-white/10">
            <span className="text-[10px] text-humo uppercase font-bold">Saldos por Cobrar</span>
            <strong className="text-2xl font-bruno text-amber-300 block mt-1">${totalPending.toLocaleString()} MXN</strong>
          </div>
        </div>

        {/* NAVEGACIÓN DE PESTAÑAS */}
        <div className="flex gap-2 border-b border-white/10 pb-2 mb-6 text-xs font-bold">
          <button onClick={() => setActiveTab("proyectos")} className={`px-4 py-2 rounded-t ${activeTab === "proyectos" ? "bg-naranjaEnergy text-white" : "text-humo hover:text-white"}`}>📦 Proyectos & Tareas</button>
          <button onClick={() => setActiveTab("financiero")} className={`px-4 py-2 rounded-t ${activeTab === "financiero" ? "bg-naranjaEnergy text-white" : "text-humo hover:text-white"}`}>💳 Control Financiero</button>
          <button onClick={() => setActiveTab("tickets")} className={`px-4 py-2 rounded-t ${activeTab === "tickets" ? "bg-naranjaEnergy text-white" : "text-humo hover:text-white"}`}>🛠️ Consolidación de Tickets & Errores</button>
        </div>

        {/* TAB 1: PROYECTOS & AVANCE */}
        {activeTab === "proyectos" && (
          <div className="space-y-6">
            {filteredProjects.map((p, idx) => (
              <div key={p.clientId} className="bg-midnightPanel rounded-large border border-white/10 p-6 shadow-card space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-white/10 gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bruno text-lg text-blancoPuro">{p.projectName}</h3>
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-naranjaEnergy/20 text-naranjaEnergy border border-naranjaEnergy/40">{p.clientId}</span>
                    </div>
                    <p className="text-xs text-humo">{p.clientName} &bull; {p.phone} &bull; {p.email}</p>
                  </div>
                  <div className="text-left sm:text-right text-xs">
                    <span className="text-naranjaEnergy font-bold block">{p.plan}</span>
                    <span className="text-emerald-400">📅 Kickoff: {p.kickoffDate}</span>
                  </div>
                </div>

                {/* BARRA DE AVANCE */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Etapa: <strong>{p.stage}</strong></span>
                    <span className="font-mono text-naranjaEnergy font-bold">{p.progress || 0}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-negroProfundo rounded-full overflow-hidden border border-white/10">
                    <div className="h-full bg-gradient-to-r from-orange-600 via-naranjaEnergy to-emerald-400" style={{ width: `${p.progress || 0}%` }}></div>
                  </div>
                </div>

                {/* LISTA DE TAREAS Y LOGROS */}
                <div className="bg-negroProfundo/70 p-4 rounded-medium border border-white/5">
                  <span className="text-[11px] font-bold text-naranjaEnergy uppercase block mb-2">🎯 Hitos y Tareas del Proyecto:</span>
                  <div className="space-y-2">
                    {(p.tasks || []).map((t) => (
                      <label key={t.id} className="flex items-center gap-2 text-xs cursor-pointer text-blancoPuro/90">
                        <input type="checkbox" checked={t.done} onChange={() => handleToggleTask(idx, t.id)} className="accent-naranjaEnergy" />
                        <span className={t.done ? "line-through text-humo" : ""}>{t.text}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: FINANCIERO */}
        {activeTab === "financiero" && (
          <div className="bg-midnightPanel rounded-large border border-white/10 overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-negroProfundo text-humo uppercase border-b border-white/10 text-[10px]">
                <tr>
                  <th className="p-3">ID Único</th>
                  <th className="p-3">Proyecto / Cliente</th>
                  <th className="p-3">Paquete</th>
                  <th className="p-3">Esquema</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Anticipo</th>
                  <th className="p-3">Saldo</th>
                  <th className="p-3">Estado Anticipo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredProjects.map((p) => (
                  <tr key={p.clientId} className="hover:bg-white/5 font-mono">
                    <td className="p-3 text-naranjaEnergy font-bold">{p.clientId}</td>
                    <td className="p-3 font-sans text-blancoPuro">{p.projectName}<br /><span className="text-[10px] text-humo">{p.clientName}</span></td>
                    <td className="p-3 font-sans">{p.plan}</td>
                    <td className="p-3">{p.scheme || "50/50"}</td>
                    <td className="p-3 text-emerald-400 font-bold">${p.totalAmount?.toLocaleString()} MXN</td>
                    <td className="p-3 text-naranjaEnergy">${p.depositPaid?.toLocaleString()} MXN</td>
                    <td className="p-3 text-amber-300">${((p.totalAmount || 0) - (p.depositPaid || 0)).toLocaleString()} MXN</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">✓ Pagado</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 3: TICKETS & BUGS */}
        {activeTab === "tickets" && (
          <div className="space-y-6">
            <form onSubmit={handleAddTicket} className="bg-midnightPanel p-4 rounded-large border border-white/10 flex flex-col sm:flex-row items-center gap-3">
              <input type="text" required value={newTicketTitle} onChange={(e) => setNewTicketTitle(e.target.value)} placeholder="Descripción del ticket o error reportado..." className="flex-1 bg-negroProfundo border border-white/15 rounded px-3 py-2 text-xs text-blancoPuro" />
              <select value={newTicketTarget} onChange={(e) => setNewTicketTarget(e.target.value)} required className="bg-negroProfundo border border-white/15 rounded px-3 py-2 text-xs text-blancoPuro">
                <option value="">Seleccionar Proyecto...</option>
                {projects.map(p => <option key={p.clientId} value={p.clientId}>{p.clientId} - {p.projectName}</option>)}
              </select>
              <select value={newTicketPriority} onChange={(e) => setNewTicketPriority(e.target.value)} className="bg-negroProfundo border border-white/15 rounded px-3 py-2 text-xs text-blancoPuro">
                <option value="Baja">Prioridad Baja</option>
                <option value="Media">Prioridad Media</option>
                <option value="Alta">🔥 Prioridad Alta / Crítica</option>
              </select>
              <button type="submit" className="bg-naranjaEnergy text-white font-bold text-xs px-4 py-2 rounded shadow-glowEnergy">+ Levantar Ticket</button>
            </form>

            <div className="bg-midnightPanel rounded-large border border-white/10 overflow-hidden">
              <div className="p-4 border-b border-white/10 font-bruno text-xs text-blancoPuro">Consolidación de Tickets Activos</div>
              <div className="divide-y divide-white/5 text-xs">
                {projects.flatMap(p => (p.tickets || []).map(t => ({ ...t, client: p }))).map(t => (
                  <div key={t.id} className="p-3.5 flex items-center justify-between hover:bg-white/5">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] text-naranjaEnergy bg-naranjaEnergy/10 px-2 py-0.5 rounded">{t.id}</span>
                      <div>
                        <strong className="text-blancoPuro block">{t.title}</strong>
                        <span className="text-[10px] text-humo">{t.client.projectName} ({t.client.clientId})</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${t.priority === "Alta" ? "bg-rose-500/20 text-rose-300 border border-rose-500/40" : "bg-white/10 text-humo"}`}>{t.priority}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">{t.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
