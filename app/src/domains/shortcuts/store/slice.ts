import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EShortcutEv, EShortcutEv as Ev } from "../typings/actions";
import {
  TAddShortcutDto,
  TOpenShortcutEditorDto,
  TRmShortcutDto,
} from "../typings/dto";
import { TState } from "../typings/store";
import _ from "lodash";

export const DOMAIN = "shortcuts";
const initialState: TState = {
  keysToEvents: {
    "mod+enter": Ev.MAKE_OR_CANCEL_REQUEST,
  },
  eventsToKeys: {
    [Ev.MAKE_OR_CANCEL_REQUEST]: ["mod+enter"],
  },
  editor: {
    isOpen: false,
    event: null,
    pressed: null,
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
    openEditor(state, { payload }: PayloadAction<TOpenShortcutEditorDto>) {
      state.editor.isOpen = true;
      state.editor.event = payload.event;
      state.editor.pressed = payload.key;
    },
    setEditorPressedCombo(state, { payload }: PayloadAction<string[]>) {
      state.editor.pressed = payload.join("+");
    },
    closeEditor(state) {
      state.editor = initialState.editor;
    },
  },
});

export const {
  addShortcut,
  removeShortcut,
  openEditor,
  closeEditor,
  setEditorPressedCombo,
} = slice.actions;
export default slice.reducer;
