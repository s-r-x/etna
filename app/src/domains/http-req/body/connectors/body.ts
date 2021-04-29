import { HttpReqBodySelectors as Selectors } from "@/domains/http-req/body/store/selectors";
import { connect, ConnectedProps } from "react-redux";
import { TRootState } from "@/store/rootReducer";
import { HttpReqBodyActions as Actions } from "@/domains/http-req/body/store/slice";

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
