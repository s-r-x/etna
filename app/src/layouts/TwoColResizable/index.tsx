import React from "react";
import { Resizable } from "re-resizable";
import * as S from "./styled";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Row, Col } from "antd";

type TProps = {
  left: React.ReactNode;
  right: React.ReactNode;
};
export const TwoColResizable = ({ left, right }: TProps) => {
  const isMobile = useIsMobile();
  if (isMobile) {
    return (
      <Row>
        <Col span={24}>{left}</Col>
        <Col span={24}>{right}</Col>
      </Row>
    );
  }
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
