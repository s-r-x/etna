import { combineReducers } from "redux";
import httpRequest, {
  DOMAIN as REQ_DOMAIN,
} from "@/domains/http-request/store/slice";
import httpResponse, {
  DOMAIN as RES_DOMAIN,
} from "@/domains/http-response/store/slice";
import history, {
  DOMAIN as HISTORY_DOMAIN,
} from "@/domains/http-request-history/store/slice";
import codeEditor, {
  DOMAIN as CODE_EDITOR_DOMAIN,
} from "@/domains/code-editor/store/slice";

const reducer = combineReducers({
  [REQ_DOMAIN]: httpRequest,
  [RES_DOMAIN]: httpResponse,
  [HISTORY_DOMAIN]: history,
  [CODE_EDITOR_DOMAIN]: codeEditor,
});
export default reducer;

export type TRootState = ReturnType<typeof reducer>;
