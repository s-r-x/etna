import { HttpRequestSelectors as Selectors } from "@/store/httpRequest/selectors";
import { connect, ConnectedProps } from "react-redux";
import { TRootState } from "@/store/rootReducer";
import { changeBody, changeBodyMIME } from "@/store/httpRequest/slice";

const mSp = (state: TRootState) => ({
  headers: Selectors.getHeaders(state),
  body: Selectors.getBody(state),
  bodyMIME: Selectors.getBodyMIME(state),
});
const mDp = {
  changeBody,
  changeBodyMIME,
};

export const provide = connect(mSp, mDp);
export type TProviderProps = ConnectedProps<typeof provide>;
