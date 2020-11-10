import { HttpRequestSelectors as Selectors } from "../store/selectors";
import { connect, ConnectedProps } from "react-redux";
import { TRootState } from "@/store/rootReducer";
import {
  changeMethod,
  changeUrl,
  makeRequest,
  cancelRequest,
} from "../store/slice";

export const connector = connect(
  (state: TRootState) => ({
    method: Selectors.getMethod(state),
    url: Selectors.getUrl(state),
    loading: Selectors.getLoading(state),
  }),
  {
    changeMethod,
    changeUrl,
    makeRequest,
    cancelRequest,
  }
);
export type TConnectorProps = ConnectedProps<typeof connector>;
