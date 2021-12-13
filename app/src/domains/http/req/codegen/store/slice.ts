import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TCodegenTarget } from "../typings";
import { THttpCodegenState } from "../typings/store";

const initialState: THttpCodegenState = {
  client: "fetch",
  target: "node",
};
export const DOMAIN = "httpCodegen";

const slice = createSlice({
  name: DOMAIN,
  initialState,
  reducers: {
    changeTargetAndClient(
      state,
      { payload }: PayloadAction<[TCodegenTarget, string]>
    ) {
      state.target = payload[0];
      state.client = payload[1];
    },
    changeClient(state, { payload }: PayloadAction<string>) {
      state.client = payload;
    },
    changeTarget(state, { payload }: PayloadAction<TCodegenTarget>) {
      state.target = payload;
    },
  },
});

export const HttpCodegenActions = slice.actions;
export default slice.reducer;
