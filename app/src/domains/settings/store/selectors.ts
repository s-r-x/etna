import { TRootState as State } from "@/store/rootReducer";
import { DOMAIN } from "./slice";

const $ = (state: State) => state[DOMAIN];
const isOpen = (state: State) => $(state).isOpen;
const getActiveTab = (state: State) => $(state).activeTab;

export const SettingsSelectors = {
  isOpen,
  getActiveTab,
};
