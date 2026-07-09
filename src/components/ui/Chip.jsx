export function Chip({
  children,
  variant = "turquesa",
  icon = null,
  ...props
}) {
  const base =
    "inline-flex items-center gap-2 px-3 py-1 rounded-full font-inter text-sm transition shadow-turquesaSoft";

  const variants = {
    turquesa:
      "bg-aquaTurquesa text-negroProfundo",
    negro:
      "bg-negroProfundo text-blancoPuro",
    blanco:
      "bg-blancoPuro text-negroProfundo",
    naranja:
      "bg-naranjaEnergy text-blancoPuro",
    outline:
      "border border-aquaTurquesa text-aquaTurquesa bg-transparent",
  };

  return (
    <span className={`${base} ${variants[variant]}`} {...props}>
      {icon && (
        <span className="w-4 h-4 bg-blancoPuro rounded-full shadow-turquesaSoft"></span>
      )}
      {children}
    </span>
  );
}
