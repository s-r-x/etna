import { TRootState } from "@/store/rootReducer";
import { DOMAIN } from "./slice";

const getKeysMap = (state: TRootState) => state[DOMAIN].keysToEvents;
const getEventsMap = (state: TRootState) => state[DOMAIN].eventsToKeys;

export const ShortcutsSelectors = {
  getKeysMap,
  getEventsMap,
};
