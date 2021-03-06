import React from "react";
import CodeEditor from "@/domains/code-editor/components";
import { TConnectorProps } from "../../connectors/body";
import { Container } from "./styled";
import FullParentHeight from "@/components/FullParentHeight";

type TProps = Pick<TConnectorProps, "MIME" | "text" | "changeText">;

const TextEditor = (props: TProps) => {
  return (
    <Container>
      <FullParentHeight>
        <CodeEditor
          mode={props.MIME}
          value={props.text}
          onChange={props.changeText}
        />
      </FullParentHeight>
    </Container>
  );
};

export default TextEditor;
