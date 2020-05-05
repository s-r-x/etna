import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TState, TBodyFormatMode } from "@/typings/store/httpResponse";
import { TResponse } from "@/typings/httpClient";

export const DOMAIN = "httpRequest";

const slice = createSlice({
  name: DOMAIN,
  initialState: {
    editor: {
      expanded: false,
      format: "Pretty",
      search: "",
    },
    category: "body",
  } as TState,
  reducers: {
    setResponse(state, { payload }: PayloadAction<TResponse>) {
      state.response = payload;
    },
    toggleEditorExpanded(state) {
      state.editor.expanded = !state.editor.expanded;
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
  setResponse,
  toggleEditorExpanded,
  changeEditorFormat,
  changeCategory,
} = slice.actions;

export default slice.reducer;
