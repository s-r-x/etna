import { TWsClientLabel } from ".";
import { TStorePhoenixChannel } from "./store";

export type TSyncPhoenixChannelsDto = TStorePhoenixChannel[];
export interface IConnectSocketIoDto {
  url: string;
  path?: string;
  query?: TStringDict;
  headers?: TStringDict;
}
export interface IConnectPhoenixDto {
  url: string;
  query?: TStringDict;
  channels?: TStorePhoenixChannel[];
}
export interface IDisconnectDto {
  client: TWsClientLabel;
}
