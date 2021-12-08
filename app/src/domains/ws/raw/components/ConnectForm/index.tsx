import React from "react";
import { Input } from "antd";
import { Container } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { WsRawSelectors as Selectors } from "@ws/raw/store/selectors";
import { WsRawActions as Actions } from "@ws/raw/store/slice";
import ConnectButton from "@/domains/ws/shared/components/ConnectButton";

const WsRawConnectForm = () => {
  const connStatus = useSelector(Selectors.getConnStatus);
  const dispatch = useDispatch();
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
      <ConnectButton connStatus={connStatus} isDisabled={isDisabled} />
    </Container>
  );
};

export default WsRawConnectForm;
