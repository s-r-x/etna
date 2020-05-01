import { HttpRequestSelectors as Selectors } from "@/store/httpRequest/selectors";
import { connect, ConnectedProps } from "react-redux";
import { TRootState } from "@/store/rootReducer";
import { makeRequest } from "@/store/httpRequest/slice";

const mSp = (state: TRootState) => ({
  loading: Selectors.getLoading(state),
  response: Selectors.getResponse(state),
  responseSize: Selectors.getResponseSize(state),
  responseType: Selectors.getResponseContentType(state),
});
const mDp = {
  makeRequest,
};

export const provide = connect(mSp, mDp);
export type TProviderProps = ConnectedProps<typeof provide>;
