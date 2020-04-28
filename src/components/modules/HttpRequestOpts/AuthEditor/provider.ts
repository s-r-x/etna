import { connect, ConnectedProps } from "react-redux";
import { TRootState } from "@/store/rootReducer";
import { HttpRequestSelectors as Selectors } from "@/store/httpRequest/selectors";
import { changeAuthStrategy } from "@/store/httpRequest/slice";

const mSp = (state: TRootState) => ({
  strategy: Selectors.getAuthStrategy(state),
  data: Selectors.getAuthData(state),
});
const mDp = {
  changeAuthStrategy,
};

export const provide = connect(mSp, mDp);
export type TProviderProps = ConnectedProps<typeof provide>;
