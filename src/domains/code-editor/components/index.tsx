// @ts-nocheck
import React, { useCallback, Suspense, useMemo } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import { connector, TConnectorProps } from "../connectors";
import { JSHINT } from "jshint";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/xml/xml";
import "codemirror/addon/lint/lint";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/lint/json-lint";
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/edit/closebrackets";
import jsonlint from "jsonlint-mod";
import DefaultMapping from "./mappings/default";
import { Spin } from "antd";
import "codemirror-graphql/hint";
import "codemirror-graphql/lint";
import "codemirror-graphql/mode";
import * as S from "./styled";
window.JSHINT = JSHINT;
window.jsonlint = jsonlint;

const VimMapping = React.lazy(() => import("./mappings/vim"));
const SublimeMapping = React.lazy(() => import("./mappings/sublime"));
const EmacsMapping = React.lazy(() => import("./mappings/emacs"));

type TProps = TConnectorProps & {
  gqlSchema?: TAnyDict;
  mode: string;
  onChange?(value: string): void;
  value: string;
  readOnly?: boolean;
  expanded?: boolean;
  extra?: React.ReactNode;
};
const CodeEditor = (props: TProps) => {
  const onChange = useCallback(
    (_editor: any, _data: any, value: string) => {
      props.onChange(value);
    },
    [props.onChange]
  );
  const Mapping = useMemo(() => {
    const map = props.keyMap;
    switch (map) {
      case "vim":
        return VimMapping;
      case "sublime":
        return SublimeMapping;
      case "emacs":
        return EmacsMapping;
      default:
        return DefaultMapping;
    }
  }, [props.keyMap]);
  const isGraphql = props.mode === "graphql";
  return (
    <>
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
                lineWrapping: props.lineWrapping,
                matchBrackets: true,
                autoCloseBrackets: props.autoCloseBrackets,
                keyMap: props.keyMap,
                tabSize: props.tabSize,
                mode: props.mode,
                theme: props.theme,
                lineNumbers: props.lineNumbers,
                readOnly: props.readOnly,
              }}
              onBeforeChange={onChange}
            />
          </S.Container>
        </Mapping>
      </Suspense>
    </>
  );
};

export default connector(CodeEditor);
