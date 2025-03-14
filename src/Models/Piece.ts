import { Matrix } from "./Matrix";
import PiecesConfigurations from "./../utils/PiecesConfigurations.json";

export class Piece {
  private _matrix: Matrix;
  public x: number;
  public y: number;
  private color: string;

  constructor() {
    this.x = 0;
    this.y = 0;
    this._matrix = new Matrix(4, 4);

    const configuration =
      PiecesConfigurations[
        Math.floor(Math.random() * PiecesConfigurations.length)
      ];
    this._matrix.setMatrix(configuration.configuration);
    this.color = configuration.color;
  }

  public draw = (ctx: CanvasRenderingContext2D): void => {
    this._matrix.getMatrix().forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell !== 0) {
          ctx.fillStyle = this.color;
          ctx.fillRect(this.x + colIndex, this.y + rowIndex, 1, 1);
        }
      });
    });
  };

  public update = (): void => {
    this.y += 1;
  };

  public moveLeft = (): void => {
    this.x -= 1;
  };

  public moveRight = (): void => {
    this.x += 1;
  };
}
