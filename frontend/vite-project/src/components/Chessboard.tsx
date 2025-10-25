import type { Color, PieceSymbol, Square } from "chess.js";

export const Chessboard = ({
  board,
}: {
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
}) => {
  return (
    <div className="grid grid-cols-8">
      {board.map((row, i) => {
        return (
          <div className="row">
            {row.map((_, j) => {
              // _ to be replaced by square, in order to use the square
              return (
                <div
                  className={i + (j % 2) == 0 ? "bg-green-300" : "bg-green-500"}
                ></div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
