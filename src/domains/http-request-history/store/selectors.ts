import { createSelector } from "@reduxjs/toolkit";
import { TRootState } from "@/store/rootReducer";
import { DOMAIN } from "./slice";
import { THistoryItem } from "@/typings/store/history";
import _ from "lodash";
import moment from "moment";

const getSearch = (state: TRootState) => state[DOMAIN].search;
const getSearchForm = (state: TRootState) => state[DOMAIN].searchForm;
const getFullHistory = (state: TRootState) => state[DOMAIN].items;
const getHistory = createSelector(
  getSearchForm,
  getFullHistory,
  (form, history) => {
    const dateRange = form.dateRange.every(Boolean)
      ? form.dateRange.map((d) => moment(d))
      : null;
    const url = form.url?.toLowerCase();
    let filtered: THistoryItem[];
    if (form.status || form.method || url || dateRange) {
      filtered = history.filter((item) => {
        const date = dateRange ? moment(item.date) : null;
        return (
          (form.status ? item.status == form.status : true) &&
          (form.method ? item.method === form.method : true) &&
          (date
            ? date.isSameOrAfter(dateRange[0]) &&
              date.isSameOrBefore(dateRange[1])
            : true) &&
          (url ? item.url.includes(url) : true)
        );
      });
    } else {
      filtered = history;
    }
    if (form.sort) {
      return _.orderBy(filtered, form.sort, form.sortDir);
    } else {
      return filtered;
    }
  }
);

export const HistorySelectors = {
  getFullHistory,
  getHistory,
  getSearch,
  getSearchForm,
};
