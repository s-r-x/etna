import React from "react";
import { TConnectorProps, connector } from "../../connectors/auth";
import cls from "./index.less";
import StrategySelect from "./StrategySelect";
import Basic from "./Basic";

const AuthEditor = (props: TConnectorProps) => {
  return (
    <div className={cls.container}>
      <StrategySelect
        changeAuthStrategy={props.changeAuthStrategy}
        strategy={props.strategy}
      />
      <div className={cls.form}>
        {props.strategy === "basic" && (
          <Basic
            updateBasicAuthForm={props.updateBasicAuthForm}
            basicData={props.basicData}
          />
        )}
      </div>
    </div>
  );
};

export default connector(AuthEditor);
