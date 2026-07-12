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
        glowTurquesaSoft: "var(--glowTurquesaSoft)",
        glowTurquesaHover: "var(--glowTurquesaHover)",
        glowBlancoPulse: "var(--glowBlancoPulse)",
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
         ⚙️ ANIMACIONES
      ============================================================ */
      animation: {
        glowPulse: "var(--animate-glowPulse)",
        fadeTurquesa: "var(--animate-fadeTurquesa)",
        slideSoft: "var(--animate-slideSoft)",
        hoverPulse: "var(--animate-hoverPulse)",

        // efectos oficiales
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
