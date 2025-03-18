"use client";

import { useEffect, useRef, useState } from "react";
import { TetrisGameServiceProviderProps } from "./TetrisGameService.types";
import { TetrisGameServiceContext } from "./TetrisGameServiceContext";
import { Board } from "@/Models/Board";
import { Piece } from "@/Models/Piece";
import { Bag } from "@/Models/Bag";

const TetrisGameServiceProvider = (props: TetrisGameServiceProviderProps) => {
  //States
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [pause, setPause] = useState<boolean>(true);
  const [board, setBoard] = useState<Board>(new Board());
  const [time, setTime] = useState<number>(0);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [bag] = useState<Bag>(new Bag());
  const [nextPieceFlag, setNextPieceFlag] = useState<number>(0);

  //Hooks
  const lines = useRef<number>(0);
  const level = useRef<number>(0);
  const currentPiece = useRef<Piece>(new Piece(1));
  const nextPiece = useRef<Piece>(new Piece(1));

  //Effects
  useEffect(() => {
    const soundtrack = new Audio("./assets/soundtrack.mp3");
    soundtrack.load();
    soundtrack.loop = true;
    soundtrack.volume = 0;
    setAudio(soundtrack);
  }, []);

  useEffect(() => {
    currentPiece.current = bag.getNextPiece();
    nextPiece.current = bag.getNextPiece();
    setNextPieceFlag((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (audio) {
      if (pause) {
        audio.pause();
      } else {
        audio.play();
      }
    }
  }, [pause]);

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
    if (audio) audio.currentTime = 0;
    setBoard(new Board());
    bag.fillBag();
    currentPiece.current = bag.getNextPiece();
    nextPiece.current = bag.getNextPiece();
    setNextPieceFlag((prev) => prev + 1);
    level.current = 0;
    lines.current = 0;
    setScore(0);
    setGameOver(false);
    setPause(false);
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

  const getNextPiece = () => {
    currentPiece.current = nextPiece.current;
    nextPiece.current = bag.getNextPiece();
    setNextPieceFlag((prev) => prev + 1);
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
        currentPiece,
        audio,
        nextPiece,
        getNextPiece,
        nextPieceFlag,
      }}
    >
      {props.children}
    </TetrisGameServiceContext.Provider>
  );
};

export default TetrisGameServiceProvider;
