import React from "react";
import { useSelector } from "react-redux";
import Logger from "@ws/shared/components/Logger";
import { PhoenixSelectors as Selectors } from "@phoenix/store/selectors";

const PhoenixLogger = () => {
  const logs = useSelector(Selectors.getLogs);
  return <Logger logs={logs} />;
};
export default PhoenixLogger;
