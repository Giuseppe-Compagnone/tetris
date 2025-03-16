import { TetrisGameServiceProvider } from "@/services";
import { ProvidersWrapperProps } from "./ProvidersWrapper.types";

const ProvidersWrapper = (props: ProvidersWrapperProps) => {
  return (
    <TetrisGameServiceProvider>{props.children}</TetrisGameServiceProvider>
  );
};

export default ProvidersWrapper;
