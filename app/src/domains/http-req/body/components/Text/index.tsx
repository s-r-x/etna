import React from "react";
import CodeEditor from "@/domains/code-editor/components";
import { Container, InnerWrap } from "./styled";
import { HttpReqBodySelectors as Selectors } from "@/domains/http-req/body/store/selectors";
import { connect, ConnectedProps } from "react-redux";
import { HttpReqBodyActions as Actions } from "@/domains/http-req/body/store/slice";

const connector = connect(
  (state) => ({
    text: Selectors.getText(state),
    MIME: Selectors.getMIME(state),
  }),
  {
    changeText: Actions.changeText,
  }
);
type TConnectorProps = ConnectedProps<typeof connector>;

const TextEditor = (props: TConnectorProps) => {
  return (
    <Container>
      <InnerWrap>
        <CodeEditor
          allowPrettify={
            props.MIME === "application/json"
            //  ||
            //  props.MIME === "application/xml" ||
            //  props.MIME === "text/html"
          }
          mode={props.MIME}
          value={props.text}
          onChange={props.changeText}
        />
      </InnerWrap>
    </Container>
  );
};

export default connector(TextEditor);
