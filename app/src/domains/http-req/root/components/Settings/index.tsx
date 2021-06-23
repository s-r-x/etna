import React, { useEffect } from "react";
import { Switch } from "antd";
import { HttpReqActions as Actions } from "@/domains/http-req/root/store/slice";
import { HttpRequestSelectors as Selectors } from "@/domains/http-req/root/store/selectors";
import { connect, ConnectedProps } from "react-redux";
import { Form } from "./styled";

const connector = connect(
  (state) => ({
    settings: Selectors.getSettings(state),
  }),
  {
    updateSettings: Actions.updateSettings,
  }
);
const HttpRequestSettings = (props: ConnectedProps<typeof connector>) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(props.settings);
  }, [form, props.settings]);
  return (
    <Form
      form={form}
      onValuesChange={props.updateSettings}
      initialValues={props.settings}
    >
      <Form.Item label="Use etna proxy" name="useProxy" valuePropName="checked">
        <Switch />
      </Form.Item>
      {!props.settings.useProxy && (
        <Form.Item
          label="Expect binary response"
          name="expectBinary"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      )}
    </Form>
  );
};

export default connector(HttpRequestSettings);
