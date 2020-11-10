import { HttpRequestSelectors as Selectors } from "../store/selectors";
import {
  changeQueryKey,
  changeQueryValue,
  removeQuery,
  addQuery,
} from "../store/slice";
import { connect, ConnectedProps } from "react-redux";
import { TRootState } from "@/store/rootReducer";

export const connector = connect(
  (state: TRootState) => ({
    query: Selectors.getQuery(state),
  }),
  {
    changeQueryKey,
    changeQueryValue,
    removeQuery,
    addQuery,
  }
);
export type TConnectorProps = ConnectedProps<typeof connector>;
