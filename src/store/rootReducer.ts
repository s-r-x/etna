import { combineReducers } from "redux";
import httpRequest, {
  DOMAIN as REQ_DOMAIN,
} from "@/domains/http-req/store/slice";
import httpResponse, {
  DOMAIN as RES_DOMAIN,
} from "@/domains/http-res/store/slice";
import history, {
  DOMAIN as HISTORY_DOMAIN,
} from "@/domains/http-req-history/store/slice";
import codeEditor, {
  DOMAIN as CODE_EDITOR_DOMAIN,
} from "@/domains/code-editor/store/slice";
import httpRequestBody, {
  DOMAIN as REQ_BODY_DOMAIN,
} from "@/domains/http-req-body/store/slice";
import theme, { DOMAIN as THEME_DOMAIN } from "@/domains/theme/store/slice";
import ws, { DOMAIN as WS_DOMAIN } from "@/domains/ws/store/slice";

const reducer = combineReducers({
  [THEME_DOMAIN]: theme,
  [REQ_DOMAIN]: httpRequest,
  [RES_DOMAIN]: httpResponse,
  [HISTORY_DOMAIN]: history,
  [CODE_EDITOR_DOMAIN]: codeEditor,
  [REQ_BODY_DOMAIN]: httpRequestBody,
  [WS_DOMAIN]: ws,
});
export default reducer;

export type TRootState = ReturnType<typeof reducer>;
