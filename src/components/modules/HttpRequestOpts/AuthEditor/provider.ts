import { connect, ConnectedProps } from "react-redux";
import { TRootState } from "@/store/rootReducer";
import { HttpRequestSelectors as Selectors } from "@/store/httpRequest/selectors";
import {
  changeAuthStrategy,
  updateBasicAuthForm,
} from "@/store/httpRequest/slice";

const mSp = (state: TRootState) => ({
  strategy: Selectors.getAuthStrategy(state),
  basicData: Selectors.getBasicAuthData(state),
});
const mDp = {
  changeAuthStrategy,
  updateBasicAuthForm,
};

export const provide = connect(mSp, mDp);
export type TProviderProps = ConnectedProps<typeof provide>;
