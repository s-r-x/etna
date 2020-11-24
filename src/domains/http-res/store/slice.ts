import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TState, TBodyFormatMode } from "../typings/store";
import { TResponse } from "@/typings/httpClient";
import { THistoryResponse } from "@/domains/http-req-history/typings/store";

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

export const {
  restoreFromHistory,
  setResponse,
  changeEditorFormat,
  changeCategory,
} = slice.actions;

export default slice.reducer;
