import React from "react";
import { useSelector } from "react-redux";
import { SocketIOSelectors } from "../../store/SocketIO/selectors";
import Logger from "./";

const SocketIOLogger = () => {
  const logs = useSelector(SocketIOSelectors.getLogs);
  return <Logger logs={logs} />;
};
export default SocketIOLogger;
