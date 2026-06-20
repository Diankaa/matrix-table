import { useState } from "react";
import { useMatrixContext } from "../hooks/useMatrixContext";
import { generateMatrix } from "../utils/generateMatrix";
import "../styles/controls.css";

export const Controls = () => {
  const [localRows, setLocalRows] = useState<string>("");
  const [localCols, setLocalCols] = useState<string>("");
  const [localX, setLocalX] = useState<string>("0");
  const { setGeneratedCols, setX, setMatrixData } = useMatrixContext();

  const [error, setError] = useState<string | null>(null);

  const rowNum = localRows === "" ? 0 : Number(localRows);
  const colNum = localCols === "" ? 0 : Number(localCols);

  const isValidRange =
    localRows !== "" &&
    localCols !== "" &&
    rowNum > 0 &&
    rowNum <= 100 &&
    colNum > 0 &&
    colNum <= 100;

  const maxX = isValidRange ? rowNum * colNum - 1 : null;

  const sanitizeNumberInput = (value: string) => {
    if (value === "") return "";
    if (!/^\d+$/.test(value)) return null;
    return value.replace(/^0+(?!$)/, "");
  };

  const handleTableChange =
    (key: "rows" | "cols") => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = sanitizeNumberInput(e.target.value);
      if (value === null) return;
      const numeric = Number(value);
      if (numeric > 100) {
        setError(
          key === "rows"
            ? "Rows cannot be greater than 100"
            : "Columns cannot be greater than 100",
        );
        return;
      }

      setError(null);
      if (key === "rows") setLocalRows(value);
      if (key === "cols") setLocalCols(value);
    };

  const handleXChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = sanitizeNumberInput(e.target.value);
    if (value === null) return;

    const numeric = Number(value);

    if (maxX !== null && numeric > maxX) {
      setError(`Max allowed is ${maxX}`);
      return;
    }

    setError(null);
    setLocalX(value);
  };

  const validate = (M: number, N: number, X: number) => {
    if (M < 0 || M > 100) return "Rows must be between 0 and 100";
    if (N < 0 || N > 100) return "Cols must be between 0 and 100";
    if (M * N < 2) return "Matrix must have at least 2 cells";
    if (X < 1) return "Nearest cells must be at least 1";
    if (maxX !== null && X > maxX)
      return `Nearest cells cannot be greater than ${M * N - 1}`;

    return null;
  };

  const onGenerate = () => {
    if (localRows === "" || localCols === "" || localX === "") {
      setError("All fields are required");
      return;
    }

    const err = validate(rowNum, colNum, Number(localX));

    if (err) {
      setError(err);
      return;
    }

    setError(null);

    setGeneratedCols(colNum);
    setX(localX);

    const newMatrix = generateMatrix(rowNum, colNum);
    setMatrixData(newMatrix);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      onGenerate();
    }
  };

  return (
    <div className="controls" onKeyDown={handleKeyDown} tabIndex={0}>
      <div className="controls-row">
        <label htmlFor="m">
          Rows <span className="hint">(0 - 100)</span>
        </label>
        <input
          id="m"
          type="text"
          value={localRows}
          onChange={handleTableChange("rows")}
        />
      </div>

      <div className="controls-row">
        <label htmlFor="n">
          Columns <span className="hint">(0 - 100)</span>
        </label>
        <input
          id="n"
          type="text"
          value={localCols}
          onChange={handleTableChange("cols")}
        />
      </div>

      <div className="controls-row">
        <label htmlFor="x">
          Nearest cells{" "}
          {maxX !== null && <span className="hint">(Max: {maxX})</span>}
        </label>

        <input id="x" type="text" value={localX} onChange={handleXChange} />
      </div>

      <div className="controls-bottom">
        {error && <div className="error">{error}</div>}

        <button className="controls-row" onClick={onGenerate}>
          Generate
        </button>
      </div>
    </div>
  );
};
