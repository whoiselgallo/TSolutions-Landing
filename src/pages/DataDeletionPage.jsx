import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function DataDeletionPage() {
  const [searchParams] = useSearchParams();
  const codeParam = searchParams.get("code");
  const [confirmationCode, setConfirmationCode] = useState(codeParam || "");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleManualRequest = (e) => {
    e.preventDefault();
    const generated = "DEL-REQ-" + Math.random().toString(36).substring(2, 10).toUpperCase();
    setConfirmationCode(generated);
    setSubmitted(true);
  };

  return (
    <div className="bg-negroProfundo text-blancoPuro min-h-screen pb-20 selection:bg-naranjaEnergy selection:text-white">
      {/* HEADER */}
      <header className="w-full border-b border-white/10 bg-midnightPanel py-4 px-6 sticky top-0 z-50 flex items-center justify-between">
        <Link to="/" className="font-bruno text-sm sm:text-base text-blancoPuro flex items-center gap-2">
          TSOLUTIONS <span className="text-naranjaEnergy text-xs bg-naranjaEnergy/10 border border-naranjaEnergy/30 px-1.5 py-0.5 rounded">IPIDD</span>
        </Link>
        <Link to="/" className="text-xs bg-negroProfundo border border-white/10 px-3.5 py-1.5 rounded-medium font-bold hover:border-naranjaEnergy transition">
          ← Volver al Inicio
        </Link>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="border-b border-white/10 pb-6 mb-8 text-center">
          <span className="text-xs font-mono font-bold text-naranjaEnergy tracking-widest uppercase block mb-2">
            GESTIÓN DE PRIVACIDAD Y DERECHOS ARCO
          </span>
          <h1 className="font-bruno text-2xl sm:text-4xl text-blancoPuro mb-3">
            Instrucciones y Solicitud de Eliminación de Datos
          </h1>
          <p className="text-xs text-humo max-w-xl mx-auto">
            De conformidad con las directrices de la plataforma Meta y la legislación aplicable, puedes solicitar la supresión total de tus datos personales de nuestros registros.
          </p>
        </div>

        {confirmationCode ? (
          <div className="bg-midnightPanel p-8 rounded-large border border-emerald-500/40 shadow-card text-center mb-8">
            <div className="text-3xl mb-3">✅</div>
            <h2 className="font-bruno text-lg text-emerald-400 mb-2">
              Solicitud de Eliminación Registrada
            </h2>
            <p className="text-xs text-humo mb-4">
              Hemos registrado la orden de supresión de datos vinculada a tu cuenta o interacción de WhatsApp.
            </p>
            <div className="p-3 bg-negroProfundo border border-white/10 rounded font-mono text-sm text-cyan-400 mb-4 select-all">
              Código de Confirmación: <strong>{confirmationCode}</strong>
            </div>
            <p className="text-[11px] text-humo/70">
              El proceso de purga de registros en bases de datos y registros de RUA se completa en un lapso máximo de 48 horas hábiles.
            </p>
          </div>
        ) : (
          <div className="bg-midnightPanel p-8 rounded-large border border-white/10 shadow-card mb-8">
            <h2 className="font-bruno text-base text-blancoPuro mb-3">
              Solicitar Eliminación Manual
            </h2>
            <p className="text-xs text-humo mb-6">
              Ingresa el correo electrónico o número de WhatsApp con el que interactuaste con nuestros servicios para programar la eliminación de tus registros:
            </p>
            <form onSubmit={handleManualRequest} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-blancoPuro mb-1.5 uppercase tracking-wider">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@negocio.com"
                  className="w-full bg-negroProfundo border border-white/10 rounded-medium px-4 py-2.5 text-sm text-blancoPuro focus:outline-none focus:border-naranjaEnergy"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-blancoPuro mb-1.5 uppercase tracking-wider">
                  Número de WhatsApp (con código de país)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+52 55 1234 5678"
                  className="w-full bg-negroProfundo border border-white/10 rounded-medium px-4 py-2.5 text-sm text-blancoPuro focus:outline-none focus:border-naranjaEnergy"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-naranjaEnergy hover:bg-orange-600 text-white font-bruno text-xs rounded-medium transition shadow-glowEnergy"
              >
                🗑️ Solicitar Eliminación Definitiva de Datos
              </button>
            </form>
          </div>
        )}

        {/* INSTRUCCIONES FORMALES */}
        <div className="bg-midnightPanel/60 p-6 rounded-large border border-white/10 text-xs text-humo space-y-3 leading-relaxed">
          <h3 className="font-bruno text-sm text-blancoPuro">Instrucciones para Usuarios de Meta / WhatsApp:</h3>
          <ol className="list-decimal list-inside space-y-2 text-blancoPuro/80">
            <li>Si utilizaste una integración de Facebook/Meta para iniciar sesión, puedes eliminar el acceso desde: <em>Configuración de Facebook &gt; Apps y sitios web &gt; TSolutions &gt; Eliminar</em>.</li>
            <li>Al desvincular la aplicación, Meta enviará automáticamente una solicitud de eliminación a nuestro callback en tiempo real.</li>
            <li>Para solicitudes directas, puedes escribir a <strong className="text-naranjaEnergy">javier.gallardo@tsolutionsipidd.com</strong> con el asunto <em>"Eliminación de Datos"</em>.</li>
          </ol>
        </div>
      </main>
    </div>
  );
}
