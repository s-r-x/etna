import { HttpRequestSelectors as Selectors } from "@/domains/http-request/store/selectors";
import { connect, ConnectedProps } from "react-redux";
import { TRootState } from "@/store/rootReducer";
import {
  changeBodyText,
  changeBodyMIME,
} from "@/domains/http-request/store/slice";

export const connector = connect(
  (state: TRootState) => ({
    bodyText: Selectors.getBodyText(state),
    bodyMIME: Selectors.getBodyMIME(state),
    activeEditor: Selectors.getActiveBodyEditor(state),
  }),
  {
    changeBodyText,
    changeBodyMIME,
  }
);
export type TConnectorProps = ConnectedProps<typeof connector>;
