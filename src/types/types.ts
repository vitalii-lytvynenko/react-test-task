type CellId = number;

type CellValue = number;

export type Cell = {
  id: CellId;
  amount: CellValue;
};

export type MatrixContextType = {
  matrix: Cell[][];
  updateCell: (row: number, col: number) => void;
  addRow: () => void;
  removeRow: (index: number) => void;
  avgValues: Cell[];
  highlightedCells: number[];
  highlightNearestCells: (row: number, col: number, x: number) => void;
  limitX: number;
};