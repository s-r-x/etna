import { HttpRequestSelectors as Selectors } from "@/store/httpRequest/selectors";
import { connect, ConnectedProps } from "react-redux";
import { TRootState } from "@/store/rootReducer";
import {
  addHeader,
  changeHeaderValue,
  changeHeaderKey,
  changeHeaderActive,
  removeHeader,
} from "@/store/httpRequest/slice";

const mSp = (state: TRootState) => ({
  headers: Selectors.getHeaders(state),
});
const mDp = {
  addHeader,
  changeHeaderValue,
  changeHeaderKey,
  changeHeaderActive,
  removeHeader,
};

export const provide = connect(mSp, mDp);
export type TProviderProps = ConnectedProps<typeof provide>;
