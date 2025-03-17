"use client";

import { Board } from "@/Models/Board";
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
  }
);
