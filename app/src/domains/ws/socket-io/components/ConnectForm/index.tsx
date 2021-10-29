import React from "react";
import { Button, Input } from "antd";
import { Container, PathInput } from "./styled";
import { SendOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { SocketIOSelectors as Selectors } from "@socket-io/store/selectors";
import { SocketIOActions as Actions } from "@socket-io/store/slice";

const SocketIoConnectForm = () => {
  const dispatch = useDispatch();
  const path = useSelector(Selectors.getPath);
  const url = useSelector(Selectors.getUrl);
  const isConnected = useSelector(Selectors.isConnected);
  const toggleConnection = () => {
    if (isConnected) {
      dispatch(Actions.disconnect());
    } else {
      dispatch(Actions.connect());
    }
  };
  return (
    <Container onSubmit={(e) => e.preventDefault()}>
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
      <Button disabled={!url} onClick={toggleConnection} icon={<SendOutlined />} type="primary">
        {isConnected ? "Disconnect" : "Connect"}
      </Button>
    </Container>
  );
};

export default SocketIoConnectForm;
