import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TWsLogItem } from "@ws/shared/typings/store";
import { genVoidKV } from "@/utils/kv";
import { TKeyValue } from "@/typings/keyValue";
import { TSocketIOState } from "../typings/store";

export const DOMAIN = "socketIO";

const initialState: TSocketIOState = {
  connected: false,
  url: "",
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
    changeConnectStatus(state, { payload }: PayloadAction<boolean>) {
      state.connected = payload;
    },
    changeOptions(state, { payload }: PayloadAction<string>) {
      state.options = payload;
    },
  },
});

const connect = createAction(`${DOMAIN}/connect`);
const disconnect = createAction(`${DOMAIN}/disconnect`);
const sendMessage = createAction(`${DOMAIN}/sendMessage`);
export const SocketIOActions = {
  ...slice.actions,
  connect,
  disconnect,
  sendMessage,
};

export default slice.reducer;
