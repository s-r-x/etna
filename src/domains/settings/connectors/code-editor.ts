import { connect, ConnectedProps } from "react-redux";
import { CodeEditorSelectors } from "@/domains/code-editor/store/selectors";
import { TRootState } from "@/store/rootReducer";
import {
  changeKeyMap,
  changeTabSize,
  changeTheme,
  toggleLineNumbers,
  toggleLineWrap,
} from "@/domains/code-editor/store/slice";

export const connector = connect(
  (state: TRootState) => ({
    form: CodeEditorSelectors.getOptions(state),
  }),
  {
    changeKeyMap,
    changeTabSize,
    changeTheme,
    toggleLineNumbers,
    toggleLineWrap,
  }
);
export type TConnectorProps = ConnectedProps<typeof connector>;
