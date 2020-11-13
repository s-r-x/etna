import { HttpRequestSelectors as ReqSelectors } from "@/domains/http-request/store/selectors";
import { HttpResponseSelectors as ResSelectors } from "../store/selectors";
import { connect, ConnectedProps } from "react-redux";
import { TRootState } from "@/store/rootReducer";
import { makeRequest, cancelRequest } from "@/domains/http-request/store/slice";
import {
  toggleEditorExpanded,
  changeCategory,
  changeEditorFormat,
} from "@/domains/http-response/store/slice";

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
    cancelRequest,
    changeCategory,
    makeRequest,
    toggleEditorExpanded,
    changeEditorFormat,
  }
);
export type TConnectorProps = ConnectedProps<typeof connector>;