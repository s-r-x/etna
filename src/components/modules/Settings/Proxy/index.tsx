import React, { useCallback } from "react";
import { Form, Input, Switch, InputNumber } from "antd";
import { provide, TProviderProps } from "./provider";
import _ from "lodash";

const ProxySettings = (props: TProviderProps) => {
  const proxyDisabled = !props.settings.useProxy;
  const onUseProxyChange = (changed: TAnyDict) => {
    props.updateSettings(changed);
  };
  const onProxyChange = useCallback(
    _.debounce((changed: TAnyDict) => {
      props.updateProxy(changed);
    }, 150),
    [props.updateProxy]
  );
  return (
    <div>
      <Form
        initialValues={props.settings}
        onValuesChange={onUseProxyChange}
        labelCol={{ span: 2 }}
      >
        <Form.Item label="Use proxy" name="useProxy" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>

      <Form
        labelCol={{ span: 2 }}
        initialValues={props.proxy}
        onValuesChange={onProxyChange}
      >
        <Form.Item label="Host" name="host">
          <Input disabled={proxyDisabled} />
        </Form.Item>
        <Form.Item label="Port" name="port">
          <InputNumber min={1} disabled={proxyDisabled} />
        </Form.Item>
        <Form.Item label="Username" name={["auth", "username"]}>
          <Input disabled={proxyDisabled} />
        </Form.Item>
        <Form.Item label="Password" name={["auth", "password"]}>
          <Input.Password disabled={proxyDisabled} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default provide(ProxySettings);
