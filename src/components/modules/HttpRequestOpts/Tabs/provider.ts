import { HttpRequestSelectors as Selectors } from "@/store/httpRequest/selectors";
import { connect, ConnectedProps } from "react-redux";
import { TRootState } from "@/store/rootReducer";
import { changeActiveOptsEditor } from "@/store/httpRequest/slice";

const mSp = (state: TRootState) => ({
  active: Selectors.getActiveOptsEditor(state),
  headersLength: Selectors.getHeadersLength(state),
  queryLength: Selectors.getQueryLength(state),
});
const mDp = {
  onChange: changeActiveOptsEditor,
};

export const provide = connect(mSp, mDp);
export type TProviderProps = ConnectedProps<typeof provide>;
