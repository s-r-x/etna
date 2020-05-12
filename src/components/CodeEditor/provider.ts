import { CodeEditorSelectors as Selectors } from "@/store/codeEditor/selectors";
import { connect, ConnectedProps } from "react-redux";
import { TRootState } from "@/store/rootReducer";

const mSp = (state: TRootState) => ({
  tabSize: Selectors.getTabSize(state),
  theme: Selectors.getTheme(state),
  keyMap: Selectors.getKeyMap(state),
  lineNumbers: Selectors.getLineNumbers(state),
  lineWrapping: Selectors.getLineWrapping(state),
});

export const provide = connect(mSp);
export type TProviderProps = ConnectedProps<typeof provide>;
