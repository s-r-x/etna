import React from "react";
import CodeEditor from "@/domains/code-editor/components";
import { TConnectorProps } from "../../../connectors";
import Mode from "./Mode";

type TProps = Pick<
  TConnectorProps,
  | "editorOpts"
  | "prettyBody"
  | "rawBody"
  | "responseType"
  | "changeEditorFormat"
  | "isPrettyBodySupported"
>;

const TextRenderer = (props: TProps) => {
  const { format } = props.editorOpts;
  const isRaw = format === "Raw";
  return (
    <>
      <Mode
        isPrettyBodySupported={props.isPrettyBodySupported}
        changeEditorFormat={props.changeEditorFormat}
        editorOpts={props.editorOpts}
      />
      <CodeEditor
        expanded={props.editorOpts.expanded}
        value={isRaw ? props.rawBody : props.prettyBody}
        readOnly
        mode={isRaw ? "text/plain" : props.responseType}
      />
    </>
  );
};

export default TextRenderer;
