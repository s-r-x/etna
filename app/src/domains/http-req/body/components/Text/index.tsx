import React from "react";
import CodeEditor from "@/domains/code-editor/components";
import { TConnectorProps } from "../../connectors/body";
import { Container, InnerWrap } from "./styled";

type TProps = Pick<TConnectorProps, "MIME" | "text" | "changeText">;

const TextEditor = (props: TProps) => {
  return (
    <Container>
      <InnerWrap>
        <CodeEditor
          allowPrettify={
            props.MIME === "application/json" ||
            props.MIME === "application/xml" ||
            props.MIME === "text/html"
          }
          mode={props.MIME}
          value={props.text}
          onChange={props.changeText}
        />
      </InnerWrap>
    </Container>
  );
};

export default TextEditor;
