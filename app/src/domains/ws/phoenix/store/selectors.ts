import { createSelector } from "reselect";
import { DOMAIN } from "./slice";
import { TRootState as State } from "@/store/rootReducer";
import { PhoenixClient } from "@phoenix/client";
import { TWsLogUIItem } from "@ws/shared/typings/ui";
import { EWsLogLevel } from "@ws/shared/typings/store";
import moment from "moment";
import { ISendPhoenixMessageDto } from "../typings/dto";
import { TStorePhoenixChannelWithConn } from "../typings/store";

const root = (state: State) => state[DOMAIN];
const getUrl = (state: State) => root(state).url;
const isConnected = (state: State) => root(state).connected;
const getClient = () => PhoenixClient.getInstance();
const getTab = (state: State) => root(state).tab;
const getQuery = (state: State) => root(state).query;
const getNormalizedQuery = createSelector(getQuery, (query) => {
  return query.reduce((acc, { key, value }) => {
    return { ...acc, [key]: value };
  }, {} as TStringDict);
});
const getChannelsConnStatuses = (state: State) =>
  root(state).channelsConnStatuses;
const getRawChannels = (state: State) => root(state).channels;
const getChannels = createSelector(
  [getRawChannels, getChannelsConnStatuses],
  (channels, conn): TStorePhoenixChannelWithConn[] => {
    return channels.map((ch) => ({
      ...ch,
      connected: conn[ch.topic] ?? false,
    }));
  }
);
const getChannelForm = (state: State) => root(state).createChForm;
const isChannelFormOpen = (state: State) => getChannelForm(state).isOpen;
const getChannelFormTopic = (state: State) => getChannelForm(state).topic;
const getChannelFormQuery = (state: State) => getChannelForm(state).query;
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
const getFinalInputData = createSelector(
  getInputData,
  (data): TAnyDict => {
    try {
      return JSON.parse(data);
    } catch (_e) {
      return { payload: data };
    }
  }
);
const getInputChannel = (state: State) => root(state).input.channel;
const isInputChannelConnected = createSelector(
  [getInputChannel, getChannelsConnStatuses],
  (ch, conn) => {
    return !!conn[ch];
  }
);
const getSendMessageDto = createSelector(
  [getInputEvent, getInputChannel, getFinalInputData],
  (event, channel, payload): ISendPhoenixMessageDto => {
    return {
      event,
      channel,
      payload,
    };
  }
);
const isSendMessageEnabled = createSelector(
  [getInputChannel, isConnected, getInputEvent, isInputChannelConnected],
  (ch, isConnected, ev) => {
    return Boolean(ch && isConnected && ev && isInputChannelConnected);
  }
);

export const PhoenixSelectors = {
  isChannelFormOpen,
  getCreateEventForm,
  getChannelForm,
  getChannelFormTopic,
  getChannelFormQuery,
  getChannels,
  getQuery,
  getEvents,
  getLogs,
  getNormalizedQuery,
  getUrl,
  getTab,
  isConnected,
  getClient,
  getInputData,
  getInputMode,
  getInputEvent,
  getInputChannel,
  getSendMessageDto,
  isSendMessageEnabled,
  isInputChannelConnected,
};
