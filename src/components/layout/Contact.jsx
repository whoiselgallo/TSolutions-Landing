import React, { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [statusMsg, setStatusMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setStatus("error");
      setStatusMsg("Por favor, llena todos los campos.");
      return;
    }

    setStatus("loading");
    setStatusMsg("");

    try {
      const response = await fetch("/contact.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("success");
        setStatusMsg(result.message || "¡Solicitud enviada con éxito!");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
        setStatusMsg(result.message || "Ocurrió un error al enviar el formulario.");
      }
    } catch (err) {
      setStatus("error");
      setStatusMsg("No se pudo conectar con el servidor de Hostinger.");
    }
  };

  return (
    <section className="py-24 bg-negroProfundo text-blancoPuro flex flex-col justify-center items-center px-6 border-b border-blancoPuro/5">
      <div className="w-full max-w-lg bg-midnightPanel border border-naranjaEnergy/20 p-8 rounded-medium shadow-card backdrop-blur-sm relative overflow-hidden">
        
        {/* Glow de fondo */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-naranjaEnergy/10 rounded-full blur-3xl pointer-events-none"></div>

        <h2 className="font-bruno text-3xl text-center mb-8 text-blancoPuro tracking-wider">
          Iniciar <span className="text-naranjaEnergy">Proyecto</span>
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
          
          {/* Nombre */}
          <div className="flex flex-col gap-2">
            <label className="font-montserratSlim text-xs text-blancoPuro/70 tracking-widest uppercase">
              Nombre Completo
            </label>
            <input
              type="text"
              required
              disabled={status === "loading"}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="min-h-input border border-blancoPuro/10 rounded-soft px-4 py-3 bg-negroProfundo/50 text-blancoPuro font-inter text-sm focus:border-naranjaEnergy outline-none transition-all duration-300 placeholder-blancoPuro/30 focus:shadow-[0_0_12px_rgba(249,115,22,0.15)]"
              placeholder="Ej. Juan Pérez"
            />
          </div>

          {/* Correo */}
          <div className="flex flex-col gap-2">
            <label className="font-montserratSlim text-xs text-blancoPuro/70 tracking-widest uppercase">
              Correo Electrónico
            </label>
            <input
              type="email"
              required
              disabled={status === "loading"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="min-h-input border border-blancoPuro/10 rounded-soft px-4 py-3 bg-negroProfundo/50 text-blancoPuro font-inter text-sm focus:border-naranjaEnergy outline-none transition-all duration-300 placeholder-blancoPuro/30 focus:shadow-[0_0_12px_rgba(249,115,22,0.15)]"
              placeholder="juan@empresa.com"
            />
          </div>

          {/* Mensaje */}
          <div className="flex flex-col gap-2">
            <label className="font-montserratSlim text-xs text-blancoPuro/70 tracking-widest uppercase">
              Mensaje / Requerimiento
            </label>
            <textarea
              rows={4}
              required
              disabled={status === "loading"}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border border-blancoPuro/10 rounded-soft px-4 py-3 bg-negroProfundo/50 text-blancoPuro font-inter text-sm focus:border-naranjaEnergy outline-none transition-all duration-300 placeholder-blancoPuro/30 focus:shadow-[0_0_12px_rgba(249,115,22,0.15)] resize-none"
              placeholder="Describe brevemente tu proyecto o necesidad tecnológica..."
            />
          </div>

          {/* Mensajes de Feedback */}
          {statusMsg && (
            <div
              className={`p-3 rounded-soft text-center text-xs font-bruno border ${
                status === "success"
                  ? "bg-green-500/10 border-green-500/30 text-green-400"
                  : "bg-naranjaEnergy/10 border-naranjaEnergy/30 text-naranjaEnergy"
              }`}
            >
              {statusMsg}
            </div>
          )}

          {/* Botón */}
          <button
            type="submit"
            disabled={status === "loading"}
            className="py-4 bg-naranjaEnergy text-negroProfundo font-bruno text-sm rounded-soft mt-4 hover:bg-naranjaEnergy/90 shadow-glowEnergy hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "loading" ? "Procesando..." : "Enviar Solicitud"}
          </button>
        </form>
      </div>
    </section>
  );
}
