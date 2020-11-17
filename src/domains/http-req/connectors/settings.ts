import { connect, ConnectedProps } from "react-redux";
import { HttpRequestSelectors as Selectors } from "../store/selectors";
import { TRootState } from "@/store/rootReducer";
import { updateSettings } from "../store/slice";

export const connector = connect(
  (state: TRootState) => ({
    settings: Selectors.getSettings(state),
  }),
  {
    updateSettings,
  }
);
export type TConnectorProps = ConnectedProps<typeof connector>;
