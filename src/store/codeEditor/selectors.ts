import { TRootState } from "@/store/rootReducer";

const getTabSize = (state: TRootState) => state.codeEditor.tabSize;
const getTheme = (state: TRootState) => state.codeEditor.theme;
const getKeyMap = (state: TRootState) => state.codeEditor.keyMap;

export const CodeEditorSelectors = {
  getTabSize,
  getTheme,
  getKeyMap,
};
