import {
  TCodeEditorKeyMap,
  TCodeEditorTheme,
  TCodeEditorTabSize,
} from "../codeEditor";

export type TState = {
  keyMap: TCodeEditorKeyMap;
  theme: TCodeEditorTheme;
  tabSize: TCodeEditorTabSize;
};
