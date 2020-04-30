import React from "react";
import { TProviderProps, provide } from "./provider";
import KVEditor from "@/components/KeyValueEditor";

const BodyKVEditor = (props: TProviderProps) => {
  return (
    <KVEditor
      updateByIdx
      items={props.items}
      onAdd={props.addBodyKV}
      onChangeValue={props.changeBodyKVValue}
      onChangeKey={props.changeBodyKVKey}
      onRemove={props.removeBodyKV}
      onChangeActive={props.changeBodyKVActive}
    />
  );
};

export default provide(BodyKVEditor);
