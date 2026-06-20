import type { Dispatch, SetStateAction } from "react";

export type CellId = number;

export type Cell = {
  id: CellId;
  amount: number;
};

export type MatrixRow = {
  id: number;
  cells: Cell[];
};

export type MatrixContextType = {
  generatedCols: number;
  setGeneratedCols: Dispatch<SetStateAction<number>>;
  matrixData: MatrixRow[];
  setMatrixData: Dispatch<SetStateAction<MatrixRow[]>>;
  x: string;
  setX: Dispatch<SetStateAction<string>>;
};

export type CSSVars = React.CSSProperties & {
  [key: `--${string}`]: string | number;
};

export type HighlightContextType = {
  nearestCells: number[];
  handleCellHover: (cell: Cell) => void;
  handleCellUnHover: () => void;
};
