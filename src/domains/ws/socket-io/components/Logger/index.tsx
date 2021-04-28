import React from "react";
import { useSelector } from "react-redux";
import { SocketIOSelectors } from "@socket-io/store/selectors";
import Logger from "@ws/shared/components/Logger";

const SocketIOLogger = () => {
  const logs = useSelector(SocketIOSelectors.getLogs);
  return <Logger logs={logs} />;
};
export default SocketIOLogger;
