import React, { useState, useRef, useEffect } from "react";

export default function CanvaProEditor() {
  const canvasRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 450, name: "YouTube / Web (16:9)" });
  const [headline, setHeadline] = useState("CÓMO ESCALAR TU PYME SIN CÓDIGO HUÉRFANO");
  const [subheadline, setSubheadline] = useState("Tecnología Instalada • Transferencia Andragógica");
  const [badgeText, setBadgeText] = useState("NUEVA MASTERCLASS 2026");
  const [bgColor, setBgColor] = useState("#0A0D14");
  const [accentColor, setAccentColor] = useState("#FF6B00");
  const [textColor, setTextColor] = useState("#FFFFFF");

  useEffect(() => {
    drawCanvas();
  }, [canvasSize, headline, subheadline, badgeText, bgColor, accentColor, textColor]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 1. Limpiar y pintar fondo
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Gradiente y Glow de fondo
    const gradient = ctx.createRadialGradient(
      canvas.width * 0.8,
      canvas.height * 0.2,
      20,
      canvas.width * 0.8,
      canvas.height * 0.2,
      canvas.width * 0.6
    );
    gradient.addColorStop(0, `${accentColor}33`);
    gradient.addColorStop(1, "transparent");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 3. Rejilla tecnológica sutil
    ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
    ctx.lineWidth = 1;
    const step = 40;
    for (let x = 0; x < canvas.width; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // 4. Barra lateral o marco de acento
    ctx.fillStyle = accentColor;
    ctx.fillRect(30, 40, 6, canvas.height - 80);

    // 5. Badge superior
    if (badgeText) {
      ctx.font = "bold 14px 'Plus Jakarta Sans', sans-serif";
      const badgeWidth = ctx.measureText(badgeText).width + 30;
      ctx.fillStyle = `${accentColor}26`;
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 1.5;
      
      // Dibujar caja redondeada de badge
      ctx.beginPath();
      ctx.roundRect(55, 50, badgeWidth, 32, 8);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = accentColor;
      ctx.fillText(badgeText, 70, 71);
    }

    // 6. Titular Principal (Wrap lines)
    ctx.fillStyle = textColor;
    ctx.font = "bold 32px 'Space Grotesk', sans-serif";
    const words = headline.split(" ");
    let line = "";
    let y = 140;
    const maxWidth = canvas.width - 120;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + " ";
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(line, 55, y);
        line = words[n] + " ";
        y += 44;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 55, y);

    // 7. Subtítulo
    if (subheadline) {
      y += 35;
      ctx.fillStyle = "#94A3B8";
      ctx.font = "18px 'Plus Jakarta Sans', sans-serif";
      ctx.fillText(subheadline, 55, y);
    }

    // 8. Marca de agua TSolutions en la esquina inferior
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.font = "bold 14px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("TSOLUTIONS IPIDD", 55, canvas.height - 50);

    ctx.fillStyle = accentColor;
    ctx.font = "12px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("Tecnología instalada • Negocios escalados", 55, canvas.height - 30);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `Portada_TSolutions_${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="space-y-8">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-large bg-midnightPanel border border-naranjaEnergy/30 shadow-card">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-naranjaEnergy/20 text-naranjaEnergy text-xs font-bold mb-2">
            <span>🎨 Módulo de Diseño Gráfico</span>
          </div>
          <h2 className="font-bruno text-2xl text-blancoPuro">
            Editor Canva PRO & Portadas
          </h2>
          <p className="text-humo text-xs sm:text-sm mt-1">
            Genera miniaturas para YouTube, banners y creatividades con los colores y tipografía oficial de TSolutions.
          </p>
        </div>

        <button
          onClick={handleDownload}
          className="px-5 py-2.5 bg-naranjaEnergy hover:bg-orange-600 text-white font-bruno text-xs rounded-medium shadow-glowEnergy transition flex items-center justify-center gap-2"
        >
          <span>💾 Descargar Portada PNG</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* PANEL DE HERRAMIENTAS Y AJUSTES */}
        <div className="lg:col-span-4 bg-midnightPanel p-6 rounded-large border border-white/10 shadow-card space-y-4">
          <h3 className="font-bruno text-sm text-blancoPuro border-b border-white/10 pb-3">
            Ajustes del Lienzo
          </h3>

          <div>
            <label className="block text-[11px] font-bold text-humo uppercase mb-1">Formato de Imagen</label>
            <select
              value={canvasSize.name}
              onChange={(e) => {
                if (e.target.value.includes("16:9")) setCanvasSize({ width: 800, height: 450, name: e.target.value });
                if (e.target.value.includes("1:1")) setCanvasSize({ width: 600, height: 600, name: e.target.value });
                if (e.target.value.includes("9:16")) setCanvasSize({ width: 450, height: 800, name: e.target.value });
              }}
              className="w-full bg-negroProfundo border border-white/10 rounded px-3 py-2 text-xs text-blancoPuro focus:outline-none focus:border-naranjaEnergy"
            >
              <option value="YouTube / Web (16:9)">YouTube / Web (16:9)</option>
              <option value="Instagram / Cuadrado (1:1)">Instagram / Cuadrado (1:1)</option>
              <option value="TikTok / Stories (9:16)">TikTok / Stories (9:16)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-humo uppercase mb-1">Insignia / Badge Superior</label>
            <input
              type="text"
              value={badgeText}
              onChange={(e) => setBadgeText(e.target.value)}
              className="w-full bg-negroProfundo border border-white/10 rounded px-3 py-2 text-xs text-blancoPuro focus:outline-none focus:border-naranjaEnergy"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-humo uppercase mb-1">Titular Principal (H1)</label>
            <textarea
              rows="3"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full bg-negroProfundo border border-white/10 rounded p-2 text-xs text-blancoPuro focus:outline-none focus:border-naranjaEnergy"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-humo uppercase mb-1">Subtítulo Descriptivo</label>
            <input
              type="text"
              value={subheadline}
              onChange={(e) => setSubheadline(e.target.value)}
              className="w-full bg-negroProfundo border border-white/10 rounded px-3 py-2 text-xs text-blancoPuro focus:outline-none focus:border-naranjaEnergy"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-[10px] font-bold text-humo uppercase mb-1">Color Acento</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="w-8 h-8 rounded bg-transparent border-0 cursor-pointer"
                />
                <span className="text-xs font-mono text-humo">{accentColor}</span>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-humo uppercase mb-1">Color Fondo</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-8 h-8 rounded bg-transparent border-0 cursor-pointer"
                />
                <span className="text-xs font-mono text-humo">{bgColor}</span>
              </div>
            </div>
          </div>
        </div>

        {/* LIENZO INTERACTIVO */}
        <div className="lg:col-span-8 bg-midnightPanel p-6 rounded-large border border-white/10 shadow-card flex flex-col items-center justify-center">
          <div className="max-w-full overflow-auto p-4 bg-negroProfundo rounded-large border border-white/5 flex items-center justify-center">
            <canvas
              ref={canvasRef}
              width={canvasSize.width}
              height={canvasSize.height}
              className="max-w-full h-auto rounded shadow-2xl border border-white/10"
            />
          </div>
          <span className="text-[11px] text-humo mt-3">
            Renderizado a escala real ({canvasSize.width}x{canvasSize.height}px). Pulsa "Descargar Portada" para exportar en PNG sin compresión.
          </span>
        </div>

      </div>

    </div>
  );
}
