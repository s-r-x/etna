import { HttpRequestSelectors as Selectors } from "@/store/httpRequest/selectors";
import { connect, ConnectedProps } from "react-redux";
import { TRootState } from "@/store/rootReducer";
import {
  changeMethod,
  changeUrl,
  makeRequest,
} from "@/store/httpRequest/slice";

const mSp = (state: TRootState) => ({
  method: Selectors.getMethod(state),
  url: Selectors.getUrl(state),
  loading: Selectors.getLoading(state),
});
const mDp = {
  changeMethod,
  changeUrl,
  makeRequest,
};

export const provide = connect(mSp, mDp);
export type TProviderProps = ConnectedProps<typeof provide>;
