import React from "react";
import MethodSelect from "./HttpMethodSelect";
import URLInput from "./UrlRequestInput";
import { TConnectorProps, connector } from "../../connectors/form";
import CancelButton from "./CancelRequestButton";
import SubmitButton from "./MakeRequestButton";
import { Container, ButtonsRoot, InputsRoot } from "./styled";

const HTTPRequestForm = (props: TConnectorProps) => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.makeRequest();
  };
  return (
    <Container onSubmit={onSubmit}>
      <InputsRoot>
        <MethodSelect value={props.method} onChange={props.changeMethod} />
        <URLInput value={props.url} onChange={props.changeUrl} />
      </InputsRoot>
      <ButtonsRoot>
        <SubmitButton
          disabled={!props.url || props.loading}
          loading={props.loading}
        />
        <CancelButton
          disabled={!props.url || !props.loading}
          onClick={props.cancelRequest}
        />
      </ButtonsRoot>
    </Container>
  );
};

export default connector(HTTPRequestForm);
