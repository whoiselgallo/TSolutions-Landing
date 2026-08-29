import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PortfolioAccessModal from "../modals/PortfolioAccessModal.jsx";

export default function Portfolio({ onSelectPackage }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTargetUrl, setModalTargetUrl] = useState("/portafolio");
  const [modalSelectedPkg, setModalSelectedPkg] = useState("");

  const previewPackages = [
    {
      id: "tarjeta-smart",
      level: "Nivel 1",
      name: "Tarjeta Smart",
      subtitle: "El Gancho — Mobile First",
      img: "/assets/iconografia/Smart_web_icon_design_2K_202608271207.jpeg",
      fallback: "/assets/iconografia/tarjetamuestra.jpg",
      price: "$950 MXN",
      model: "Pago único en 1 exhibición",
      description: "Bio Link inteligente optimizado en zona de pulgar para captar y cerrar ventas inmediatas en WhatsApp.",
      featured: false,
      badge: "Entrada Rápida"
    },
    {
      id: "escala-rapida",
      level: "Híbrido N1+N2",
      name: "Paquete Híbrido Escala Rápida",
      subtitle: "Smart Web + Google Maps Local",
      img: "/assets/iconografia/reddecrecimiento.jpg",
      fallback: "/assets/iconografia/innovacion.jpeg",
      price: "$3,700 MXN",
      model: "Anticipo 50% y 50% a la entrega",
      description: "Fusión integral de Smart Web y Landing de conversión local. Rescata tu negocio en Maps y automatiza pedidos.",
      featured: true,
      badge: "🔥 Más Recomendado"
    },
    {
      id: "ecommerce-total",
      level: "E-Commerce",
      name: "E-commerce Total con Logística",
      subtitle: "Transaccional + APIs Uber / DHL",
      img: "/assets/iconografia/Shopping_cart_icon_ui_design_202608271158.jpeg",
      fallback: "/assets/iconografia/Delivery_truck_icon_design_2K_202608271205.jpeg",
      price: "$9,850 MXN",
      model: "Anticipo 40% + 30% + 30%",
      description: "Tienda online completa con pasarelas de pago y despacho automático mediante Uber Direct y paqueterías.",
      featured: false,
      badge: "Logística Nativa"
    }
  ];

  const handleOpenPortfolio = (target = "/portafolio", pkgName = "") => {
    const isUnlocked = localStorage.getItem("tsolutions_portfolio_unlocked");
    if (isUnlocked === "true") {
      navigate(target);
    } else {
      setModalTargetUrl(target);
      setModalSelectedPkg(pkgName);
      setIsModalOpen(true);
    }
  };

  const handleDirectSelect = (packageName) => {
    if (onSelectPackage) {
      onSelectPackage(packageName);
    }
    const el = document.getElementById("contacto");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="portafolio" className="py-20 bg-negroProfundo border-b border-blancoPuro/5 relative">
      
      {/* Modal Gate de Filtro para Portafolio */}
      <PortfolioAccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        targetUrl={modalTargetUrl}
        selectedPackage={modalSelectedPkg}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* ENCABEZADO */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-naranjaEnergy uppercase tracking-widest">
            PORTAFOLIO COMERCIAL &bull; TSOLUTIONS IPIDD
          </span>
          <h2 className="font-bruno text-3xl sm:text-4xl text-blancoPuro mt-2">
            Ecosistemas Digitales para cada Etapa
          </h2>
          <p className="text-humo text-sm sm:text-base mt-3">
            Tecnología instalada, conocimiento transferido y negocios escalados. Elige una solución o explora el catálogo completo.
          </p>
        </div>

        {/* ================= TARJETAS DESTACADAS DEL PORTAFOLIO ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {previewPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-large p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative border ${
                pkg.featured
                  ? "bg-midnightPanel border-naranjaEnergy shadow-glowEnergy md:-translate-y-2"
                  : "bg-midnightPanel/70 border-white/10 hover:border-naranjaEnergy/50"
              }`}
            >
              {pkg.badge && (
                <span className="absolute top-4 right-4 text-[10px] font-bold uppercase px-3 py-1 rounded-full bg-naranjaEnergy/20 text-naranjaEnergy border border-naranjaEnergy/40">
                  {pkg.badge}
                </span>
              )}

              <div>
                {/* 3D Visual Asset Render — Ampliado */}
                <div className="relative w-full h-48 sm:h-56 rounded-large overflow-hidden mb-6 border border-white/10 bg-negroProfundo p-2 flex items-center justify-center shadow-inner">
                  <img
                    src={pkg.img}
                    onError={(e) => { e.target.src = pkg.fallback; }}
                    alt={pkg.name}
                    className="w-full h-full object-contain rounded-medium transform hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <span className="text-xs font-bold text-naranjaEnergy block mb-1">
                  {pkg.level}
                </span>
                <h3 className="font-bruno text-xl sm:text-2xl text-blancoPuro mb-1">
                  {pkg.name}
                </h3>
                <p className="text-xs text-humo mb-4 font-semibold">
                  {pkg.subtitle}
                </p>

                <div className="mb-4 pb-4 border-b border-white/10">
                  <span className="font-bruno text-2xl sm:text-3xl text-blancoPuro block">
                    {pkg.price}
                  </span>
                  <span className="text-[11px] text-humo block mt-0.5">
                    {pkg.model}
                  </span>
                </div>

                <p className="text-xs text-blancoPuro/80 leading-relaxed mb-6">
                  {pkg.description}
                </p>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => handleOpenPortfolio(`/portafolio?paquete=${pkg.id}`, pkg.name)}
                  className={`w-full py-3 px-4 rounded-medium text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    pkg.featured
                      ? "bg-naranjaEnergy hover:bg-orange-600 text-white shadow-glowEnergy"
                      : "bg-negroProfundo hover:bg-naranjaEnergy hover:text-white text-blancoPuro border border-white/10"
                  }`}
                >
                  <span>Ver detalles completos</span>
                  <span>→</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDirectSelect(`${pkg.name} (${pkg.price})`)}
                  className="w-full py-2 text-[11px] text-humo hover:text-naranjaEnergy font-semibold transition text-center cursor-pointer"
                >
                  ⚡ Cotizar directamente este paquete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ================= BANNER: ¿NO SABES POR DÓNDE EMPEZAR? / VER PORTAFOLIO COMPLETO ================= */}
        <div className="bg-gradient-to-r from-midnightPanel via-negroProfundo to-midnightPanel border border-naranjaEnergy/40 rounded-large p-6 sm:p-10 shadow-card relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
            
            <div className="max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-naranjaEnergy/10 border border-naranjaEnergy/30 text-naranjaEnergy text-xs font-bold mb-3">
                <span>🧭 ¿No estás seguro cuál elegir?</span>
              </div>
              <h3 className="font-bruno text-xl sm:text-2xl text-blancoPuro mb-2">
                Explora el Portafolio Completo de Soluciones & Consultoría
              </h3>
              <p className="text-xs sm:text-sm text-humo leading-relaxed">
                Compara todos los niveles de infraestructura, módulos de Inteligencia Artificial, Consultoría de Procesos (SOPs), Registro de Marca y el menú de complementos con <strong>75% de descuento preferencial</strong>.
              </p>
            </div>

            {/* BOTÓN CTA DESTACADO */}
            <div className="shrink-0 w-full lg:w-auto text-center">
              <button
                type="button"
                onClick={() => handleOpenPortfolio("/portafolio", "Portafolio General")}
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto py-4 px-8 bg-naranjaEnergy hover:bg-orange-600 text-white font-bruno text-sm sm:text-base rounded-medium shadow-glowEnergy hover:shadow-glowEnergyHover transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>📦 Ver Portafolio Completo</span>
                <span className="text-base">→</span>
              </button>
              <p className="text-[10px] text-humo mt-2">
                Incluye recomendador interactivo según tu tipo de negocio
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
