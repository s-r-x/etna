import React from "react";
import CodeEditor from "@/components/CodeEditor";
import { TProviderProps } from "../provider";
import { CodeFormatter } from "@/utils/CodeFormatter";

type TProps = Pick<TProviderProps, "response" | "responseType">;

const ResponseViewer = ({ response, responseType }: TProps) => {
  return (
    <CodeEditor
      value={CodeFormatter.format(response.data, responseType)}
      readOnly
      mode={responseType}
    />
  );
};

export default ResponseViewer;
