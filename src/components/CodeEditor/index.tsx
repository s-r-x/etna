import React, { useCallback } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import { provide, TProviderProps } from "./provider";
require("codemirror/mode/javascript/javascript");
require("codemirror/mode/xml/xml");
require("codemirror/keymap/vim");
import cn from "classnames";
import cls from "./index.less";

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
  return (
    <CodeMirror
      className={cn(props.expanded && cls.expanded)}
      value={props.value}
      options={{
        viewportMargin: props.expanded ? Infinity : 10,
        keyMap: props.keyMap,
        tabSize: props.tabSize,
        mode: props.mode,
        theme: props.theme,
        lineNumbers: true,
        readOnly: props.readOnly,
      }}
      onBeforeChange={onChange}
    />
  );
};

export default provide(CodeEditor);
