import { DOMAIN } from "./slice";
import { TRootState } from "@/store/rootReducer";
import { createSelector } from "@reduxjs/toolkit";

const getTabSize = (state: TRootState) => state[DOMAIN].tabSize;
const getTheme = (state: TRootState) => state[DOMAIN].theme;
const getKeyMap = (state: TRootState) => state[DOMAIN].keyMap;
const getLineNumbers = (state: TRootState) => state[DOMAIN].lineNumbers;
const getLineWrapping = (state: TRootState) => state[DOMAIN].lineWrapping;
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
