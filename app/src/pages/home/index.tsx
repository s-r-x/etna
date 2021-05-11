import React from "react";
import HttpResponse from "@/domains/http-res/components";
import HttpRequest from "@/domains/http-req/root/components";
import { Resizable } from "re-resizable";
import * as S from "./styled";

export const HomePage = () => {
  return (
    <S.Root>
      <Resizable
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
        <HttpRequest />
      </Resizable>
      <div style={{ width: "100%", minWidth: "1px" }}>
        <HttpResponse />
      </div>
    </S.Root>
  );
};

export default HomePage;
