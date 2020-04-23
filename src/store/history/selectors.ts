import { createSelector } from "@reduxjs/toolkit";
import { TRootState } from "@/store/rootReducer";

const getSearch = (state: TRootState) => state.history.search;
const getFullHistory = (state: TRootState) => state.history.items;
const getHistory = createSelector(
  getSearch,
  getFullHistory,
  (search, history) => {
    return history.filter(({ url }) => url.includes(search));
  }
);

export const HistorySelectors = {
  getSearch,
  getFullHistory,
  getHistory,
};
