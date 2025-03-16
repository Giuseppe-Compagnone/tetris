import { Matrix } from "./Matrix";
import { Piece } from "./Piece";
export class Board {
  private _matrix: Matrix;
  public projection: Piece;

  constructor() {
    this._matrix = new Matrix(20, 10);
    this.projection = new Piece();
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

    this.clearRows();
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

  public drawProjection = (
    piece: Piece,
    ctx: CanvasRenderingContext2D
  ): void => {
    const clone: Piece = new Piece();
    clone.setMatrix = piece.getMatrix;
    clone.x = piece.x;
    clone.y = piece.y;
    clone.color = piece.color;

    while (
      !clone.collideBottom() &&
      !this.pieceCollide(clone) &&
      clone.y < 20
    ) {
      clone.y++;
    }

    clone.y--;

    this.projection = clone;

    clone.getMatrix.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell !== 0) {
          const [x, y] = clone.getAbsolutePos(rowIndex, colIndex);
          if (y < 20) {
            ctx.fillStyle = clone.color + "4d";
            ctx.fillRect(x, y, 1, 1);
          }
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

  public clearRows = (): void => {
    this._matrix.getMatrix().forEach((row, rowIndex) => {
      if (row.every((cell) => cell !== 0)) {
        this._matrix.clearRow(rowIndex);
      }
    });
  };
}
