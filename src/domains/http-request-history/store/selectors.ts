import { createSelector } from "@reduxjs/toolkit";
import { TRootState } from "@/store/rootReducer";
import { DOMAIN } from "./slice";
import { THistoryItem } from "@/typings/store/history";
import _ from "lodash";
import moment from "moment";

const getSearch = (state: TRootState) => state[DOMAIN].search;
const getRawSearchForm = (state: TRootState) => state[DOMAIN].searchForm;
const getSearchForm = createSelector(getRawSearchForm, (form) => {
  return {
    ...form,
    dateRange: form.dateRange.map((d) => d && moment(d)),
  };
});
const getFullHistory = (state: TRootState) => state[DOMAIN].items;
const getHistory = createSelector(
  getSearchForm,
  getFullHistory,
  (form, history) => {
    const hasDateRange = form.dateRange.every(Boolean);
    const url = form.url?.toLowerCase();
    let filtered: THistoryItem[];
    if (form.status || form.method || url || hasDateRange) {
      filtered = history.filter((item) => {
        const date = hasDateRange ? moment(item.date) : null;
        return (
          (form.status ? item.status == form.status : true) &&
          (form.method ? item.method === form.method : true) &&
          (date
            ? date.isSameOrAfter(form.dateRange[0]) &&
              date.isSameOrBefore(form.dateRange[1])
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
