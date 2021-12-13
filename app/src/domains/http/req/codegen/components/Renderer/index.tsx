import React from "react";
import CodeEditor from "@/domains/code-editor/components";
import { useSnippetRendererMode } from "./hooks";

type TProps = {
  snippet: string;
};
const HttpCodegenRenderer = ({ snippet }: TProps) => {
  const mode = useSnippetRendererMode();
  return <CodeEditor readOnly value={snippet} mode={mode} />;
};

export default HttpCodegenRenderer;
