import React, { useCallback, Suspense } from "react";
import "./global-deps";
import { Controlled as CodeMirror } from "react-codemirror2";
import { Spin } from "antd";
import * as S from "./styled";
import { CodeEditorSelectors as Selectors } from "../store/selectors";
import { useSelector } from "react-redux";
import { useKeyMapComponent } from "../hooks/use-key-map-component";

type TProps = {
  gqlSchema?: TAnyDict;
  mode: string;
  onChange?(value: string): void;
  value: string;
  readOnly?: boolean;
  expanded?: boolean;
  extra?: React.ReactNode;
};
const CodeEditor = (props: TProps) => {
  const opts = useSelector(Selectors.getOptions);
  const onChange = useCallback(
    (_editor: any, _data: any, value: string) => {
      props.onChange(value);
    },
    [props.onChange]
  );
  const Mapping = useKeyMapComponent();
  const isGraphql = props.mode === "graphql";
  return (
    <Suspense fallback={<Spin size="large" />}>
      <Mapping>
        <S.Container>
          {props.extra && <S.Extra>{props.extra}</S.Extra>}
          <CodeMirror
            value={props.value}
            options={{
              gutters: ["CodeMirror-lint-markers"],
              lint:
                isGraphql && props.gqlSchema
                  ? {
                      schema: props.gqlSchema,
                    }
                  : true,
              hintOptions: isGraphql &&
                props.gqlSchema && {
                  schema: props.gqlSchema,
                },
              tabSize: opts.keyMap,
              lineWrapping: opts.lineWrapping,
              matchBrackets: true,
              autoCloseBrackets: opts.autoCloseBrackets,
              keyMap: opts.keyMap,
              mode: props.mode,
              theme: opts.theme,
              lineNumbers: opts.lineNumbers,
              readOnly: props.readOnly,
            }}
            onBeforeChange={onChange}
          />
        </S.Container>
      </Mapping>
    </Suspense>
  );
};

export default CodeEditor;
