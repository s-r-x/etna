import { HttpRequestSelectors as ReqSelectors } from "@/domains/http-req/Root/store/selectors";
import { HttpResponseSelectors as ResSelectors } from "../store/selectors";
import { connect, ConnectedProps } from "react-redux";
import { TRootState } from "@/store/rootReducer";
import { HttpReqActions } from "@/domains/http-req/Root/store/slice";
import {
  changeCategory,
  changeEditorFormat,
} from "@/domains/http-res/store/slice";

export const connector = connect(
  (state: TRootState) => ({
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
    isPdf: ResSelectors.isPdf(state),
  }),
  {
    cancelRequest: HttpReqActions.cancelRequest,
    changeCategory,
    makeRequest: HttpReqActions.makeRequest,
    changeEditorFormat,
  }
);
export type TConnectorProps = ConnectedProps<typeof connector>;
