import { TRootState as State } from "@/store/rootReducer";
import { createSelector } from "reselect";
import { WsRawClient } from "../client";
import { EWsConnStatus } from "@ws/shared/typings";
import { DOMAIN } from "./slice";

const $ = (state: State) => state[DOMAIN];
const getTab = (state: State) => $(state).tab;
const getUrl = (state: State) => $(state).url;
const getPath = (state: State) => $(state).path;
const getProtocols = (state: State) => $(state).protocols;
const getNormalizedProtocols = createSelector(getProtocols, protocols =>
  protocols.filter(Boolean)
);
const getConnStatus = (state: State) => $(state).connStatus;
const isConnected = (state: State) =>
  getConnStatus(state) === EWsConnStatus.CONNECTED;
const isConnecting = (state: State) =>
  getConnStatus(state) === EWsConnStatus.CONNECTING;
const isConnectionButtonDisabled = (state: State): boolean => !getUrl(state);
const getLogs = (state: State) => $(state).logs;
const getInputMode = (state: State) => $(state).input.mode;
const getInputData = (state: State) => $(state).input.data;
const getNormalizedInputData = getInputData;
const getClient = () => WsRawClient.getInstance();

export const WsRawSelectors = {
  getConnStatus,
  getTab,
  getLogs,
  getClient,
  getUrl,
  getPath,
  getProtocols,
  getNormalizedProtocols,
  getInputMode,
  getInputData,
  getNormalizedInputData,
  isConnected,
  isConnecting,
  isConnectionButtonDisabled,
};
