import React, { useState } from "react";

export default function AdminSettings() {
  const [leads, setLeads] = useState([
    {
      id: "LEAD-101",
      nombre: "Carlos Martínez",
      email: "carlos@refaccionariadigital.com",
      whatsapp: "+52 55 4123 9876",
      paquete: "Paquete Híbrido Escala Rápida ($3,700 MXN)",
      fecha: "2026-09-02 18:42",
      estado: "Nuevo"
    },
    {
      id: "LEAD-102",
      nombre: "Dra. Sofía Rangel",
      email: "drarangel@clinicasalud.mx",
      whatsapp: "+52 55 7890 1234",
      paquete: "Tu Negocio en Google ($2,750 MXN)",
      fecha: "2026-09-01 14:15",
      estado: "Contactado"
    },
    {
      id: "LEAD-103",
      nombre: "Miguel Ángel Garza",
      email: "miguel@constructoralocal.com",
      whatsapp: "+52 81 1234 5678",
      paquete: "E-commerce Total con Logística ($9,850 MXN)",
      fecha: "2026-08-30 11:20",
      estado: "En Cotización"
    }
  ]);

  const [gatewayConfig, setGatewayConfig] = useState({
    stripeKey: "pk_live_************************",
    whatsappNumber: "+52 55 1234 5678",
    autoResponder: true,
    webhookUrl: "https://tsolutions.com.mx/api/webhooks/leads"
  });

  const handleStatusChange = (id, newStatus) => {
    setLeads(leads.map(l => l.id === id ? { ...l, estado: newStatus } : l));
  };

  return (
    <div className="space-y-8">
      
      {/* HEADER */}
      <div className="p-6 rounded-large bg-midnightPanel border border-naranjaEnergy/30 shadow-card">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-naranjaEnergy/20 text-naranjaEnergy text-xs font-bold mb-2">
          <span>⚙️ Panel Administrativo & Control</span>
        </div>
        <h2 className="font-bruno text-2xl text-blancoPuro">
          Administración General & Leads
        </h2>
        <p className="text-humo text-xs sm:text-sm mt-1">
          Control de prospectos, métricas operativas de la landing y ajustes de pasarelas de pago.
        </p>
      </div>

      {/* KPI METRICS CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-large bg-midnightPanel border border-white/10 shadow-card">
          <span className="text-[10px] uppercase font-bold text-humo block mb-1">Leads Capturados</span>
          <span className="font-bruno text-2xl sm:text-3xl text-naranjaEnergy">{leads.length + 24}</span>
          <span className="text-[11px] text-emerald-400 block mt-1">↑ +18% este mes</span>
        </div>
        <div className="p-5 rounded-large bg-midnightPanel border border-white/10 shadow-card">
          <span className="text-[10px] uppercase font-bold text-humo block mb-1">Tasa de Conversión</span>
          <span className="font-bruno text-2xl sm:text-3xl text-blancoPuro">4.8%</span>
          <span className="text-[11px] text-emerald-400 block mt-1">Óptima (Mobile-First)</span>
        </div>
        <div className="p-5 rounded-large bg-midnightPanel border border-white/10 shadow-card">
          <span className="text-[10px] uppercase font-bold text-humo block mb-1">Proyectos en Ejecución</span>
          <span className="font-bruno text-2xl sm:text-3xl text-aquaTurquesa">8</span>
          <span className="text-[11px] text-humo block mt-1">3 con Logística Nativa</span>
        </div>
        <div className="p-5 rounded-large bg-midnightPanel border border-white/10 shadow-card">
          <span className="text-[10px] uppercase font-bold text-humo block mb-1">Pipeline Estimado</span>
          <span className="font-bruno text-2xl sm:text-3xl text-naranjaEnergy">$48,200</span>
          <span className="text-[11px] text-humo block mt-1">MXN en cotización</span>
        </div>
      </div>

      {/* TABLA DE LEADS RECIENTES */}
      <div className="bg-midnightPanel rounded-large border border-white/10 overflow-hidden shadow-card">
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div>
            <h3 className="font-bruno text-sm text-blancoPuro">Prospectos & Solicitudes de Diagnóstico</h3>
            <span className="text-xs text-humo">Generados desde la Landing Page oficial</span>
          </div>
          <button
            onClick={() => alert("Exportando lista de prospectos en CSV")}
            className="px-3 py-1.5 bg-negroProfundo hover:bg-white/10 text-xs font-bold text-humo rounded border border-white/10"
          >
            📥 Exportar CSV
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-blancoPuro border-collapse">
            <thead className="bg-negroProfundo text-humo font-bold uppercase text-[10px] border-b border-white/10">
              <tr>
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Contacto</th>
                <th className="py-3 px-4">WhatsApp</th>
                <th className="py-3 px-4">Paquete de Interés</th>
                <th className="py-3 px-4">Fecha</th>
                <th className="py-3 px-4">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {leads.map((l) => (
                <tr key={l.id} className="hover:bg-negroProfundo/50 transition">
                  <td className="py-3 px-4 font-mono font-bold text-naranjaEnergy">{l.id}</td>
                  <td className="py-3 px-4">
                    <span className="font-bold block text-white">{l.nombre}</span>
                    <span className="text-[11px] text-humo">{l.email}</span>
                  </td>
                  <td className="py-3 px-4 font-mono text-emerald-400">
                    <a href={`https://wa.me/${l.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="hover:underline">
                      {l.whatsapp}
                    </a>
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-200">{l.paquete}</td>
                  <td className="py-3 px-4 text-humo text-[11px]">{l.fecha}</td>
                  <td className="py-3 px-4">
                    <select
                      value={l.estado}
                      onChange={(e) => handleStatusChange(l.id, e.target.value)}
                      className={`text-[11px] font-bold px-2 py-1 rounded bg-negroProfundo border ${
                        l.estado === "Nuevo" ? "border-amber-500 text-amber-400" :
                        l.estado === "Contactado" ? "border-blue-500 text-blue-400" :
                        "border-emerald-500 text-emerald-400"
                      }`}
                    >
                      <option value="Nuevo">Nuevo</option>
                      <option value="Contactado">Contactado</option>
                      <option value="En Cotización">En Cotización</option>
                      <option value="Cerrado">Cerrado Ganado</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CONFIGURACIÓN DE CONEXIONES Y SEGURIDAD */}
      <div className="bg-midnightPanel p-6 rounded-large border border-white/10 shadow-card space-y-4">
        <h3 className="font-bruno text-sm text-blancoPuro border-b border-white/10 pb-3">
          Configuración de Pasarelas & Automatizaciones
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-humo uppercase mb-1">Clave Pública Stripe</label>
            <input
              type="text"
              value={gatewayConfig.stripeKey}
              onChange={(e) => setGatewayConfig({ ...gatewayConfig, stripeKey: e.target.value })}
              className="w-full bg-negroProfundo border border-white/10 rounded px-3 py-2 text-xs font-mono text-blancoPuro focus:outline-none focus:border-naranjaEnergy"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-humo uppercase mb-1">WhatsApp Business Receptor</label>
            <input
              type="text"
              value={gatewayConfig.whatsappNumber}
              onChange={(e) => setGatewayConfig({ ...gatewayConfig, whatsappNumber: e.target.value })}
              className="w-full bg-negroProfundo border border-white/10 rounded px-3 py-2 text-xs font-mono text-blancoPuro focus:outline-none focus:border-naranjaEnergy"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={() => alert("✓ Ajustes guardados correctamente.")}
            className="px-6 py-2.5 bg-naranjaEnergy hover:bg-orange-600 text-white font-bruno text-xs rounded shadow-glowEnergy transition"
          >
            Guardar Cambios
          </button>
        </div>
      </div>

    </div>
  );
}
