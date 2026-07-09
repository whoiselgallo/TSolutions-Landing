export function Table({ columns = [], data = [] }) {
  return (
    <div className="overflow-hidden rounded-large shadow-turquesaSoft">
      <table className="w-full border-collapse font-inter text-negroProfundo">
        
        {/* HEADER */}
        <thead>
          <tr className="bg-aquaTurquesa text-negroProfundo">
            {columns.map((col, index) => (
              <th
                key={index}
                className="px-4 py-3 text-left font-interMedium tracking-brunoMedium"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="
                hover:bg-aquaTurquesa/20
                transition
              "
            >
              {columns.map((col, colIndex) => (
                <td
                  key={colIndex}
                  className="px-4 py-3 border-b border-negroProfundo/10"
                >
                  {row[col]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
