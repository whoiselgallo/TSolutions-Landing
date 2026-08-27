import React from "react";

export default function ProblemSolution() {
  const points = [
    {
      icon: "📍",
      title: "Fuga de Clientes por Caos Local",
      pain: "Direcciones erróneas en Google Maps, horarios desactualizados y falta de canales directos de WhatsApp hacen que el cliente termine comprando a tu competencia.",
      solution: "Rescate geográfico, optimización SEO Local en Maps y enlace directo a WhatsApp Business."
    },
    {
      icon: "💻",
      title: "El Síndrome del 'Código Huérfano'",
      pain: "Las agencias tradicionales entregan un software o sitio web y desaparecen. Tu personal no sabe usarlo, surge resistencia al cambio y la inversión se pierde en el olvido.",
      solution: "Capacitación andragógica al equipo, manuales SOP y entrega de constancia DC-3 de dominio."
    },
    {
      icon: "⚙️",
      title: "Cuellos de Botella y Operación Manual",
      pain: "Dueños de negocio triangulando envíos manualmente por mensajes, respondiendo preguntas repetitivas y perdiendo horas en tareas administrativas no escalables.",
      solution: "Middleware de IA, automatización con APIs de logística (Uber Direct / DiDi / DHL) y chatbots inteligentes."
    }
  ];

  return (
    <section className="py-20 bg-negroProfundo border-b border-blancoPuro/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-naranjaEnergy uppercase tracking-widest">
            ¿Por qué fallan las implementaciones convencionales?
          </span>
          <h2 className="font-bruno text-2xl sm:text-4xl text-blancoPuro mt-2">
            El dolor de las PYMES vs La Solución TSolutions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {points.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-midnightPanel p-7 rounded-large border border-naranjaEnergy/20 hover:border-naranjaEnergy transition-all duration-300 flex flex-col justify-between shadow-card"
            >
              <div>
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-bruno text-lg text-blancoPuro mb-3">{item.title}</h3>
                <p className="text-sm text-humo leading-relaxed mb-6">
                  {item.pain}
                </p>
              </div>
              <div className="pt-4 border-t border-white/10">
                <p className="text-xs font-bold text-naranjaEnergy flex items-center gap-1 mb-1">
                  ✓ Solución TSolutions IPIDD:
                </p>
                <p className="text-xs text-blancoPuro/90">
                  {item.solution}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
