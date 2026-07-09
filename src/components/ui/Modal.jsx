export function Modal({ open = false, onClose, title, children }) {
  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0
        bg-negroProfundo/60
        backdrop-blur-sm
        flex items-center justify-center
        z-50
        animate-fadeTurquesa
      "
      onClick={onClose}
    >
      <div
        className="
          bg-blancoPuro
          rounded-large
          shadow-turquesaSoft
          p-6
          w-full max-w-lg
          animate-slideSoft
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          {title && (
            <h2 className="font-bruno font-brunoHeavy tracking-brunoMedium text-negroProfundo">
              {title}
            </h2>
          )}

          <button
            onClick={onClose}
            className="
              w-8 h-8
              rounded-full
              bg-negroProfundo
              text-blancoPuro
              flex items-center justify-center
              shadow-turquesaSoft
              hover:bg-aquaTurquesa hover:text-negroProfundo
              transition
            "
          >
            ✕
          </button>
        </div>

        {/* CONTENT */}
        <div className="font-inter text-negroProfundo">
          {children}
        </div>
      </div>
    </div>
  );
}
