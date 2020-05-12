import { connect, ConnectedProps } from "react-redux";
import { CodeEditorSelectors } from "@/store/codeEditor/selectors";
import { TRootState } from "@/store/rootReducer";
import {
  changeKeyMap,
  changeTabSize,
  changeTheme,
  toggleLineNumbers,
  toggleLineWrap,
} from "@/store/codeEditor/slice";

const mSp = (state: TRootState) => ({
  form: CodeEditorSelectors.getOptions(state),
});
const mDp = {
  changeKeyMap,
  changeTabSize,
  changeTheme,
  toggleLineNumbers,
  toggleLineWrap,
};

export const provide = connect(mSp, mDp);
export type TProviderProps = ConnectedProps<typeof provide>;
