import React from "react";
import { TProviderProps, provide } from "./provider";
import KVEditor from "@/components/KeyValueEditor";
import FilesUpload from "../FilesUpload";

const BodyKVEditor = (props: TProviderProps) => {
  return (
    <>
      {props.mime === "multipart/form-data" && <FilesUpload />}
      <KVEditor
        items={props.items}
        onAdd={props.addBodyKV}
        onChangeValue={props.changeBodyKVValue}
        onChangeKey={props.changeBodyKVKey}
        onRemove={props.removeBodyKV}
        onChangeActive={props.changeBodyKVActive}
      />
    </>
  );
};

export default provide(BodyKVEditor);
