import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EShortcutEv as Ev } from "../typings/actions";
import {
  TAddShortcutDto,
  TOpenShortcutEditorDto,
  TRmShortcutDto,
} from "../typings/dto";
import { TState } from "../typings/store";

export const DOMAIN = "shortcuts";
const initialState: TState = {
  keyToEvent: {
    "mod+enter": Ev.MAKE_OR_CANCEL_REQUEST,
  },
  eventToKey: {
    [Ev.MAKE_OR_CANCEL_REQUEST]: "mod+enter",
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
      state.keyToEvent[payload.key] = payload.event;
      if (payload.event in state.eventToKey) {
        state.eventToKey[payload.event] = payload.key;
      } else {
        state.eventToKey[payload.event] = payload.key;
      }
    },
    removeShortcut(state, { payload }: PayloadAction<TRmShortcutDto>) {
      if (payload.key) {
        state.eventToKey[payload.event] = null;
      }
      if (payload.event) {
        state.keyToEvent[payload.key] = null;
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
