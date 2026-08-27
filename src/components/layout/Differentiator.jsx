import React from "react";

export default function Differentiator() {
  return (
    <section className="py-20 bg-midnightPanel/70 border-b border-blancoPuro/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        <div className="bg-negroProfundo border border-naranjaEnergy/40 rounded-large p-8 sm:p-12 relative overflow-hidden shadow-card">
          <div className="absolute -right-20 -bottom-20 w-72 h-72 bg-naranjaEnergy/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-medium bg-naranjaEnergy/20 text-naranjaEnergy flex items-center justify-center text-2xl border border-naranjaEnergy/30">
              🎓
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-naranjaEnergy">El Diferenciador TSolutions IPIDD</span>
              <h3 className="font-bruno text-xl sm:text-3xl text-blancoPuro">Consultoría Formativa y Competencias Laborales</h3>
            </div>
          </div>

          <p className="text-blancoPuro/90 text-sm sm:text-base leading-relaxed mb-8">
            La promesa central de TSolutions IPIDD no termina en el despliegue del software. Al finalizar la implementación, capacitamos a tu personal bajo <strong>principios andragógicos</strong> cubriendo los 3 dominios esenciales para asegurar que tu equipo venza la resistencia al cambio y opere con total soltura:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="p-5 rounded-medium bg-midnightPanel border border-white/5">
              <span className="text-2xl block mb-2">🧠</span>
              <h4 className="font-bruno text-sm text-blancoPuro mb-1">Dominio Cognitivo</h4>
              <p className="text-xs text-humo">Comprensión lógica de la arquitectura, flujos y por qué de cada herramienta.</p>
            </div>
            <div className="p-5 rounded-medium bg-midnightPanel border border-white/5">
              <span className="text-2xl block mb-2">⚙️</span>
              <h4 className="font-bruno text-sm text-blancoPuro mb-1">Dominio Psicomotor</h4>
              <p className="text-xs text-humo">Manejo ágil del panel, pedidos, despachos logísticos y actualización de catálogos.</p>
            </div>
            <div className="p-5 rounded-medium bg-midnightPanel border border-white/5">
              <span className="text-2xl block mb-2">🤝</span>
              <h4 className="font-bruno text-sm text-blancoPuro mb-1">Dominio Afectivo</h4>
              <p className="text-xs text-humo">Apropiación cultural de la tecnología, confianza y erradicación del miedo al cambio.</p>
            </div>
          </div>

          <div className="p-4 rounded-medium bg-naranjaEnergy/10 border border-naranjaEnergy/30 flex flex-col sm:flex-row items-center gap-4">
            <div className="text-3xl text-naranjaEnergy">📜</div>
            <p className="text-xs text-blancoPuro leading-relaxed">
              <strong>Acreditación Oficial:</strong> Como agentes capacitadores, otorgamos la <em>Constancia de Participación y Dominio Tecnológico</em> (y constancias de competencias laborales <strong>Formato DC-3</strong> conforme al marco normativo de la STPS), garantizando la verdadera independencia operativa de tu empresa.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
