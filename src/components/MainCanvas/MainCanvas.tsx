"use client";

import appConfig from "@/appConfig";
import { Board } from "@/Models/Board";
import { Piece } from "@/Models/Piece";
import { useEffect, useRef, useState } from "react";

const MainCanvas = () => {
  //States
  const [board] = useState(new Board());
  //   const [currentPiece, setCurrentPiece] = useState<Piece>(new Piece());
  const dropInterval = 600;

  //Hooks
  const canvas = useRef<HTMLCanvasElement>(null);
  const currentPiece = useRef<Piece>(new Piece());
  const lastDropCounter = useRef(0);
  const lastTime = useRef(0);

  //Effects
  useEffect(() => {
    if (canvas.current) {
      const ctx = canvas.current.getContext("2d");
      if (ctx) {
        ctx.scale(appConfig.scaleFactor, appConfig.scaleFactor);
      }
    }
    update();
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowLeft":
          currentPiece.current.moveLeft();
          break;
        case "ArrowRight":
          currentPiece.current.moveRight();
          break;
        case "ArrowDown":
          currentPiece.current.update();
          break;
        default:
          break;
      }
    });
  }, []);

  //Methods
  const update = (timestamp: number = 0) => {
    const dt = timestamp - lastTime.current;
    lastDropCounter.current += dt;

    if (canvas.current) {
      const ctx = canvas.current.getContext("2d");
      if (ctx) {
        if (lastDropCounter.current > dropInterval) {
          lastDropCounter.current -= dropInterval;
          currentPiece.current.update();
        }

        drawBackgroud(ctx);

        const collide = currentPiece.current.collideBorders();

        if (collide) {
          currentPiece.current.undoMove();
        }

        const bottomCollide = currentPiece.current.collideBottom();

        if (bottomCollide) {
          currentPiece.current.y--;
          board.merge(currentPiece.current);
          currentPiece.current = new Piece();
        }

        const pieceCollide = board.pieceCollide(currentPiece.current);

        if (pieceCollide) {
          currentPiece.current.y--;
          board.merge(currentPiece.current);
          currentPiece.current = new Piece();
        }

        currentPiece.current.draw(ctx);
        board.draw(ctx);
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

  return (
    <canvas
      className="main-canvas"
      width={appConfig.scaleFactor * 10}
      height={appConfig.scaleFactor * 20}
      ref={canvas}
    />
  );
};

export default MainCanvas;
