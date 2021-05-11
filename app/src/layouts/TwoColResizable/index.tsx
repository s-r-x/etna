import React from "react";
import { Resizable } from "re-resizable";
import * as S from "./styled";

type TProps = {
  left: React.ReactNode;
  right: React.ReactNode;
};
export const TwoColResizable = ({ left, right }: TProps) => {
  return (
    <S.Root>
      <Resizable
        handleWrapperClass="resize-handler"
        enable={{
          right: true,
        }}
        defaultSize={{
          width: "50%",
          height: "auto",
        }}
        maxWidth="100%"
        minWidth="1"
      >
        {left}
      </Resizable>
      <S.RightCol>{right}</S.RightCol>
    </S.Root>
  );
};

export default TwoColResizable;
