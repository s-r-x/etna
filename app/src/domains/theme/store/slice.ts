import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TState, TThemeMode } from "../typings/store";

const initialState: TState = {
  mode: "dark",
};
export const DOMAIN = "theme";
const slice = createSlice({
  name: DOMAIN,
  initialState,
  reducers: {
    changeMode(state, { payload }: PayloadAction<TThemeMode>) {
      state.mode = payload;
    },
    toggleMode(state) {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const ThemeActions = {
  ...slice.actions,
};

export default slice.reducer;
