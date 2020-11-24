import { HttpRequestSelectors as Selectors } from "../store/selectors";
import { HttpReqActions as Actions } from "../store/slice";
import { connect, ConnectedProps } from "react-redux";
import { TRootState } from "@/store/rootReducer";

export const connector = connect(
  (state: TRootState) => ({
    query: Selectors.getQuery(state),
  }),
  {
    changeQueryKey: Actions.changeQueryKey,
    changeQueryValue: Actions.changeQueryValue,
    removeQuery: Actions.removeQuery,
    addQuery: Actions.addQuery,
  }
);
export type TConnectorProps = ConnectedProps<typeof connector>;
