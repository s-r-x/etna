import { HttpRequestSelectors as Selectors } from "../store/selectors";
import { connect, ConnectedProps } from "react-redux";
import { TRootState } from "@/store/rootReducer";
import { HttpReqActions as Actions } from "../store/slice";

export const connector = connect(
  (state: TRootState) => ({
    headers: Selectors.getHeaders(state),
  }),
  {
    addHeader: Actions.addHeader,
    changeHeaderValue: Actions.changeHeaderValue,
    changeHeaderKey: Actions.changeHeaderKey,
    changeHeaderActive: Actions.changeHeaderActive,
    removeHeader: Actions.removeHeader,
  }
);
export type TConnectorProps = ConnectedProps<typeof connector>;
