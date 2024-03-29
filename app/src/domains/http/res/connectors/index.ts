import { HttpRequestSelectors as ReqSelectors } from "@/domains/http/req/root/store/selectors";
import { HttpResponseSelectors as ResSelectors } from "../store/selectors";
import { connect, ConnectedProps } from "react-redux";
import { HttpReqActions } from "@/domains/http/req/root/store/slice";
import { HttpResActions as Actions } from "@/domains/http/res/store/slice";

export const connector = connect(
  state => ({
    hasResponse: ResSelectors.hasResponse(state),
    category: ResSelectors.getCategory(state),
    editorOpts: ResSelectors.getEditorOpts(state),
    loading: ReqSelectors.getLoading(state),
    prettyBody: ResSelectors.getPrettyBody(state),
    rawBody: ResSelectors.getRawBody(state),
    responseType: ResSelectors.getResponseContentType(state),
    filename: ResSelectors.getFilename(state),
    headers: ResSelectors.getHeaders(state),
    isPrettyBodySupported: ResSelectors.isPrettyBodySupported(state),
    isImage: ResSelectors.isImage(state),
    isVideo: ResSelectors.isVideo(state),
    isBinary: ResSelectors.isBinary(state),
    isSvg: ResSelectors.isSvg(state),
    isPdf: ResSelectors.isPdf(state),
  }),
  {
    cancelRequest: HttpReqActions.cancelRequest,
    changeCategory: Actions.changeCategory,
    makeRequest: HttpReqActions.makeRequest,
    changeEditorFormat: Actions.changeEditorFormat,
  }
);
export type TConnectorProps = ConnectedProps<typeof connector>;
