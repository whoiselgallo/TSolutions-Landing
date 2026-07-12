import React from "react";

export default function Table({ columns = [], data = [], className = "" }) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full bg-midnightPanel rounded-medium shadow-card text-blancoPuro">

        <thead className="text-aquaTurquesa font-bruno">
          <tr>
            {columns.map((col, i) => (
              <th key={i} className="p-4 border-b border-deepGrid text-left">
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="font-inter">
          {data.map((row, i) => (
            <tr
              key={i}
              className="hover:bg-aquaTurquesa/10 transition-colors duration-200"
            >
              {row.map((cell, j) => (
                <td key={j} className="p-4 border-b border-deepGrid">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
