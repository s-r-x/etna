import { TRootState } from "@/store/rootReducer";
import { DOMAIN } from "./slice";

const isOpen = (state: TRootState) => state[DOMAIN].isOpen;
const getActiveTab = (state: TRootState) => state[DOMAIN].activeTab;

export const SettingsSelectors = {
  isOpen,
  getActiveTab,
};
