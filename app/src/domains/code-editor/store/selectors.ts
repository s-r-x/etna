import { DOMAIN } from "./slice";
import { TRootState as State } from "@/store/rootReducer";
import { createStructuredSelector } from "reselect";

const root = (state: State) => state[DOMAIN];
const getTabSize = (state: State) => root(state).tabSize;
const getTheme = (state: State) => root(state).theme;
const getKeyMap = (state: State) => root(state).keyMap;
const getLineNumbers = (state: State) => root(state).lineNumbers;
const getAutoCloseBrackets = (state: State) =>
  root(state).autoCloseBrackets;
const getLineWrapping = (state: State) => root(state).lineWrapping;
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
