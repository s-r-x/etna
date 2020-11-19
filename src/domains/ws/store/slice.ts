import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TState } from "../typings/store";

export const DOMAIN = "ws";

type TChangeConnectStatusDto = {
  provider: TWsProvider;
  connected: boolean;
};
const initialState: TState = {
  activeProvider: "raw",
  providers: {
    socketIo: {
      url: "",
      connected: false,
    },
    raw: {
      url: "",
      connected: false,
    },
    phoenix: {
      url: "",
      connected: false,
    },
  },
};
const slice = createSlice({
  name: DOMAIN,
  initialState: initialState,
  reducers: {
    changeUrl(state, { payload }: PayloadAction<string>) {
      state.providers[state.activeProvider].url = payload;
    },
    changeConnectStatus(
      state,
      { payload }: PayloadAction<TChangeConnectStatusDto>
    ) {
      state.providers[payload.provider].connected = payload.connected;
    },
    changeProvider(state, { payload }: PayloadAction<TWsProvider>) {
      state.activeProvider = payload;
    },
  },
});

export const WSActions = {
  ...slice.actions,
};
export default slice.reducer;
