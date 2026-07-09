export function Avatar({
  src = null,
  name = "",
  size = "md",
  bordered = false,
  ...props
}) {
  const sizes = {
    sm: "w-10 h-10 text-sm",
    md: "w-14 h-14 text-base",
    lg: "w-20 h-20 text-xl",
  };

  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "?";

  return (
    <div
      className={`
        ${sizes[size]}
        rounded-full
        overflow-hidden
        bg-blancoPuro
        text-negroProfundo
        flex items-center justify-center
        font-bruno
        shadow-turquesaSoft
        ${bordered ? "border-2 border-aquaTurquesa" : ""}
      `}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          className="w-full h-full object-cover"
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}
