import { HistorySelectors as Selectors } from "@/store/history/selectors";
import { connect, ConnectedProps } from "react-redux";
import { TRootState } from "@/store/rootReducer";
import { changeSearch } from "@/store/history/slice";

const mSp = (state: TRootState) => ({
  search: Selectors.getSearch(state),
  history: Selectors.getHistory(state),
});
const mDp = {
  changeSearch,
};

export const provide = connect(mSp, mDp);
export type TProviderProps = ConnectedProps<typeof provide>;
