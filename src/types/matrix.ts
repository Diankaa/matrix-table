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

export type Matrix = MatrixRow[];

export type Table = {
  rows: number | "";
  cols: number | "";
};

export type MatrixContextType = {
  table: Table;
  tableData: MatrixRow[];
  x: number | "";
  setX: Dispatch<SetStateAction<number | "">>;
  setTable: Dispatch<SetStateAction<Table>>;
  setTableData: Dispatch<SetStateAction<MatrixRow[]>>;
};
