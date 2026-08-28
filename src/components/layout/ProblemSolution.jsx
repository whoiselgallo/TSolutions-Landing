import React from "react";

export default function ProblemSolution() {
  const points = [
    {
      img: "/assets/iconografia/ubicaciongoogle.jpg",
      fallback: "/assets/iconografia/Design_business_logo_for_maps_202608270910.jpeg",
      tag: "Caos en Mapas & Pedidos",
      title: "Fuga de Clientes por Caos Local",
      pain: "Direcciones erróneas en Google Maps, horarios desactualizados y falta de canales directos de WhatsApp hacen que el cliente termine comprando a tu competencia.",
      solution: "Rescate geográfico, depuración SEO Local en Google Maps y automatización directa de WhatsApp Business."
    },
    {
      img: "/assets/iconografia/resistenciaalcambio.jpeg",
      fallback: "/assets/iconografia/Developer_icon_design_for_agency_202608271202.jpeg",
      tag: "Falta de Capacitación",
      title: "El Síndrome del 'Código Huérfano'",
      pain: "Las agencias tradicionales entregan un software o sitio web y desaparecen. Tu personal no sabe usarlo, surge resistencia al cambio y la inversión se pierde en el olvido.",
      solution: "Capacitación andragógica al equipo, manuales SOP y entrega de constancia de aprendizaje y dominio tecnológico."
    },
    {
      img: "/assets/iconografia/Kaizen_tech_icon_design_2K_202608271201.jpeg",
      fallback: "/assets/iconografia/orden.jpeg",
      tag: "Trabajo Manual Repetitivo",
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
              className="bg-midnightPanel p-6 sm:p-7 rounded-large border border-naranjaEnergy/20 hover:border-naranjaEnergy transition-all duration-300 flex flex-col justify-between shadow-card group"
            >
              <div>
                {/* Visual Icon Header — Ampliado */}
                <div className="relative w-full h-56 sm:h-64 rounded-large overflow-hidden mb-5 border border-white/10 bg-negroProfundo p-2 flex items-center justify-center shadow-inner">
                  <img
                    src={item.img}
                    onError={(e) => { e.target.src = item.fallback; }}
                    alt={item.title}
                    className="w-full h-full object-contain sm:object-cover rounded-medium transform group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnightPanel/80 via-transparent to-transparent pointer-events-none"></div>
                  <span className="absolute bottom-3 left-3 text-[10px] uppercase font-bold px-3 py-1 rounded-full bg-naranjaEnergy text-white shadow-glowEnergy">
                    {item.tag}
                  </span>
                </div>

                <h3 className="font-bruno text-lg text-blancoPuro mb-3">{item.title}</h3>
                <p className="text-xs sm:text-sm text-humo leading-relaxed mb-6">
                  {item.pain}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <p className="text-xs font-bold text-naranjaEnergy flex items-center gap-1 mb-1">
                  ✓ Solución TSolutions IPIDD:
                </p>
                <p className="text-xs text-blancoPuro/90 leading-relaxed">
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
