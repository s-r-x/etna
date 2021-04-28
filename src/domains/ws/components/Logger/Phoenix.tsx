import React from "react";
import { useSelector } from "react-redux";
import Logger from ".";
import { PhoenixSelectors as Selectors } from "../../store/Phoenix/selectors";

const PhoenixLogger = () => {
  const logs = useSelector(Selectors.getLogs);
  return <Logger logs={logs} />;
};
export default PhoenixLogger;
