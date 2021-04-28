import { Socket } from "phoenix";
import { PhoenixChannel } from "./Channel";

export class PhoenixSocket extends Socket {
  public channels: PhoenixChannel[];
}
