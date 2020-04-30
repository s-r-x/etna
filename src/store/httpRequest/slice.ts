import { createSlice, createAction, PayloadAction } from "@reduxjs/toolkit";
import { THTTPMethod, THTTPBodyMIME } from "@/typings/http";
import { UUID } from "@/utils/uuid";
import { TOptsKey, TState, TAuthStrategy } from "@/typings/store/httpRequest";
import { TKeyValue } from "@/typings/keyValue";

export const DOMAIN = "httpRequest";

const genVoidHeader = (): TKeyValue => ({
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
    bodyMime: "application/json",
    bodyText: "",
    bodyKV: [],
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
    changeBodyText(state, { payload }: PayloadAction<string>) {
      state.bodyText = payload;
    },
    changeBodyKVKey(
      state,
      { payload }: PayloadAction<{ id: number; key: string }>
    ) {
      state.bodyKV[payload.id].key = payload.key;
    },
    changeBodyKVValue(
      state,
      { payload }: PayloadAction<{ id: number; value: string }>
    ) {
      state.bodyKV[payload.id].value = payload.value;
    },
    changeBodyKVActive(
      state,
      { payload }: PayloadAction<{ id: number; active: boolean }>
    ) {
      state.bodyKV[payload.id].active = payload.active;
    },
    removeBodyKV(state, { payload: id }: PayloadAction<number>) {
      state.bodyKV.splice(id, 1);
    },
    changeBodyMIME(state, { payload }: PayloadAction<THTTPBodyMIME>) {
      state.bodyMime = payload;
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
  changeBodyText,
  changeBodyKVActive,
  changeBodyKVKey,
  changeBodyKVValue,
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
  removeBodyKV,
  removeHeader,
} = slice.actions;

export default slice.reducer;
