import React from "react";
import { THTTPMethod } from "@/typings/http";
import { HTTP_METHODS } from "@/domains/http/shared/constants";
import { Select } from "antd";
const { Option } = Select;

type TProps = {
  value: THTTPMethod;
  onChange(val: THTTPMethod): void;
};
const MethodSelect = (props: TProps) => {
  return (
    <Select
      value={props.value}
      style={{ width: 130 }}
      defaultValue="GET"
      onChange={props.onChange}
    >
      {HTTP_METHODS.map(method => (
        <Option key={method} value={method}>
          {method}
        </Option>
      ))}
    </Select>
  );
};

export default MethodSelect;
