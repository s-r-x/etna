import { createSelector } from "@reduxjs/toolkit";
import { TRootState } from "@/store/rootReducer";
import _ from "lodash";

const getSearch = (state: TRootState) => state.history.search;
const getSearchForm = (state: TRootState) => state.history.searchForm;
const getFullHistory = (state: TRootState) => state.history.items;
const getHistory = createSelector(
  getSearchForm,
  getFullHistory,
  (form, history) => {
    if (_.isEmpty(form)) {
      return history;
    }
    const filtered = history.filter((item) => {
      return (
        (form.status ? item.status == form.status : true) &&
        (form.method ? item.method === form.method : true) &&
        (form.url ? item.url.includes(form.url) : true)
      );
    });
    // TODO:: sort
    return filtered;
  }
);

export const HistorySelectors = {
  getFullHistory,
  getHistory,
  getSearch,
  getSearchForm,
};
