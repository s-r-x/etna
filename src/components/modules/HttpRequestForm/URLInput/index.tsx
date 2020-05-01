import React, { useCallback } from "react";
import { Input } from "antd";

type TProps = {
  value: string;
  onChange(value: string): void;
};
export const URLInput = (props: TProps) => {
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      props.onChange(e.target.value);
    },
    [props.onChange]
  );
  return <Input value={props.value} allowClear onChange={onChange} />;
};
