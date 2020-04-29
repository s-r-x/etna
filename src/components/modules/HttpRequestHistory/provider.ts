import { HistorySelectors as Selectors } from "@/store/history/selectors";
import { connect, ConnectedProps } from "react-redux";
import { TRootState } from "@/store/rootReducer";
import { changeSearch, updateSearchForm } from "@/store/history/slice";

const mSp = (state: TRootState) => ({
  history: Selectors.getHistory(state),
  searchForm: Selectors.getSearchForm(state),
});
const mDp = {
  changeSearch,
  updateSearchForm,
};

export const provide = connect(mSp, mDp);
export type TProviderProps = ConnectedProps<typeof provide>;
