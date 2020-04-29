import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TState } from "@/typings/store/codeEditor";
import {
  TCodeEditorTabSize,
  TCodeEditorTheme,
  TCodeEditorKeyMap,
} from "@/typings/codeEditor";

const DOMAIN = "codeEditor";
const slice = createSlice({
  name: DOMAIN,
  initialState: {
    tabSize: 2,
    keyMap: "vim",
    theme: "material",
  } as TState,
  reducers: {
    changeTabSize(state, { payload }: PayloadAction<TCodeEditorTabSize>) {
      state.tabSize = payload;
    },
    changeTheme(state, { payload }: PayloadAction<TCodeEditorTheme>) {
      state.theme = payload;
    },
    changeKeyMap(state, { payload }: PayloadAction<TCodeEditorKeyMap>) {
      state.keyMap = payload;
    },
  },
});
export const { changeKeyMap, changeTabSize, changeTheme } = slice.actions;

export default slice.reducer;
