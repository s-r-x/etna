import { TWsClientLabel } from ".";

export interface IConnectSocketIoDto {
  url: string;
  path?: string;
  query?: TStringDict;
  headers?: TStringDict;
}
export interface IDisconnectDto {
  client: TWsClientLabel;
}
