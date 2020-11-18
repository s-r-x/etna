import { TRootState } from "@/store/rootReducer";
import { DOMAIN } from "./slice";

const getMode = (state: TRootState) => state[DOMAIN].mode;

export const ThemeSelectors = {
  getMode,
};
