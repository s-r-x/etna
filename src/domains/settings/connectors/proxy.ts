import { connect, ConnectedProps } from "react-redux";
import { HttpRequestSelectors } from "@/domains/http-request/store/selectors";
import { TRootState } from "@/store/rootReducer";
import { updateSettings } from "@/domains/http-request/store/slice";

export const connector = connect(
  (state: TRootState) => ({
    settings: HttpRequestSelectors.getSettings(state),
  }),
  {
    updateSettings,
  }
);
export type TConnectorProps = ConnectedProps<typeof connector>;
