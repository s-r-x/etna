import React from "react";
import CodeEditor from "@/domains/code-editor/components";
import { TConnectorProps } from "../../connectors/body";
import { Container } from "./styled";

type TProps = Pick<TConnectorProps, "MIME" | "text" | "changeText">;

const TextEditor = (props: TProps) => {
  return (
    <Container>
      <CodeEditor
        mode={props.MIME}
        value={props.text}
        onChange={props.changeText}
      />
    </Container>
  );
};

export default TextEditor;
