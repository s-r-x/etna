import React from "react";
import CodeEditor from "@/components/CodeEditor";
import { TProviderProps } from "../provider";
import { CodeFormatter } from "@/utils/CodeFormatter";

type TProps = Pick<TProviderProps, "response" | "responseType"> & {
  expanded: boolean;
};

const ResponseViewer = (props: TProps) => {
  return (
    <CodeEditor
      expanded={props.expanded}
      value={CodeFormatter.format(props.response.data, props.responseType)}
      readOnly
      mode={props.responseType}
    />
  );
};

export default ResponseViewer;
