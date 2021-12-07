import { TRootState as State } from "@/store/rootReducer";
import { createSelector } from "reselect";
import { WsRawClient } from "../client";
import { EWsLogLevel } from "@ws/shared/typings/store";
import { TWsLogUIItem } from "@ws/shared/typings/ui";
import { DOMAIN } from "./slice";
import moment from "moment";

const $ = (state: State) => state[DOMAIN];
const getTab = (state: State) => $(state).tab;
const getUrl = (state: State) => $(state).url;
const getPath = (state: State) => $(state).path;
const getProtocols = (state: State) => $(state).protocols;
const getNormalizedProtocols = createSelector(getProtocols, protocols => protocols.filter(Boolean));
const isConnected = (state: State) => $(state).connected;
const isConnecting = (state: State) => $(state).connecting;
const isConnectionButtonDisabled = (state: State): boolean => !getUrl(state);
const getRawLogs = (state: State) => $(state).logs;
const getLogs = createSelector(getRawLogs, (logs): TWsLogUIItem[] => {
  return logs.map((log) => ({
    id: log.id,
    event: log.ev,
    typography:
      log.lvl === EWsLogLevel.ERR
        ? "danger"
        : log.lvl === EWsLogLevel.OK
        ? "success"
        : undefined,
    message: log.msg,
    date: moment(log.date).format("LTS"),
    route: log.route,
  }));
});
const getInputMode = (state: State) => $(state).input.mode;
const getInputData = (state: State) => $(state).input.data;
const getNormalizedInputData = getInputData;
const getClient = () => WsRawClient.getInstance();

export const WsRawSelectors = {
  getTab,
  getLogs,
  getClient,
  getUrl,
  getPath,
  getProtocols,
  getNormalizedProtocols,
  getInputMode,
  getInputData,
  getNormalizedInputData,
  isConnected,
  isConnecting,
  isConnectionButtonDisabled,
};
