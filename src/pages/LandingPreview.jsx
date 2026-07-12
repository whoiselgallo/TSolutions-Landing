import React from "react";

// Layout components
import {
  Header,
  Hero,
  Features,
  Showcase,
  Contact,
  Footer,
} from "../components/layout";

// Page transition effect
import PageTransition from "../effects/transitions/PageTransition";

export default function LandingPreview() {
  return (
    <PageTransition type="fade" glow>
      <div className="bg-negroProfundo text-blancoPuro min-h-screen">

        {/* ================= HEADER ================= */}
        <Header />

        {/* ================= HERO ================= */}
        <Hero
          title="TSolutions IPIDD"
          subtitle="Tecnología, diseño y automatización para el futuro."
          ctaLabel="Comenzar"
        />

        {/* ================= FEATURES ================= */}
        <Features
          items={[
            {
              title: "Diseño Futurista",
              description: "Interfaz con tokens corporativos y efectos avanzados.",
            },
            {
              title: "Automatización IA",
              description: "Agentes inteligentes integrados en todo el sistema.",
            },
            {
              title: "Escalabilidad",
              description: "Arquitectura modular lista para crecer.",
            },
          ]}
        />

        {/* ================= SHOWCASE ================= */}
        <Showcase
          title="Nuestros Productos"
          items={[
            {
              name: "Zoco MéXL",
              description: "Marketplace escalable con IA integrada.",
            },
            {
              name: "La Cueva del Güero",
              description: "Plataforma multimedia con identidad única.",
            },
            {
              name: "Brand Builder API",
              description: "Generador de marcas corporativas con IA.",
            },
          ]}
        />

        {/* ================= CONTACT ================= */}
        <Contact
          title="Contáctanos"
          description="¿Listo para llevar tu empresa al futuro?"
        />

        {/* ================= FOOTER ================= */}
        <Footer />

      </div>
    </PageTransition>
  );
}
