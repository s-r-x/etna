import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EShortcutEv as Ev } from "../typings/actions";
import { TAddShortcutDto, TRmShortcutDto } from "../typings/dto";
import { TState } from "../typings/store";
import _ from "lodash";

export const DOMAIN = "shortcuts";
const initialState: TState = {
  keysToEvents: {
    "ctrl+enter": Ev.MAKE_OR_CANCEL_REQUEST,
  },
  eventsToKeys: {
    [Ev.MAKE_OR_CANCEL_REQUEST]: ["ctrl+enter"],
  },
};
const slice = createSlice({
  name: DOMAIN,
  initialState,
  reducers: {
    addShortcut(state, { payload }: PayloadAction<TAddShortcutDto>) {
      state.keysToEvents[payload.key] = payload.event;
      if (payload.event in state.eventsToKeys) {
        state.eventsToKeys[payload.event] = _.uniq(
          _.concat(state.eventsToKeys[payload.event], payload.key)
        );
      } else {
        state.eventsToKeys[payload.event] = [payload.key];
      }
    },
    removeShortcut(state, { payload }: PayloadAction<TRmShortcutDto>) {
      state[payload.key] = null;
      if (payload.event in state.eventsToKeys) {
        const keys = state.eventsToKeys[payload.event];
        const idxToRemove = keys.findIndex((key) => key === payload.key);
        if (idxToRemove !== -1) {
          keys.splice(idxToRemove, 1);
        }
      }
    },
  },
});
export default slice.reducer;
