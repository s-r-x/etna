import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  TPhoenixCreateChannelForm,
  TPhoenixEventForm,
  TPhoenixState,
  TStorePhoenixChannel,
  TWsLogItem,
} from "../../typings/store";
import _ from "lodash";
import { UUID } from "@/utils/uuid";

export const DOMAIN = "phoenix";

const initialState: TPhoenixState = {
  connected: false,
  url: "",
  tab: "conn",
  connTab: "main",
  query: [],
  channels: [],
  channelsConnStatuses: [],
  events: [],
  logs: [],
  createChForm: {
    topic: "",
  },
  createEvForm: {
    channel: "",
    event: null,
  },
};

const slice = createSlice({
  name: DOMAIN,
  initialState,
  reducers: {
    changeTab(state, { payload }: PayloadAction<string>) {
      state.tab = payload;
    },
    changeConnTab(state, { payload }: PayloadAction<string>) {
      state.connTab = payload;
    },
    changeUrl(state, { payload }: PayloadAction<string>) {
      state.url = payload;
    },
    updateCreateEventForm(
      state,
      { payload }: PayloadAction<Partial<TPhoenixEventForm>>
    ) {
      _.merge(state.createEvForm, payload);
    },
    changeConnectStatus(state, { payload }: PayloadAction<boolean>) {
      state.connected = payload;
    },
    changeChannelConnectStatus(
      state,
      { payload }: PayloadAction<{ topic: string; connected: boolean }>
    ) {
      const ch = state.channelsConnStatuses.find(
        (ch) => ch.topic === payload.topic
      );
      if (ch) {
        ch.connected = payload.connected;
      } else {
        state.channelsConnStatuses.push({
          topic: payload.topic,
          connected: payload.connected,
        });
      }
    },
    addEvent(state) {
      state.events.push({
        id: UUID.gen(),
        ev: state.createEvForm.event,
        ch: state.createEvForm.channel,
      });
    },
    removeEvent(state, { payload: id }: PayloadAction<string>) {
      state.events = state.events.filter((e) => e.id !== id);
    },
    addChannel(state, { payload }: PayloadAction<TStorePhoenixChannel>) {
      state.channels.push(payload);
      state.channelsConnStatuses.push({
        topic: payload.topic,
        connected: false,
      });
    },
    removeChannel(state, { payload: topic }: PayloadAction<string>) {
      state.channels = state.channels.filter((ch) => ch.topic !== topic);
      state.channelsConnStatuses.filter((ch) => ch.topic !== topic);
    },
    updateCreateChannelForm(
      state,
      { payload }: PayloadAction<Partial<TPhoenixCreateChannelForm>>
    ) {
      _.merge(state.createChForm, payload);
    },
    addQuery(state) {
      state.query.push({
        key: "",
        value: "",
      });
    },
    changeQueryKey(
      state,
      { payload }: PayloadAction<{ id: number; key: string }>
    ) {
      state.query[payload.id].key = payload.key;
    },
    changeQueryValue(
      state,
      { payload }: PayloadAction<{ id: number; value: string }>
    ) {
      state.query[payload.id].value = payload.value;
    },
    removeQuery(state, { payload: idx }: PayloadAction<number>) {
      state.query.splice(idx, 1);
    },
    log(state, { payload }: PayloadAction<TWsLogItem>) {
      state.logs.push(payload);
    },
    clearLogs(state) {
      state.logs = [];
    },
  },
});

const connect = createAction(`${DOMAIN}/connect`);
const createChannel = createAction(`${DOMAIN}/createCh`);
const connectChannel = createAction<string>(`${DOMAIN}/connectCh`);
const disconnectChannel = createAction<string>(`${DOMAIN}/disconnectCh`);
const eventSubscribe = createAction<string>(`${DOMAIN}/eventSubscribe`);
const eventUnsubscribe = createAction<string>(`${DOMAIN}/eventUnsubscribe`);
const disconnect = createAction(`${DOMAIN}/disconnect`);
export const PhoenixActions = {
  ...slice.actions,
  createChannel,
  connectChannel,
  connect,
  disconnect,
  disconnectChannel,
  eventSubscribe,
  eventUnsubscribe,
};

export default slice.reducer;
