import { HttpRequestSelectors as Selectors } from "@/store/httpRequest/selectors";
import {
  changeQueryKey,
  changeQueryValue,
  removeQuery,
  addQuery,
} from "@/store/httpRequest/slice";
import { connect, ConnectedProps } from "react-redux";
import { TRootState } from "@/store/rootReducer";

const mSp = (state: TRootState) => ({
  query: Selectors.getQuery(state),
});
const mDp = {
  changeQueryKey,
  changeQueryValue,
  removeQuery,
  addQuery,
};

export const provide = connect(mSp, mDp);
export type TProviderProps = ConnectedProps<typeof provide>;
