import { JsonService } from "@/services/json";
import { Channel } from "phoenix";
import { INotifySagaDto } from "../../typings/dto";
import { EWsLogLevel, EWsRouteType } from "../../typings/store";
import { PhoenixSocket } from "./Socket";
import { Wildcard } from "phx-wildcard";

type TConstructor = {
  topic: string;
  params?: TStringDict;
  socket: PhoenixSocket;
};
export class PhoenixChannel extends Channel {
  private wildcard: Wildcard;
  public topic: string;
  constructor(
    { topic, params, socket }: TConstructor,
    private log: (payload: Omit<INotifySagaDto, "date" | "id">) => void
  ) {
    super(topic, params, socket);
    socket.channels.push(this);
    this.wildcard = new Wildcard(this);
    this.wildcard.on("*", this._onMessage);
  }
  public join(timeout?: number) {
    const push = super.join(timeout);
    push
      .receive("ok", this._onConnect)
      .receive("error", this._onConnectError)
      .receive("timeout", this._onConnectTimeout);
    this.onClose(this._onClose);
    this.onError(this._onError);
    return push;
  }
  public leave() {
    if (!this.wildcard.isDestroyed) {
      this.wildcard.destroy();
    }
    return super.leave();
  }
  private _onMessage = (e: string, payload: any) => {
    this.log({
      room: this.topic,
      ev: e,
      lvl: EWsLogLevel.INFO,
      route: EWsRouteType.IN,
      msg: JsonService.stringify(payload),
    });
  };
  private _onConnect = () => {
    this.log({
      room: this.topic,
      ev: "connected",
      lvl: EWsLogLevel.OK,
      route: EWsRouteType.OUT,
      msg: `Connected to channel ${this.topic}`,
    });
  };
  private _onConnectError = (e: any) => {
    this.log({
      room: this.topic,
      ev: "connect_error",
      lvl: EWsLogLevel.ERR,
      route: EWsRouteType.OUT,
      msg: e,
    });
  };
  private _onConnectTimeout = () => {
    this.log({
      room: this.topic,
      ev: "connect_timeout",
      lvl: EWsLogLevel.ERR,
      route: EWsRouteType.OUT,
      msg: "Channel connect timeout",
    });
  };
  private _onClose = (e: any) => {
    this.log({
      room: this.topic,
      ev: "disconnected",
      lvl: EWsLogLevel.ERR,
      msg: e,
      route: EWsRouteType.OUT,
    });
  };
  private _onError = (e: any) => {
    this.log({
      room: this.topic,
      ev: "error",
      lvl: EWsLogLevel.ERR,
      msg: e,
      route: EWsRouteType.OUT,
    });
  };
}
