import { HttpRequestSelectors as Selectors } from "../store/selectors";
import { connect, ConnectedProps } from "react-redux";
import { TRootState } from "@/store/rootReducer";
import {
  addHeader,
  changeHeaderValue,
  changeHeaderKey,
  changeHeaderActive,
  removeHeader,
} from "../store/slice";

export const connector = connect(
  (state: TRootState) => ({
    headers: Selectors.getHeaders(state),
  }),
  {
    addHeader,
    changeHeaderValue,
    changeHeaderKey,
    changeHeaderActive,
    removeHeader,
  }
);
export type TConnectorProps = ConnectedProps<typeof connector>;
