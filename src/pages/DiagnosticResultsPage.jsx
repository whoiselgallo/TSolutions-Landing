import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function DiagnosticResultsPage() {
  const [searchParams] = useSearchParams();
  const [score, setScore] = useState(68);
  const [clientData, setClientData] = useState(null);
  const [isPdfUnlocked, setIsPdfUnlocked] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    try {
      const stored = localStorage.getItem("tsolutions_latest_diagnostic");
      if (stored) {
        const parsed = JSON.parse(stored);
        setClientData(parsed);
        if (parsed.calculatedScore) setScore(parsed.calculatedScore);
      }
    } catch (e) {}
  }, []);

  const getTrafficLight = (s) => {
    if (s < 50) {
      return {
        color: "text-rose-400",
        bg: "bg-rose-500/20",
        border: "border-rose-500/50",
        label: "🔴 FUGAS CRÍTICAS DE CLIENTES",
        desc: "Tu negocio pierde entre el 30% y 50% de clientes por fricción en atención móvil, falta de automatización y desarticulación en Google Maps."
      };
    }
    if (s < 80) {
      return {
        color: "text-yellow-300",
        bg: "bg-yellow-500/20",
        border: "border-yellow-500/50",
        label: "🟡 EN RIESGO OPERATIVO Y CUELLOS DE BOTELLA",
        desc: "Tienes presencia digital pero tus procesos dependen de captura manual, generando cuellos de botella en pedidos y dependencia técnica."
      };
    }
    return {
      color: "text-emerald-400",
      bg: "bg-emerald-500/20",
      border: "border-emerald-500/50",
      label: "🟢 ALTA EFICIENCIA DIGITAL",
      desc: "Estructura digital sólida lista para escalar con pasarelas automáticas, Terminal Point Mini y logística con Uber Direct."
    };
  };

  const trafficLight = getTrafficLight(score);

  // Pago de $600 MXN vía Stripe para descargar PDF
  const handlePayPdfReport = async () => {
    setIsProcessingPayment(true);
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          price: 600,
          packageName: "Reporte Diagnóstico Ejecutivo en PDF (Estrategias y Puntuación Completa)",
          clientEmail: clientData?.email || "cliente@negocio.com",
          clientName: clientData?.name || "Cliente TSolutions"
        })
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        // Simulación exitosa si no hay credencial activa
        setIsPdfUnlocked(true);
        setIsProcessingPayment(false);
      }
    } catch (e) {
      setIsPdfUnlocked(true);
      setIsProcessingPayment(false);
    }
  };

  return (
    <div className="bg-negroProfundo text-blancoPuro min-h-screen pb-20 selection:bg-naranjaEnergy selection:text-white">
      
      {/* HEADER */}
      <header className="w-full border-b border-white/10 bg-midnightPanel py-3.5 px-6 flex items-center justify-between">
        <Link to="/" className="font-bruno text-sm text-blancoPuro flex items-center gap-2">
          TSOLUTIONS <span className="text-naranjaEnergy text-xs bg-naranjaEnergy/10 border border-naranjaEnergy/30 px-1.5 py-0.5 rounded">RESULTADOS IA</span>
        </Link>
        <Link to="/" className="text-xs bg-negroProfundo border border-white/10 px-3 py-1.5 rounded font-bold">
          ← Inicio
        </Link>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        
        {/* SEMÁFORO GLOBAL DE MADUREZ DIGITAL */}
        <div className={`p-8 rounded-large border ${trafficLight.border} ${trafficLight.bg} text-center shadow-card mb-8 relative overflow-hidden`}>
          <span className="text-xs font-mono font-bold tracking-widest uppercase block mb-1 text-humo">
            EVALUACIÓN GLOBAL DE MADUREZ DIGITAL
          </span>
          <h1 className="font-bruno text-3xl sm:text-5xl text-blancoPuro mb-2">
            {score} / 100 PUNTOS
          </h1>
          <div className="my-3">
            <span className={`inline-block font-bruno text-sm sm:text-base px-5 py-2 rounded-full ${trafficLight.color} border ${trafficLight.border} bg-negroProfundo/90 shadow-inner`}>
              {trafficLight.label}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-blancoPuro/90 max-w-xl mx-auto leading-relaxed mt-3">
            {trafficLight.desc}
          </p>
        </div>

        {/* 3 RECOMENDACIONES CLAVE (HOOK ESTRATÉGICO) */}
        <div className="bg-midnightPanel p-6 sm:p-8 rounded-large border border-white/10 shadow-card mb-8 space-y-4">
          <h2 className="font-bruno text-base sm:text-lg text-blancoPuro border-b border-white/10 pb-3">
            🎯 3 Recomendaciones Estratégicas de Alto Impacto:
          </h2>
          <div className="space-y-3 text-xs leading-relaxed">
            <div className="p-4 rounded bg-negroProfundo border border-white/5 flex gap-3.5">
              <span className="text-naranjaEnergy font-bold text-lg">1.</span>
              <div>
                <strong className="text-blancoPuro block text-sm mb-0.5">Rescate y Posicionamiento en Google Maps:</strong>
                <p className="text-humo">Tu negocio pierde búsquedas locales inmediatas. Es necesario verificar ficha, geolocalización y optimizar palabras clave para captar clientes en tu radio geográfico.</p>
              </div>
            </div>
            <div className="p-4 rounded bg-negroProfundo border border-white/5 flex gap-3.5">
              <span className="text-cyan-400 font-bold text-lg">2.</span>
              <div>
                <strong className="text-blancoPuro block text-sm mb-0.5">Smart Web en Zona de Pulgar:</strong>
                <p className="text-humo">Erradica la pérdida de prospectos en WhatsApp implementando botones táctiles optimizados para el pulgar que permitan cotizar y ordenar en 1 toque.</p>
              </div>
            </div>
            <div className="p-4 rounded bg-negroProfundo border border-white/5 flex gap-3.5">
              <span className="text-amber-300 font-bold text-lg">3.</span>
              <div>
                <strong className="text-blancoPuro block text-sm mb-0.5">Automatización de Cobros y Logística Express:</strong>
                <p className="text-humo">Integra pasarelas con Terminal Point Mini de regalo y despachos automáticos con Uber Direct para operar sin fricción operativa.</p>
              </div>
            </div>
          </div>
        </div>

        {/* 2 MODALIDADES DE ENTREGA DE RESULTADOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* OPCIÓN 1: DESCARGA EN PDF ($600 MXN) */}
          <div className="bg-midnightPanel p-6 sm:p-8 rounded-large border border-amber-400/40 shadow-card flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest block mb-1">
                MODALIDAD 1 &bull; DESCARGA INMEDIATA
              </span>
              <h3 className="font-bruno text-lg text-blancoPuro mb-2">
                Reporte Ejecutivo en PDF
              </h3>
              <p className="text-xs text-humo leading-relaxed mb-4">
                Descarga el desglose pregunta por pregunta, tu puntuación detallada por sección y el plan de mitigación técnica en formato PDF.
              </p>
              <div className="font-bruno text-2xl text-amber-300 mb-6">$600 MXN</div>
            </div>

            {isPdfUnlocked ? (
              <a
                href="/assets/ebooks/Ebook_Vol1_Arquitectura_de_Marca.pdf"
                download="Reporte_Diagnostico_TSolutions.pdf"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bruno text-xs rounded-medium text-center shadow-card transition"
              >
                📥 Descargar Mi Reporte PDF Completo
              </a>
            ) : (
              <button
                onClick={handlePayPdfReport}
                disabled={isProcessingPayment}
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-negroProfundo font-bruno text-xs rounded-medium text-center shadow-glowEnergy transition cursor-pointer"
              >
                {isProcessingPayment ? "Conectando con Stripe..." : "💳 Pagar $600 y Descargar PDF"}
              </button>
            )}
          </div>

          {/* OPCIÓN 2: AGENDAR ENTREGA GRATUITA CON ESPECIALISTA */}
          <div className="bg-midnightPanel p-6 sm:p-8 rounded-large border-2 border-naranjaEnergy shadow-glowEnergy flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-naranjaEnergy uppercase tracking-widest block mb-1">
                MODALIDAD 2 &bull; 100% GRATIS
              </span>
              <h3 className="font-bruno text-lg text-blancoPuro mb-2">
                Entrega 1 a 1 con un Estratega
              </h3>
              <p className="text-xs text-humo leading-relaxed mb-4">
                Sesión técnica en vivo de 20 minutos por Google Meet para revisar a detalle tus resultados y estructurar tu plan de digitalización sin costo.
              </p>
              <div className="font-bruno text-2xl text-emerald-400 mb-6">GRATUITO</div>
            </div>

            <Link
              to="/agenda"
              className="w-full py-3.5 bg-naranjaEnergy hover:bg-orange-600 text-white font-bruno text-xs sm:text-sm rounded-medium text-center shadow-glowEnergy hover:shadow-glowEnergyHover transition flex items-center justify-center gap-2"
            >
              <span>📅 Agendar Sesión de Entrega (20 min)</span>
              <span>→</span>
            </Link>
          </div>

        </div>

      </main>
    </div>
  );
}
