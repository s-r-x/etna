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
    "ctrl+enter": Ev.MAKE_OR_CANCEL_REQUEST,
    "ctrl+shift+0": Ev.SELECT_GET_METHOD,
    "ctrl+shift+9": Ev.SELECT_POST_METHOD,
    "ctrl+shift+8": Ev.SELECT_PUT_METHOD,
    "ctrl+shift+7": Ev.SELECT_DELETE_METHOD,
    "ctrl+shift+6": Ev.SELECT_PATCH_METHOD,
    "ctrl+shift+k": Ev.FOCUS_URL,
    "ctrl+shift+l": Ev.COPY_URL,
    "ctrl+shift+'": Ev.TOGGLE_PROXY,
  },
  eventToKey: {
    [Ev.MAKE_OR_CANCEL_REQUEST]: "ctrl+enter",
    [Ev.SELECT_GET_METHOD]: "ctrl+shift+0",
    [Ev.SELECT_POST_METHOD]: "ctrl+shift+9",
    [Ev.SELECT_PUT_METHOD]: "ctrl+shift+8",
    [Ev.SELECT_DELETE_METHOD]: "ctrl+shift+7",
    [Ev.SELECT_PATCH_METHOD]: "ctrl+shift+6",
    [Ev.FOCUS_URL]: "ctrl+shift+k",
    [Ev.COPY_URL]: "ctrl+shift+l",
    [Ev.TOGGLE_PROXY]: "ctrl+shift+'",
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
        delete state.keyToEvent[payload.key];
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
