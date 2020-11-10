import { HistorySelectors as Selectors } from "../store/selectors";
import { connect, ConnectedProps } from "react-redux";
import { TRootState } from "@/store/rootReducer";
import { changeSearch, updateSearchForm, removeItem } from "../store/slice";
import { restoreRequest } from "@/domains/http-request/store/slice";

export const connector = connect(
  (state: TRootState) => ({
    history: Selectors.getHistory(state),
    searchForm: Selectors.getSearchForm(state),
  }),
  {
    changeSearch,
    updateSearchForm,
    removeItem,
    restoreRequest,
  }
);
export type TConnectorProps = ConnectedProps<typeof connector>;
