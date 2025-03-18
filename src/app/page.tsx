"use client";

import { Box, MainCanvas } from "@/components";
import { useTetrisGameService } from "@/services";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faArrowDown,
  faArrowLeft,
  faArrowRight,
  faArrowUp,
  faPause,
  faPlay,
  faRefresh,
  faVolumeHigh,
  faVolumeLow,
  faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Metadata } from "next";
import { useEffect, useRef } from "react";

const tags = {
  title: "Tetris Game",
  description:
    "Play the classic Tetris game online for free! Enjoy endless fun with smooth controls, increasing difficulty, and a retro design. No downloads, just pure Tetris action!",
  image: "./meta/tetris.png",
  url: "https://giuseppe-compagnone.github.io/tetris/",
  icon: "",
};

// export const metadata: Metadata = {
//   title: tags.title,
//   description: tags.description,
//   icons: [tags.icon],
//   openGraph: {
//     title: tags.title,
//     description: tags.description,
//     images: [tags.image],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: tags.title,
//     description: tags.description,
//     images: [tags.image],
//   },
// };

const HomePage = () => {
  //Hooks
  const {
    score,
    level,
    lines,
    time,
    restartGame,
    setPause,
    pause,
    audio,
    nextPiece,
    nextPieceFlag,
  } = useTetrisGameService();
  const canvas = useRef<HTMLCanvasElement>(null);

  //Effects
  useEffect(() => {
    drawNextPiece();
  }, [nextPieceFlag]);

  useEffect(() => {
    if (!canvas.current) return;
    const ctx = canvas.current.getContext("2d");
    if (!ctx) return;
    ctx.scale(40, 40);
  }, []);

  //Methods
  const formatTime = (seconds: number): string => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    const minutes = String(m).padStart(2, "0");
    const secondsStr = String(s).padStart(2, "0");

    return h > 0 ? `${h}:${minutes}:${secondsStr}` : `${minutes}:${secondsStr}`;
  };

  const setAudio = () => {
    if (audio) {
      switch (audio.volume) {
        case 0:
          audio.volume = 0.5;
          break;
        case 0.5:
          audio.volume = 1;
          break;
        case 1:
          audio.volume = 0;
          break;
        default:
          break;
      }
    }
  };

  const drawNextPiece = () => {
    if (!canvas.current) return;
    const ctx = canvas.current.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      nextPiece.current.getMatrix.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          if (cell !== 0) {
            ctx.fillStyle = nextPiece.current.color;
            ctx.fillRect(colIndex + 1, rowIndex + 1, 1, 1);
          }
        });
      });
    }
  };

  return (
    <div className="home-page">
      <div className="game">
        <div className="left-col">
          <Box title="Next Piece">
            <canvas
              className="next-piece"
              ref={canvas}
              width={240}
              height={240}
            ></canvas>
          </Box>
          <Box title="Options">
            <div className="options">
              <div
                className="key"
                onClick={() => {
                  setPause(!pause);
                }}
              >
                <FontAwesomeIcon icon={pause ? faPlay : faPause} />
              </div>
              <div
                className="key"
                onClick={() => {
                  restartGame();
                }}
              >
                <FontAwesomeIcon icon={faRefresh} />
              </div>
              <div
                className="key"
                onClick={() => {
                  setAudio();
                }}
              >
                <FontAwesomeIcon
                  icon={
                    audio?.volume === 1
                      ? faVolumeHigh
                      : audio?.volume === 0.5
                      ? faVolumeLow
                      : faVolumeXmark
                  }
                />
              </div>
            </div>
          </Box>
          <Box title="Statistics">
            <div className="sub-title">Score</div>
            <div className="value">{score}</div>
            <div className="sub-title">Level</div>
            <div className="value">{level.current}</div>
            <div className="sub-title">Lines</div>
            <div className="value">{lines.current}</div>
          </Box>
        </div>
        <MainCanvas />
        <div className="right-col">
          <Box title="Time">{formatTime(time)}</Box>
          <Box title="Commands">
            <div className="command">
              <div className="key">
                <FontAwesomeIcon icon={faArrowRight} />
              </div>{" "}
              Move Right
            </div>
            <div className="command">
              <div className="key">
                <FontAwesomeIcon icon={faArrowLeft} />
              </div>{" "}
              Move Left
            </div>
            <div className="command">
              <div className="key">
                <FontAwesomeIcon icon={faArrowDown} />
              </div>{" "}
              Move Down Faster
            </div>
            <div className="command">
              <div className="key">
                <FontAwesomeIcon icon={faArrowUp} />
              </div>{" "}
              Rotate
            </div>
            <div className="command">
              <div className="space-bar">SPACE</div> Istant Drop
            </div>
            <div className="command">
              <div className="key">P</div> Pause
            </div>
          </Box>
          <p className="credits">
            Made by <br />
            <a href="https://github.com/Giuseppe-Compagnone" target="_blank">
              Giuseppe Compagnone <FontAwesomeIcon icon={faGithub} />
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
