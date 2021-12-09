import { TRootState as State } from "@/store/rootReducer";
import { createSelector } from "reselect";
import { SocketIoClient } from "../client";
import { EWsConnStatus } from "@ws/shared/typings";
import { DOMAIN } from "./slice";
import { JsonService } from "@/services/json";

const $ = (state: State) => state[DOMAIN];
const getTab = (state: State) => $(state).tab;
const getUrl = (state: State) => $(state).url;
const getPath = (state: State) => $(state).path;
const getConnStatus = (state: State) => $(state).connStatus;
const isConnected = (state: State) =>
  getConnStatus(state) === EWsConnStatus.CONNECTED;
const isConnecting = (state: State) =>
  getConnStatus(state) === EWsConnStatus.CONNECTING;
const isConnectionButtonDisabled = (state: State): boolean => !getUrl(state);
const getLogs = (state: State) => $(state).logs;
const getInputEvent = (state: State) => $(state).input.event;
const getInputMode = (state: State) => $(state).input.mode;
const getInputData = (state: State) => $(state).input.data;
const getNormalizedInputData = createSelector(
  [getInputMode, getInputData],
  (mode, data) => {
    if (mode === "text/plain") {
      return data;
    } else {
      return JsonService.parse(data);
    }
  }
);
const getQuery = (state: State) => $(state).query;
const getNormalizedQuery = createSelector(getQuery, query => {
  return query.reduce((acc, { key, value }) => {
    return { ...acc, [key]: value };
  }, {} as TStringDict);
});
const getHeaders = (state: State) => $(state).headers;
const getNormalizedHeaders = createSelector(getHeaders, headers => {
  return headers.reduce((acc, header) => {
    if (header.active && header.key) {
      return {
        ...acc,
        [header.key]: header.value,
      };
    } else {
      return acc;
    }
  }, {} as TStringDict);
});
const getOptionsString = (state: State) => $(state).options;
const getOptions = createSelector(
  getOptionsString,
  (opts): SocketIOClient.ConnectOpts => {
    if (!opts) return;
    try {
      return JSON.parse(opts);
    } catch (_e) {}
  }
);
const getClient = () => SocketIoClient.getInstance();

export const SocketIOSelectors = {
  getConnStatus,
  getTab,
  getOptions,
  getOptionsString,
  getLogs,
  getQuery,
  getHeaders,
  getNormalizedHeaders,
  getClient,
  getUrl,
  getPath,
  getInputMode,
  getInputData,
  getNormalizedInputData,
  getNormalizedQuery,
  getInputEvent,
  isConnected,
  isConnecting,
  isConnectionButtonDisabled,
};
