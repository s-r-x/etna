import { AbstractWsClient } from "@ws/shared/client";
import { PhoenixSocket } from "./Socket";
import {
  IConnectPhoenixDto,
  TSyncPhoenixChannelsDto,
} from "@phoenix/typings/dto";
import { EWsLogLevel, EWsRouteType } from "@ws/shared/typings/store";
import { PhoenixChannel } from "./Channel";

export class PhoenixClient extends AbstractWsClient {
  private socket: PhoenixSocket;
  private static instance: PhoenixClient;

  private constructor() {
    super();
  }
  public static getInstance(): PhoenixClient {
    if (!PhoenixClient.instance) {
      PhoenixClient.instance = new PhoenixClient();
    }
    return PhoenixClient.instance;
  }
  public connect = (data: IConnectPhoenixDto) => {
    if (this.socket) {
      this.socket.disconnect();
    }
    const socket = new PhoenixSocket(data.url, {
      reconnectAfterMs() {
        return 3000;
      },
      params: data.query,
    });
    socket.channels = [];
    try {
      socket.connect();
    } catch (e) {
      this.onError(e);
    }
    socket.onOpen(this.onConnect);
    socket.onError(this.onError);
    socket.onClose(this.onDisconnect);
    this.socket = socket;
    if (data.channels) {
      this.syncChannels(data.channels);
    }
  };
  private get channels() {
    return this.socket.channels;
  }
  private set channels(channels: PhoenixChannel[]) {
    this.socket.channels = channels;
  }
  private createChannel = (topic: string, params?: TStringDict) => {
    const channel = new PhoenixChannel(
      {
        topic,
        params,
        socket: this.socket,
      },
      this.log
    );
    return channel;
  };
  private findChannel = (topic: string) => {
    return this.channels.find((ch) => ch.topic === topic);
  };
  private syncChannels = (channels: TSyncPhoenixChannelsDto) => {
    this.channels.forEach((ch) => ch.leave());
    this.channels = channels.map(
      (ch) =>
        new PhoenixChannel(
          {
            topic: ch.topic,
            socket: this.socket,
          },
          this.log
        )
    );
  };
  public connectChannel = (topic: string, params?: TStringDict) => {
    const ch = this.findChannel(topic);
    if (ch) {
      ch.join();
    } else {
      this.createChannel(topic, params).join();
    }
  };
  public disconnectChannel = (topic: string) => {
    const ch = this.findChannel(topic);
    ch?.leave();
  };
  public removeChannel = (topic: string) => {
    const ch = this.findChannel(topic);
    ch?.leave();
  };
  private onError = (e: any) => {
    console.error(e);
    this.log({
      ev: "error",
      lvl: EWsLogLevel.ERR,
      msg: e.message || "Error",
      route: EWsRouteType.OUT,
    });
  };
  private onDisconnect = (e: any) => {
    this.channels.forEach((ch) => ch.leave());
    this.log({
      ev: "disconnected",
      lvl: EWsLogLevel.ERR,
      msg: e instanceof CloseEvent ? undefined : e.message,
      route: EWsRouteType.OUT,
    });
  };
  private onConnect = () => {
    this.log({
      ev: "connected",
      lvl: EWsLogLevel.OK,
      msg: "Socket has been connected",
      route: EWsRouteType.OUT,
    });
  };
  public disconnect = () => {
    this.socket?.disconnect();
  };
  public send = () => {
    console.log("send phoenix");
  };
}
