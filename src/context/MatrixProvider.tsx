import React, { useMemo, useState } from "react";
import { MatrixContext } from "./MatrixContext";
import type { MatrixRow, Table } from "../types/matrix";

export const MatrixProvider = ({ children }: { children: React.ReactNode }) => {
  const [table, setTable] = useState<Table>({
    rows: "",
    cols: "",
  });
  const [x, setX] = useState<number | "">("");
  const [tableData, setTableData] = useState<MatrixRow[]>([]);
  const memoizedValue = useMemo(
    () => ({ table, setTable, tableData, setTableData, x, setX }),
    [table, setTable, tableData, setTableData, x, setX],
  );
  return (
    <MatrixContext.Provider value={memoizedValue}>
      {children}
    </MatrixContext.Provider>
  );
};
