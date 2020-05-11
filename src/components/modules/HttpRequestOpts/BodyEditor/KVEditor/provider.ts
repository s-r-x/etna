import { HttpRequestSelectors as Selectors } from "@/store/httpRequest/selectors";
import { connect, ConnectedProps } from "react-redux";
import { TRootState } from "@/store/rootReducer";
import {
  addBodyKV,
  changeBodyKVActive,
  changeBodyKVValue,
  changeBodyKVKey,
  removeBodyKV,
} from "@/store/httpRequest/slice";
//
const mSp = (state: TRootState) => ({
  items: Selectors.getBodyKV(state),
  mime: Selectors.getBodyMIME(state),
});
const mDp = {
  addBodyKV,
  changeBodyKVActive,
  changeBodyKVValue,
  changeBodyKVKey,
  removeBodyKV,
};

export const provide = connect(mSp, mDp);
export type TProviderProps = ConnectedProps<typeof provide>;
