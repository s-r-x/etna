import { combineReducers } from "redux";
import httpRequest, {
  DOMAIN as REQ_DOMAIN,
} from "@/domains/http/req/root/store/slice";
import httpResponse, {
  DOMAIN as RES_DOMAIN,
} from "@/domains/http/res/store/slice";
import history, {
  DOMAIN as HISTORY_DOMAIN,
} from "@/domains/http/history/store/slice";
import codeEditor, {
  DOMAIN as CODE_EDITOR_DOMAIN,
} from "@/domains/code-editor/store/slice";
import httpRequestBody, {
  DOMAIN as REQ_BODY_DOMAIN,
} from "@/domains/http/req/body/store/slice";
import theme, { DOMAIN as THEME_DOMAIN } from "@/domains/theme/store/slice";
import socketIO, { DOMAIN as SOCKET_IO_DOMAIN } from "@socket-io/store/slice";
import { persistReducer } from "redux-persist";
import phoenix, { DOMAIN as PHOENIX_DOMAIN } from "@phoenix/store/slice";
import storage from "localforage";
import wsRaw, { DOMAIN as WS_RAW_DOMAIN } from "@/domains/ws/raw/store/slice";
import settings, {
  DOMAIN as SETTINGS_DOMAIN,
} from "@/domains/settings/store/slice";
import shortcuts, {
  DOMAIN as SHORTCUTS_DOMAIN,
} from "@/domains/shortcuts/store/slice";
import httpCodegen, {
  DOMAIN as HTTP_CODEGEN_DOMAIN,
} from "@/domains/http/req/codegen/store/slice";

const persistConfig = {
  key: "root",
  storage,
  blacklist: [
    SOCKET_IO_DOMAIN,
    REQ_DOMAIN,
    PHOENIX_DOMAIN,
    WS_RAW_DOMAIN,
    SHORTCUTS_DOMAIN,
  ],
};

const wsRawConfig = {
  key: WS_RAW_DOMAIN,
  storage,
  blacklist: ["connStatus", "logs"],
};
const shortcutsConfig = {
  key: SHORTCUTS_DOMAIN,
  storage,
  blacklist: ["editor"],
};
const socketIOConfig = {
  key: SOCKET_IO_DOMAIN,
  storage,
  blacklist: ["connStatus", "logs"],
};
const reqConfig = {
  key: REQ_DOMAIN,
  storage,
  blacklist: ["loading"],
};
const phoenixConfig = {
  key: PHOENIX_DOMAIN,
  storage,
  blacklist: ["connStatus", "logs", "channelsConnStatuses"],
};
const settingsConfig = {
  key: SETTINGS_DOMAIN,
  storage,
  blacklist: ["isOpen"],
};

const reducer = persistReducer(
  persistConfig,
  combineReducers({
    [THEME_DOMAIN]: theme,
    [HTTP_CODEGEN_DOMAIN]: httpCodegen,
    [WS_RAW_DOMAIN]: persistReducer(wsRawConfig, wsRaw),
    [REQ_DOMAIN]: persistReducer(reqConfig, httpRequest),
    [RES_DOMAIN]: httpResponse,
    [HISTORY_DOMAIN]: history,
    [CODE_EDITOR_DOMAIN]: codeEditor,
    [REQ_BODY_DOMAIN]: httpRequestBody,
    [SOCKET_IO_DOMAIN]: persistReducer(socketIOConfig, socketIO),
    [PHOENIX_DOMAIN]: persistReducer(phoenixConfig, phoenix),
    [SETTINGS_DOMAIN]: persistReducer(settingsConfig, settings),
    [SHORTCUTS_DOMAIN]: persistReducer(shortcutsConfig, shortcuts),
  })
);
export default reducer;

export type TRootState = ReturnType<typeof reducer>;
