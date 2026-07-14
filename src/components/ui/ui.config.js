// ============================================================
// 🎨 TSolutions IPIDD — UI CONFIG V1
// Fuente de verdad para todos los componentes UI
// ============================================================

export const UI = {
  // ------------------------------------------------------------
  // 🔠 Tipografía
  // ------------------------------------------------------------
  font: {
    base: "font-inter",
    heading: "font-inter font-semibold",
    mono: "font-mono",
  },

  // ------------------------------------------------------------
  // 🟦 Tamaños globales
  // ------------------------------------------------------------
  sizes: {
    badge: {
      sm: "text-[10px] px-2 py-[2px] gap-1",
      md: "text-xs px-2.5 py-1 gap-1.5",
      lg: "text-sm px-3 py-1.5 gap-2",
    },
    button: {
      sm: "text-xs px-3 py-1 gap-1.5",
      md: "text-sm px-4 py-2 gap-2",
      lg: "text-base px-5 py-3 gap-2.5",
    },
    chip: {
      sm: "text-[10px] px-2 py-[2px] gap-1",
      md: "text-xs px-2.5 py-1 gap-1.5",
      lg: "text-sm px-3 py-1.5 gap-2",
    },
    avatar: {
      sm: "w-8 h-8 text-xs",
      md: "w-12 h-12 text-sm",
      lg: "w-16 h-16 text-base",
    },
    card: {
      sm: "p-3",
      md: "p-5",
      lg: "p-7",
    },
  },

  // ------------------------------------------------------------
  // 🎨 Variantes corporativas
  // ------------------------------------------------------------
  variants: {
    badge: {
      turquesa: "bg-aquaTurquesa text-negroProfundo",
      naranja: "bg-naranjaEnergy text-blancoPuro",
      blanco: "bg-blancoPuro text-negroProfundo",
      ghost: "bg-transparent text-blancoPuro border border-blancoPuro",
    },
    button: {
      naranja: "bg-naranjaEnergy text-blancoPuro hover:bg-naranjaEnergy/90",
      turquesa: "bg-aquaTurquesa text-negroProfundo hover:bg-aquaTurquesa/90",
      blanco: "bg-blancoPuro text-negroProfundo hover:bg-blancoPuro/90",
      ghost: "bg-transparent border border-blancoPuro text-blancoPuro hover:bg-blancoPuro/10",
    },
    chip: {
      ghost: "bg-transparent border border-blancoPuro text-blancoPuro",
      turquesa: "bg-aquaTurquesa text-negroProfundo",
      naranja: "bg-naranjaEnergy text-blancoPuro",
      blanco: "bg-blancoPuro text-negroProfundo",
    },
    card: {
      dark: "bg-negroProfundo text-blancoPuro",
      light: "bg-blancoPuro text-negroProfundo",
      turquesa: "bg-aquaTurquesa text-negroProfundo",
    },
  },

  // ------------------------------------------------------------
  // ✨ Efectos globales
  // ------------------------------------------------------------
  effects: {
    glow: {
      default: "shadow-glowTurquesaSoft",
      hover: "hover:shadow-glowTurquesaHover",
    },
    transitions: {
      soft: "transition-all duration-300",
    },
    animations: {
      fade: "animate-fadeTurquesa",
      slide: "animate-slideSoft",
    },
  },

  // ------------------------------------------------------------
  // 🟣 Radios corporativos
  // ------------------------------------------------------------
  radius: {
    soft: "rounded-soft",
    hard: "rounded-hard",
    full: "rounded-full",
  },
};
