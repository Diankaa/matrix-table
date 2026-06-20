// MatrixTable.tsx
import { Row } from "./Row";
import { useMatrixContext } from "../hooks/useMatrixContext";
import type { MatrixRow, Cell } from "../types/matrix";
import { getColumnPercentile60, findNearestCells } from "../utils/stats";
import { generateMatrix } from "../utils/generateMatrix";
import "../styles/table.css";
import { useCallback, useState, useMemo, useRef, useEffect } from "react";

export const MatrixTable = () => {
  const { generatedCols, matrixData, setMatrixData, x } = useMatrixContext();
  const [nearestCells, setNearestCells] = useState<number[]>([]);
  const matrixDataRef = useRef(matrixData);

  useEffect(() => {
    matrixDataRef.current = matrixData;
  }, [matrixData]);

  const addRow = () => {
    if (generatedCols === 0) return null;
    const newMatrix = generateMatrix(1, generatedCols);
    setMatrixData((prev) => [...prev, ...newMatrix]);
  };
  const handleRemoveRow = useCallback(
    (id: number) => {
      setMatrixData((prevMatrix) =>
        prevMatrix.filter((item) => item.id !== id),
      );
    },
    [setMatrixData],
  );

  const handleCellClick = useCallback(
    (rowId: number, cellId: number) => {
      setMatrixData((prevMatrix) =>
        prevMatrix.map((row) => {
          if (row.id !== rowId) return row;

          return {
            ...row,
            cells: row.cells.map((cell) =>
              cell.id !== cellId ? cell : { ...cell, amount: +cell.amount + 1 },
            ),
          };
        }),
      );
    },
    [setMatrixData],
  );

  const handleCellHover = useCallback(
    (cell: Cell) => {
      const nearest = findNearestCells(cell, Number(x), matrixDataRef.current);
      setNearestCells(nearest);
    },
    [x],
  );

  const columnPercentile60 = useMemo(
    () => getColumnPercentile60(matrixData),
    [matrixData],
  );

  const handleCellUnHover = useCallback(() => {
    setNearestCells([]);
  }, []);

  const tableHeaders = useMemo(() => {
    if (generatedCols === 0) return null;

    return Array.from({ length: generatedCols }, (_, i) => (
      <th key={`col-header-${i}`}>Column {i + 1}</th>
    ));
  }, [generatedCols]);

  return (
    <div className="wrapper">
      {!!matrixData.length && (
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                {tableHeaders}
                <th>Sum values</th>
              </tr>
            </thead>
            <tbody>
              {matrixData.map((row: MatrixRow) => {
                const highlightedInThisRow = row.cells
                  .filter((cell) => nearestCells.includes(cell.id))
                  .map((cell) => cell.id)
                  .join(",");

                return (
                  <Row
                    key={row.id}
                    row={row}
                    highlightedCellsString={highlightedInThisRow}
                    onCellHover={handleCellHover}
                    onCellUnHover={handleCellUnHover}
                    onCellClick={handleCellClick}
                    onRemoveRow={handleRemoveRow}
                  />
                );
              })}
              <tr>
                <td>60th percentile</td>
                {columnPercentile60.map((avg, index) => (
                  <td key={index}>
                    <p>{avg}</p>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {!!matrixData.length && (
        <button
          className="add-btn"
          onClick={addRow}
          disabled={matrixData.length >= 100}
        >
          Add row
        </button>
      )}
    </div>
  );
};
