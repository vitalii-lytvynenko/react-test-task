import { useState } from 'react';
import { useMatrix } from '../context/MatrixContext';
import { getSum, showPercentages } from '../utils/helpers';

export const MatrixTable = () => {
  const { matrix, updateCell, addRow, removeRow, avgValues, highlightedCells, highlightNearestCells, limitX } = useMatrix();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [X, setX] = useState(3);

  const handleMouseEnter = (rowIndex: number, colIndex: number) => {
    highlightNearestCells(rowIndex, colIndex, X);
  };

  const handleMouseLeave = (rowIndex: number, colIndex: number) => {
    highlightNearestCells(rowIndex, colIndex, -1);
  };

  return (
    <div className="overflow-x-auto">
      <div className="mb-4">
        <label htmlFor="x">Number of nearest cells (X): </label>
        <input
          type="number"
          id="x"
          min={0}
          max={limitX}
          value={X}
          onChange={e => setX(parseInt(e.target.value))}
          className="border p-2"
        />
      </div>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th></th>
            {matrix[0] &&
              matrix[0].map((_, colIndex) => (
                <th key={colIndex} className="px-4 py-2 text-center">
                  Cell value N = {colIndex + 1}
                </th>
              ))}
            <th className="px-4 py-2 text-center">Sum</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {matrix.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <th className="px-4 py-2 text-center">
                Cell value M = {rowIndex + 1}
              </th>
              {row.map((cell, colIndex) => {
                const percent = showPercentages(row, cell);
                const isPercent = hoveredIndex === rowIndex;
                return (
                  <td
                    key={cell.id}
                    className={`border px-4 py-2 text-center cursor-pointer hover:bg-purple-500 ${
                      highlightedCells.includes(cell.id) ? 'bg-yellow-300' : ''
                    }`}
                    style={{
                      backgroundImage: isPercent
                        ? `linear-gradient(to right, lime ${percent}%, transparent ${percent}%)`
                        : 'none',
                    }}
                    onClick={() => updateCell(rowIndex, colIndex)}
                    onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                    onMouseLeave={() => handleMouseLeave(rowIndex, colIndex)}
                  >
                    {isPercent ? `${percent}%` : cell.amount}
                  </td>
                );
              })}
              <td
                className="border px-4 py-2 text-center"
                onMouseLeave={() => setHoveredIndex(null)}
                onMouseEnter={() => setHoveredIndex(rowIndex)}
              >
                {getSum(row)}
              </td>
              <td className="border px-4 py-2 text-center">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded-md"
                  onClick={() => removeRow(rowIndex)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <th className="px-4 py-2 text-center">Averege Values</th>
            {avgValues.map((cell, index) => (
              <td className="border px-4 py-2 text-center" key={index}>
                {cell.amount}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2"
        onClick={addRow}
      >
        Add Row
      </button>
    </div>
  );
};
