import React, { useMemo, useState } from "react";
import { MatrixContext } from "./MatrixContext";
import type { MatrixRow, Table } from "../types/matrix";

export const MatrixProvider = ({ children }: { children: React.ReactNode }) => {
  const [table, setTable] = useState<Table>({
    rows: "0",
    cols: "0",
  });
  const [x, setX] = useState<string>("0");
  const [matrixData, setMatrixData] = useState<MatrixRow[]>([]);
  const memoizedValue = useMemo(
    () => ({ table, setTable, matrixData, setMatrixData, x, setX }),
    [table, matrixData, x],
  );
  return (
    <MatrixContext.Provider value={memoizedValue}>
      {children}
    </MatrixContext.Provider>
  );
};
