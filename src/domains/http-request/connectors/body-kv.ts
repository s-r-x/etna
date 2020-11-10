import { HttpRequestSelectors as Selectors } from "../store/selectors";
import { connect, ConnectedProps } from "react-redux";
import { TRootState } from "@/store/rootReducer";
import {
  addBodyKV,
  changeBodyKVActive,
  changeBodyKVValue,
  changeBodyKVKey,
  removeBodyKV,
} from "../store/slice";

export const connector = connect(
  (state: TRootState) => ({
    items: Selectors.getBodyKV(state),
  }),
  {
    addBodyKV,
    changeBodyKVActive,
    changeBodyKVValue,
    changeBodyKVKey,
    removeBodyKV,
  }
);
export type TConnectorProps = ConnectedProps<typeof connector>;
