import React from "react";
import { TConnectorProps, connector } from "../../connectors/headers";
import KeyValueEditor from "@/components/KeyValueEditor";

const HeadersEditor = (props: TConnectorProps) => {
  return (
    <div>
      <KeyValueEditor
        keyPlaceholder="Header"
        items={props.headers}
        onChangeActive={props.changeHeaderActive}
        onChangeValue={props.changeHeaderValue}
        onChangeKey={props.changeHeaderKey}
        onAdd={() => props.addHeader(null)}
        onRemove={props.removeHeader}
      />
    </div>
  );
};
export default connector(HeadersEditor);
