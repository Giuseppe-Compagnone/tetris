import { useContext } from "react";
import { TetrisGameServiceContext } from "./TetrisGameServiceContext";

export const useTetrisGameService = () => {
  const context = useContext(TetrisGameServiceContext);

  if (!context) {
    throw new Error(
      "`useTetrisGameService` must be used within a `TetrisGameServiceProvider`"
    );
  }

  return context;
};
