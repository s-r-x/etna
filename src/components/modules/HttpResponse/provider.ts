import { HttpRequestSelectors as ReqSelectors } from "@/store/httpRequest/selectors";
import { HttpResponseSelectors as ResSelectors } from "@/store/httpResponse/selectors";
import { connect, ConnectedProps } from "react-redux";
import { TRootState } from "@/store/rootReducer";
import { makeRequest, cancelRequest } from "@/store/httpRequest/slice";
import {
  toggleEditorExpanded,
  changeCategory,
  changeEditorFormat,
} from "@/store/httpResponse/slice";

const mSp = (state: TRootState) => ({
  category: ResSelectors.getCategory(state),
  editorOpts: ResSelectors.getEditorOpts(state),
  loading: ReqSelectors.getLoading(state),
  prettyBody: ResSelectors.getPrettyBody(state),
  rawBody: ResSelectors.getRawBody(state),
  response: ResSelectors.getResponse(state),
  responseSize: ResSelectors.getResponseSize(state),
  responseType: ResSelectors.getResponseContentType(state),
  filename: ResSelectors.getFilename(state),
  headers: ResSelectors.getHeaders(state),
  isPrettyBodySupported: ResSelectors.isPrettyBodySupported(state),
  isImage: ResSelectors.isImage(state),
});
const mDp = {
  cancelRequest,
  changeCategory,
  makeRequest,
  toggleEditorExpanded,
  changeEditorFormat,
};

export const provide = connect(mSp, mDp);
export type TProviderProps = ConnectedProps<typeof provide>;
