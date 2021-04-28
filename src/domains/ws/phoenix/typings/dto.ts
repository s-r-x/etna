import { TStorePhoenixChannel } from "./store";

export interface IConnectPhoenixDto {
  url: string;
  query?: TStringDict;
  channels?: TStorePhoenixChannel[];
}
export type TSyncPhoenixChannelsDto = TStorePhoenixChannel[];
