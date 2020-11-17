import { connect, ConnectedProps } from "react-redux";
import { TRootState } from "@/store/rootReducer";
import { HttpRequestSelectors as Selectors } from "../store/selectors";
import { changeAuthStrategy, updateBasicAuthForm } from "../store/slice";

export const connector = connect(
  (state: TRootState) => ({
    strategy: Selectors.getAuthStrategy(state),
    basicData: Selectors.getBasicAuthData(state),
  }),
  {
    changeAuthStrategy,
    updateBasicAuthForm,
  }
);
export type TConnectorProps = ConnectedProps<typeof connector>;
