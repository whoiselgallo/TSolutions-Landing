import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PortfolioAccessModal from "../modals/PortfolioAccessModal.jsx";
import CheckoutModal from "../ui/CheckoutModal.jsx";

export default function Portfolio({ onSelectPackage }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTargetUrl, setModalTargetUrl] = useState("/portafolio");
  const [modalSelectedPkg, setModalSelectedPkg] = useState("");

  // Estado del Modal de Pago
  const [checkoutProduct, setCheckoutProduct] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

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

  const handleDirectSelect = (pkgName) => {
    if (onSelectPackage) {
      onSelectPackage(pkgName);
    }
    const el = document.getElementById("contacto");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleOpenCheckout = (pkg) => {
    setCheckoutProduct(pkg);
    setIsCheckoutOpen(true);
  };

  return (
    <section id="portafolio" className="py-20 bg-negroProfundo border-b border-blancoPuro/5 relative">
      
      {/* MODAL DE ACCESO / DESBLOQUEO */}
      <PortfolioAccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        targetUrl={modalTargetUrl}
        selectedPackageName={modalSelectedPkg}
      />

      {/* MODAL DE PASARELA DE PAGO DIRECTA */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        product={checkoutProduct}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* ================= ENCABEZADO DE LA SECCIÓN ================= */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-naranjaEnergy uppercase tracking-widest block mb-2">
            ECOSISTEMAS DIGITALES &bull; TSOLUTIONS IPIDD
          </span>
          <h2 className="font-bruno text-3xl sm:text-4xl text-blancoPuro">
            Soluciones para Cada Etapa de tu Negocio
          </h2>
          <p className="text-humo text-xs sm:text-sm mt-3 leading-relaxed">
            Desde presencia táctica para cerrar ventas en WhatsApp hasta plataformas transaccionales con logística nativa de despachos y pasarelas de cobro seguras.
          </p>
        </div>

        {/* ================= GRID DE 3 PAQUETES DE ALTO IMPACTO ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {previewPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`bg-midnightPanel rounded-large p-6 flex flex-col justify-between border transition-all duration-300 shadow-card group hover:-translate-y-1 ${
                pkg.featured
                  ? "border-2 border-naranjaEnergy relative shadow-glowEnergy"
                  : "border-white/10 hover:border-naranjaEnergy/40"
              }`}
            >
              {pkg.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-naranjaEnergy text-white text-[11px] font-bold uppercase px-4 py-1 rounded-full shadow-glowEnergy z-10 whitespace-nowrap">
                  {pkg.badge}
                </div>
              )}

              <div>
                {/* Imagen del Paquete — Ampliada para visibilidad total */}
                <div 
                  onClick={() => handleOpenPortfolio(`/portafolio?paquete=${pkg.id}`, pkg.name)}
                  className="relative w-full h-56 rounded-large overflow-hidden mb-5 border border-white/10 bg-negroProfundo/90 flex items-center justify-center p-2 group-hover:border-naranjaEnergy/40 transition-colors shadow-inner cursor-pointer"
                >
                  <img
                    src={pkg.img}
                    onError={(e) => { e.target.src = pkg.fallback; }}
                    alt={pkg.name}
                    className="w-full h-full object-contain rounded-medium transform group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnightPanel/70 via-transparent to-transparent pointer-events-none"></div>
                  <span className="absolute top-2.5 right-2.5 text-[9px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-negroProfundo/90 text-naranjaEnergy border border-naranjaEnergy/40 backdrop-blur-sm">
                    {pkg.level}
                  </span>
                </div>

                <h3 className="font-bruno text-lg text-blancoPuro">{pkg.name}</h3>
                <p className="text-xs text-naranjaEnergy font-semibold mb-2">{pkg.subtitle}</p>

                <div className="mb-3 bg-negroProfundo/60 p-2.5 rounded-medium border border-white/5">
                  <span className="text-2xl font-bruno text-blancoPuro">{pkg.price}</span>
                  <p className="text-[11px] text-humo mt-0.5">{pkg.model}</p>
                </div>

                <p className="text-xs text-humo leading-relaxed mb-4">
                  {pkg.description}
                </p>
              </div>

              {/* ACCIONES Y BOTONES DE COBRO */}
              <div className="space-y-2 pt-4 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => handleOpenCheckout(pkg)}
                  className="w-full py-3 px-4 rounded-medium text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer bg-naranjaEnergy hover:bg-orange-600 text-white shadow-glowEnergy"
                >
                  <span>💳 Pagar en Línea / Anticipo</span>
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenPortfolio(`/portafolio?paquete=${pkg.id}`, pkg.name)}
                    className="py-2 px-2 bg-negroProfundo hover:bg-white/10 text-humo hover:text-white rounded border border-white/10 text-[11px] font-bold text-center"
                  >
                    Detalles
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDirectSelect(`${pkg.name} (${pkg.price})`)}
                    className="py-2 px-2 bg-negroProfundo hover:bg-white/10 text-humo hover:text-white rounded border border-white/10 text-[11px] font-bold text-center"
                  >
                    Cotizar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ================= BANNER: VER PORTAFOLIO COMPLETO ================= */}
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
                Incluye pasarelas de pago y recomendador interactivo
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
