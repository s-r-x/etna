import React from "react";
import Editors from "./EditorsTabs";
import Form from "./MainForm";
import * as S from "./styled";

const HttpRequest = () => {
  return (
    <S.Card>
      <>
        <Form />
        <Editors />
      </>
    </S.Card>
  );
};

export default HttpRequest;
