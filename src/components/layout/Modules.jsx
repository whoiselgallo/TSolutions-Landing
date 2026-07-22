import React from "react";
import { Link } from "react-router-dom";
import MagneticCard from "../../effects/mouse/MagneticCard";
import NeonText from "../../effects/text/NeonText";

export default function Modules() {
  const modules = [
    {
      title: "Ferretería Smart",
      path: "https://ferreteria.tsolutionsipidd.com",
      icon: "📦",
      desc: "Automatiza tu inventario, dispara tus ventas y mejora el servicio con IA.",
      color: "naranjaEnergy"
    },
    {
      title: "La Cueva del Güero",
      path: "https://www.lacuevadelguero.com",
      icon: "🎙️",
      desc: "Módulo de podcasts, creación de avatares interactivos y producción audiovisual.",
      color: "aquaTurquesa"
    },
    {
      title: "Brand Identity",
      path: "/brand-builder",
      icon: "🎨",
      desc: "El núcleo de diseño corporativo y branding de manuales de identidad visual.",
      color: "naranjaEnergy"
    },
    {
      title: "Consultoría Estratégica",
      path: "/consultoria",
      icon: "👑",
      desc: "Asesoramiento de negocios, análisis de escalabilidad e integración de sistemas.",
      color: "dorado"
    }
  ];

  return (
    <section className="py-20 px-6 bg-deepGrid relative border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <NeonText variant="turquesa" size="xl" glow className="mb-4 font-bruno">
            Nuestro Ecosistema
          </NeonText>
          <p className="font-inter text-gray-400 max-w-2xl mx-auto">
            Explora las diferentes divisiones de TSolutions diseñadas para llevar tu negocio al siguiente nivel.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((mod, index) => {
            const isExternal = mod.path.startsWith("http");
            const CardContent = (
              <MagneticCard intensity={25} glow={true} className="h-full p-6 rounded-2xl bg-midnightPanel border border-white/10 hover:border-white/30 flex flex-col items-center text-center transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition-transform">
                  {mod.icon}
                </div>
                <h4 className="font-bruno font-bold text-lg text-white mb-3">
                  {mod.title}
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {mod.desc}
                </p>
                <div className={`mt-6 text-sm font-bold text-${mod.color} opacity-0 group-hover:opacity-100 transition-opacity`}>
                  Explorar Módulo &rarr;
                </div>
              </MagneticCard>
            );

            return isExternal ? (
              <a href={mod.path} target="_blank" rel="noopener noreferrer" key={index} className="block group">
                {CardContent}
              </a>
            ) : (
              <Link to={mod.path} key={index} className="block group">
                {CardContent}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
