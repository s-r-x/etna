import { createSelector } from "reselect";
import { DOMAIN } from "./slice";
import { TRootState as State } from "@/store/rootReducer";
import { PhoenixClient } from "@phoenix/client";
import { TWsLogUIItem } from "@ws/shared/typings/ui";
import { EWsLogLevel } from "@ws/shared/typings/store";
import moment from "moment";

const root = (state: State) => state[DOMAIN];
const getUrl = (state: State) => root(state).url;
const isConnected = (state: State) => root(state).connected;
const getClient = () => PhoenixClient.getInstance();
const getTab = (state: State) => root(state).tab;
const getConnTab = (state: State) => root(state).connTab;
const getQuery = (state: State) => root(state).query;
const getNormalizedQuery = createSelector(getQuery, (query) => {
  return query.reduce((acc, { key, value }) => {
    return { ...acc, [key]: value };
  }, {} as TStringDict);
});
const getChannelsConnStatuses = (state: State) =>
  state[DOMAIN].channelsConnStatuses;
const getRawChannels = (state: State) => root(state).channels;
const getChannels = createSelector(
  [getRawChannels, getChannelsConnStatuses],
  (channels, conn) => {
    return channels.map((ch) => ({
      ...ch,
      isConnected: conn.find((conn) => conn.topic === ch.topic)?.connected,
    }));
  }
);
const getCreateChannelForm = (state: State) => root(state).createChForm;
const getCreateEventForm = (state: State) => root(state).createEvForm;
const getEvents = (state: State) => root(state).events;
const getRawLogs = (state: State) => root(state).logs;
const getLogs = createSelector(getRawLogs, (logs): TWsLogUIItem[] => {
  return logs.map((log) => ({
    id: log.id,
    room: log.room,
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

export const PhoenixSelectors = {
  getCreateEventForm,
  getCreateChannelForm,
  getChannels,
  getQuery,
  getEvents,
  getLogs,
  getNormalizedQuery,
  getConnTab,
  getUrl,
  getTab,
  isConnected,
  getClient,
  getInputData,
  getInputMode,
  getInputEvent,
};
