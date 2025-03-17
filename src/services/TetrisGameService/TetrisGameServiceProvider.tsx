"use client";

import { useEffect, useRef, useState } from "react";
import { TetrisGameServiceProviderProps } from "./TetrisGameService.types";
import { TetrisGameServiceContext } from "./TetrisGameServiceContext";
import { Board } from "@/Models/Board";

const TetrisGameServiceProvider = (props: TetrisGameServiceProviderProps) => {
  //States
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [pause, setPause] = useState<boolean>(true);
  const [board, setBoard] = useState<Board>(new Board());
  const [time, setTime] = useState<number>(0);

  //Hooks
  const lines = useRef<number>(0);
  const level = useRef<number>(0);

  //Effects
  useEffect(() => {
    let timer: NodeJS.Timer;
    if (pause) {
      // @ts-expect-error not assigned
      clearInterval(timer);
    } else {
      timer = setInterval(() => {
        if (!pause) {
          setTime((prev) => prev + 1);
        }
      }, 1000);
    }

    return () => {
      // @ts-expect-error not assigned
      clearInterval(timer);
    };
  }, [pause]);

  //Methods
  const restartGame = () => {
    level.current = 0;
    lines.current = 0;
    setScore(0);
    setGameOver(false);
    setPause(false);
    setBoard(new Board());
    setTime(0);
  };

  const addLines = (newLines: number) => {
    if (newLines <= 0) return;

    lines.current += newLines;

    const newLevel = Math.floor(lines.current / 10);
    if (newLevel !== level.current) {
      level.current = newLevel;
    }
    let newScore = 0;

    if (lines.current % 4 === 0) {
      newScore += 1200 * (newLevel + 1);
    } else if (lines.current % 3 === 0) {
      newScore += 300 * (newLevel + 1);
    } else if (lines.current % 2 === 0) {
      newScore += 100 * (newLevel + 1);
    } else {
      newScore += 40 * (newLevel + 1);
    }

    setScore((prev) => prev + newScore);
  };

  return (
    <TetrisGameServiceContext.Provider
      value={{
        level,
        score,
        setScore,
        lines,
        gameOver,
        setGameOver,
        pause,
        setPause,
        board,
        restartGame,
        addLines,
        time,
      }}
    >
      {props.children}
    </TetrisGameServiceContext.Provider>
  );
};

export default TetrisGameServiceProvider;
