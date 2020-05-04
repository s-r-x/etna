import { HttpRequestSelectors as ReqSelectors } from "@/store/httpRequest/selectors";
import { HttpResponseSelectors as ResSelectors } from "@/store/httpResponse/selectors";
import { connect, ConnectedProps } from "react-redux";
import { TRootState } from "@/store/rootReducer";
import { makeRequest } from "@/store/httpRequest/slice";
import {
  toggleEditorExpanded,
  changeCategory,
} from "@/store/httpResponse/slice";

const mSp = (state: TRootState) => ({
  loading: ReqSelectors.getLoading(state),
  response: ResSelectors.getResponse(state),
  responseSize: ResSelectors.getResponseSize(state),
  responseType: ResSelectors.getResponseContentType(state),
  editorOpts: ResSelectors.getEditorOpts(state),
  rawBody: ResSelectors.getRawBody(state),
  prettyBody: ResSelectors.getPrettyBody(state),
  category: ResSelectors.getCategory(state),
});
const mDp = {
  makeRequest,
  toggleEditorExpanded,
  changeCategory,
};

export const provide = connect(mSp, mDp);
export type TProviderProps = ConnectedProps<typeof provide>;
