import React from "react";
import CodeEditor from "@/components/CodeEditor";
import { TProviderProps } from "../provider";

type TProps = Pick<TProviderProps, "responseType"> & {
  body: string;
  expanded: boolean;
};

const BodyViewer = (props: TProps) => {
  return (
    <CodeEditor
      expanded={props.expanded}
      value={props.body}
      readOnly
      mode={props.responseType}
    />
  );
};

export default BodyViewer;
