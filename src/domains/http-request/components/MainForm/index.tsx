import React from "react";
import MethodSelect from "./HttpMethodSelect";
import URLInput from "./UrlRequestInput";
import { TConnectorProps, connector } from "../../connectors/form";
import cls from "./index.less";
import CancelButton from "./CancelRequestButton";
import SubmitButton from "./MakeRequestButton";

const HTTPRequestForm = (props: TConnectorProps) => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.makeRequest();
  };
  return (
    <form onSubmit={onSubmit} className={cls.container}>
      <MethodSelect value={props.method} onChange={props.changeMethod} />
      <URLInput value={props.url} onChange={props.changeUrl} />
      <SubmitButton
        disabled={!props.url || props.loading}
        loading={props.loading}
      />
      <CancelButton
        disabled={!props.url || !props.loading}
        onClick={props.cancelRequest}
      />
    </form>
  );
};

export default connector(HTTPRequestForm);
