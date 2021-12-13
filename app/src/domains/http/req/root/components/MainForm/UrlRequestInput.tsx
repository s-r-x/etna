import React from "react";
import { Input } from "antd";

type TProps = {
  value: string;
  onChange(value: string): void;
};
const URLInput = (props: TProps) => {
  return (
    <Input
      id="http-req-url-input"
      value={props.value}
      allowClear
      onChange={({ target }) => props.onChange(target.value)}
    />
  );
};

export default URLInput;
