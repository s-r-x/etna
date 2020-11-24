export enum EWsClient {
  SOCKET_IO = "socketIO",
  RAW = "raw",
  PHOENIX = "phoenix",
}
export type TWsClientLabel = "raw" | "socketIo" | "phoenix";

export interface IConnectDto {
  client: TWsClientLabel;
}
export interface IDisconnectDto extends IConnectDto {}
export interface IChangeUrlDto {
  client: TWsClientLabel;
  url: string;
}
export interface IChangePathDto {
  client: TWsClientLabel;
  path: string;
}
export interface IChangeConnectStatusDto {
  client: TWsClientLabel;
  connected: boolean;
}
