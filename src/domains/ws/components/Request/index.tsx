import FullHeightCard from "@/components/atoms/FullHeightCard";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { WsSelectors } from "../../store/selectors";
import { WSActions } from "../../store/slice";

const tabsList: { key: TWsProvider; tab: string }[] = [
  {
    key: "raw",
    tab: "Raw WS",
  },
  {
    key: "socketIo",
    tab: "Socket.IO",
  },
  {
    key: "phoenix",
    tab: "Phoenix",
  },
];
const WsRequest = () => {
  const provider = useSelector(WsSelectors.getActiveProvider);
  const dispatch = useDispatch();
  return (
    <FullHeightCard
      activeTabKey={provider}
      onTabChange={(k: TWsProvider) => dispatch(WSActions.changeProvider(k))}
      tabList={tabsList}
    >
      ws request here
    </FullHeightCard>
  );
};
export default WsRequest;
