import { Matrix } from "./Matrix";
import { Piece } from "./Piece";

export class Board {
  private _matrix: Matrix;

  constructor() {
    this._matrix = new Matrix(20, 10);
  }

  public merge = (piece: Piece): void => {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (piece.getMatrix[i][j] !== 0) {
          const pos = piece.getAbsolutePos(i, j);
          this._matrix.set(pos[1], pos[0], piece.color);
        }
      }
    }
  };

  public draw = (ctx: CanvasRenderingContext2D): void => {
    this._matrix.getMatrix().forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell !== 0) {
          ctx.fillStyle = cell as string;
          ctx.fillRect(colIndex, rowIndex, 1, 1);
        }
      });
    });
  };

  public pieceCollide = (piece: Piece): boolean => {
    let collide = false;
    piece.getMatrix.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell !== 0) {
          const [x, y] = piece.getAbsolutePos(rowIndex, colIndex);
          if (y >= 0) {
            if (this._matrix.get(y, x) !== 0) {
              collide = true;
            }
          }
        }
      });
    });

    return collide;
  };
}
