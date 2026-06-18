import { createContext } from "react";
import type { MatrixContextType } from "../types/matrix";
export const MatrixContext = createContext<MatrixContextType | null>(null);
