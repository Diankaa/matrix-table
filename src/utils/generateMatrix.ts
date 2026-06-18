import { type MatrixRow } from "../types/matrix";

export const randomThreeDigit = (): number => {
  return Math.floor(100 + Math.random() * 900);
};

let globalRowId = 1;
let globalCellId = 1;

export const generateMatrix = (m: number, n: number): MatrixRow[] => {
  return Array.from({ length: m }, () => ({
    id: globalRowId++,
    cells: Array.from({ length: n }, () => ({
      id: globalCellId++,
      amount: randomThreeDigit(),
    })),
  }));
};
