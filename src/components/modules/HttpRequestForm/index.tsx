import React, { useCallback } from "react";
import { MethodSelect } from "./MethodSelect";
import { URLInput } from "./URLInput";
import { Button } from "antd";
import { provide, TProviderProps } from "./provider";
import cls from "./index.less";
import { SendOutlined } from "@ant-design/icons";

const HTTPRequestForm = (props: TProviderProps) => {
  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      props.makeRequest();
    },
    [props.makeRequest]
  );
  return (
    <form onSubmit={onSubmit} className={cls.container}>
      <MethodSelect value={props.method} onChange={props.changeMethod} />
      <URLInput value={props.url} onChange={props.changeUrl} />
      <Button
        htmlType="submit"
        disabled={!props.url}
        type="primary"
        icon={<SendOutlined />}
        loading={props.loading}
      >
        Send
      </Button>
    </form>
  );
};

export default provide(HTTPRequestForm);
