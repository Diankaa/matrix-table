import { useState } from "react";
import { Row } from "./Row";
import { useMatrixContext } from "../hooks/useMatrixContext";
import type { MatrixRow, Table } from "../types/matrix";
import { findNearestCells, getColumnPercentile60 } from "../utils/stats";
import { generateMatrix } from "../utils/generateMatrix";
import "../styles/table.css";
export const MatrixTable = () => {
  const { table, setTable, x, tableData, setTableData } = useMatrixContext();
  const [nearestCells, setNearestCells] = useState<number[]>([]);

  const handleCellHover = (rowIndex: number, colIndex: number) => {
    const cell = tableData[rowIndex].cells[colIndex];
    const nearest = findNearestCells(cell, x || 0, tableData);
    setNearestCells(nearest);
  };

  const addRow = () => {
    if (!table.cols) return;

    const newMatrix = generateMatrix(1, table.cols);

    setTableData((prev) => [...prev, ...newMatrix]);
    setTable((prev: Table) => ({
      ...prev,
      rows: (Number(prev.rows) || 0) + 1,
    }));
  };
  const columnPercentile60 = getColumnPercentile60(tableData);

  return (
    <div className="wrapper">
      <div className="table-wrapper">
        <table className="table">
          <tbody>
            {tableData.map((row: MatrixRow, i: number) => (
              <Row
                key={row.id}
                row={row}
                rowIndex={i}
                onCellHover={(colIndex: number) => handleCellHover(i, colIndex)}
                onCellUnhover={() => setNearestCells([])}
                nearestCells={nearestCells}
              />
            ))}
            <tr>
              {columnPercentile60.map((avg, index) => (
                <td key={index}>
                  <p>{avg}</p>
                </td>
              ))}
            </tr>
            <tr></tr>
          </tbody>
        </table>
      </div>
      {!!tableData.length && (
        <button
          className="add-btn"
          onClick={addRow}
          disabled={tableData.length >= 100}
        >
          Add row
        </button>
      )}
    </div>
  );
};
