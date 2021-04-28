import React, { useCallback } from "react";
import { Form, Switch } from "antd";
import { TConnectorProps, connector } from "../../connectors/settings";
import _ from "lodash";

const HttpRequestSettings = (props: TConnectorProps) => {
  const onChange = useCallback(
    _.debounce((changed: { [key: string]: any }) => {
      props.updateSettings(changed);
    }, 175),
    [props.settings, props.updateSettings]
  );
  return (
    <Form onValuesChange={onChange} initialValues={props.settings}>
      <Form.Item
        label="Expect binary response"
        name="expectBinary"
        valuePropName="checked"
      >
        <Switch></Switch>
      </Form.Item>
    </Form>
  );
};

export default connector(HttpRequestSettings);
