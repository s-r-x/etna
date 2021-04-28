import { HttpReqBodySelectors as Selectors } from "../store/selectors";
import { connect, ConnectedProps } from "react-redux";
import { TRootState } from "@/store/rootReducer";
import { HttpReqBodyActions as Actions } from "../store/slice";

export const connector = connect(
  (state: TRootState) => ({
    items: Selectors.getKV(state),
  }),
  {
    addKV: Actions.addKV,
    changeKVActive: Actions.changeKVActive,
    changeKVValue: Actions.changeKVValue,
    changeKVKey: Actions.changeKVKey,
    removeKV: Actions.removeKV,
  }
);
export type TConnectorProps = ConnectedProps<typeof connector>;
