import { HttpRequestSelectors as Selectors } from "../store/selectors";
import { connect, ConnectedProps } from "react-redux";
import { TRootState } from "@/store/rootReducer";
import { changeActiveOptsEditor } from "../store/slice";

export const connector = connect(
  (state: TRootState) => ({
    active: Selectors.getActiveOptsEditor(state),
    headersLength: Selectors.getHeadersLength(state),
    queryLength: Selectors.getQueryLength(state),
  }),
  {
    onChange: changeActiveOptsEditor,
  }
);
export type TConnectorProps = ConnectedProps<typeof connector>;
