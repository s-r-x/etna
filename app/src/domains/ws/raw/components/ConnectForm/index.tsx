import React from "react";
import { Button, Input } from "antd";
import { Container } from "./styled";
import { SendOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { WsRawSelectors as Selectors } from "@ws/raw/store/selectors";
import { WsRawActions as Actions } from "@ws/raw/store/slice";
import { useConnectButtonText } from "./hooks";

const WsRawConnectForm = () => {
  const dispatch = useDispatch();
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

export default WsRawConnectForm;
