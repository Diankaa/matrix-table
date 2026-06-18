import { useContext } from "react";
import { MatrixContext } from "../context/MatrixContext";
import type { MatrixContextType } from "../types/matrix";

export const useMatrixContext = (): MatrixContextType => {
  const ctx = useContext(MatrixContext);

  if (!ctx) {
    throw new Error("useMatrixContext must be used inside Provider");
  }

  return ctx;
};
