import { type MatrixRow, type Cell } from "../types/matrix";

export const getRowSum = (cells: Cell[]) =>
  cells.reduce((acc, c) => acc + c.amount, 0);

export const getRowMax = (row: MatrixRow) => {
  return Math.max(...row.cells.map((cell) => cell.amount));
};

export const getPercentage = (amount: number, total: number): string => {
  if (total === 0) return "0";

  return String(Number(((amount / total) * 100).toFixed(2)));
};

export const getColumnPercentile60 = (rows: MatrixRow[]) => {
  const numRows = rows.length;
  if (numRows === 0) return [];

  const numColumns = rows[0].cells.length;

  const result: number[] = [];

  for (let col = 0; col < numColumns; col++) {
    const values = rows
      .map((row) => Number(row.cells[col]?.amount ?? 0))
      .sort((a, b) => a - b);

    const index = Math.floor(0.6 * (values.length - 1));

    result[col] = values[index] ?? 0;
  }

  return result;
};

export const findNearestCells = (
  cell: Cell,
  x: number,
  matrixData: MatrixRow[],
) => {
  const allCells = matrixData.flatMap((r) => r.cells);

  return allCells
    .filter((c) => c.id !== cell.id)
    .sort(
      (a, b) =>
        Math.abs(a.amount - cell.amount) - Math.abs(b.amount - cell.amount),
    )
    .slice(0, Math.min(Number(x), allCells.length - 1))
    .map((c) => c.id);
};
