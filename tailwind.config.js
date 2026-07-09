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
  },
},

};

