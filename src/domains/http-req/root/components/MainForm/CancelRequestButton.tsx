import React from "react";
import { StopOutlined } from "@ant-design/icons";
import { Button } from "antd";

type TProps = {
  disabled: boolean;
  onClick: () => void;
};

const CancelButton = (props: TProps) => (
  <Button
    htmlType="button"
    disabled={props.disabled}
    danger
    type="primary"
    icon={<StopOutlined />}
    onClick={props.onClick}
  >
    Cancel
  </Button>
);
export default CancelButton;
