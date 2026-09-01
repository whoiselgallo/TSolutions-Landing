import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function TermsPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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

      {/* CONTENIDO PRINCIPAL */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="border-b border-white/10 pb-6 mb-8">
          <span className="text-xs font-mono font-bold text-cyan-400 tracking-widest uppercase block mb-2">
            CONTRATO MARCO Y CONDICIONES DE USO
          </span>
          <h1 className="font-bruno text-2xl sm:text-4xl text-blancoPuro mb-3">
            Términos y Condiciones del Servicio
          </h1>
          <p className="text-xs text-humo">
            Última actualización: Agosto de 2026 &bull; TSolutions IPIDD (Consultoría y Ecosistemas Digitales)
          </p>
        </div>

        <div className="space-y-8 text-xs sm:text-sm text-humo leading-relaxed">
          {/* 1. OBJETO Y ALCANCE */}
          <section className="bg-midnightPanel p-6 rounded-large border border-white/10 shadow-card">
            <h2 className="font-bruno text-base text-blancoPuro mb-3 text-cyan-400">
              1. Objeto y Aceptación de los Servicios
            </h2>
            <p>
              El presente documento establece los términos bajo los cuales <strong>TSolutions IPIDD</strong> presta servicios de desarrollo de ecosistemas digitales, automatización de ventas con WhatsApp Cloud API, rescate en Google Maps, consultoría estratégica (SOPs), pasarelas de pago y transferencia andragógica de conocimiento a personas físicas y morales en la República Mexicana y el extranjero. Al interactuar en nuestro sitio o contratar cualquiera de nuestros paquetes, el usuario acepta plenamente estas condiciones.
            </p>
          </section>

          {/* 2. PROPIEDAD INTELECTUAL Y CERO CÓDIGO HUÉRFANO */}
          <section className="bg-midnightPanel p-6 rounded-large border border-white/10 shadow-card">
            <h2 className="font-bruno text-base text-blancoPuro mb-3 text-cyan-400">
              2. Propiedad Intelectual y Cero Código Huérfano
            </h2>
            <p className="mb-2">
              Bajo la filosofía institucional de <em>"Tecnología Instalada | Conocimiento Transferido | Negocios Escalados"</em>:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-blancoPuro/90 ml-2">
              <li>El cliente adquiere la <strong>propiedad y control total de sus activos digitales</strong>, repositorios de código, dominios, cuentas de Google Workspace y cuentas de pasarela Stripe / Mercado Pago.</li>
              <li>TSolutions IPIDD garantiza la entrega de accesos maestros, eliminando cobros forzosos por renta de código o dependencia técnica cautiva.</li>
            </ul>
          </section>

          {/* 3. CONDICIONES DE PAGO Y ESQUEMA DE FACTURACIÓN */}
          <section className="bg-midnightPanel p-6 rounded-large border border-white/10 shadow-card">
            <h2 className="font-bruno text-base text-blancoPuro mb-3 text-cyan-400">
              3. Esquema de Pagos y Facturación Fiscal
            </h2>
            <ul className="list-disc list-inside space-y-1.5 text-blancoPuro/90 ml-2">
              <li><strong>Proyectos de Desarrollo:</strong> Se estructuran bajo anticipo (50% al arranque / 50% a la entrega y capacitación, o 40%/30%/30% en paquetes mayores).</li>
              <li><strong>Precios Transparentes:</strong> Todos los precios mostrados en el catálogo (Smart $950, Maps $2,750, Híbrido $3,700, Ecosistema $5,450, E-commerce $9,850 MXN) son netos y sujetos a emisión de factura fiscal mexicana (CFDI 4.0).</li>
              <li><strong>Regalos Institucionales:</strong> La Terminal Point Mini de Mercado Pago incluida en paquetes de pasarela/ecommerce es propiedad definitiva del cliente.</li>
            </ul>
          </section>

          {/* 4. GARANTÍA Y SOPORTE POST-ENTREGA */}
          <section className="bg-midnightPanel p-6 rounded-large border border-white/10 shadow-card">
            <h2 className="font-bruno text-base text-blancoPuro mb-3 text-cyan-400">
              4. Póliza de Garantía de 30 Días y SLA
            </h2>
            <p>
              Todos los despliegues cuentan con <strong>30 días naturales de garantía técnica correctiva</strong> a partir de la firma de conformidad de la sesión de Kickoff. Cualquier error o ajuste de funcionamiento sobre el alcance pactado se solventa con un tiempo de respuesta de SLA menor a 24 horas hábiles.
            </p>
          </section>

          {/* 5. USO DE LA INTEGRACIÓN DE WHATSAPP (RUA AGENT) */}
          <section className="bg-midnightPanel p-6 rounded-large border border-white/10 shadow-card">
            <h2 className="font-bruno text-base text-blancoPuro mb-3 text-cyan-400">
              5. Integración con Meta WhatsApp Cloud API
            </h2>
            <p>
              Las conversaciones e interacciones a través de WhatsApp Business son asistidas por nuestro agente inteligente <strong>RUA (Real Utility Agent)</strong> bajo los lineamientos y políticas de uso comercial de Meta Platforms, Inc. El cliente se compromete a no utilizar las integraciones para envío de spam o actividades contrarias a la ley.
            </p>
          </section>

          {/* 6. CONTACTO LEGAL */}
          <section className="bg-midnightPanel p-6 rounded-large border border-white/10 shadow-card text-center">
            <h2 className="font-bruno text-base text-blancoPuro mb-2 text-cyan-400">
              6. Jurisdicción y Contacto
            </h2>
            <p className="text-humo mb-4">
              Para cualquier controversia o aclaración legal, las partes se someten a la legislación mercantil aplicable en la República Mexicana.
            </p>
            <div className="font-mono text-xs text-naranjaEnergy">
              Dirección de Operaciones: javier.gallardo@tsolutionsipidd.com
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
