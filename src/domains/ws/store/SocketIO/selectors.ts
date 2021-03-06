import { TRootState } from "@/store/rootReducer";
import { createSelector } from "reselect";
import { SocketIoClient } from "../../clients/SocketIO";
import { EWsLogLevel } from "../../typings/store";
import { TWsLogUIItem } from "../../typings/ui";
import { DOMAIN } from "./slice";
import moment from "moment";
import { JsonService } from "@/services/json";

const getUrl = (state: TRootState) => state[DOMAIN].url;
const getPath = (state: TRootState) => state[DOMAIN].path;
const isConnected = (state: TRootState) => state[DOMAIN].connected;
const getRawLogs = (state: TRootState) => state[DOMAIN].logs;
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
const getInputEvent = (state: TRootState) => state[DOMAIN].input.event;
const getInputMode = (state: TRootState) => state[DOMAIN].input.mode;
const getInputData = (state: TRootState) => state[DOMAIN].input.data;
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
const getQuery = (state: TRootState) => state[DOMAIN].query;
const getNormalizedQuery = createSelector(getQuery, (query) => {
  return query.reduce((acc, { key, value }) => {
    return { ...acc, [key]: value };
  }, {} as TStringDict);
});
const getHeaders = (state: TRootState) => state[DOMAIN].headers;
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
