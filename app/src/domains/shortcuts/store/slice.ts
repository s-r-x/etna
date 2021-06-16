import { createSlice } from "@reduxjs/toolkit";
import { EShortcutEv } from "../typings/actions";
import { TState } from "../typings/store";

export const DOMAIN = "shortcuts";
const initialState: TState = {
  bindings: {
    [EShortcutEv.MAKE_REQUEST]: "/",
    [EShortcutEv.CANCEL_REQUEST]: ",",
  },
};
const slice = createSlice({
  name: DOMAIN,
  initialState,
  reducers: {},
});
export default slice.reducer;
