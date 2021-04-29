import React from "react";
import { TConnectorProps, connector } from "../../connectors/auth";
import StrategySelect from "./StrategySelect";
import Basic from "./Basic";
import * as S from "./styled";

const AuthEditor = (props: TConnectorProps) => {
  return (
    <S.Container>
      <StrategySelect
        changeAuthStrategy={props.changeAuthStrategy}
        strategy={props.strategy}
      />
      <S.Form>
        {props.strategy === "basic" && (
          <Basic
            updateBasicAuthForm={props.updateBasicAuthForm}
            basicData={props.basicData}
          />
        )}
      </S.Form>
    </S.Container>
  );
};

export default connector(AuthEditor);
