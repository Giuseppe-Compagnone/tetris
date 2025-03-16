"use client";

import { useEffect, useState } from "react";
import { TetrisGameServiceProviderProps } from "./TetrisGameService.types";
import { TetrisGameServiceContext } from "./TetrisGameServiceContext";
import { Board } from "@/Models/Board";

const TetrisGameServiceProvider = (props: TetrisGameServiceProviderProps) => {
  //States
  const [level, setLevel] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [lines, setLines] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [pause, setPause] = useState<boolean>(true);
  const [board, setBoard] = useState<Board>(new Board());

  //Effects
  useEffect(() => {
    const newLevel = Math.floor(lines / 10);
    if (newLevel !== level) {
      setLevel(newLevel);
    }
  }, [lines]);

  //Methods
  const restartGame = () => {
    setLevel(0);
    setScore(0);
    setLines(0);
    setGameOver(false);
    setPause(false);
    setBoard(new Board());
  };

  const addLines = (lines: number) => {
    setLines((prev) => prev + lines);
    let score = 0;

    if (lines % 4 === 0) {
      score += 1200 * level;
    } else if (lines % 3 === 0) {
      score += 300 * level;
    } else if (lines % 2 === 0) {
      score += 100 * level;
    } else {
      score += 40 * level;
    }

    setScore((prev) => prev + score);
  };

  return (
    <TetrisGameServiceContext.Provider
      value={{
        level,
        setLevel,
        score,
        setScore,
        lines,
        setLines,
        gameOver,
        setGameOver,
        pause,
        setPause,
        board,
        restartGame,
        addLines,
      }}
    >
      {props.children}
    </TetrisGameServiceContext.Provider>
  );
};

export default TetrisGameServiceProvider;
