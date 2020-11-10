import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TState } from "@/typings/store/codeEditor";
import {
  TCodeEditorTabSize,
  TCodeEditorTheme,
  TCodeEditorKeyMap,
} from "@/typings/codeEditor";

export const DOMAIN = "codeEditor";
const slice = createSlice({
  name: DOMAIN,
  initialState: {
    tabSize: 2,
    keyMap: "default",
    theme: "material",
    lineNumbers: true,
    lineWrapping: true,
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
    toggleLineNumbers(state, { payload }: PayloadAction<boolean>) {
      state.lineNumbers = payload;
    },
    toggleLineWrap(state, { payload }: PayloadAction<boolean>) {
      state.lineWrapping = payload;
    },
  },
});
export const {
  changeKeyMap,
  changeTabSize,
  changeTheme,
  toggleLineWrap,
  toggleLineNumbers,
} = slice.actions;

export default slice.reducer;
