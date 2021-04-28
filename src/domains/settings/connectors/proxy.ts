import { connect, ConnectedProps } from "react-redux";
import { HttpRequestSelectors } from "@/domains/http-req/root/store/selectors";
import { TRootState } from "@/store/rootReducer";
import { HttpReqActions } from "@/domains/http-req/root/store/slice";

export const connector = connect(
  (state: TRootState) => ({
    settings: HttpRequestSelectors.getSettings(state),
  }),
  {
    updateSettings: HttpReqActions.updateSettings,
  }
);
export type TConnectorProps = ConnectedProps<typeof connector>;
