import { TRootState } from "@/store/rootReducer";
import { DOMAIN } from "./slice";

const getActiveClient = (state: TRootState) => state[DOMAIN].activeClient;

export const WsSelectors = {
  getActiveClient,
};
