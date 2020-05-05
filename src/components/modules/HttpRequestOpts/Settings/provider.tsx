import { connect, ConnectedProps } from "react-redux";
import { HttpRequestSelectors as Selectors } from "@/store/httpRequest/selectors";
import { TRootState } from "@/store/rootReducer";
import { updateSettings } from "@/store/httpRequest/slice";

const mSp = (state: TRootState) => ({
  settings: Selectors.getSettings(state),
});
const mDp = {
  updateSettings,
};

export const provide = connect(mSp, mDp);
export type TProviderProps = ConnectedProps<typeof provide>;
