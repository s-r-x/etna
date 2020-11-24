import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TPhoenixState } from "../../typings/store";

export const DOMAIN = "phoenix";

const initialState: TPhoenixState = {
  connected: false,
  url: "",
};

const slice = createSlice({
  name: DOMAIN,
  initialState,
  reducers: {
    changeUrl(state, { payload }: PayloadAction<string>) {
      state.url = payload;
    },
    changeConnectStatus(state, { payload }: PayloadAction<boolean>) {
      state.connected = payload;
    },
  },
});

const connect = createAction(`${DOMAIN}/connect`);
const disconnect = createAction(`${DOMAIN}/disconnect`);
export const PhoenixActions = {
  ...slice.actions,
  connect,
  disconnect,
};

export default slice.reducer;

