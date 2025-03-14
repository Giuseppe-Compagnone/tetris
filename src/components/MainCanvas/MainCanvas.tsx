"use client";

import appConfig from "@/appConfig";
import { Board } from "@/Models/Board";
import { useEffect, useRef, useState } from "react";

const MainCanvas = () => {
  //States
  const [board] = useState(new Board());
  console.log(board);

  //Hooks
  const canvas = useRef<HTMLCanvasElement>(null);
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

  //Methods
  const update = (timestamp?: number) => {
    if (!lastTime.current) lastTime.current = timestamp || 0;

    const dt = (timestamp || 0) - lastTime.current;

    if (dt > 1000) {
      if (canvas.current) {
        const ctx = canvas.current.getContext("2d");
        if (ctx) {
          drawBackgroud(ctx);
        }
      }

      lastTime.current = timestamp || 0;
    }

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
