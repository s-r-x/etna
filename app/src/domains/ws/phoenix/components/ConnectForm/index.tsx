import React from "react";
import { Button, Input } from "antd";
import { Container } from "./styled";
import { SendOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { PhoenixSelectors as Selectors } from "@phoenix/store/selectors";
import { PhoenixActions as Actions } from "@phoenix/store/slice";

const PhoenixConnectForm = () => {
  const dispatch = useDispatch();
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
      <Button disabled={!url} onClick={toggleConnection} icon={<SendOutlined />} type="primary">
        {isConnected ? "Disconnect" : "Connect"}
      </Button>
    </Container>
  );
};

export default PhoenixConnectForm;
