export function Select({ children, ...props }) {
  return (
    <select
      {...props}
      className="
        w-full
        p-3
        rounded-soft
        border
        border-negroProfundo/20
        font-inter
        text-negroProfundo
        bg-blancoPuro

        focus:border-aquaTurquesa
        focus:shadow-turquesaSoft
        focus:outline-none

        transition
      "
    >
      {children}
    </select>
  );
}
