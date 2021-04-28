import FullHeightCard from "@/components/atoms/FullHeightCard";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { WsSelectors } from "../../store/selectors";
import { WSActions } from "../../store/slice";
import { EWsClient } from "../../typings";
import SocketIoRequest from "../SocketIo";

const tabsList: { key: EWsClient; tab: string }[] = [
  {
    key: EWsClient.RAW,
    tab: "Raw WS",
  },
  {
    key: EWsClient.SOCKET_IO,
    tab: "Socket.IO",
  },
  {
    key: EWsClient.PHOENIX,
    tab: "Phoenix",
  },
];
const WsRequest = () => {
  const client = useSelector(WsSelectors.getActiveClient);
  const dispatch = useDispatch();
  return (
    <FullHeightCard
      activeTabKey={client}
      onTabChange={(k: EWsClient) => dispatch(WSActions.changeActiveClient(k))}
      tabList={tabsList}
    >
      {client === EWsClient.SOCKET_IO && <SocketIoRequest />}
    </FullHeightCard>
  );
};
export default WsRequest;
