import { useSelector } from "react-redux";
import { SocketIOSelectors as Selectors } from "@socket-io/store/selectors";

export const useConnectButtonText = (): string => {
  const isConnected = useSelector(Selectors.isConnected);
  const isConnecting = useSelector(Selectors.isConnecting);
  if (isConnecting) {
    return "Connecting";
  } else if (isConnected) {
    return "Disconnect";
  } else {
    return "Connect";
  }
};
