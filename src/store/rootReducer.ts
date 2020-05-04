import { combineReducers } from "redux";
import counter from "./counter/slice";
import history from "./history/slice";
import httpRequest from "./httpRequest/slice";
import httpResponse from "./httpResponse/slice";
import codeEditor from "./codeEditor/slice";

const reducer = combineReducers({
  codeEditor,
  counter,
  history,
  httpRequest,
  httpResponse,
});
export default reducer;

export type TRootState = ReturnType<typeof reducer>;
