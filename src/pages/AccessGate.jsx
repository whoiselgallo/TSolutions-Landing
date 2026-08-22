import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { NeonText, Grid3D } from "../effects";
import { Button, Input } from "../components/ui";
import { Header, Footer } from "../components/layout";

const PRODUCT_LABELS = {
  logo_express:          { icon: "⚡", label: "Creador Express de Logotipo",                platform: "Brand Builder" },
  manifiesto:            { icon: "📜", label: "Manifiesto de Marca (Pilar 1)",               platform: "Brand Builder" },
  pitch:                 { icon: "🎙️", label: "Elevator Pitch Estratégico",                 platform: "Brand Builder" },
  voice:                 { icon: "🗣️", label: "Identidad de Voz y Tono",                   platform: "Brand Builder" },
  brandbook:             { icon: "📘", label: "Brandbook de Identidad",                      platform: "Brand Builder" },
  complete_bundle:       { icon: "👑", label: "Brand Pack Completo",                         platform: "Brand Builder" },
  ia_estandar:           { icon: "🤖", label: "IA Personalizada (Licencia Estándar)",        platform: "Consultoría TSolutions" },
  ia_premium:            { icon: "🧠", label: "IA Personalizada (Licencia Premium)",          platform: "Consultoría TSolutions" },
  web_estatico:          { icon: "💻", label: "Sitio Web / Landing Page",                    platform: "Portal de Cliente" },
  ecommerce:             { icon: "🛒", label: "Ecommerce Completo",                           platform: "Portal de Cliente" },
  integracion_logistica: { icon: "🚚", label: "Pasarela de Pagos & Logística",               platform: "Portal de Cliente" },
  produccion_podcast:    { icon: "🎙️", label: "Producción de Podcast",                       platform: "Portal de Cliente" },
  produccion_video:      { icon: "🎬", label: "Producción de Videos de Marca",               platform: "Portal de Cliente" },
  consultoria_1on1:      { icon: "👨‍💻", label: "Consultoría Estratégica 1-on-1",            platform: "Reunión Privada" },
  membership:            { icon: "🤝", label: "Membresía Mensual Pro TSolutions",             platform: "Soporte Prioritario" },
};

export default function AccessGate() {
  const { codigo } = useParams();
  const navigate = useNavigate();

  const [code, setCode] = useState(codigo || "");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const [productInfo, setProductInfo] = useState(null);
  const [redirecting, setRedirecting] = useState(false);
  const [countdown, setCountdown] = useState(3);

  // Si viene con código en la URL, validar automáticamente
  useEffect(() => {
    if (codigo) {
      setCode(codigo);
      validateCode(codigo);
    }
    // eslint-disable-next-line
  }, []);

  // Countdown para redirigir
  useEffect(() => {
    if (!redirecting) return;
    if (countdown <= 0) {
      window.location.href = productInfo.access_url;
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [redirecting, countdown, productInfo]);

  async function validateCode(overrideCode) {
    const targetCode = (overrideCode || code).trim().toUpperCase();
    if (!targetCode) {
      setErrorMsg("Ingresa tu código de acceso.");
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch(`/api/validate-access?code=${encodeURIComponent(targetCode)}`);
      const data = await res.json();

      if (data.valid) {
        setStatus("success");
        setProductInfo(data);
        setRedirecting(true);
      } else {
        setStatus("error");
        setErrorMsg(data.message || "Código inválido.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Error de conexión. Intenta de nuevo.");
    }
  }

  const meta = productInfo ? (PRODUCT_LABELS[productInfo.item_id] || { icon: "🔑", label: productInfo.item_name, platform: "TSolutions" }) : null;

  return (
    <div className="relative min-h-screen bg-negroProfundo overflow-hidden flex flex-col">
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Grid3D glow={true} />
      </div>
      <div className="fixed inset-0 bg-gradient-to-b from-negroProfundo/50 via-negroProfundo to-negroProfundo z-0 pointer-events-none" />

      <Header />

      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-md">

          {/* ---- ESTADO: Éxito / Redirigiendo ---- */}
          {status === "success" && productInfo && meta && (
            <div className="text-center space-y-6 animate-scaleIn">
              <div className="text-7xl mb-4">{meta.icon}</div>
              <h1 className="font-bruno text-3xl text-white">
                ¡Acceso <NeonText variant="cta" glow>Concedido</NeonText>!
              </h1>
              <div className="bg-midnightPanel border border-aquaTurquesa/30 rounded-large p-6 shadow-[0_0_30px_rgba(0,229,255,0.15)]">
                <p className="text-xs text-gray-400 font-bruno uppercase tracking-widest mb-1">Plataforma desbloqueada</p>
                <p className="text-xl font-bruno text-aquaTurquesa mb-1">{meta.platform}</p>
                <p className="text-sm text-gray-300">{meta.label}</p>
                {productInfo.email && (
                  <p className="text-xs text-gray-500 mt-2">Cuenta: {productInfo.email}</p>
                )}
              </div>
              <div className="bg-naranjaEnergy/10 border border-naranjaEnergy/30 rounded-medium p-4">
                <p className="text-gray-300 text-sm">
                  Redirigiendo en <span className="font-bruno text-naranjaEnergy text-2xl">{countdown}</span> segundos...
                </p>
              </div>
              <Button
                variant="turquesa"
                glow
                className="w-full font-bruno py-4"
                onClick={() => { window.location.href = productInfo.access_url; }}
              >
                Acceder ahora →
              </Button>
            </div>
          )}

          {/* ---- ESTADO: Formulario de código ---- */}
          {status !== "success" && (
            <div className="space-y-8">
              <div className="text-center">
                <span className="text-5xl mb-4 block">🔐</span>
                <h1 className="font-bruno text-3xl md:text-4xl text-white mb-3">
                  Acceso a tu <NeonText variant="cta" glow>Herramienta</NeonText>
                </h1>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Ingresa el código único que recibiste al completar tu compra para desbloquear acceso a tu plataforma.
                </p>
              </div>

              <div className="bg-midnightPanel border border-white/10 rounded-large p-8 shadow-card space-y-6">
                <div className="space-y-2">
                  <label className="block text-xs text-gray-300 font-bruno uppercase tracking-wider">
                    Código de acceso
                  </label>
                  <input
                    type="text"
                    placeholder="TS-A1B2C3D4E5"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    onKeyDown={(e) => e.key === "Enter" && validateCode()}
                    className="w-full bg-negroProfundo text-blancoPuro border border-white/10 rounded-medium px-4 py-3 text-base font-mono tracking-widest outline-none focus:border-naranjaEnergy transition duration-200 placeholder:text-gray-600 placeholder:tracking-normal placeholder:font-sans"
                    disabled={status === "loading"}
                    autoFocus
                    spellCheck={false}
                    autoComplete="off"
                  />
                  <p className="text-[10px] text-gray-500">
                    El código tiene el formato <span className="text-naranjaEnergy font-mono">TS-XXXXXXXXXX</span> y fue enviado a tu correo y mostrado en pantalla al pagar.
                  </p>
                </div>

                {/* Error */}
                {status === "error" && errorMsg && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-medium px-4 py-3 text-red-400 text-xs font-inter">
                    ⚠️ {errorMsg}
                  </div>
                )}

                <Button
                  variant="naranja"
                  glow
                  className="w-full font-bruno py-4 uppercase tracking-wider text-negroProfundo"
                  onClick={() => validateCode()}
                  disabled={status === "loading" || !code.trim()}
                >
                  {status === "loading" ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-negroProfundo/30 border-t-negroProfundo rounded-full animate-spin" />
                      Verificando...
                    </span>
                  ) : (
                    "Desbloquear Acceso 🔑"
                  )}
                </Button>
              </div>

              {/* Info adicional */}
              <div className="text-center space-y-2">
                <p className="text-xs text-gray-500">
                  ¿No encuentras tu código?{" "}
                  <a href="/tienda" className="text-naranjaEnergy hover:underline">Revisa tu compra</a>{" "}
                  o{" "}
                  <a href="/#contacto" className="text-naranjaEnergy hover:underline">contáctanos</a>.
                </p>
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
