import { DOMAIN } from "./slice";
import { TRootState as State } from "@/store/rootReducer";
import { createStructuredSelector } from "reselect";

const $ = (state: State) => state[DOMAIN];
const getTabSize = (state: State) => $(state).tabSize;
const getTheme = (state: State) => $(state).theme;
const getKeyMap = (state: State) => $(state).keyMap;
const getLineNumbers = (state: State) => $(state).lineNumbers;
const getAutoCloseBrackets = (state: State) => $(state).autoCloseBrackets;
const getLineWrapping = (state: State) => $(state).lineWrapping;
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
