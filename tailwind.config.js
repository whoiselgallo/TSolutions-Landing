/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {

      /* ============================================================
         🎨 COLORES CORPORATIVOS
      ============================================================ */
      colors: {
        naranjaEnergy: "var(--color-naranjaEnergy)",
        aquaTurquesa: "var(--color-aquaTurquesa)",
        negroProfundo: "var(--color-negroProfundo)",
        blancoPuro: "var(--color-blancoPuro)",
        midnightPanel: "var(--color-midnightPanel)",
        deepGrid: "var(--color-deepGrid)",
        humo: "var(--color-humo)",
        dorado: "var(--color-dorado)",
        divider: "var(--divider-color)",
        deepBlack: "var(--color-deepBlack)",
        blancoPerla: "var(--color-blancoPerla)",
      },

      /* ============================================================
         💡 SOMBRAS & GLOWS
      ============================================================ */
      boxShadow: {
        turquesaSoft: "var(--shadow-turquesaSoft)",
        turquesaHover: "var(--shadow-turquesaHover)",
        blancoPulse: "var(--shadow-blancoPulse)",
        card: "var(--shadow-card)",

        // glows oficiales
        glowTurquesaSoft: "0 0 12px rgba(0,229,255,0.30)",
        glowTurquesaHover: "0 0 20px rgba(0,229,255,0.55)",
        glowBlancoPulse: "0 0 10px rgba(255,255,255,0.8)",
        glowEnergy: "var(--shadow-glowEnergy)",
        glowEnergyHover: "var(--shadow-glowEnergyHover)",
      },

      /* ============================================================
         🟠 RADIOS
      ============================================================ */
      borderRadius: {
        soft: "var(--radiusSoft)",
        medium: "var(--radiusMedium)",
        large: "var(--radiusLarge)",
        full: "var(--radiusFull)",
      },

      /* ============================================================
         🔤 TIPOGRAFÍAS
      ============================================================ */
      fontFamily: {
        bruno: ["Bruno Ace", "sans-serif"],
        montserratSlim: ["Montserrat Super Slim", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },

      /* ============================================================
         ⚙️ ANIMACIONES — BASE + PRO
      ============================================================ */
      keyframes: {
        fadeTurquesa: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideSoft: {
          "0%": { transform: "translateY(20px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },

        /* 🔥 ULTRA PRO — Animaciones futuras */
        slideLeft: {
          "0%": { transform: "translateX(40px)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        slideRight: {
          "0%": { transform: "translateX(-40px)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        blurIn: {
          "0%": { filter: "blur(12px)", opacity: 0 },
          "100%": { filter: "blur(0px)", opacity: 1 },
        },
        zoomOut: {
          "0%": { transform: "scale(1.1)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
      },

      animation: {
        fadeTurquesa: "fadeTurquesa 0.6s ease-out",
        slideSoft: "slideSoft 0.6s ease-out",
        scaleIn: "scaleIn 0.6s ease-out",

        /* 🔥 ULTRA PRO — Animaciones listas para usar */
        slideLeft: "slideLeft 0.6s ease-out",
        slideRight: "slideRight 0.6s ease-out",
        blurIn: "blurIn 0.7s ease-out",
        zoomOut: "zoomOut 0.7s ease-out",

        /* Animaciones oficiales */
        glowPulse: "var(--animate-glowPulse)",
        hoverPulse: "var(--animate-hoverPulse)",
        pulse: "pulse 2s ease-in-out infinite",
        ping: "ping 0.4s ease-out",
        spin: "spin 1s linear infinite",
        gridMove: "gridMove 10s linear infinite",
        float: "float 6s ease-in-out infinite",
      },

      /* ============================================================
         📱 BREAKPOINTS
      ============================================================ */
      screens: {
        sm: "480px",
        md: "640px",
        lg: "768px",
        xl: "1080px",
        "2xl": "1536px",
        "3xl": "1920px",
      },

      /* ============================================================
         📐 SPACING SYSTEM
      ============================================================ */
      spacing: {
        1: "var(--space-1)",
        2: "var(--space-2)",
        3: "var(--space-3)",
        4: "var(--space-4)",
        5: "var(--space-5)",
        6: "var(--space-6)",
        7: "var(--space-7)",
        8: "var(--space-8)",
      },

      /* ============================================================
         📦 DIMENSIONES DE COMPONENTES
      ============================================================ */
      maxWidth: {
        container: "var(--container-max-width)",
      },

      minWidth: {
        button: "var(--min-button-width)",
        input: "var(--min-input-width)",
        card: "var(--min-card-width)",
        modal: "var(--min-modal-width)",
      },

      minHeight: {
        button: "var(--min-button-height)",
        input: "var(--min-input-height)",
        card: "var(--min-card-height)",
        modal: "var(--min-modal-height)",
        dashboardSection: "var(--min-dashboard-section-height)",
      },
    },
  },

  plugins: [],
};
