import { createSelector } from "reselect";
import { DOMAIN } from "./slice";
import { TRootState as State } from "@/store/rootReducer";
import { PhoenixClient } from "@phoenix/client";
import { EWsConnStatus } from "@ws/shared/typings";
import { ISendPhoenixMessageDto } from "../typings/dto";
import { TStorePhoenixChannelWithConn } from "../typings/store";

const $ = (state: State) => state[DOMAIN];
const getUrl = (state: State) => $(state).url;
const getConnStatus = (state: State) => $(state).connStatus;
const isConnected = (state: State) =>
  getConnStatus(state) === EWsConnStatus.CONNECTED;
const isConnecting = (state: State) =>
  getConnStatus(state) === EWsConnStatus.CONNECTING;
const getClient = () => PhoenixClient.getInstance();
const getTab = (state: State) => $(state).tab;
const getQuery = (state: State) => $(state).query;
const getNormalizedQuery = createSelector(getQuery, (query) => {
  return query.reduce((acc, { key, value }) => {
    return { ...acc, [key]: value };
  }, {} as TStringDict);
});
const getChannelsConnStatuses = (state: State) => $(state).channelsConnStatuses;
const getRawChannels = (state: State) => $(state).channels;
const getChannels = createSelector(
  [getRawChannels, getChannelsConnStatuses],
  (channels, conn): TStorePhoenixChannelWithConn[] => {
    return channels.map((ch) => ({
      ...ch,
      connected: conn[ch.topic] ?? false,
    }));
  }
);
const getChannelForm = (state: State) => $(state).createChForm;
const isChannelFormOpen = (state: State) => getChannelForm(state).isOpen;
const getChannelFormTopic = (state: State) => getChannelForm(state).topic;
const getChannelFormQuery = (state: State) => getChannelForm(state).query;
const getCreateEventForm = (state: State) => $(state).createEvForm;
const getEvents = (state: State) => $(state).events;
const getLogs = (state: State) => $(state).logs;
const getInputEvent = (state: State) => $(state).input.event;
const getInputMode = (state: State) => $(state).input.mode;
const getInputData = (state: State) => $(state).input.data;
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
const getInputChannel = (state: State) => $(state).input.channel;
const isInputChannelConnected = createSelector(
  [getInputChannel, getChannelsConnStatuses],
  (ch, conn) => !!conn[ch]
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
  (ch, isConnected, ev, isChConnected) => {
    return Boolean(ch && isConnected && ev && isChConnected);
  }
);

export const PhoenixSelectors = {
  getConnStatus,
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
  isConnecting,
};
