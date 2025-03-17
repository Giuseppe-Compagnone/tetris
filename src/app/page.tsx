"use client";

import { Box, MainCanvas } from "@/components";
import { useTetrisGameService } from "@/services";

const HomePage = () => {
  //Hooks
  const { score, level, lines, time } = useTetrisGameService();

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
        </div>
      </div>
    </div>
  );
};

export default HomePage;
