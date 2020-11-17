import { THTTPBodyMIME } from "@/typings/http";
import { THistoryBody } from "@/typings/store/history";
import { genVoidKV } from "@/utils/kv";
import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";
import { THttpReqBodyState } from "../typings/store";

export const DOMAIN = "httpReqBody";

const slice = createSlice({
  name: DOMAIN,
  initialState: {
    mime: "application/json",
    text: "",
    kv: [genVoidKV()],
    gql: {
      schema: null,
      loading: false,
      error: null,
      vars: "{}",
    },
  } as THttpReqBodyState,
  reducers: {
    restoreFromHistory(state, { payload }: PayloadAction<THistoryBody>) {
      state.mime = payload.mime;
      state.text = payload.text;
      state.kv = payload.kv;
      state.gql.vars = payload.gql.vars;
    },
    changeText(state, { payload }: PayloadAction<string>) {
      state.text = payload;
    },
    addKV(state) {
      state.kv.push(genVoidKV());
    },

    changeKVKey(
      state,
      { payload }: PayloadAction<{ id: number; key: string }>
    ) {
      state.kv[payload.id].key = payload.key;
    },
    changeKVValue(
      state,
      { payload }: PayloadAction<{ id: number; value: string }>
    ) {
      state.kv[payload.id].value = payload.value;
    },
    changeKVActive(
      state,
      { payload }: PayloadAction<{ id: number; active: boolean }>
    ) {
      state.kv[payload.id].active = payload.active;
    },
    removeKV(state, { payload: idx }: PayloadAction<number>) {
      state.kv.splice(idx, 1);
    },
    changeMIME(state, { payload }: PayloadAction<THTTPBodyMIME>) {
      state.mime = payload;
    },
    loadGqlSchemaStart(state) {
      state.gql.loading = true;
      state.gql.error = null;
    },
    loadGqlSchemaEnd(state, { payload }: PayloadAction<string>) {
      state.gql.loading = false;
      if (payload) {
        state.gql.schema = payload;
      }
    },
    updateGqlVars(state, { payload }: PayloadAction<string>) {
      state.gql.vars = payload;
    },
  },
});
const loadGqlSchema = createAction(`${DOMAIN}/loadGqlSchema`);
const cancelLoadGqlSchema = createAction(`${DOMAIN}/cancelLoadGqlSchema`);
export const HttpReqBodyActions = {
  ...slice.actions,
  loadGqlSchema,
  cancelLoadGqlSchema,
};

export default slice.reducer;
