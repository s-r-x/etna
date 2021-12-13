import React from "react";
import { SendOutlined } from "@ant-design/icons";
import { Button } from "antd";

type TProps = {
  loading: boolean;
  disabled: boolean;
};

const MakeRequestButton = (props: TProps) => (
  <Button
    htmlType="submit"
    disabled={props.disabled}
    type="primary"
    icon={<SendOutlined />}
    loading={props.loading}
  >
    Send
  </Button>
);
export default MakeRequestButton;
