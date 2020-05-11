import React from "react";
import { provide, TProviderProps } from "./provider";
import cls from "./index.less";
import StrategySelect from "./StrategySelect";
import BasicForm from "./Basic";

const AuthEditor = (props: TProviderProps) => {
  return (
    <div className={cls.container}>
      <StrategySelect
        changeAuthStrategy={props.changeAuthStrategy}
        strategy={props.strategy}
      />
      <div className={cls.form}>
        {props.strategy === "basic" && (
          <BasicForm
            updateBasicAuthForm={props.updateBasicAuthForm}
            basicData={props.basicData}
          />
        )}
      </div>
    </div>
  );
};

export default provide(AuthEditor);
