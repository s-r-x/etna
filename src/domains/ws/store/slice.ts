import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EWsClient } from "../typings";
import { TWsState } from "../typings/store";

export const DOMAIN = "ws";

const initialState: TWsState = {
  activeClient: EWsClient.RAW,
};
const slice = createSlice({
  name: DOMAIN,
  initialState: initialState,
  reducers: {
    changeActiveClient(state, { payload }: PayloadAction<EWsClient>) {
      state.activeClient = payload;
    },
  },
});

export const WSActions = {
  ...slice.actions,
};
export default slice.reducer;
