export function Button({
  children,
  variant = "primary",
  size = "md",
  icon = null,
  ...props
}) {
  /* ============================
     🎨 BASE DEL BOTÓN
     ============================ */
  const base =
    "inline-flex items-center justify-center gap-3 font-bruno tracking-brunoMedium transition shadow-turquesaSoft rounded-medium";

  /* ============================
     🎨 VARIANTES DEL DESIGN SYSTEM
     ============================ */
  const variants = {
    primary:
      "bg-naranjaEnergy text-blancoPuro shadow-blancoPulse hover:shadow-turquesaHover hover:bg-[#fb8a2f]",
    secondary:
      "bg-aquaTurquesa text-negroProfundo shadow-blancoPulse hover:shadow-turquesaHover hover:bg-[#4ef2ff]",
    ghost:
      "bg-transparent text-negroProfundo border-2 border-negroProfundo hover:bg-negroProfundo hover:text-blancoPuro hover:shadow-turquesaHover",
    outlineTurquesa:
      "border-2 border-aquaTurquesa text-aquaTurquesa hover:bg-aquaTurquesa hover:text-negroProfundo hover:shadow-turquesaHover",
    outlineBlanco:
      "border-2 border-blancoPuro text-blancoPuro hover:bg-blancoPuro hover:text-negroProfundo hover:shadow-turquesaHover",
  };

  /* ============================
     📏 TAMAÑOS
     ============================ */
  const sizes = {
    md: "px-6 py-3 text-base",
    mini: "px-3 py-1 text-sm rounded-soft",
    xl: "px-10 py-6 text-[90px] font-montserratSlim tracking-tightSlim rounded-large",
  };

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]}`} {...props}>
      {icon && (
        <span className="w-5 h-5 bg-blancoPuro rounded-full shadow-turquesaSoft"></span>
      )}
      {children}
    </button>
  );
}
