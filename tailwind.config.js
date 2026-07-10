/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  
  theme: {
  extend: {
    colors: {
      aquaTurquesa: "#00f5d4",
      negroProfundo: "#0d0d0d",
      blancoPuro: "#ffffff",
      naranjaEnergy: "#ff6b00",
    },
    boxShadow: {
      turquesaSoft: "0 0 12px rgba(0, 245, 212, 0.4)",
    },
    borderRadius: {
      large: "1rem",
      soft: "0.5rem",
    },
    fontFamily: {
      inter: ["Inter", "sans-serif"],
      bruno: ["Bruno Ace SC", "cursive"],
    },
    theme: {
  extend: {
    screens: {
      sm: "480px",
      md: "640px",
      lg: "768px",
      xl: "1080px",
      "2xl": "1536px",
      "3xl": "1920px",
    },

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

    boxShadow: {
      elevation1: "var(--elevation-1)",
      elevation2: "var(--elevation-2)",
      elevation3: "var(--elevation-3)",
      elevation4: "var(--elevation-4)",
      elevation5: "var(--elevation-5)",
      glow: "0 0 12px var(--color-aqua-turquesa)",
    },

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
}

  },
},

};

