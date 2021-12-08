import { AbstractWsClient } from "@ws/shared/client";
import { IConnectWsRawDto } from "@ws/raw/typings/dto";
import { EWsLogLevel, EWsRouteType } from "@ws/shared/typings";

export class WsRawClient extends AbstractWsClient {
  private static instance: WsRawClient;
  private socket: WebSocket;
  public static getInstance(): WsRawClient {
    if (!WsRawClient.instance) {
      WsRawClient.instance = new WsRawClient();
    }
    return WsRawClient.instance;
  }
  public connect = (data: IConnectWsRawDto) => {
    try {
      if (this.socket) {
        this.socket.close();
      }
      this.socket = new WebSocket(data.url, data.protocols);
      this.socket.onerror = this.onError;
      this.socket.onclose = this.onDisconnect;
      this.socket.onopen = this.onConnect;
      this.socket.onmessage = this.onMessage;
    } catch (e) {
      this.onError(e);
      setTimeout(() => {
        this.onDisconnect({} as any);
      });
    }
  };
  public destroy = () => {
    this.socket?.close();
  };
  public disconnect = () => {
    if (this.isConnected) {
      this.socket.close();
    }
  };

  public send = (msg: any) => {
    if (this.isConnected) {
      this.socket.send(msg);
      this.log({
        ev: "message",
        lvl: EWsLogLevel.INFO,
        msg,
        route: EWsRouteType.OUT,
      });
    }
  };
  private get isConnected() {
    return this.socket?.OPEN;
  }
  private onError = (e: any) => {
    console.error(e);
    this.log({
      ev: "error",
      lvl: EWsLogLevel.ERR,
      msg: e.message,
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
  private onDisconnect = (e: CloseEvent) => {
    this.log({
      ev: "disconnected",
      lvl: EWsLogLevel.ERR,
      msg: e.reason ?? "",
      route: EWsRouteType.OUT,
    });
  };
  private onMessage = (e: MessageEvent) => {
    this.log({
      ev: "message",
      lvl: EWsLogLevel.INFO,
      msg: String(e.data),
      route: EWsRouteType.IN,
    });
  };
}
