import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TState, TBodyFormatMode } from "../typings/store";
import { TResponse } from "@/domains/http/shared/typings/http-client";
import { THistoryResponse } from "@/domains/http/history/typings/store";

export const DOMAIN = "httpRes";

const initialState: TState = {
  editor: {
    format: "Pretty",
    search: "",
  },
  category: "body",
  response: null,
};
const slice = createSlice({
  name: DOMAIN,
  initialState,
  reducers: {
    restoreFromHistory(state, { payload }: PayloadAction<THistoryResponse>) {
      state.response = payload;
    },
    setResponse(state, { payload }: PayloadAction<TResponse>) {
      state.response = payload;
    },
    changeEditorFormat(state, { payload }: PayloadAction<TBodyFormatMode>) {
      state.editor.format = payload;
    },
    changeEditorSearch(state, { payload }: PayloadAction<string>) {
      state.editor.search = payload;
    },
    changeCategory(state, { payload }: PayloadAction<string>) {
      state.category = payload;
    },
  },
});

export const HttpResActions = slice.actions;

export default slice.reducer;
