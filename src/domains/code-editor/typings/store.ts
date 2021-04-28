import { TCodeEditorKeyMap, TCodeEditorTheme, TCodeEditorTabSize } from "./";

export type TState = {
  keyMap: TCodeEditorKeyMap;
  theme: TCodeEditorTheme;
  tabSize: TCodeEditorTabSize;
  autoCloseBrackets: boolean;
  lineNumbers: boolean;
  lineWrapping: boolean;
};
