import { TRootState as State } from "@/store/rootReducer";
import { createSelector } from "reselect";
import { EShortcutEv as EEvent } from "../typings/actions";
import { DOMAIN } from "./slice";
import _ from "lodash";

const $ = (state: State) => state[DOMAIN];
const isEditorOpen = (state: State) => $(state).editor.isOpen;
const getEditorEvent = (state: State) => $(state).editor.event;
const getEditorPressedCombo = (state: State) => $(state).editor.pressed;

const getKeysMap = (state: State) => $(state).keyToEvent;
const getEventsMap = (state: State) => $(state).eventToKey;
const getEventsArray = createSelector(getEventsMap, map => {
  return Object.entries(map).map(([event, shortcut]) => ({
    event,
    shortcut,
  }));
});
const getKeysForKeyboardWatcher = createSelector(getKeysMap, map => {
  return Object.entries(map)
    .filter(([_k, e]) => !_.isNil(e))
    .map(([k]) => k)
    .join(",");
});

const evI18nMap: Record<EEvent, string> = {
  [EEvent.MAKE_OR_CANCEL_REQUEST]: "Make/cancel request",
  [EEvent.SELECT_GET_METHOD]: "Select GET method",
  [EEvent.SELECT_POST_METHOD]: "Select POST method",
  [EEvent.SELECT_PUT_METHOD]: "Select PUT method",
  [EEvent.SELECT_PATCH_METHOD]: "Select PATCH method",
  [EEvent.SELECT_DELETE_METHOD]: "Select DELETE method",
  [EEvent.FOCUS_URL]: "Focus URL",
  [EEvent.COPY_URL]: "Copy URL",
  [EEvent.TOGGLE_PROXY]: "Toggle etna proxy",
  [EEvent.SHOW_SHORTCUTS]: "Show shortcuts",
};
const getEventsForSettingsRender = createSelector(getEventsMap, map => {
  return Object.entries(map).map(([event, shortcut]) => ({
    event: (event as unknown) as EEvent,
    eventHr: evI18nMap[event],
    shortcut,
  }));
});

export const ShortcutsSelectors = {
  isEditorOpen,
  getEditorEvent,
  getKeysForKeyboardWatcher,
  getEditorPressedCombo,
  getKeysMap,
  getEventsMap,
  getEventsForSettingsRender,
  getEventsArray,
};
