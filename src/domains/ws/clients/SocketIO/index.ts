import { AbstractWsClient } from "../Abstract";
import io from "socket.io-client";
import wildcard from "socketio-wildcard";
import { IConnectSocketIoDto } from "../../typings/clients";
import { EWsLogLevel, EWsRouteType } from "../../typings/store";
import { JsonService } from "@/services/json";
import _ from "lodash";

type TIOMessage = {
  type: number;
  data: [string, any];
};
export class SocketIoClient extends AbstractWsClient {
  private static instance: SocketIoClient;
  private clientConfig: SocketIOClient.ConnectOpts = {
    reconnectionDelay: 3000,
  };
  private socket: SocketIOClient.Socket;
  private constructor() {
    super();
  }
  public static getInstance(): SocketIoClient {
    if (!SocketIoClient.instance) {
      SocketIoClient.instance = new SocketIoClient();
    }
    return SocketIoClient.instance;
  }
  connect = (data: IConnectSocketIoDto) => {
    if (this.socket) {
      this.socket.disconnect();
    }
    this.socket = io(data.url, {
      ...this.clientConfig,
      path: data.path,
      query: data.query,
      ...(!_.isEmpty(data.headers) && {
        transportOptions: {
          polling: {
            extraHeaders: data.headers,
          },
        },
      }),
    });
    wildcard(io.Manager)(this.socket);
    this.socket.on("connect", this.onConnect);
    this.socket.on("disconnect", this.onDisconnect);
    this.socket.on("*", this.onMessage);
    this.socket.on("connect_error", this.onError);
    this.socket.on("reconnect_error", this.onError);
    this.socket.on("error", this.onError);
  };
  disconnect = () => {
    if (this.socket?.connected) {
      this.socket.disconnect();
    }
  };

  send = (ev: string, msg: any) => {
    if (this.socket?.connected) {
      this.socket.emit(ev, msg);
      this.log({
        ev,
        lvl: EWsLogLevel.INFO,
        msg: JsonService.stringify(msg),
        route: EWsRouteType.OUT,
      });
    }
  };
  private onError = (e: any) => {
    this.log({
      ev: "error",
      lvl: EWsLogLevel.ERR,
      msg: e,
      route: EWsRouteType.OUT,
    });
  };
  private onConnect = () => {
    this.log({
      ev: "connected",
      lvl: EWsLogLevel.OK,
      msg: `Socket has been connected`,
      route: EWsRouteType.OUT,
    });
  };
  private onDisconnect = (e: any) => {
    this.log({
      ev: "disconnected",
      lvl: EWsLogLevel.ERR,
      msg: String(e),
      route: EWsRouteType.OUT,
    });
  };
  private onMessage = ({ data: [ev, msg] }: TIOMessage) => {
    this.log({
      ev,
      lvl: EWsLogLevel.INFO,
      msg: JsonService.stringify(msg),
      route: EWsRouteType.IN,
    });
  };
}
