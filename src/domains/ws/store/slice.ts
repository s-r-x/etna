import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TState } from "../typings/store";

export const DOMAIN = "ws";

const initialState: TState = {
  provider: "raw",
  url: "",
};
const slice = createSlice({
  name: DOMAIN,
  initialState: initialState,
  reducers: {
    changeUrl(state, { payload }: PayloadAction<string>) {
      state.url = payload;
    },
    changeProvider(state, { payload }: PayloadAction<TWsProvider>) {
      state.provider = payload;
    },
  },
});

export const WSActions = {
  ...slice.actions,
};
export default slice.reducer;
