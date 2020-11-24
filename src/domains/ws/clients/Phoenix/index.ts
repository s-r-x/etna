import { AbstractWsClient } from "../Abstract";
import phoenix from "phoenix";

export class PhoenixClient extends AbstractWsClient {
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
  connect = () => {
    console.log(phoenix);
    console.log("connect phoenix");
  };
  disconnect = () => {
    console.log("disconnect phoenix");
  };
  send = () => {
    console.log("send phoenix");
  };
}
