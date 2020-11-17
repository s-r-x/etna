import { HttpReqBodySelectors as Selectors } from "../store/selectors";
import { connect, ConnectedProps } from "react-redux";
import { TRootState } from "@/store/rootReducer";
import { HttpReqBodyActions as Actions } from "../store/slice";

export const connector = connect(
  (state: TRootState) => ({
    text: Selectors.getText(state),
    MIME: Selectors.getMIME(state),
    activeEditor: Selectors.getActiveEditor(state),
  }),
  {
    changeText: Actions.changeText,
    changeMIME: Actions.changeMIME,
  }
);
export type TConnectorProps = ConnectedProps<typeof connector>;
