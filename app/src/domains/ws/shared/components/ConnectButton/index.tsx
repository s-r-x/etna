import React from "react";
import { EWsConnStatus } from "@ws/shared/typings";
import { Button } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { useConnButtonText } from "@ws/shared/hooks/useConnButtonText";

type TProps = {
  connStatus: EWsConnStatus;
  isDisabled: boolean;
};
const WsConnectButton = (props: TProps) => {
  const buttonText = useConnButtonText(props.connStatus);
  const danger =
    props.connStatus === EWsConnStatus.CONNECTED ||
    props.connStatus === EWsConnStatus.CONNECTING;
  return (
    <Button
      htmlType="submit"
      disabled={props.isDisabled}
      icon={<SendOutlined />}
      danger={danger}
      type="primary"
    >
      {buttonText}
    </Button>
  );
};

export default WsConnectButton;
