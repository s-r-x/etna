import { combineReducers } from "redux";
import counter from "./counter/slice";
import history from "./history/slice";
import httpRequest from './httpRequest/slice';

const reducer = combineReducers({
  counter,
  history,
  httpRequest,
});
export default reducer;

export type TRootState = ReturnType<typeof reducer>;
