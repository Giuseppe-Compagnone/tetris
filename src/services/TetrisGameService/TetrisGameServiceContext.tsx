"use client";

import { Board } from "@/Models/Board";
import { createContext, Dispatch, SetStateAction } from "react";

export interface TetrisGameServiceContent {
  level: number;
  setLevel: Dispatch<SetStateAction<number>>;
  score: number;
  setScore: Dispatch<SetStateAction<number>>;
  lines: number;
  setLines: Dispatch<SetStateAction<number>>;
  gameOver: boolean;
  setGameOver: Dispatch<SetStateAction<boolean>>;
  pause: boolean;
  setPause: Dispatch<SetStateAction<boolean>>;
  board: Board;
  restartGame: () => void;
  addLines: (lines: number) => void;
}

export const TetrisGameServiceContext = createContext<TetrisGameServiceContent>(
  {
    level: 0,
    setLevel: () => {},
    score: 0,
    setScore: () => {},
    lines: 0,
    setLines: () => {},
    gameOver: false,
    setGameOver: () => {},
    pause: false,
    setPause: () => {},
    board: new Board(),
    restartGame: () => {},
    addLines: () => {},
  }
);
