import React from "react";
import { MethodSelect } from "./MethodSelect";
import { URLInput } from "./URLInput";
import { Button } from "antd";
import { provide, TProviderProps } from "./provider";
import cls from "./index.less";

const HTTPRequestForm = (props: TProviderProps) => {
  return (
    <div className={cls.container}>
      <MethodSelect value={props.method} onChange={props.changeMethod} />
      <URLInput value={props.url} onChange={props.changeUrl} />
      <Button
        disabled={!props.url || props.url.length === 0}
        size="large"
        type="primary"
        onClick={() => props.makeRequest()}
        loading={props.loading}
      >
        Run
      </Button>
    </div>
  );
};

export default provide(HTTPRequestForm);
