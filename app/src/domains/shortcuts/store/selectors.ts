import { TRootState } from "@/store/rootReducer";
import { createSelector } from "reselect";
import { EShortcutEv } from "../typings/actions";
import { DOMAIN } from "./slice";

const isEditorOpen = (state: TRootState) => state[DOMAIN].editor.isOpen;
const getEditorEvent = (state: TRootState) => state[DOMAIN].editor.event;
const getEditorPressedCombo = (state: TRootState) =>
  state[DOMAIN].editor.pressed;

const getKeysMap = (state: TRootState) => state[DOMAIN].keysToEvents;
const getEventsMap = (state: TRootState) => state[DOMAIN].eventsToKeys;
const getEventsArray = createSelector(getEventsMap, (map) => {
  return Object.entries(map).map(([event, shortcuts]) => ({
    event,
    shortcuts,
  }));
});

const evI18nMap: Record<EShortcutEv, string> = {
  [EShortcutEv.MAKE_OR_CANCEL_REQUEST]: "Make/cancel request",
};
const getEventsForSettingsRender = createSelector(getEventsMap, (map) => {
  return Object.entries(map).map(([event, shortcuts]) => ({
    event: (event as unknown) as EShortcutEv,
    eventHr: evI18nMap[event],
    shortcuts,
  }));
});

export const ShortcutsSelectors = {
  isEditorOpen,
  getEditorEvent,
  getEditorPressedCombo,
  getKeysMap,
  getEventsMap,
  getEventsForSettingsRender,
  getEventsArray,
};
