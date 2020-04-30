import { createSlice, createAction, PayloadAction } from "@reduxjs/toolkit";
import { THTTPMethod, THTTPBodyMIME } from "@/typings/http";
import { UUID } from "@/utils/uuid";
import {
  TOptsKey,
  TState,
  THeader,
  TAuthStrategy,
} from "@/typings/store/httpRequest";

export const DOMAIN = "httpRequest";

const genVoidHeader = (): THeader => ({
  id: UUID.gen(),
  active: true,
  key: "",
  value: "",
});

const slice = createSlice({
  name: DOMAIN,
  initialState: {
    url: "",
    method: "GET",
    headers: [genVoidHeader()],
    activeOptsEditor: "headers",
    body: {
      mime: "application/json",
      raw: true,
      content: "",
    },
    loading: false,
    auth: {
      strategy: "none",
      data: {
        basic: {
          user: "",
          password: "",
        },
        bearer_token: {
          token: "",
        },
      },
    },
  } as TState,
  reducers: {
    loadingStart(state) {
      state.loading = true;
    },
    loadingSuccess(state) {
      state.loading = false;
    },
    loadingError(state) {
      state.loading = false;
    },
    addHeader(state) {
      state.headers.push(genVoidHeader());
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
    removeHeader(state, { payload: id }: PayloadAction<number>) {
      state.headers.splice(id, 1);
    },

    changeMethod(state, { payload }: PayloadAction<THTTPMethod>) {
      state.method = payload;
    },
    changeUrl(state, { payload }: PayloadAction<string>) {
      state.url = payload;
    },
    changeBody(state, { payload }: PayloadAction<string>) {
      state.body.content = payload;
    },
    changeBodyMIME(state, { payload }: PayloadAction<THTTPBodyMIME>) {
      state.body.mime = payload;
    },
    toggleBodyInputStrategy(state) {
      state.body.raw = !state.body.raw;
    },
    changeActiveOptsEditor(state, { payload }: PayloadAction<TOptsKey>) {
      state.activeOptsEditor = payload;
    },
    changeAuthStrategy(state, { payload }: PayloadAction<TAuthStrategy>) {
      state.auth.strategy = payload;
    },
  },
});

export const makeRequest = createAction(`${DOMAIN}/makeRequest`);
export const {
  addHeader,
  changeAuthStrategy,
  changeBody,
  changeBodyMIME,
  changeHeaderKey,
  changeHeaderValue,
  changeHeaderActive,
  changeMethod,
  changeUrl,
  changeActiveOptsEditor,
  loadingError,
  loadingStart,
  loadingSuccess,
  removeHeader,
} = slice.actions;

export default slice.reducer;
