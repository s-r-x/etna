import { connect, ConnectedProps } from "react-redux";
import { HttpRequestSelectors } from "@/store/httpRequest/selectors";
import { TRootState } from "@/store/rootReducer";
import { updateSettings, updateProxy } from "@/store/httpRequest/slice";

const mSp = (state: TRootState) => ({
  settings: HttpRequestSelectors.getSettings(state),
  proxy: HttpRequestSelectors.getProxy(state),
});
const mDp = {
  updateSettings,
  updateProxy,
};

export const provide = connect(mSp, mDp);
export type TProviderProps = ConnectedProps<typeof provide>;
