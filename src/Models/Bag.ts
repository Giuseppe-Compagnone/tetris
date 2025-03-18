import { Piece } from "./Piece";
import configurations from "./../utils/PiecesConfigurations.json";

export class Bag {
  private _pieces: Piece[];

  constructor() {
    this._pieces = [];
  }

  public fillBag() {
    configurations.forEach((_, i) => {
      this._pieces.push(new Piece(i));
    });
  }

  public getNextPiece() {
    if (this._pieces.length === 0) {
      this.fillBag();
    }

    const index = Math.floor(Math.random() * this._pieces.length);

    const piece = this._pieces.splice(index, 1)[0];

    return piece;
  }
}
