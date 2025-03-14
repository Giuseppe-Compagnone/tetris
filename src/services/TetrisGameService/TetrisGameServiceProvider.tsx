import { TetrisGameServiceProviderProps } from "./TetrisGameService.types";
import { TetrisGameServiceContext } from "./TetrisGameServiceContext";

const TetrisGameServiceProvider = (props: TetrisGameServiceProviderProps) => {
  return (
    <TetrisGameServiceContext.Provider value={{}}>
      {props.children}
    </TetrisGameServiceContext.Provider>
  );
};

export default TetrisGameServiceProvider;
