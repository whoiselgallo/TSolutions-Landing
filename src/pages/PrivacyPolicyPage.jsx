import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function PrivacyPolicyPage() {
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
          <span className="text-xs font-mono font-bold text-naranjaEnergy tracking-widest uppercase block mb-2">
            MARCO LEGAL Y PROTECCIÓN DE DATOS
          </span>
          <h1 className="font-bruno text-2xl sm:text-4xl text-blancoPuro mb-3">
            Aviso de Privacidad y Términos de Servicio
          </h1>
          <p className="text-xs text-humo">
            Última actualización: Agosto de 2026 &bull; TSolutions IPIDD (Consultoría y Ecosistemas Digitales)
          </p>
        </div>

        <div className="space-y-8 text-xs sm:text-sm text-humo leading-relaxed">
          {/* 1. RESPONSABLE */}
          <section className="bg-midnightPanel p-6 rounded-large border border-white/10 shadow-card">
            <h2 className="font-bruno text-base text-blancoPuro mb-3 text-naranjaEnergy">
              1. Identidad y Domicilio del Responsable
            </h2>
            <p>
              <strong>TSolutions IPIDD</strong>, con portal web oficial en <a href="https://tsolutionsipidd.com" className="text-cyan-400 hover:underline">https://tsolutionsipidd.com</a> y correo oficial de contacto <a href="mailto:javier.gallardo@tsolutionsipidd.com" className="text-naranjaEnergy hover:underline">javier.gallardo@tsolutionsipidd.com</a>, es el responsable del uso y protección de sus datos personales bajo la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) y estándares internacionales de privacidad.
            </p>
          </section>

          {/* 2. DATOS RECABADOS */}
          <section className="bg-midnightPanel p-6 rounded-large border border-white/10 shadow-card">
            <h2 className="font-bruno text-base text-blancoPuro mb-3 text-naranjaEnergy">
              2. Datos Personales que Recabamos
            </h2>
            <p className="mb-3">
              Para los servicios de consultoría estratégica, desarrollo de ecosistemas digitales, integración de WhatsApp Business API, diagnósticos de madurez y capacitaciones andragógicas, recabamos:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-blancoPuro/90 ml-2">
              <li>Nombre completo del titular o representante del negocio.</li>
              <li>Correo electrónico corporativo o personal.</li>
              <li>Número de teléfono móvil / WhatsApp para soporte y notificaciones.</li>
              <li>Nombre comercial, giro e industria del negocio.</li>
              <li>Datos operativos y de infraestructura (presencia en Google Maps, métodos de pago, flujos de pedidos).</li>
            </ul>
          </section>

          {/* 3. FINALIDADES DEL TRATAMIENTO */}
          <section className="bg-midnightPanel p-6 rounded-large border border-white/10 shadow-card">
            <h2 className="font-bruno text-base text-blancoPuro mb-3 text-naranjaEnergy">
              3. Finalidad del Tratamiento de Datos
            </h2>
            <p className="mb-2">Sus datos personales serán utilizados para las siguientes finalidades primarias:</p>
            <ul className="list-disc list-inside space-y-1.5 text-blancoPuro/90 ml-2">
              <li>Generar reportes ejecutivos de Diagnóstico Digital con semáforo de fugas operativas.</li>
              <li>Agendar y confirmar sesiones técnicas 1 a 1 de 20 minutos vía Google Meet o WhatsApp.</li>
              <li>Desplegar infraestructura tecnológica (Bio links, Smart Web, Tiendas con Uber Direct).</li>
              <li>Atención interactiva y automatizada mediante nuestro agente de IA <strong>RUA (Real Utility Agent)</strong> en WhatsApp y web.</li>
              <li>Emisión de facturas fiscales y comprobantes de constancia de dominio tecnológico.</li>
            </ul>
          </section>

          {/* 4. INTEGRACIONES DE TERCEROS Y META / WHATSAPP */}
          <section className="bg-midnightPanel p-6 rounded-large border border-white/10 shadow-card">
            <h2 className="font-bruno text-base text-blancoPuro mb-3 text-naranjaEnergy">
              4. Transferencia de Datos e Integraciones (Meta Cloud API, Stripe, Google)
            </h2>
            <p>
              TSolutions IPIDD no vende ni comercializa datos personales con terceros. Los datos transferidos a proveedores de infraestructura (Meta WhatsApp Cloud API, Stripe Payments, Google Cloud y Google Workspace) se realizan bajo estrictos acuerdos de confidencialidad y cifrado TLS/HTTPS de grado bancario exclusivamente para la prestación del servicio contratado.
            </p>
          </section>

          {/* 5. DERECHOS ARCO */}
          <section className="bg-midnightPanel p-6 rounded-large border border-white/10 shadow-card">
            <h2 className="font-bruno text-base text-blancoPuro mb-3 text-naranjaEnergy">
              5. Derechos ARCO (Acceso, Rectificación, Cancelación y Oposición)
            </h2>
            <p>
              Usted tiene derecho a conocer qué datos tenemos de usted, para qué los usamos y las condiciones del uso que les damos (Acceso). Asimismo, es su derecho solicitar la corrección, actualización o eliminación definitiva de sus datos de nuestras bases de datos enviando un correo electrónico a:
            </p>
            <div className="mt-3 p-3 rounded bg-negroProfundo border border-white/10 font-mono text-cyan-400">
              javier.gallardo@tsolutionsipidd.com &bull; Asunto: "Solicitud Derechos ARCO"
            </div>
          </section>

          {/* 6. CONTACTO OFICIAL */}
          <section className="bg-midnightPanel p-6 rounded-large border border-white/10 shadow-card text-center">
            <h2 className="font-bruno text-base text-blancoPuro mb-2 text-naranjaEnergy">
              6. Contacto Institucional
            </h2>
            <p className="text-humo mb-4">
              TSolutions IPIDD &bull; Tecnología Instalada | Conocimiento Transferido | Negocios Escalados
            </p>
            <a
              href="mailto:javier.gallardo@tsolutionsipidd.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-medium bg-naranjaEnergy text-white font-bruno text-xs shadow-glowEnergy"
            >
              ✉️ Contactar al Oficial de Privacidad
            </a>
          </section>
        </div>
      </main>
    </div>
  );
}
