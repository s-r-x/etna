import { TState } from "../typings/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const DOMAIN = "settings";

const initialState: TState = {
  isOpen: false,
  activeTab: "textEditor",
};

const slice = createSlice({
  name: DOMAIN,
  initialState,
  reducers: {
    open(state) {
      state.isOpen = true;
    },
    close(state) {
      state.isOpen = false;
    },
    changeActiveTab(state, { payload }: PayloadAction<string>) {
      state.activeTab = payload;
    },
  },
});

export const { open, close, changeActiveTab } = slice.actions;

export default slice.reducer;
