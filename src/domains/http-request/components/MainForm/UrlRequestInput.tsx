import React from "react";
import { Input } from "antd";

type TProps = {
  value: string;
  onChange(value: string): void;
};
const URLInput = (props: TProps) => {
  return (
    <Input
      value={props.value}
      allowClear
      onChange={({ target }) => props.onChange(target.value)}
    />
  );
};

export default URLInput;
