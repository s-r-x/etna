import React, { useCallback } from "react";
import { Form, Input } from "antd";
import _ from "lodash";
import { TConnectorProps } from "../../connectors/auth";

type TProps = Pick<TConnectorProps, "basicData" | "updateBasicAuthForm">;
const BasicAuthForm = (props: TProps) => {
  const onChange = useCallback(
    _.debounce((changed: TAnyDict) => {
      props.updateBasicAuthForm(changed);
    }, 175),
    [props.updateBasicAuthForm]
  );
  return (
    <Form layout="vertical" onValuesChange={onChange} initialValues={props.basicData}>
      <Form.Item label="Username" name="username">
        <Input />
      </Form.Item>
      <Form.Item label="Password" name="password">
        <Input.Password />
      </Form.Item>
    </Form>
  );
};

export default BasicAuthForm;
