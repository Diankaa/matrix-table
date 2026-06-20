import { getPercentage } from "../utils/stats";
import type { Cell, CSSVars } from "../types/matrix";
import React from "react";

type Props = {
  cell: Cell;
  rowId: number;
  cellId: number;
  showPercentage: boolean;
  cellHover: (cell: Cell) => void;
  cellUnHover: () => void;
  onCellClick: (rowId: number, cellId: number) => void;
  nearestSet: number[];
  rowSum: number;
  maxInRow: number;
};

export const CellItem = React.memo(
  ({
    cell,
    rowId,
    cellId,
    showPercentage,
    cellHover,
    cellUnHover,
    onCellClick,
    nearestSet,
    rowSum,
    maxInRow,
  }: Props) => {
    const isHighlighted = nearestSet.includes(cell.id);

    const intensity =
      showPercentage && maxInRow !== 0 ? cell.amount / maxInRow : undefined;

    return (
      <td
        onClick={() => onCellClick(rowId, cellId)}
        onMouseEnter={() => cellHover(cell)}
        onMouseLeave={() => cellUnHover()}
        className={`cell ${
          isHighlighted ? "cell--highlight" : ""
        } ${showPercentage ? "cell--heat" : ""}`}
        style={
          intensity !== undefined ? ({ "--opacity": intensity } as CSSVars) : {}
        }
      >
        <span>
          {showPercentage
            ? `${getPercentage(cell.amount, rowSum)}%`
            : cell.amount}
        </span>
      </td>
    );
  },
);
