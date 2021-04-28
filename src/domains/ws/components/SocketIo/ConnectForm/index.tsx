import React from "react";
import { Button, Input } from "antd";
import { Container, PathInput } from "./styled";
import { SendOutlined } from "@ant-design/icons";
import { TConnectorProps } from "../../../connectors/socket-io";

type TProps = Pick<
  TConnectorProps,
  | "url"
  | "changeUrl"
  | "connect"
  | "disconnect"
  | "isConnected"
  | "path"
  | "changePath"
>;
const SocketIoConnectForm = (props: TProps) => {
  return (
    <Container onSubmit={(e) => e.preventDefault()}>
      <Input
        onChange={({ target }) => props.changeUrl(target.value)}
        value={props.url}
        placeholder="URL"
      />
      <PathInput
        value={props.path}
        onChange={({ target }) => props.changePath(target.value)}
        placeholder="Path"
      />
      <Button
        onClick={() =>
          props.isConnected ? props.disconnect() : props.connect()
        }
        icon={<SendOutlined />}
        type="primary"
      >
        {props.isConnected ? "Disconnect" : "Connect"}
      </Button>
    </Container>
  );
};

export default SocketIoConnectForm;
