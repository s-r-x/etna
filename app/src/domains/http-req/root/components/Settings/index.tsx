import React from "react";
import { Form, Switch } from "antd";
import { HttpReqActions as Actions } from "@/domains/http-req/root/store/slice";
import { HttpRequestSelectors as Selectors } from "@/domains/http-req/root/store/selectors";
import { connect, ConnectedProps } from "react-redux";

const connector = connect(
  (state) => ({
    settings: Selectors.getSettings(state),
  }),
  {
    updateSettings: Actions.updateSettings,
  }
);
const HttpRequestSettings = (props: ConnectedProps<typeof connector>) => {
  const onChange = (changed: TAnyDict) => {
    props.updateSettings(changed);
  };
  return (
    <Form onValuesChange={onChange} initialValues={props.settings}>
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
