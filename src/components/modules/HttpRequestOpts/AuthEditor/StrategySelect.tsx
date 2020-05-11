import React from "react";
import { TProviderProps } from "./provider";
import { Select } from "antd";
const { Option } = Select;

type TProps = Pick<TProviderProps, "changeAuthStrategy" | "strategy">;
const StrategySelect = (props: TProps) => {
  return (
    <div>
      <Select
        onChange={props.changeAuthStrategy}
        style={{ width: 150 }}
        defaultValue="none"
        value={props.strategy}
      >
        <Option key="none" value="none">
          None
        </Option>
        <Option key="basic" value="basic">
          Basic auth
        </Option>
        {/*
        <Option key="bearer_token" value="bearer_token">
          Bearer token
        </Option>
        */}
      </Select>
    </div>
  );
};

export default StrategySelect;
