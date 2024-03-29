import React, { useCallback, Suspense } from "react";
import "./global-deps";
import { Controlled as CodeMirror } from "react-codemirror2";
import Spin from "@/components/Spin";
import * as S from "./styled";
import { CodeEditorSelectors as Selectors } from "../store/selectors";
import { useSelector } from "react-redux";
import { useKeyMapComponent } from "../hooks/use-key-map-component";
import { Button } from "antd";
import { CodeFormatter } from "@/utils/CodeFormatter";
import { TCodeEditorProps } from "../typings/props";

const CodeEditor = (props: TCodeEditorProps) => {
  const opts = useSelector(Selectors.getOptions);
  const onChange = useCallback(
    (_editor: any, _data: any, value: string) => {
      props.onChange(value);
    },
    [props.onChange]
  );
  const onPrettify = () => {
    props.onChange(CodeFormatter.format(props.value, props.mode));
  };
  const Mapping = useKeyMapComponent();
  const isGraphql = props.mode === "graphql";
  return (
    <Suspense fallback={<Spin size="large" centered />}>
      <Mapping>
        <S.Container>
          <S.Extra>
            {props.allowPrettify && (
              <Button onClick={onPrettify} size="small">
                Prettify
              </Button>
            )}
            {props.extra}
          </S.Extra>
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
              tabSize: opts.tabSize,
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
