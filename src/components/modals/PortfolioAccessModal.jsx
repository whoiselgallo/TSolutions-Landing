import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PortfolioAccessModal({ isOpen, onClose, targetUrl = "/portafolio", selectedPackage = "" }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | error
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (isOpen) {
      // Pre-fill if already in localStorage
      try {
        const stored = localStorage.getItem("tsolutions_lead_contact");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.name) setName(parsed.name);
          if (parsed.email) setEmail(parsed.email);
          if (parsed.phone) setPhone(parsed.phone);
        }
      } catch (e) {}
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setStatus("error");
      setErrorMsg("Por favor, completa tu Nombre, Correo y WhatsApp para desbloquear el portafolio.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    const leadData = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      package: selectedPackage || "Interés en Portafolio Comercial Completo",
      source: "Filtro Acceso Portafolio (Modal Gate)",
      createdAt: new Date().toISOString()
    };

    try {
      // 1. Guardar lead en base de datos para marketing
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData),
      }).catch(() => {});

      localStorage.setItem("tsolutions_lead_contact", JSON.stringify(leadData));
      localStorage.setItem("tsolutions_portfolio_unlocked", "true");

      onClose();
      navigate(targetUrl);
    } catch (err) {
      localStorage.setItem("tsolutions_lead_contact", JSON.stringify(leadData));
      localStorage.setItem("tsolutions_portfolio_unlocked", "true");
      onClose();
      navigate(targetUrl);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-negroProfundo/85 backdrop-blur-md animate-fadeIn">
      
      {/* OVERLAY CLOSE */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* CONTENEDOR MODAL */}
      <div className="relative w-full max-w-lg bg-midnightPanel border-2 border-naranjaEnergy rounded-large p-6 sm:p-8 shadow-glowEnergy z-10 overflow-hidden text-left">
        
        {/* Glow de fondo */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-naranjaEnergy/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* BOTÓN CERRAR */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-humo hover:text-white text-xl font-bold p-1 rounded-full hover:bg-white/10 transition"
          aria-label="Cerrar modal"
        >
          ✕
        </button>

        {/* ENCABEZADO */}
        <div className="mb-6">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-naranjaEnergy/20 text-naranjaEnergy border border-naranjaEnergy/40 inline-block mb-3 shadow-glowEnergy">
            🔒 ACCESO EXCLUSIVO AL PORTAFOLIO & PRECIOS
          </span>

          <h3 className="font-bruno text-xl sm:text-2xl text-blancoPuro leading-snug">
            Desbloquea el <span className="text-naranjaEnergy">Portafolio Comercial</span>
          </h3>

          <p className="text-humo text-xs sm:text-sm mt-2 leading-relaxed">
            Ingresa tus datos de contacto para acceder de inmediato al catálogo completo con precios transparentes, comparativa de niveles y cotizador interactivo.
          </p>
        </div>

        {/* FORMULARIO FILTRO */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {errorMsg && (
            <div className="p-3 rounded-medium bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-semibold text-center">
              ✕ {errorMsg}
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold text-blancoPuro uppercase tracking-wider mb-1.5">
              Nombre Completo *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej. Juan Pérez"
              className="w-full bg-negroProfundo border border-white/15 rounded-medium px-3.5 py-3 text-xs sm:text-sm text-blancoPuro placeholder-humo/60 focus:outline-none focus:border-naranjaEnergy transition"
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
              className="w-full bg-negroProfundo border border-white/15 rounded-medium px-3.5 py-3 text-xs sm:text-sm text-blancoPuro placeholder-humo/60 focus:outline-none focus:border-naranjaEnergy transition"
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
              className="w-full bg-negroProfundo border border-white/15 rounded-medium px-3.5 py-3 text-xs sm:text-sm text-blancoPuro placeholder-humo/60 focus:outline-none focus:border-naranjaEnergy transition"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-4 px-6 bg-naranjaEnergy hover:bg-orange-600 text-white font-bruno text-sm sm:text-base rounded-medium shadow-glowEnergy hover:shadow-glowEnergyHover transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <span>{status === "loading" ? "Validando Acceso..." : "🚀 Desbloquear y Ver Portafolio Completo"}</span>
              <span className="text-base">→</span>
            </button>
          </div>

          <p className="text-[10px] text-center text-humo pt-1">
            🔒 Cero spam. Tus datos se utilizan únicamente para enviarte la propuesta y soporte directo.
          </p>

        </form>

      </div>

    </div>
  );
}
