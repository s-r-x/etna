import { AbstractWsClient } from "../Abstract";
import { Socket } from "phoenix";
import { IConnectPhoenixDto } from "../../typings/clients";
import { EWsLogLevel, EWsRouteType } from "../../typings/store";

export class PhoenixClient extends AbstractWsClient {
  private socket: Socket;
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
  connect = (data: IConnectPhoenixDto) => {
    console.log(data);
    if (this.socket) {
      this.socket.disconnect();
    }
    const socket = new Socket("ws://0.0.0.0:4567/socket", {
      reconnectAfterMs() {
        return 3000;
      },
      params: {
        token:
          "SFMyNTY.g3QAAAACZAAEZGF0YXQAAAABZAAHdXNlcl9pZG0AAAADMTIzZAAGc2lnbmVkbgYAeSpC-nUB.TKS-dSD8yQi_U0ZP4_a2W5WWUFd8xEmpojEUO-Mnl4E",
      },
    });
    socket.connect();
    socket.onOpen(this.onConnect);
    socket.onError(this.onError);
    socket.onClose(this.onDisconnect);
    this.socket = socket;

    console.log("connect phoenix");
  };
  private onError = (e: any) => {
    console.error(e);
    this.log({
      ev: "error",
      lvl: EWsLogLevel.ERR,
      msg: "Error",
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
    console.log("disconnect phoenix");
  };
  public send = () => {
    console.log("send phoenix");
  };
}
