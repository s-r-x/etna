import { AbstractWsClient } from "../Abstract";
import io from "socket.io-client";
import { TAnyDict } from "@/Global";
import wildcard from "socketio-wildcard";

export class SocketIOClient extends AbstractWsClient {
  static instance: SocketIOClient;
  private socket: Socket;
  private constructor() {
    super();
  }
  public static getInstance(): SocketIOClient {
    if (!SocketIOClient.instance) {
      SocketIOClient.instance = new SocketIOClient();
    }
    return SocketIOClient.instance;
  }
  connect(url: string, path = "/socket.io", query?: TAnyDict) {
    this.socket = io(url, {
      path,
      query,
    });
    wildcard(io.Manager)(this.socket);
    this.socket.on("connect", this.onConnect);
    this.socket.on("disconnect", this.onDisconnect);
    this.socket.on("*", this.onMessage);
    console.log("connect method call");
  }
  disconnect() {
    if (this.socket && this.socket.connected) {
      this.socket.disconnect();
    }
    console.log("disconnect method call");
  }
  send(e: string, payload: any) {
    console.log(e, payload);
  }
  private onConnect() {
    console.log("connect");
  }
  private onDisconnect() {
    console.log("disconnect");
  }
  onMessage(data: any) {
    console.log("message", data);
  }
}
