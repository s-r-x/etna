import React from "react";
import { provide, TProviderProps } from "./provider";
import KeyValueEditor from "@/components/KeyValueEditor";

const HeadersEditor = (props: TProviderProps) => {
  return (
    <div>
      <KeyValueEditor
        updateByIdx
        keyPlaceholder="Header"
        items={props.headers}
        onChangeActive={props.changeHeaderActive}
        onChangeValue={props.changeHeaderValue}
        onChangeKey={props.changeHeaderKey}
        onAdd={props.addHeader}
        onRemove={props.removeHeader}
      />
    </div>
  );
};
export default provide(HeadersEditor);
