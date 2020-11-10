import { createSlice, createAction, PayloadAction } from "@reduxjs/toolkit";
import { THTTPMethod, THTTPBodyMIME } from "@/typings/http";
import {
  TOptsKey,
  TState,
  TAuthStrategy,
  TQuery,
  TRestoreParams,
  TRequestSettings,
} from "@/typings/store/httpRequest";
import { TKeyValue } from "@/typings/keyValue";
import _ from "lodash";

export const DOMAIN = "httpRequest";

const genVoidKV = (): TKeyValue => ({
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
    headers: [
      {
        key: "Content-Type",
        value: "application/json",
        active: true,
      },
    ],
    settings: {
      expectBinary: false,
      useProxy: true,
    },
    activeOptsEditor: "headers",
    bodyMime: "application/json",
    bodyText: "",
    bodyKV: [genVoidKV()],
    loading: false,
    auth: {
      strategy: "none",
      data: {
        basic: {
          username: "",
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
    loadingEnd(state) {
      state.loading = false;
    },
    addHeader(state, { payload }: PayloadAction<Partial<TKeyValue>>) {
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
    addBodyKV(state) {
      state.bodyKV.push(genVoidKV());
    },
    addQuery(state) {
      state.query.push({
        key: "",
        value: "",
      });
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
    },
    _changeUrlWithoutTouchingQuery(state, { payload }: PayloadAction<string>) {
      state.url = payload;
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
    updateBasicAuthForm(state, { payload }: PayloadAction<TStringDict>) {
      _.merge(state.auth.data.basic, payload);
    },
    setQuery(state, { payload }: PayloadAction<TQuery[]>) {
      state.query = payload;
    },
    restoreRequest(state, { payload }: PayloadAction<TRestoreParams>) {
      state.method = payload.method;
      state.url = payload.url;
    },
    updateSettings(
      state,
      { payload }: PayloadAction<Partial<TRequestSettings>>
    ) {
      _.merge(state.settings, payload);
    },
  },
});

export const makeRequest = createAction(`${DOMAIN}/makeRequest`);
export const cancelRequest = createAction(`${DOMAIN}/cancelRequest`);
export const {
  addBodyKV,
  addHeader,
  addQuery,
  changeActiveOptsEditor,
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
  changeQueryKey,
  changeQueryValue,
  changeUrl,
  _changeUrlWithoutTouchingQuery,
  loadingEnd,
  loadingStart,
  removeBodyKV,
  removeHeader,
  removeQuery,
  restoreRequest,
  setQuery,
  updateBasicAuthForm,
  updateSettings,
} = slice.actions;

export default slice.reducer;
