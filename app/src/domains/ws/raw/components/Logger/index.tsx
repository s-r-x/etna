import React from "react";
import { useSelector } from "react-redux";
import { WsRawSelectors } from "@ws/raw/store/selectors";
import Logger from "@ws/shared/components/Logger";

const WsRawLogger = () => {
  const logs = useSelector(WsRawSelectors.getLogs);
  return <Logger logs={logs} />;
};
export default WsRawLogger;
