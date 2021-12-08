import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EWsConnStatus, TWsLogItem } from "@ws/shared/typings";
import { TWsRawState } from "../typings/store";

export const DOMAIN = "wsRaw";

const initialState: TWsRawState = {
  connStatus: EWsConnStatus.DISCONNECTED,
  url: "",
  tab: "message",
  path: "/socket.io",
  logs: [],
  protocols: [],
  input: {
    data: "",
    mode: "application/json",
  },
};

const slice = createSlice({
  name: DOMAIN,
  initialState,
  reducers: {
    changeTab(state, { payload }: PayloadAction<string>) {
      state.tab = payload;
    },
    changeUrl(state, { payload }: PayloadAction<string>) {
      state.url = payload;
    },
    changeInputData(state, { payload }: PayloadAction<string>) {
      state.input.data = payload;
    },

    addProtocol(state) {
      state.protocols.push("");
    },
    changeProtocol(
      state,
      { payload }: PayloadAction<{ id: number; value: string }>
    ) {
      state.protocols[payload.id] = payload.value;
    },
    removeProtocol(state, { payload: idx }: PayloadAction<number>) {
      state.protocols.splice(idx, 1);
    },
    changeInputMode(state, { payload }: PayloadAction<any>) {
      state.input.mode = payload;
    },
    changePath(state, { payload }: PayloadAction<string>) {
      state.path = payload;
    },
    log(state, { payload }: PayloadAction<TWsLogItem>) {
      state.logs.push(payload);
    },
    clearLogs(state) {
      state.logs = [];
    },
    changeConnStatus(state, { payload }: PayloadAction<EWsConnStatus>) {
      state.connStatus = payload;
    },
  },
});

const connect = createAction(`${DOMAIN}/connect`);
const interrupt = createAction(`${DOMAIN}/interrupt`);
const disconnect = createAction(`${DOMAIN}/disconnect`);
const sendMessage = createAction(`${DOMAIN}/sendMessage`);
const uiConnection = createAction(`${DOMAIN}/ui/connection`);
export const WsRawActions = {
  ...slice.actions,
  connect,
  interrupt,
  disconnect,
  sendMessage,
  uiConnection,
};

export default slice.reducer;
