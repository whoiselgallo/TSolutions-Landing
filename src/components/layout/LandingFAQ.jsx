import React, { useState } from "react";

export default function LandingFAQ() {
  const [openIdx, setOpenIdx] = useState(null);

  const faqs = [
    {
      q: "¿Cuánto tiempo toma la entrega de un Ecosistema Digital?",
      a: "Para la Tarjeta Smart la entrega toma de 24 a 48 horas. Tu Negocio en Google y el paquete Escala Rápida se entregan en 4 a 7 días hábiles. Desarrollos complejos como Ecosistema Total o E-commerce con Logística toman de 2 a 3 semanas incluyendo integración de pasarelas, APIs de paquetería y pruebas."
    },
    {
      q: "¿Cómo funciona la transferencia de conocimiento y la constancia de aprendizaje?",
      a: "Al finalizar el desarrollo técnico, realizamos sesiones de capacitación andragógica para tu equipo en los 3 dominios (Cognitivo, Psicomotor y Afectivo). Se evalúa el dominio y emitimos la Constancia de Participación, Aprendizaje y Dominio Tecnológico emitida por TSolutions (reconocimiento interno de competencias tecnológicas, sin validez ante la STPS)."
    },
    {
      q: "¿Cuáles son los métodos y esquemas de pago?",
      a: "Aceptamos transferencia SPEI, tarjetas de crédito/débito vía Stripe y Mercado Pago. Manejamos esquemas transparentes de anticipo (50%/50% o 40%/30%/30% para proyectos corporativos y E-commerce) para total seguridad y certidumbre de ambas partes."
    },
    {
      q: "¿Qué incluye la iguala obligatoria de mantenimiento en los niveles superiores?",
      a: "Para el Ecosistema Total y E-commerce con Logística, la iguala mensual (4, 6 u 8 horas) cubre soporte técnico preventivo 24/7, monitoreo del middleware de Inteligencia Artificial, actualización de APIs de paquetería (Uber Direct/DiDi/DHL) y respaldo continuo de bases de datos."
    }
  ];

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-negroProfundo border-b border-blancoPuro/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 text-center sm:text-left mb-12">
          {/* FAQ Icon — Ampliado */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-large overflow-hidden border border-naranjaEnergy/40 shadow-glowEnergy bg-midnightPanel shrink-0 p-1 flex items-center justify-center">
            <img
              src="/assets/iconografia/FAQs_icon.jpg"
              onError={(e) => { e.target.src = "/assets/iconografia/Chatbot.jpg"; }}
              alt="Preguntas Frecuentes"
              className="w-full h-full object-contain rounded-medium"
            />
          </div>
          <div>
            <span className="text-xs font-bold text-naranjaEnergy uppercase tracking-widest block">
              Derribo de Objeciones
            </span>
            <h2 className="font-bruno text-2xl sm:text-3xl text-blancoPuro">
              Preguntas Frecuentes
            </h2>
          </div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div 
                key={i} 
                className="bg-midnightPanel border border-white/10 rounded-medium overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full py-4 px-6 text-left flex items-center justify-between font-bruno text-sm sm:text-base text-blancoPuro hover:text-naranjaEnergy transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className={`text-naranjaEnergy text-lg font-bold transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
                    ▼
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-xs sm:text-sm text-humo leading-relaxed border-t border-white/5 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
