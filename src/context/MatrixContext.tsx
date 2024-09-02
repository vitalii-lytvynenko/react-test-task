import { createContext, useContext, useEffect, useState } from 'react';
import { Cell, MatrixContextType } from '../types';
import { getRandomNum } from '../utils/helpers';

const MatrixContext = createContext<MatrixContextType | undefined>(undefined);

export const MatrixProvider = ({
  children,
  m,
  n,
}: {
  children: React.ReactNode;
  m: number;
  n: number;
}) => {
  const [matrix, setMatrix] = useState<Cell[][]>([]);
  const [avgValues, setAvgValues] = useState<Cell[]>([]);
  const [highlightedCells, setHighlightedCells] = useState<number[]>([]);

  const limitX = m * n;

  const generateMatrix = (m: number, n: number) => {
    const newMatrix: Cell[][] = [];
    const baseId = Date.now();

    let idCounter = 0;

    for (let rowIndex = 0; rowIndex < m; rowIndex++) {
      const row: Cell[] = [];
      for (let colIndex = 0; colIndex < n; colIndex++) {
        row.push({
          id: baseId + idCounter++,
          amount: getRandomNum(),
        });
      }
      newMatrix.push(row);
    }

    setMatrix(newMatrix);
    updateAvgValues(newMatrix);
  };

  useEffect(() => {
    generateMatrix(m, n);
  }, [m, n]);

  const updateCell = (row: number, col: number) => {
    const newMatrix = [...matrix];
    newMatrix[row][col].amount += 1;
    setMatrix(newMatrix);
    updateAvgValues(newMatrix);
  };

  const addRow = () => {
    const n = matrix[0].length;
    const baseId = Date.now();
    const newRow: Cell[] = [];
    for (let colIndex = 0; colIndex < n; colIndex++) {
      newRow.push({
        id: baseId + colIndex,
        amount: getRandomNum(),
      });
    }
    const newMatrix = [...matrix, newRow];
    setMatrix(newMatrix);
    updateAvgValues(newMatrix);
  };

  const updateAvgValues = (currentMatrix: Cell[][]) => {
    const n = currentMatrix[0].length;
    const avgRow: Cell[] = [];

    for (let colIndex = 0; colIndex < n; colIndex++) {
      const columnValues = currentMatrix
        .map(row => row[colIndex].amount)
        .sort((a, b) => a - b);
      const middleIndex = Math.floor(columnValues.length / 2);
      console.log(middleIndex);

      const avg =                                                       //50 percentile value (not AVG)
        columnValues.length % 2 === 0
          ? (columnValues[middleIndex - 1] + columnValues[middleIndex]) / 2
          : columnValues[middleIndex];

      avgRow.push({
        id: Date.now() + colIndex,
        amount: avg,
      });

      console.log(avgRow);
    }

    setAvgValues(avgRow);
  };

  const removeRow = (index: number) => {
    const newMatrix = matrix.filter((_, rowIndex) => rowIndex !== index);
    setMatrix(newMatrix);
    updateAvgValues(newMatrix);
  };

  const highlightNearestCells = (row: number, col: number, x: number) => {
    const targetAmount = matrix[row][col].amount;
    const allCells = matrix.flat();

    const nearestCells = allCells
      .map(cell => ({
        ...cell,
        diff: Math.abs(cell.amount - targetAmount),
      }))
      .sort((a, b) => a.diff - b.diff)
      .slice(0, x + 1)
      .map(cell => cell.id);

    setHighlightedCells(nearestCells);
  };

  return (
    <MatrixContext.Provider
      value={{
        matrix,
        updateCell,
        addRow,
        removeRow,
        avgValues,
        highlightedCells,
        highlightNearestCells,
        limitX
      }}
    >
      {children}
    </MatrixContext.Provider>
  );
};

export const useMatrix = () => {
  const context = useContext(MatrixContext);
  if (!context)
    throw new Error('useMatrix must be used within a MatrixProvider');
  return context;
};
