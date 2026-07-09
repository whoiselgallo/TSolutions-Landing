export function Slider({ min = 0, max = 100, step = 1, defaultValue = 50, onChange, ...props }) {
  const handleChange = (e) => {
    const value = Number(e.target.value);
    onChange && onChange(value);
  };

  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      defaultValue={defaultValue}
      onChange={handleChange}
      {...props}
      className="
        w-full
        accent-aquaTurquesa
        cursor-pointer

        [&::-webkit-slider-runnable-track]:h-2
        [&::-webkit-slider-runnable-track]:rounded-full
        [&::-webkit-slider-runnable-track]:bg-negroProfundo/20

        [&::-webkit-slider-thumb]:appearance-none
        [&::-webkit-slider-thumb]:w-5
        [&::-webkit-slider-thumb]:h-5
        [&::-webkit-slider-thumb]:rounded-full
        [&::-webkit-slider-thumb]:bg-blancoPuro
        [&::-webkit-slider-thumb]:shadow-turquesaSoft
        [&::-webkit-slider-thumb]:transition-all
        [&::-webkit-slider-thumb]:mt-[-6px]

        focus:outline-none
        focus:shadow-turquesaSoft
      "
    />
  );
}
