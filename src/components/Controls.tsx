import { useState } from "react";
import { useMatrixContext } from "../hooks/useMatrixContext";
import { generateMatrix } from "../utils/generateMatrix";
import { clamp } from "../utils/stats";
import "../styles/controls.css";

export const Controls = () => {
  const { table, setTable, x, setX, setTableData } = useMatrixContext();
  const { rows, cols } = table;

  const [error, setError] = useState<string | null>(null);

  const rowNum = Number(rows);
  const colNum = Number(cols);

  const maxX = rowNum > 0 && colNum > 0 ? rowNum * colNum - 1 : 0;

  const handleTableChange =
    (min: number, max: number, key: "rows" | "cols") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      setTable((prev) => ({
        ...prev,
        [key]: value === "" ? "" : clamp(Number(value), min, max),
      }));
    };

  const handleXChange =
    (max: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      if (value === "") {
        setX("");
        return;
      }

      setX(clamp(Number(value), 1, max));
    };

  const validate = (M: number, N: number, X: number) => {
    if (M * N < 2) {
      return "Matrix must contain at least 2 cells for X to work";
    }

    if (X < 1) {
      return "X must be at least 1";
    }

    if (X > M * N - 1) {
      return `X cannot be greater than ${M * N - 1}`;
    }

    return null;
  };

  const onGenerate = () => {
    if (rows === "" || cols === "" || x === "") {
      setError("All fields are required");
      return;
    }

    const err = validate(rowNum, colNum, Number(x));

    if (err) {
      setError(err);
      return;
    }

    setError(null);

    const newMatrix = generateMatrix(rowNum, colNum);

    setTableData(newMatrix);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      onGenerate();
    }
  };

  return (
    <div className="controls" onKeyDown={handleKeyDown}>
      <div className="controls-row">
        <label htmlFor="m">Rows (M)</label>
        <input
          id="m"
          type="number"
          value={rows}
          onChange={handleTableChange(0, 100, "rows")}
        />
      </div>

      <div className="controls-row">
        <label htmlFor="n">Columns (N)</label>
        <input
          id="n"
          type="number"
          value={cols}
          onChange={handleTableChange(0, 100, "cols")}
        />
      </div>

      <div className="controls-row">
        <label htmlFor="x">
          Nearest cells (X) <span className="hint">(max: {maxX})</span>
        </label>

        <input
          id="x"
          type="number"
          value={x}
          max={maxX}
          onChange={handleXChange(maxX)}
        />
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
