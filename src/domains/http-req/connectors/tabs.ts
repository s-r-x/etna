import { HttpRequestSelectors as Selectors } from "../store/selectors";
import { connect, ConnectedProps } from "react-redux";
import { TRootState } from "@/store/rootReducer";
import { changeActiveOptsEditor } from "../store/slice";
import { HttpReqBodySelectors as BodySelectors } from "@/domains/http-req-body/store/selectors";
import { HttpReqBodyActions as BodyActions } from "@/domains/http-req-body/store/slice";

export const connector = connect(
  (state: TRootState) => ({
    active: Selectors.getActiveOptsEditor(state),
    headersLength: Selectors.getHeadersLength(state),
    queryLength: Selectors.getQueryLength(state),
    mime: BodySelectors.getMIME(state),
  }),
  {
    onChange: changeActiveOptsEditor,
    changeMime: BodyActions.changeMIME,
  }
);
export type TConnectorProps = ConnectedProps<typeof connector>;
