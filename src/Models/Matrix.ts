export class Matrix {
  private matrix: number[][];
  private rows: number;
  private cols: number;

  constructor(rows: number, cols: number) {
    this.rows = rows;
    this.cols = cols;
    this.matrix = new Array(rows).fill(0).map(() => new Array(cols).fill(0));
  }

  public getMatrix(): number[][] {
    return this.matrix;
  }

  public getRows(): number {
    return this.rows;
  }

  public getCols(): number {
    return this.cols;
  }

  public setMatrix(matrix: number[][]): void {
    this.matrix = matrix;
  }

  public setRows(rows: number): void {
    this.rows = rows;
  }

  public setCols(cols: number): void {
    this.cols = cols;
  }

  public get(row: number, col: number): number {
    return this.matrix[row][col];
  }

  public set(row: number, col: number, value: number): void {
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
}
