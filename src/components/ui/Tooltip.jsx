import { useState } from "react";

export function Tooltip({ text, children }) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}

      {visible && (
        <div
          className="
            absolute
            bottom-full left-1/2
            -translate-x-1/2 -translate-y-2
            bg-negroProfundo
            text-blancoPuro
            px-3 py-2
            rounded-soft
            shadow-turquesaSoft
            whitespace-nowrap
            animate-fadeTurquesa
            z-50
          "
        >
          {text}
        </div>
      )}
    </div>
  );
}
