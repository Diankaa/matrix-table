import { useState } from "react";
import type { CSSVars, MatrixRow, Table } from "../types/matrix";
import { useMatrixContext } from "../hooks/useMatrixContext";
import { getRowSum, getRowMax, getPercentage } from "../utils/stats";

type Props = {
  row: MatrixRow;
  rowIndex: number;
  onCellHover: (colIndex: number) => void;
  onCellUnhover: () => void;
  nearestCells: number[];
};
export const Row = ({
  row,
  rowIndex,
  onCellHover,
  onCellUnhover,
  nearestCells,
}: Props) => {
  const { setTable, matrixData, setMatrixData } = useMatrixContext();
  const [showPercentage, setShowPercentage] = useState(false);

  const handleRemoveRow = (id: number) => {
    const newData = matrixData.filter((item: MatrixRow) => item.id !== id);
    setTable((prev: Table) => ({
      ...prev,
      rows: `${Number(prev.rows) - 1}`,
    }));
    setMatrixData(newData);
  };

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    const newData = matrixData.map((row, rIdx) =>
      rIdx !== rowIndex
        ? row
        : {
            ...row,
            cells: row.cells.map((cell, cIdx) =>
              cIdx !== colIndex ? cell : { ...cell, amount: cell.amount + 1 },
            ),
          },
    );
    setMatrixData(newData);
  };

  const maxInRow = getRowMax(row);

  const rowSum = getRowSum(row.cells);

  return (
    <tr>
      <td>Row {rowIndex + 1}</td>
      {row.cells.map((cell, i) => {
        const intensity =
          showPercentage && maxInRow !== 0 ? cell.amount / maxInRow : undefined;
        return (
          <td
            onClick={() => handleCellClick(rowIndex, i)}
            onMouseEnter={() => onCellHover(i)}
            onMouseLeave={() => onCellUnhover()}
            key={cell.id}
            className={`cell ${
              nearestCells.includes(cell.id) ? "cell--highlight" : ""
            } ${showPercentage ? "cell--heat" : ""}`}
            style={
              intensity !== undefined
                ? ({ "--opacity": intensity } as CSSVars)
                : {}
            }
          >
            <span>
              {showPercentage
                ? `${getPercentage(cell.amount, rowSum)}%`
                : cell.amount}
            </span>
          </td>
        );
      })}
      <td
        onMouseEnter={() => setShowPercentage(true)}
        onMouseLeave={() => setShowPercentage(false)}
      >
        <p>{rowSum}</p>
      </td>
      <td>
        <button onClick={() => handleRemoveRow(row.id)}>Remove row</button>
      </td>
    </tr>
  );
};
