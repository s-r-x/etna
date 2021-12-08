import { EWsConnStatus, TWsLogItem } from "@ws/shared/typings";

export type TStorePhoenixChannel = {
  topic: string;
  query: { key: string; value: string }[];
};
export type TStorePhoenixChannelWithConn = TStorePhoenixChannel & {
  connected: boolean;
};
export type TPhoenixCreateChannelForm = {
  isOpen: boolean;
  topic: string;
  query: { key: string; value: string }[];
};
export type TStorePhoenixEvent = {
  id: string;
  ev: string;
  ch: string;
};
export type TPhoenixEventForm = {
  channel: string;
  event: string;
};
export type TPhoenixState = {
  connStatus: EWsConnStatus;
  url: string;
  tab: string;
  query: { key: string; value: string }[];
  channels: TStorePhoenixChannel[];
  channelsConnStatuses: {
    [key in string]: boolean;
  };
  events: TStorePhoenixEvent[];
  createChForm: TPhoenixCreateChannelForm;
  createEvForm: TPhoenixEventForm;
  logs: TWsLogItem[];
  input: {
    channel?: string;
    mode: string;
    event: string;
    data: string;
  };
};
