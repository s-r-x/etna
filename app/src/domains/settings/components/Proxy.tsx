import React, { useEffect } from "react";
import { Form, Switch } from "antd";
import { HttpRequestSelectors } from "@/domains/http-req/root/store/selectors";
import { connect, ConnectedProps } from "react-redux";
import { HttpReqActions } from "@/domains/http-req/root/store/slice";

const connector = connect(
  (state) => ({
    settings: HttpRequestSelectors.getSettings(state),
  }),
  {
    updateSettings: HttpReqActions.updateSettings,
  }
);
const ProxySettings = (props: ConnectedProps<typeof connector>) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(props.settings);
  }, [form, props.settings]);
  return (
    <div>
      <Form
        form={form}
        initialValues={props.settings}
        onValuesChange={props.updateSettings}
      >
        <Form.Item
          label="Use etna proxy"
          name="useProxy"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      </Form>
    </div>
  );
};

export default connector(ProxySettings);
