import React from "react";
import CodeEditor from "@/domains/code-editor/components";
import { TConnectorProps } from "../../../connectors";
import Mode from "./Mode";
import { Container } from "./styled";
import FullParentHeight from "@/components/FullParentHeight";

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
    <Container>
      <FullParentHeight>
        <CodeEditor
          extra={
            <Mode
              isPrettyBodySupported={props.isPrettyBodySupported}
              changeEditorFormat={props.changeEditorFormat}
              editorOpts={props.editorOpts}
            />
          }
          expanded={props.editorOpts.expanded}
          value={isRaw ? props.rawBody : props.prettyBody}
          readOnly
          mode={isRaw ? "text/plain" : props.responseType}
        />
      </FullParentHeight>
    </Container>
  );
};

export default TextRenderer;
