"use client";

import { Box, MainCanvas } from "@/components";
import { useTetrisGameService } from "@/services";

const HomePage = () => {
  //Hooks
  const { score, level, lines } = useTetrisGameService();

  return (
    <div className="home-page">
      <div className="game">
        <div className="left-col">
          <Box title="Next Piece">
            <div className=""></div>
          </Box>
          <Box title="Statics">
            <div className="sub-title">Score</div>
            <div className="value">{score}</div>
            <div className="sub-title">Level</div>
            <div className="value">{level.current}</div>
            <div className="sub-title">Lines</div>
            <div className="value">{lines.current}</div>
          </Box>
        </div>
        <MainCanvas />
        <div className="right-col"></div>
      </div>
    </div>
  );
};

export default HomePage;
