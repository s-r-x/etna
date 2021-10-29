import { TRootState as State } from "@/store/rootReducer";
import { createSelector } from "reselect";
import { SocketIoClient } from "../client";
import { EWsLogLevel } from "@ws/shared/typings/store";
import { TWsLogUIItem } from "@ws/shared/typings/ui";
import { DOMAIN } from "./slice";
import moment from "moment";
import { JsonService } from "@/services/json";

const root = (state: State) => state[DOMAIN];
const getUrl = (state: State) => root(state).url;
const getPath = (state: State) => root(state).path;
const isConnected = (state: State) => root(state).connected;
const getRawLogs = (state: State) => root(state).logs;
const getLogs = createSelector(getRawLogs, (logs): TWsLogUIItem[] => {
  return logs.map((log) => ({
    id: log.id,
    event: log.ev,
    typography:
      log.lvl === EWsLogLevel.ERR
        ? "danger"
        : log.lvl === EWsLogLevel.OK
        ? "success"
        : undefined,
    message: log.msg,
    date: moment(log.date).format("LTS"),
    route: log.route,
  }));
});
const getInputEvent = (state: State) => root(state).input.event;
const getInputMode = (state: State) => root(state).input.mode;
const getInputData = (state: State) => root(state).input.data;
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
const getQuery = (state: State) => root(state).query;
const getNormalizedQuery = createSelector(getQuery, (query) => {
  return query.reduce((acc, { key, value }) => {
    return { ...acc, [key]: value };
  }, {} as TStringDict);
});
const getHeaders = (state: State) => root(state).headers;
const getNormalizedHeaders = createSelector(getHeaders, (headers) => {
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
const getClient = () => SocketIoClient.getInstance();

export const SocketIOSelectors = {
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
};
