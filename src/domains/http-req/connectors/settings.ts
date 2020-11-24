import { connect, ConnectedProps } from "react-redux";
import { HttpRequestSelectors as Selectors } from "../store/selectors";
import { TRootState } from "@/store/rootReducer";
import { HttpReqActions as Actions } from "../store/slice";

export const connector = connect(
  (state: TRootState) => ({
    settings: Selectors.getSettings(state),
  }),
  {
    updateSettings: Actions.updateSettings,
  }
);
export type TConnectorProps = ConnectedProps<typeof connector>;
