import React from "react";
import { Button, Input } from "antd";
import { Container, PathInput } from "./styled";
import { SendOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { SocketIOSelectors as Selectors } from "@socket-io/store/selectors";
import { SocketIOActions as Actions } from "@socket-io/store/slice";
import { useConnectButtonText } from "./hooks";

const SocketIoConnectForm = () => {
  const dispatch = useDispatch();
  const path = useSelector(Selectors.getPath);
  const url = useSelector(Selectors.getUrl);
  const isConnected = useSelector(Selectors.isConnected);
  const isConnecting = useSelector(Selectors.isConnecting);
  const isDisabled = useSelector(Selectors.isConnectionButtonDisabled);
  const buttonText = useConnectButtonText();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isDisabled) return;
    dispatch(Actions.uiConnection());
  };
  return (
    <Container onSubmit={onSubmit}>
      <Input
        onChange={({ target }) => dispatch(Actions.changeUrl(target.value))}
        value={url}
        placeholder="URL"
      />
      <PathInput
        value={path}
        onChange={({ target }) => dispatch(Actions.changePath(target.value))}
        placeholder="Path"
      />
      <Button
        htmlType="submit"
        disabled={isDisabled}
        icon={<SendOutlined />}
        danger={isConnected || isConnecting}
        type="primary"
      >
        {buttonText}
      </Button>
    </Container>
  );
};

export default SocketIoConnectForm;
