import { Cell } from '../types';

export function showPercentages(row: Cell[], cell: Cell) {
  const rowSum = getSum(row);

  return Number(((cell.amount / rowSum) * 100).toFixed(1));
}

export function getRandomNum() {
  return Math.floor(Math.random() * 900) + 100;
}

export function getSum(row: Cell[]) {
    return row.reduce((sum, cell) => sum + cell.amount, 0);
}
