export default function ProgressBar({ progress }) {
  return (
    <div className="w-full bg-negroProfundo/20 rounded-large h-6 overflow-hidden shadow-turquesaSoft">
      <div
        className="bg-aquaTurquesa h-full transition-all"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
