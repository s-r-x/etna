import { HistorySelectors as Selectors } from "../store/selectors";
import { connect, ConnectedProps } from "react-redux";
import { TRootState } from "@/store/rootReducer";
import { HttpHistoryActions as Actions } from "../store/slice";

export const connector = connect(
  (state: TRootState) => ({
    history: Selectors.getHistory(state),
    searchForm: Selectors.getSearchForm(state),
  }),
  {
    changeSearch: Actions.changeSearch,
    updateSearchForm: Actions.updateSearchForm,
    removeItem: Actions.removeItem,
    restore: Actions.restoreItem,
  }
);
export type TConnectorProps = ConnectedProps<typeof connector>;
