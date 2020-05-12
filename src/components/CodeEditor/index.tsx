import React, { useCallback, Suspense, useMemo } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import { provide, TProviderProps } from "./provider";
require("codemirror/mode/javascript/javascript");
require("codemirror/mode/xml/xml");
import cn from "classnames";
import cls from "./index.less";
import DefaultMapping from "./mappings/default";
import { Spin } from "antd";

const VimMapping = React.lazy(() => import("./mappings/vim"));
const SublimeMapping = React.lazy(() => import("./mappings/sublime"));
const EmacsMapping = React.lazy(() => import("./mappings/emacs"));

type TProps = TProviderProps & {
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
              lineWrapping: props.lineWrapping,
              viewportMargin: props.expanded ? Infinity : 10,
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

export default provide(CodeEditor);
