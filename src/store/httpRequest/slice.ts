import { createSlice, createAction, PayloadAction } from "@reduxjs/toolkit";
import { THTTPMethod, THTTPBodyMIME } from "@/typings/http";
import { UUID } from "@/utils/uuid";
import { TOptsKey, TState, TAuthStrategy } from "@/typings/store/httpRequest";
import { TKeyValue } from "@/typings/keyValue";
import { TResponse } from "@/typings/httpClient";
import { URLUtils } from "@/utils/url";

export const DOMAIN = "httpRequest";

const genVoidKV = (): TKeyValue => ({
  id: UUID.gen(),
  active: true,
  key: "",
  value: "",
});

const slice = createSlice({
  name: DOMAIN,
  initialState: {
    url: "",
    query: [],
    method: "GET",
    headers: [genVoidKV()],
    activeOptsEditor: "headers",
    bodyMime: "application/json",
    bodyText: "",
    bodyKV: [genVoidKV()],
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
    loadingSuccess(state, { payload }: PayloadAction<TResponse>) {
      state.response = payload;
      state.loading = false;
    },
    loadingError(state) {
      state.loading = false;
    },
    addHeader(state) {
      state.headers.push(genVoidKV());
    },
    addBodyKV(state) {
      state.bodyKV.push(genVoidKV());
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

    changeMethod(state, { payload }: PayloadAction<THTTPMethod>) {
      state.method = payload;
    },
    changeUrl(state, { payload }: PayloadAction<string>) {
      state.url = payload;
      // we probably should move query parsing to webworker or something
      const search = URLUtils.extractSearch(payload);
      if (search) {
        state.query = URLUtils.parseSearchAsArray(search);
      } else {
        state.query = [];
      }
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
    removeBodyKV(state, { payload: idx }: PayloadAction<number>) {
      state.bodyKV.splice(idx, 1);
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
  addBodyKV,
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
