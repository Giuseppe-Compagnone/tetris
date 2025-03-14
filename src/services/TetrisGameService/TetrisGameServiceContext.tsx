import { createContext } from "react";

export interface TetrisGameServiceContent {}

export const TetrisGameServiceContext = createContext<TetrisGameServiceContent>(
  {}
);
