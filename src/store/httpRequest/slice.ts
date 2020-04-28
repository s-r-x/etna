import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { THTTPMethod } from "@/typings/http";
import { UUID } from "@/utils/uuid";
import { TOptsKey, TState, THeader } from "@/typings/store/httpRequest";

const DOMAIN = "httpRequest";

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
      type: "application/json",
      raw: true,
      content: "",
    },
  } as TState,
  reducers: {
    addHeader(state) {
      state.headers.push(genVoidHeader());
    },
    changeHeaderKey(
      state,
      { payload }: PayloadAction<{ idx: number; key: string }>
    ) {
      state.headers[payload.idx].key = payload.key;
    },
    changeHeaderValue(
      state,
      { payload }: PayloadAction<{ idx: number; value: string }>
    ) {
      state.headers[payload.idx].value = payload.value;
    },
    changeHeaderActive(
      state,
      { payload }: PayloadAction<{ idx: number; active: boolean }>
    ) {
      state.headers[payload.idx].active = payload.active;
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
    changeBodyContent(state, { payload }: PayloadAction<string>) {
      state.body.content = payload;
    },
    changeBodyType(state, { payload }: PayloadAction<string>) {
      state.body.type = payload;
    },
    toggleBodyInputStrategy(state) {
      state.body.raw = !state.body.raw;
    },
    changeActiveOptsEditor(state, { payload }: PayloadAction<TOptsKey>) {
      state.activeOptsEditor = payload;
    },
  },
});

export const {
  addHeader,
  changeHeaderKey,
  changeHeaderValue,
  changeHeaderActive,
  removeHeader,
  changeMethod,
  changeUrl,
  changeActiveOptsEditor,
} = slice.actions;

export default slice.reducer;
