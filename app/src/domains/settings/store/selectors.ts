import { TRootState as State } from "@/store/rootReducer";
import { DOMAIN } from "./slice";

const root = (state: State) => state [DOMAIN];
const isOpen = (state: State) => root(state).isOpen;
const getActiveTab = (state: State) => root(state).activeTab;

export const SettingsSelectors = {
  isOpen,
  getActiveTab,
};
