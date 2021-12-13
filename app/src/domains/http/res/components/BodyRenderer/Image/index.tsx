import React from "react";
import * as S from "./styled";

type TProps = {
  body: string;
};
const ImageRenderer = (props: TProps) => {
  return (
    <div>
      <S.Image src={props.body} alt="response" />
    </div>
  );
};

export default ImageRenderer;
