export class Matrix {
  private matrix: Array<Array<number | string>>;
  private rows: number;
  private cols: number;

  constructor(rows: number, cols: number) {
    this.rows = rows;
    this.cols = cols;
    this.matrix = new Array(rows).fill(0).map(() => new Array(cols).fill(0));
  }

  public getMatrix(): Array<Array<number | string>> {
    return this.matrix;
  }

  public getRows(): number {
    return this.rows;
  }

  public getCols(): number {
    return this.cols;
  }

  public setMatrix(matrix: Array<Array<number | string>>): void {
    this.matrix = matrix;
  }

  public setRows(rows: number): void {
    this.rows = rows;
  }

  public setCols(cols: number): void {
    this.cols = cols;
  }

  public get(row: number, col: number): number | string {
    return this.matrix[row][col];
  }

  public set(row: number, col: number, value: number | string): void {
    this.matrix[row][col] = value;
  }

  public clear(): void {
    this.matrix = new Array(this.rows)
      .fill(0)
      .map(() => new Array(this.cols).fill(0));
  }

  public isRowFull(row: number): boolean {
    return this.matrix[row].every((cell) => cell !== 0);
  }

  public clearRow(row: number): void {
    this.matrix.splice(row, 1);
    this.matrix.unshift(new Array(this.cols).fill(0));
  }

  public clearRows(): void {
    this.matrix = this.matrix.filter((row) => row.some((cell) => cell === 0));
    while (this.matrix.length < this.rows) {
      this.matrix.unshift(new Array(this.cols).fill(0));
    }
  }

  public isCellEmpty(row: number, col: number): boolean {
    return this.matrix[row][col] === 0;
  }

  public isCellValid(row: number, col: number): boolean {
    return row >= 0 && row < this.rows && col >= 0 && col < this.cols;
  }

  public isCellOccupied(row: number, col: number): boolean {
    return this.matrix[row][col] !== 0;
  }

  public isRowEmpty(row: number): boolean {
    return this.matrix[row].every((cell) => cell === 0);
  }

  public rotate(): void {
    const newMatrix = new Array(this.cols)
      .fill(0)
      .map(() => new Array(this.rows).fill(0));
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        newMatrix[j][this.rows - i - 1] = this.matrix[i][j];
      }
    }
    this.matrix = newMatrix;
    [this.rows, this.cols] = [this.cols, this.rows];
  }
}
