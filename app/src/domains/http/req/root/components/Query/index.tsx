import React from "react";
import { TConnectorProps, connector } from "../../connectors/query";
import KeyValueEditor from "@/components/KeyValueEditor";

const QueryEditor = (props: TConnectorProps) => {
  return (
    <div>
      <KeyValueEditor
        onChangeKey={props.changeQueryKey}
        onChangeValue={props.changeQueryValue}
        onRemove={props.removeQuery}
        onAdd={props.addQuery}
        items={props.query}
      />
    </div>
  );
};
export default connector(QueryEditor);
