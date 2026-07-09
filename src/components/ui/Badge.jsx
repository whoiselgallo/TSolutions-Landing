export function Badge({
  children,
  variant = "turquesa",
  ...props
}) {
  const base =
    "inline-flex items-center px-3 py-1 rounded-soft font-inter text-sm font-interMedium transition";

  const variants = {
    turquesa:
      "bg-aquaTurquesa text-negroProfundo shadow-turquesaSoft",
    negro:
      "bg-negroProfundo text-blancoPuro shadow-turquesaSoft",
    blanco:
      "bg-blancoPuro text-negroProfundo shadow-turquesaSoft",
    naranja:
      "bg-naranjaEnergy text-blancoPuro shadow-turquesaSoft",
    outline:
      "border border-aquaTurquesa text-aquaTurquesa bg-transparent shadow-turquesaSoft",
  };

  return (
    <span className={`${base} ${variants[variant]}`} {...props}>
      {children}
    </span>
  );
}
