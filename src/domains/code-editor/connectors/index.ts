import { CodeEditorSelectors as Selectors } from "../store/selectors";
import { connect, ConnectedProps } from "react-redux";
import { TRootState } from "@/store/rootReducer";

export const connector = connect((state: TRootState) => ({
  tabSize: Selectors.getTabSize(state),
  theme: Selectors.getTheme(state),
  keyMap: Selectors.getKeyMap(state),
  lineNumbers: Selectors.getLineNumbers(state),
  lineWrapping: Selectors.getLineWrapping(state),
  autoCloseBrackets: Selectors.getAutoCloseBrackets(state),
}));
export type TConnectorProps = ConnectedProps<typeof connector>;
