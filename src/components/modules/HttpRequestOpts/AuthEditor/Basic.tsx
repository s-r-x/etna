import React, { useCallback } from "react";
import { Form, Input } from "antd";
import _ from "lodash";
import { TProviderProps } from "./provider";

type TProps = Pick<TProviderProps, "basicData" | "updateBasicAuthForm">;
const BasicAuthForm = (props: TProps) => {
  const onChange = useCallback(
    _.debounce((changed: TAnyDict) => {
      console.log(props.updateBasicAuthForm);
      props.updateBasicAuthForm(changed);
    }, 175),
    [props.basicData]
  );
  return (
    <Form
      onValuesChange={onChange}
      initialValues={props.basicData}
    >
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
