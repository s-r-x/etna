import React from "react";
import { Input } from "antd";
import { Container } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { PhoenixSelectors as Selectors } from "@phoenix/store/selectors";
import { PhoenixActions as Actions } from "@phoenix/store/slice";
import ConnectButton from "@/domains/ws/shared/components/ConnectButton";

const PhoenixConnectForm = () => {
  const dispatch = useDispatch();
  const connStatus = useSelector(Selectors.getConnStatus);
  const url = useSelector(Selectors.getUrl);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(Actions.uiConnection());
  };
  return (
    <Container onSubmit={onSubmit}>
      <Input
        onChange={({ target }) => dispatch(Actions.changeUrl(target.value))}
        value={url}
        placeholder="URL"
      />
      <ConnectButton connStatus={connStatus} isDisabled={!url} />
    </Container>
  );
};

export default PhoenixConnectForm;
