import { DOMAIN } from "./slice";
import { TRootState } from "@/store/rootReducer";
import { createStructuredSelector } from "reselect";

const getTabSize = (state: TRootState) => state[DOMAIN].tabSize;
const getTheme = (state: TRootState) => state[DOMAIN].theme;
const getKeyMap = (state: TRootState) => state[DOMAIN].keyMap;
const getLineNumbers = (state: TRootState) => state[DOMAIN].lineNumbers;
const getAutoCloseBrackets = (state: TRootState) =>
  state[DOMAIN].autoCloseBrackets;
const getLineWrapping = (state: TRootState) => state[DOMAIN].lineWrapping;
const getOptions = createStructuredSelector({
  tabSize: getTabSize,
  theme: getTheme,
  keyMap: getKeyMap,
  lineNumbers: getLineNumbers,
  lineWrapping: getLineWrapping,
  autoCloseBrackets: getAutoCloseBrackets,
});

export const CodeEditorSelectors = {
  getAutoCloseBrackets,
  getKeyMap,
  getLineNumbers,
  getLineWrapping,
  getOptions,
  getTabSize,
  getTheme,
};
