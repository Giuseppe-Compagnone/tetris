import { Matrix } from "./Matrix";
import PiecesConfigurations from "./../utils/PiecesConfigurations.json";

export class Piece {
  private _matrix: Matrix;
  private direction: number;
  public color: string;
  public x: number;
  public y: number;

  constructor() {
    this.x = 0;
    this.y = 0;
    this._matrix = new Matrix(4, 4);
    this.direction = 0;

    const configuration =
      PiecesConfigurations[
        Math.floor(Math.random() * PiecesConfigurations.length)
      ];
    this._matrix.setMatrix(configuration.configuration);
    this.color = configuration.color;
  }

  public get getMatrix(): Array<Array<number | string>> {
    return this._matrix.getMatrix();
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
    this.direction = -1;
    this.x += this.direction;
  };

  public moveRight = (): void => {
    this.direction = 1;
    this.x += 1;
  };

  public collideBorders = (): boolean => {
    let collide = false;
    this._matrix.getMatrix().forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell !== 0) {
          const [x] = this.getAbsolutePos(rowIndex, colIndex);
          if (x < 0 || x >= 10) {
            collide = true;
          }
        }
      });
    });

    return collide;
  };

  public getAbsolutePos = (i: number, j: number): number[] => {
    return [this.x + j, this.y + i];
  };

  public collideBottom = (): boolean => {
    let collide = false;
    this._matrix.getMatrix().forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell !== 0) {
          const [, y] = this.getAbsolutePos(rowIndex, colIndex);
          if (y >= 20) {
            collide = true;
          }
        }
      });
    });

    this.direction = 0;

    return collide;
  };

  public undoMove = (): void => {
    this.x -= this.direction;
  };
}
