import React from "react";
import Input from "./Input";
import Select from "../Select";

export default function FormGroup({
  label,
  type = "text",
  options = [],
  value,
  onChange,
  error,
  glow = false,
}) {
  return (
    <div className="space-y-2 w-full">
      <label className="text-aquaTurquesa font-inter">{label}</label>

      {type === "select" ? (
        <Select
          glow={glow}
          options={options}
          value={value}
          onChange={onChange}
        />
      ) : (
        <Input
          glow={glow}
          value={value}
          onChange={onChange}
        />
      )}

      {error && (
        <p className="text-naranjaEnergy text-sm font-inter animate-fadeTurquesa">
          {error}
        </p>
      )}
    </div>
  );
}
