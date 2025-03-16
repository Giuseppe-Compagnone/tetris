"use client";

import appConfig from "@/appConfig";
import { Board } from "@/Models/Board";
import { Piece } from "@/Models/Piece";
import { useEffect, useRef, useState } from "react";

const MainCanvas = () => {
  //States
  const [board] = useState(new Board());
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
      if (!currentPiece.current.enableControls) return;
      switch (e.key) {
        case " ":
          currentPiece.current.enableControls = false;
          currentPiece.current.x = board.projection.x;
          for (
            let i = 0;
            i < board.projection.y - currentPiece.current.y;
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
          const pieceCollide = board.pieceCollide(currentPiece.current);
          if (pieceCollide) {
            currentPiece.current.rotate();
            currentPiece.current.rotate();
            currentPiece.current.rotate();
          }
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

        checkCollision();

        currentPiece.current.direction = 0;

        currentPiece.current.draw(ctx);
        board.drawProjection(currentPiece.current, ctx);
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

  const checkCollision = () => {
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
      if (currentPiece.current.direction) {
        currentPiece.current.undoMove();
      } else {
        currentPiece.current.y--;
        board.merge(currentPiece.current);
        currentPiece.current = new Piece();
      }
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
