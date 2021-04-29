import { createSlice, createAction, PayloadAction } from "@reduxjs/toolkit";
import { TOptsKey, TState } from "../typings/store";
import _ from "lodash";
import { genVoidKV } from "@/utils/kv";
import {
  TAddHeaderDto,
  TChangeAuthStrategyDto,
  TChangeHeaderActiveDto,
  TChangeHeaderKeyDto,
  TChangeHeaderValueDto,
  TChangeMethodDto,
  TChangeUrlDto,
  TRemoveHeaderDto,
  TRemoveQueryDto,
  TRestoreFromHistoryDto,
  TRestoreRequestDto,
  TSetQueryDto,
  TUpdateBasicAuthDto,
  TUpdateSettingsDto,
} from "../typings/dto";

export const DOMAIN = "httpReq";

const initialState: TState = {
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
};
const slice = createSlice({
  name: DOMAIN,
  initialState,
  reducers: {
    restoreFromHistory(state, { payload }: TRestoreFromHistoryDto) {
      state.headers = payload.headers;
      state.url = payload.url;
      state.query = payload.query;
      state.auth = payload.auth;
      state.method = payload.method;
    },
    loadingStart(state) {
      state.loading = true;
    },
    loadingEnd(state) {
      state.loading = false;
    },
    addHeader(state, { payload }: TAddHeaderDto) {
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
    addQuery(state) {
      state.query.push({
        key: "",
        value: "",
      });
    },
    changeHeaderKey(state, { payload }: TChangeHeaderKeyDto) {
      state.headers[payload.id].key = payload.key;
    },
    changeHeaderValue(state, { payload }: TChangeHeaderValueDto) {
      state.headers[payload.id].value = payload.value;
    },
    changeHeaderActive(state, { payload }: TChangeHeaderActiveDto) {
      state.headers[payload.id].active = payload.active;
    },
    removeHeader(state, { payload: idx }: TRemoveHeaderDto) {
      state.headers.splice(idx, 1);
    },

    changeMethod(state, { payload }: TChangeMethodDto) {
      state.method = payload;
    },
    changeUrl(state, { payload }: TChangeUrlDto) {
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
    removeQuery(state, { payload: idx }: TRemoveQueryDto) {
      state.query.splice(idx, 1);
    },
    changeActiveOptsEditor(state, { payload }: PayloadAction<TOptsKey>) {
      state.activeOptsEditor = payload;
    },
    changeAuthStrategy(state, { payload }: TChangeAuthStrategyDto) {
      state.auth.strategy = payload;
    },
    updateBasicAuthForm(state, { payload }: TUpdateBasicAuthDto) {
      _.merge(state.auth.data.basic, payload);
    },
    setQuery(state, { payload }: TSetQueryDto) {
      state.query = payload;
    },
    restoreRequest(state, { payload }: TRestoreRequestDto) {
      state.method = payload.method;
      state.url = payload.url;
    },
    updateSettings(state, { payload }: TUpdateSettingsDto) {
      _.merge(state.settings, payload);
    },
  },
});

const makeRequest = createAction(`${DOMAIN}/makeRequest`);
const cancelRequest = createAction(`${DOMAIN}/cancelRequest`);
export const HttpReqActions = {
  ...slice.actions,
  makeRequest,
  cancelRequest,
};

export default slice.reducer;
