export function Card({ title, children }) {
  return (
    <div className="bg-blancoPuro rounded-large shadow-card shadow-turquesaSoft p-6">
      {title && (
        <h3 className="font-bruno font-brunoHeavy tracking-brunoMedium text-negroProfundo mb-3">
          {title}
        </h3>
      )}

      <div className="font-inter text-negroProfundo">
        {children}
      </div>
    </div>
  );
}
