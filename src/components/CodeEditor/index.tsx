import React, { useCallback } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import { TCodeEditorMode } from "@/typings/codeEditor";
import { provide, TProviderProps } from "./provider";
require("codemirror/mode/javascript/javascript");
require("codemirror/mode/xml/xml");
require("codemirror/keymap/vim");

type TProps = TProviderProps & {
  mode: TCodeEditorMode;
  onChange(value: string): void;
  value: string;
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
      value={props.value}
      options={{
        keyMap: props.keyMap,
        tabSize: props.tabSize,
        mode: props.mode,
        theme: props.theme,
        lineNumbers: true,
      }}
      onBeforeChange={onChange}
    />
  );
};

export default provide(CodeEditor);
