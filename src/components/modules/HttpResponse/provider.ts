import { HttpRequestSelectors as Selectors } from "@/store/httpRequest/selectors";
import { connect, ConnectedProps } from "react-redux";
import { TRootState } from "@/store/rootReducer";

const mSp = (state: TRootState) => ({
  loading: Selectors.getLoading(state),
  response: Selectors.getResponse(state),
  responseSize: Selectors.getResponseSize(state),
  rawBody: Selectors.getRawResponseBody(state),
});

export const provide = connect(mSp);
export type TProviderProps = ConnectedProps<typeof provide>;
