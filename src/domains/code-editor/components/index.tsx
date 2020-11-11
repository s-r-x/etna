import React, { useCallback, Suspense, useMemo } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import { connector, TConnectorProps } from "../connectors";
// @ts-ignore
import { JSHINT } from "jshint";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/xml/xml";
import "codemirror/addon/lint/lint";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/lint/json-lint";
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/edit/closebrackets";
// @ts-ignore
import jsonlint from "jsonlint-mod";
import cn from "classnames";
import cls from "./index.less";
import DefaultMapping from "./mappings/default";
import { Spin } from "antd";
// @ts-ignore
window.JSHINT = JSHINT;
// @ts-ignore
window.jsonlint = jsonlint;

const VimMapping = React.lazy(() => import("./mappings/vim"));
const SublimeMapping = React.lazy(() => import("./mappings/sublime"));
const EmacsMapping = React.lazy(() => import("./mappings/emacs"));

type TProps = TConnectorProps & {
  mode: string;
  onChange?(value: string): void;
  value: string;
  readOnly?: boolean;
  expanded?: boolean;
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
  return (
    <>
      <Suspense fallback={<Spin size="large" />}>
        <Mapping>
          <CodeMirror
            className={cn(props.expanded && cls.expanded)}
            value={props.value}
            options={{
              gutters: ["CodeMirror-lint-markers"],
              lint: true,
              lineWrapping: props.lineWrapping,
              viewportMargin: props.expanded ? Infinity : 10,
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
        </Mapping>
      </Suspense>
    </>
  );
};

export default connector(CodeEditor);
