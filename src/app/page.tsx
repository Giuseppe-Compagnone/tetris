import { MainCanvas } from "@/components";

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="game">
        <div className="left-col"></div>
        <MainCanvas />
        <div className="right-col"></div>
      </div>
    </div>
  );
};

export default HomePage;
