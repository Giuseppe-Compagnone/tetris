import { Matrix } from "./Matrix";

export class Board {
  private _matrix: Matrix;

  constructor() {
    this._matrix = new Matrix(20, 10);
  }
}
