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
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HomePage = () => {
  //Hooks
  const { score, level, lines, time, restartGame, setPause, pause } =
    useTetrisGameService();

  //Methods
  const formatTime = (seconds: number): string => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    const minutes = String(m).padStart(2, "0");
    const secondsStr = String(s).padStart(2, "0");

    return h > 0 ? `${h}:${minutes}:${secondsStr}` : `${minutes}:${secondsStr}`;
  };

  return (
    <div className="home-page">
      <div className="game">
        <div className="left-col">
          <Box title="Next Piece">
            <div className=""></div>
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
