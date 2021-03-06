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
import socketIO, {
  DOMAIN as SOCKET_IO_DOMAIN,
} from "@/domains/ws/store/SocketIO/slice";
import { persistReducer } from "redux-persist";
import phoenix, {
  DOMAIN as PHOENIX_DOMAIN,
} from "@/domains/ws/store/Phoenix/slice";
import storage from "localforage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: [SOCKET_IO_DOMAIN, REQ_DOMAIN, PHOENIX_DOMAIN],
};

const socketIOConfig = {
  key: SOCKET_IO_DOMAIN,
  storage,
  blacklist: ["connected"],
};
const reqConfig = {
  key: REQ_DOMAIN,
  storage,
  blacklist: ["loading"],
};
const phoenixConfig = {
  key: PHOENIX_DOMAIN,
  storage,
  blacklist: ["loading"],
};

const reducer = persistReducer(
  persistConfig,
  combineReducers({
    [THEME_DOMAIN]: theme,
    [REQ_DOMAIN]: persistReducer(reqConfig, httpRequest),
    [RES_DOMAIN]: httpResponse,
    [HISTORY_DOMAIN]: history,
    [CODE_EDITOR_DOMAIN]: codeEditor,
    [REQ_BODY_DOMAIN]: httpRequestBody,
    [WS_DOMAIN]: ws,
    [SOCKET_IO_DOMAIN]: persistReducer(socketIOConfig, socketIO),
    [PHOENIX_DOMAIN]: persistReducer(phoenixConfig, phoenix),
  })
);
export default reducer;

export type TRootState = ReturnType<typeof reducer>;
