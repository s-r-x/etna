import React from "react";
import { provide, TProviderProps } from "./provider";
import cls from "./index.less";
import StrategySelect from "./StrategySelect";

const AuthEditor = (props: TProviderProps) => {
  return (
    <div className={cls.container}>
      <StrategySelect
        changeAuthStrategy={props.changeAuthStrategy}
        strategy={props.strategy}
      />
    </div>
  );
};

export default provide(AuthEditor);
