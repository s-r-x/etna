import { TState } from "../typings/store";
import { createSlice } from "@reduxjs/toolkit";

export const DOMAIN = "settings";

const initialState: TState = {
  isOpen: false,
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
  },
});

export const { open, close } = slice.actions;

export default slice.reducer;
