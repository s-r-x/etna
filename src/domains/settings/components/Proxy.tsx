import React from "react";
import { Form, Switch } from "antd";
import { connector, TConnectorProps } from "../connectors/proxy";
import _ from "lodash";

const ProxySettings = (props: TConnectorProps) => {
  const onUseProxyChange = (changed: TAnyDict) => {
    props.updateSettings(changed);
  };
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
    </div>
  );
};

export default connector(ProxySettings);
