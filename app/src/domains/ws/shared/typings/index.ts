export enum EWsLogLevel {
  ERR,
  OK,
  INFO,
}
export enum EWsRouteType {
  IN,
  OUT,
}
export type TWsLogItem = {
  id: string;
  room?: string;
  date: string;
  ev: string;
  lvl: EWsLogLevel;
  msg: string;
  route: EWsRouteType;
};

export enum EWsConnStatus {
  DISCONNECTED,
  CONNECTED,
  CONNECTING,
}
