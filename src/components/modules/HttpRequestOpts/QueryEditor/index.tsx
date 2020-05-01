import React from "react";
import { provide, TProviderProps } from "./provider";
import KeyValueEditor from "@/components/KeyValueEditor";

const QueryEditor = (props: TProviderProps) => {
  return (
    <div>
      <KeyValueEditor useIdxAsKey updateByIdx items={props.query} />
    </div>
  );
};
export default provide(QueryEditor);
