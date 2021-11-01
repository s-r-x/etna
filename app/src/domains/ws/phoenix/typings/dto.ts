import { TStorePhoenixChannel } from "./store";

export interface IConnectPhoenixDto {
  url: string;
  query?: TStringDict;
  channels?: TStorePhoenixChannel[];
}
export interface IConnectPhoenixChannelDto {
  topic: string;
  params: TStringDict;
}
export type TSyncPhoenixChannelsDto = TStorePhoenixChannel[];
export interface ISendPhoenixMessageDto {
  channel: string;
  event: string;
  payload: TAnyDict;
}
