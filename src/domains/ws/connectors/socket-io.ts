import { TRootState } from "@/store/rootReducer";
import { connect, ConnectedProps } from "react-redux";
import { SocketIOSelectors } from "../store/SocketIO/selectors";
import { SocketIOActions } from "../store/SocketIO/slice";

export const connector = connect(
  (state: TRootState) => ({
    url: SocketIOSelectors.getUrl(state),
    isConnected: SocketIOSelectors.isConnected(state),
    path: SocketIOSelectors.getPath(state),
    inputEvent: SocketIOSelectors.getInputEvent(state),
    inputData: SocketIOSelectors.getInputData(state),
    inputMode: SocketIOSelectors.getInputMode(state),
  }),
  {
    changeInputEvent: SocketIOActions.changeInputEvent,
    changeInputData: SocketIOActions.changeInputData,
    changeInputMode: SocketIOActions.changeInputMode,
    changePath: SocketIOActions.changePath,
    changeUrl: SocketIOActions.changeUrl,
    connect: SocketIOActions.connect,
    disconnect: SocketIOActions.disconnect,
    sendMessage: SocketIOActions.sendMessage,
  }
);
export type TConnectorProps = ConnectedProps<typeof connector>;
