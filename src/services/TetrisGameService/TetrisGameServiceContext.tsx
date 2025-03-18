"use client";

import { Board } from "@/Models/Board";
import { Piece } from "@/Models/Piece";
import { createContext, Dispatch, RefObject, SetStateAction } from "react";

export interface TetrisGameServiceContent {
  level: RefObject<number>;
  score: number;
  setScore: Dispatch<SetStateAction<number>>;
  lines: RefObject<number>;
  gameOver: boolean;
  setGameOver: Dispatch<SetStateAction<boolean>>;
  pause: boolean;
  setPause: Dispatch<SetStateAction<boolean>>;
  board: Board;
  restartGame: () => void;
  addLines: (lines: number) => void;
  time: number;
  currentPiece: RefObject<Piece>;
  audio: HTMLAudioElement | null;
  nextPiece: RefObject<Piece>;
  getNextPiece: () => void;
  nextPieceFlag: number;
}

export const TetrisGameServiceContext = createContext<TetrisGameServiceContent>(
  {
    level: { current: 0 },
    lines: { current: 0 },
    score: 0,
    setScore: () => {},
    gameOver: false,
    setGameOver: () => {},
    pause: false,
    setPause: () => {},
    board: new Board(),
    restartGame: () => {},
    addLines: () => {},
    time: 0,
    currentPiece: { current: new Piece(1) },
    audio: null,
    nextPiece: { current: new Piece(1) },
    getNextPiece: () => {},
    nextPieceFlag: 0,
  }
);
