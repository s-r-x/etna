import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  TPhoenixEventForm,
  TPhoenixState,
  TStorePhoenixChannel,
} from "@phoenix/typings/store";
import { TWsLogItem } from "@ws/shared/typings/store";
import _ from "lodash";
import { UUID } from "@/utils/uuid";
import { IConnectPhoenixChannelDto } from "../typings/dto";

export const DOMAIN = "phoenix";

const initialState: TPhoenixState = {
  connected: false,
  url: "",
  tab: "message",
  query: [],
  channels: [],
  events: [],
  logs: [],
  input: {
    event: "",
    data: "",
    mode: "application/json",
  },
  createChForm: {
    isOpen: false,
    topic: "",
    query: [],
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
      {
        payload: { topic, connected },
      }: PayloadAction<{ topic: string; connected: boolean }>
    ) {
      const ch = state.channels.find((ch) => ch.topic === topic);
      if (ch) {
        ch.connected = connected;
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
    },
    removeChannel(state, { payload: topic }: PayloadAction<string>) {
      state.channels = state.channels.filter((ch) => ch.topic !== topic);
    },
    changeChFormTopic(state, { payload }: PayloadAction<string>) {
      state.createChForm.topic = payload;
    },
    clearChForm(state) {
      state.createChForm = initialState.createChForm;
    },
    openChForm(state) {
      state.createChForm.isOpen = true;
    },
    closeChForm(state) {
      state.createChForm.isOpen = false;
    },
    addChFormQuery(state) {
      state.createChForm.query.push({
        key: "",
        value: "",
      });
    },
    changeChFormQueryKey(
      state,
      { payload }: PayloadAction<{ id: number; key: string }>
    ) {
      state.createChForm.query[payload.id].key = payload.key;
    },
    changeChFormQueryValue(
      state,
      { payload }: PayloadAction<{ id: number; value: string }>
    ) {
      state.createChForm.query[payload.id].value = payload.value;
    },
    removeChFormQuery(state, { payload: idx }: PayloadAction<number>) {
      state.createChForm.query.splice(idx, 1);
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
    changeInputEvent(state, { payload }: PayloadAction<string>) {
      state.input.event = payload;
    },
    changeInputData(state, { payload }: PayloadAction<string>) {
      state.input.data = payload;
    },
    changeInputChannel(state, { payload }: PayloadAction<string>) {
      state.input.channel = payload;
    },
    changeInputMode(state, { payload }: PayloadAction<string>) {
      state.input.mode = payload;
    },
  },
});

const connect = createAction(`${DOMAIN}/connect`);
const createChannel = createAction(`${DOMAIN}/createCh`);
const connectChannel = createAction<IConnectPhoenixChannelDto>(
  `${DOMAIN}/connectCh`
);
const disconnectChannel = createAction<string>(`${DOMAIN}/disconnectCh`);
const eventSubscribe = createAction<string>(`${DOMAIN}/eventSubscribe`);
const eventUnsubscribe = createAction<string>(`${DOMAIN}/eventUnsubscribe`);
const disconnect = createAction(`${DOMAIN}/disconnect`);
const sendMessage = createAction(`${DOMAIN}/sendMessage`);
export const PhoenixActions = {
  ...slice.actions,
  createChannel,
  connectChannel,
  connect,
  disconnect,
  disconnectChannel,
  eventSubscribe,
  eventUnsubscribe,
  sendMessage,
};

export default slice.reducer;
