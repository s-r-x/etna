import React from "react";
import { Input } from "antd";
import { Container, PathInput } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { SocketIOSelectors as Selectors } from "@socket-io/store/selectors";
import { SocketIOActions as Actions } from "@socket-io/store/slice";
import ConnectButton from "@/domains/ws/shared/components/ConnectButton";

const SocketIoConnectForm = () => {
  const connStatus = useSelector(Selectors.getConnStatus);
  const dispatch = useDispatch();
  const path = useSelector(Selectors.getPath);
  const url = useSelector(Selectors.getUrl);
  const isDisabled = useSelector(Selectors.isConnectionButtonDisabled);
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
      <ConnectButton connStatus={connStatus} isDisabled={!url} />
    </Container>
  );
};

export default SocketIoConnectForm;
