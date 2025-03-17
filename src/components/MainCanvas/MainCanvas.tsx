"use client";

import appConfig from "@/appConfig";
import { Board } from "@/Models/Board";
import { Piece } from "@/Models/Piece";
import { useTetrisGameService } from "@/services";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";

const MainCanvas = () => {
  //States
  const [dropInterval, setDropInterval] = useState<number>(
    Math.max(48 - 5 * 0, 1) * (1000 / 60)
  );

  //Hooks
  const canvas = useRef<HTMLCanvasElement>(null);
  const lastDropCounter = useRef<number>(0);
  const lastTime = useRef<number>(0);
  const isPaused = useRef<boolean>(false);
  const {
    board,
    level,
    addLines,
    pause,
    setPause,
    setGameOver,
    gameOver,
    restartGame,
    currentPiece,
  } = useTetrisGameService();
  const boardRef = useRef<Board>(board);

  //Effects
  useEffect(() => {
    if (canvas.current) {
      const ctx = canvas.current.getContext("2d");
      if (ctx) {
        ctx.scale(appConfig.scaleFactor, appConfig.scaleFactor);
        drawBackgroud(ctx);
      }
    }
  }, []);

  useEffect(() => {
    if (!pause) {
      isPaused.current = false;
      update();
    } else {
      isPaused.current = true;
    }
  }, [pause]);

  useEffect(() => {
    boardRef.current = board;
  }, [board]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!currentPiece.current.enableControls) return;
      switch (e.key) {
        case "p":
        case "P":
          setPause(true);
          break;
        case " ":
          currentPiece.current.enableControls = false;
          currentPiece.current.x = boardRef.current.projection.x;
          for (
            let i = 0;
            i < boardRef.current.projection.y - currentPiece.current.y;
            i++
          ) {
            setTimeout(() => {
              currentPiece.current.update();
            }, 5 * (i + 1));
          }
          break;
        case "ArrowLeft":
          currentPiece.current.moveLeft();
          break;
        case "ArrowRight":
          currentPiece.current.moveRight();
          break;
        case "ArrowDown":
          currentPiece.current.update();
          break;
        case "ArrowUp":
          currentPiece.current.rotate();
          currentPiece.current.adjustRotate();
          const pieceCollide = boardRef.current.pieceCollide(
            currentPiece.current
          );
          if (pieceCollide) {
            currentPiece.current.rotate();
            currentPiece.current.rotate();
            currentPiece.current.rotate();
          }
          break;
        default:
          break;
      }
    };

    const handlePauseKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "p":
        case "P":
          setPause(false);
          break;
        default:
          break;
      }
    };

    if (!pause) {
      window.removeEventListener("keydown", handlePauseKeyDown);
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
      window.addEventListener("keydown", handlePauseKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [pause]);

  useEffect(() => {
    setDropInterval(Math.max(48 - 5 * level.current, 1) * (1000 / 60));
  }, [level]);

  //Methods
  const update = (timestamp: number = 0) => {
    if (isPaused.current) return;
    const dt = timestamp - lastTime.current;
    lastDropCounter.current += dt;

    if (canvas.current) {
      const ctx = canvas.current.getContext("2d");
      if (ctx) {
        if (lastDropCounter.current > dropInterval * 2) {
          lastDropCounter.current = dropInterval;
        }
        if (lastDropCounter.current >= dropInterval) {
          lastDropCounter.current -= dropInterval;
          currentPiece.current.update();
        }

        drawBackgroud(ctx);

        checkCollision();

        currentPiece.current.direction = 0;

        currentPiece.current.draw(ctx);
        boardRef.current.drawProjection(currentPiece.current, ctx);
        boardRef.current.draw(ctx);
      }
    }

    lastTime.current = timestamp;

    requestAnimationFrame(update);
  };

  const drawBackgroud = (ctx: CanvasRenderingContext2D) => {
    for (let i = 0; i < canvas.current!.width / appConfig.scaleFactor; i++) {
      if (i % 2 === 0) {
        ctx.fillStyle = "black";
      } else {
        ctx.fillStyle = "#1a1a1a";
      }

      ctx.fillRect(i, 0, 1, canvas.current!.height / appConfig.scaleFactor);
    }
  };

  const checkCollision = () => {
    const collide = currentPiece.current.collideBorders();

    if (collide) {
      currentPiece.current.undoMove();
    }

    const bottomCollide = currentPiece.current.collideBottom();

    let lines = 0;

    if (bottomCollide) {
      currentPiece.current.y--;
      try {
        boardRef.current.merge(currentPiece.current);
      } catch (e) {
        console.log(e);
        setGameOver(true);
        setPause(true);
      }
      lines = boardRef.current.clearRows();
      currentPiece.current = new Piece();
    }

    const pieceCollide = boardRef.current.pieceCollide(currentPiece.current);

    if (pieceCollide) {
      if (currentPiece.current.direction) {
        currentPiece.current.undoMove();
      } else {
        currentPiece.current.y--;
        try {
          boardRef.current.merge(currentPiece.current);
        } catch (e) {
          console.log(e);
          setGameOver(true);
          setPause(true);
        }
        lines = boardRef.current.clearRows();
        currentPiece.current = new Piece();
      }
    }

    addLines(lines);
  };

  return (
    <div className="main-canvas">
      {pause && !gameOver && (
        <div
          className="pause"
          onClick={() => {
            setPause(false);
          }}
        >
          <FontAwesomeIcon icon={faPlay} />
        </div>
      )}
      {gameOver && (
        <div
          className="game-over"
          onClick={() => {
            restartGame();
          }}
        >
          <h1>GAME OVER</h1>
          <p>click to restart</p>
        </div>
      )}
      <canvas
        className="canvas"
        width={appConfig.scaleFactor * 10}
        height={appConfig.scaleFactor * 20}
        ref={canvas}
      />
    </div>
  );
};

export default MainCanvas;
