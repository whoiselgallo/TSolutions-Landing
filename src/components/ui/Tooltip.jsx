import React, { useState } from "react";

export default function Tooltip({ text, children, className = "" }) {
  const [show, setShow] = useState(false);

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}

      {show && (
        <div
          className="
            absolute left-1/2 -translate-x-1/2 mt-3 px-4 py-2
            bg-midnightPanel text-blancoPuro rounded-medium shadow-glowEnergy border border-naranjaEnergy/25
            animate-slideSoft whitespace-nowrap z-50
          "
        >
          {text}
        </div>
      )}
    </div>
  );
}
