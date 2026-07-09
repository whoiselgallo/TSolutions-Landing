import { useState } from "react";

export function Toggle({ defaultChecked = false, onChange }) {
  const [checked, setChecked] = useState(defaultChecked);

  const handleToggle = () => {
    const newValue = !checked;
    setChecked(newValue);
    onChange && onChange(newValue);
  };

  return (
    <button
      onClick={handleToggle}
      className={`
        w-14 h-8
        rounded-full
        flex items-center
        transition
        ${checked ? "bg-aquaTurquesa shadow-turquesaSoft" : "bg-negroProfundo/40"}
      `}
    >
      <span
        className={`
          w-6 h-6
          bg-blancoPuro
          rounded-full
          shadow-turquesaSoft
          transition
          ${checked ? "translate-x-7" : "translate-x-1"}
        `}
      ></span>
    </button>
  );
}
