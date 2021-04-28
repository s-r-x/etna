import React from "react";
import {
  TConnectorProps,
  connector,
} from "../connectors/kv";
import KVEditor from "@/components/KeyValueEditor";

const BodyKVEditor = (props: TConnectorProps) => {
  return (
    <KVEditor
      items={props.items}
      onAdd={props.addKV}
      onChangeValue={props.changeKVValue}
      onChangeKey={props.changeKVKey}
      onRemove={props.removeKV}
      onChangeActive={props.changeKVActive}
    />
  );
};

export default connector(BodyKVEditor);
