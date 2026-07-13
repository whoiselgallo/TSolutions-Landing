import React from "react";
import Input from "./Input";
import Select from "./Select";

export default function FormGroup({
  label,
  type = "text",
  options = [],
  value,
  onChange,
  error,
  helperText,
  required = false,
  glow = false,
  className = "",
  ...props
}) {
  return (
    <div className={`space-y-2 w-full ${className}`} {...props}>
      <label className="text-aquaTurquesa font-inter">
        {label}
        {required && <span className="text-naranjaEnergy ml-1">*</span>}
      </label>

      {type === "select" ? (
        <Select glow={glow} options={options} value={value} onChange={onChange} />
      ) : (
        <Input glow={glow} value={value} onChange={onChange} />
      )}

      {helperText && !error && (
        <p className="text-midnightSoft text-sm font-inter">{helperText}</p>
      )}

      {error && (
        <p className="text-naranjaEnergy text-sm font-inter animate-fadeTurquesa">
          {error}
        </p>
      )}
    </div>
  );
}
