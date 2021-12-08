import { EWsConnStatus } from "../typings";

export const useConnButtonText = (connStatus: EWsConnStatus): string => {
  switch (connStatus) {
    case EWsConnStatus.CONNECTED:
      return "Disconnect";
    case EWsConnStatus.CONNECTING:
      return "Connecting";
    case EWsConnStatus.DISCONNECTED:
      return "Connect";
    default:
      return "Connect";
  }
};
