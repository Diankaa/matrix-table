import React, { useState } from "react";
import type { Cell, MatrixRow } from "../types/matrix";
import { getRowMax, getRowSum } from "../utils/stats";
import { CellItem } from "./Cell";

type Props = {
  row: MatrixRow;
  highlightedCellsString: string;
  onCellHover: (cell: Cell) => void;
  onCellUnHover: () => void;
  onCellClick: (rId: number, cId: number) => void;
  onRemoveRow: (id: number) => void;
};

export const Row = React.memo(
  ({
    row,
    highlightedCellsString,
    onCellHover,
    onCellUnHover,
    onCellClick,
    onRemoveRow,
  }: Props) => {
    const [showPercentage, setShowPercentage] = useState(false);

    const rowSum = getRowSum(row.cells);

    const maxInRow = getRowMax(row);

    const highlightedIds = highlightedCellsString
      ? highlightedCellsString.split(",").map(Number)
      : [];

    return (
      <tr>
        <td className="row-counter-title"></td>
        {row.cells.map((cell) => {
          return (
            <CellItem
              key={cell.id}
              cell={cell}
              rowId={row.id}
              cellId={cell.id}
              showPercentage={showPercentage}
              cellHover={onCellHover}
              cellUnHover={onCellUnHover}
              nearestSet={highlightedIds}
              onCellClick={onCellClick}
              rowSum={rowSum}
              maxInRow={maxInRow}
            />
          );
        })}
        <td
          onMouseEnter={() => setShowPercentage(true)}
          onMouseLeave={() => setShowPercentage(false)}
        >
          <p>{rowSum}</p>
        </td>
        <td>
          <button onClick={() => onRemoveRow(row.id)}>Remove row</button>
        </td>
      </tr>
    );
  },
);
