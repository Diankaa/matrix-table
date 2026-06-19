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

export type Table = {
  rows: string;
  cols: string;
};

export type MatrixContextType = {
  table: Table;
  setTable: Dispatch<SetStateAction<Table>>;
  matrixData: MatrixRow[];
  setMatrixData: Dispatch<SetStateAction<MatrixRow[]>>;
  x: string;
  setX: Dispatch<SetStateAction<string>>;
};

export type CSSVars = React.CSSProperties & {
  [key: `--${string}`]: string | number;
};
