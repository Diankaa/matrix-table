import React, { useMemo, useState } from "react";
import { MatrixContext } from "./MatrixContext";
import type { MatrixRow } from "../types/matrix";

export const MatrixProvider = ({ children }: { children: React.ReactNode }) => {
  const [generatedCols, setGeneratedCols] = useState<number>(0);
  const [x, setX] = useState<string>("0");
  const [matrixData, setMatrixData] = useState<MatrixRow[]>([]);
  const memoizedValue = useMemo(
    () => ({
      generatedCols,
      setGeneratedCols,
      matrixData,
      setMatrixData,
      x,
      setX,
    }),
    [generatedCols, matrixData, x],
  );
  return (
    <MatrixContext.Provider value={memoizedValue}>
      {children}
    </MatrixContext.Provider>
  );
};
