import { TRootState } from "@/store/rootReducer";
import { createSelector } from "@reduxjs/toolkit";

const getTabSize = (state: TRootState) => state.codeEditor.tabSize;
const getTheme = (state: TRootState) => state.codeEditor.theme;
const getKeyMap = (state: TRootState) => state.codeEditor.keyMap;
const getLineNumbers = (state: TRootState) => state.codeEditor.lineNumbers;
const getLineWrapping = (state: TRootState) => state.codeEditor.lineWrapping;
const getOptions = createSelector(
  getTabSize,
  getTheme,
  getKeyMap,
  getLineNumbers,
  getLineWrapping,
  (tabSize, theme, keyMap, lineNumbers, lineWrapping) => ({
    tabSize,
    theme,
    keyMap,
    lineNumbers,
    lineWrapping,
  })
);

export const CodeEditorSelectors = {
  getKeyMap,
  getLineNumbers,
  getLineWrapping,
  getOptions,
  getTabSize,
  getTheme,
};
