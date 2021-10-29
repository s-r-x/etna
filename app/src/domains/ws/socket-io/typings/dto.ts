export interface IConnectSocketIoDto {
  url: string;
  path?: string;
  query?: TStringDict;
  headers?: TStringDict;
  options?: SocketIOClient.ConnectOpts;
}
