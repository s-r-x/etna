import { createSelector } from "reselect";
import { DOMAIN } from "./slice";
import { TRootState } from "@/store/rootReducer";
import { PhoenixClient } from "@phoenix/client";
import { TWsLogUIItem } from "@ws/shared/typings/ui";
import { EWsLogLevel } from "@ws/shared/typings/store";
import moment from "moment";

const getUrl = (state: TRootState) => state[DOMAIN].url;
const isConnected = (state: TRootState) => state[DOMAIN].connected;
const getClient = () => PhoenixClient.getInstance();
const getTab = (state: TRootState) => state[DOMAIN].tab;
const getConnTab = (state: TRootState) => state[DOMAIN].connTab;
const getQuery = (state: TRootState) => state[DOMAIN].query;
const getNormalizedQuery = createSelector(getQuery, (query) => {
  return query.reduce((acc, { key, value }) => {
    return { ...acc, [key]: value };
  }, {} as TStringDict);
});
const getChannelsConnStatuses = (state: TRootState) =>
  state[DOMAIN].channelsConnStatuses;
const getRawChannels = (state: TRootState) => state[DOMAIN].channels;
const getChannels = createSelector(
  [getRawChannels, getChannelsConnStatuses],
  (channels, conn) => {
    return channels.map((ch) => ({
      ...ch,
      isConnected: conn.find((conn) => conn.topic === ch.topic)?.connected,
    }));
  }
);
const getCreateChannelForm = (state: TRootState) => state[DOMAIN].createChForm;
const getCreateEventForm = (state: TRootState) => state[DOMAIN].createEvForm;
const getEvents = (state: TRootState) => state[DOMAIN].events;
const getRawLogs = (state: TRootState) => state[DOMAIN].logs;
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
};
