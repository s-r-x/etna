import React from "react";
import { TConnectorProps, connector } from "../../connectors/body-kv";
import KVEditor from "@/components/KeyValueEditor";

const BodyKVEditor = (props: TConnectorProps) => {
  return (
    <KVEditor
      items={props.items}
      onAdd={props.addBodyKV}
      onChangeValue={props.changeBodyKVValue}
      onChangeKey={props.changeBodyKVKey}
      onRemove={props.removeBodyKV}
      onChangeActive={props.changeBodyKVActive}
    />
  );
};

export default connector(BodyKVEditor);
