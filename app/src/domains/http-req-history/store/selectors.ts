import { createSelector } from "@reduxjs/toolkit";
import { TRootState as State } from "@/store/rootReducer";
import { DOMAIN } from "./slice";
import { THistoryItem } from "@/domains/http-req-history/typings/store";
import _ from "lodash";
import moment from "moment";

const $ = (state: State) => state[DOMAIN];
const getSearch = (state: State) => $(state).search;
const getRawSearchForm = (state: State) => $(state).searchForm;
const getSearchForm = createSelector(getRawSearchForm, (form) => {
  return {
    ...form,
    date: form.date && moment(form.date),
  };
});
const getFullHistory = (state: State) => $(state).items;
const getHistory = createSelector(
  getSearchForm,
  getFullHistory,
  (form, history) => {
    const url = form.url?.toLowerCase();
    let filtered: THistoryItem[];
    if (form.status || form.method || url || form.date) {
      filtered = history.filter((item) => {
        const date = form.date ? moment(item.req.date) : null;
        return (
          (form.status ? item.res.status == form.status : true) &&
          (form.method ? item.req.method === form.method : true) &&
          (date ? date.isSame(form.date, "day") : true) &&
          (url ? item.req.url.includes(url) : true)
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
