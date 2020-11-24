import { DOMAIN } from "./slice";
import { TRootState } from "@/store/rootReducer";
import { PhoenixClient } from "../../clients/Phoenix";

const getUrl = (state: TRootState) => state[DOMAIN].url;
const isConnected = (state: TRootState) => state[DOMAIN].connected;
const getClient = () => PhoenixClient.getInstance();

export const PhoenixSelectors = {
  getUrl,
  isConnected,
  getClient,
};
