import { BoxProps } from "./Box.types";

const Box = (props: BoxProps) => {
  return (
    <div className="box">
      <div className="title">{props.title}</div>
      <div className="content">{props.children}</div>
    </div>
  );
};

export default Box;
