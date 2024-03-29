import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EWsConnStatus, TWsLogItem } from "@ws/shared/typings";
import { genVoidKV } from "@/utils/kv";
import { TKeyValue } from "@/typings/keyValue";
import { TSocketIOState } from "../typings/store";

export const DOMAIN = "socketIO";

const initialState: TSocketIOState = {
  connStatus: EWsConnStatus.DISCONNECTED,
  url: "",
  tab: "message",
  path: "/socket.io",
  query: [],
  options: "{}",
  logs: [],
  headers: [],
  input: {
    event: "",
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
    addQuery(state) {
      state.query.push({
        key: "",
        value: "",
      });
    },
    changeQueryKey(
      state,
      { payload }: PayloadAction<{ id: number; key: string }>
    ) {
      state.query[payload.id].key = payload.key;
    },
    changeQueryValue(
      state,
      { payload }: PayloadAction<{ id: number; value: string }>
    ) {
      state.query[payload.id].value = payload.value;
    },
    removeQuery(state, { payload: idx }: PayloadAction<number>) {
      state.query.splice(idx, 1);
    },
    changeInputEvent(state, { payload }: PayloadAction<string>) {
      state.input.event = payload;
    },
    changeInputData(state, { payload }: PayloadAction<string>) {
      state.input.data = payload;
    },

    addHeader(state, { payload }: PayloadAction<Partial<TKeyValue> | null>) {
      if (payload) {
        state.headers.push({
          key: payload.key || "",
          value: payload.value || "",
          active: payload.active || false,
        });
      } else {
        state.headers.push(genVoidKV());
      }
    },
    changeHeaderKey(
      state,
      { payload }: PayloadAction<{ id: number; key: string }>
    ) {
      state.headers[payload.id].key = payload.key;
    },
    changeHeaderValue(
      state,
      { payload }: PayloadAction<{ id: number; value: string }>
    ) {
      state.headers[payload.id].value = payload.value;
    },
    changeHeaderActive(
      state,
      { payload }: PayloadAction<{ id: number; active: boolean }>
    ) {
      state.headers[payload.id].active = payload.active;
    },
    removeHeader(state, { payload: idx }: PayloadAction<number>) {
      state.headers.splice(idx, 1);
    },
    // TODO:: correct type
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

    changeOptions(state, { payload }: PayloadAction<string>) {
      state.options = payload;
    },
  },
});

const connect = createAction(`${DOMAIN}/connect`);
const interrupt = createAction(`${DOMAIN}/interrupt`);
const disconnect = createAction(`${DOMAIN}/disconnect`);
const sendMessage = createAction(`${DOMAIN}/sendMessage`);
const uiConnection = createAction(`${DOMAIN}/ui/connection`);
export const SocketIOActions = {
  ...slice.actions,
  connect,
  interrupt,
  disconnect,
  sendMessage,
  uiConnection,
};

export default slice.reducer;
