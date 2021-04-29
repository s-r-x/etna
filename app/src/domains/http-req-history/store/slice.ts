import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";
import { TState, THistoryItem, TSearchForm } from "../typings/store";
import { Moment } from "moment";

export const DOMAIN = "history";

const initialState: TState = {
  search: "",
  items: [],
  searchForm: {
    method: null,
    url: null,
    status: null,
    sort: null,
    sortDir: "asc",
    dateRange: [null, null],
  },
};
const slice = createSlice({
  name: DOMAIN,
  initialState,
  reducers: {
    changeSearch(state, { payload }: PayloadAction<string>) {
      state.search = payload;
    },
    addItem(state, { payload }: PayloadAction<THistoryItem>) {
      state.items.unshift(payload);
    },
    removeItem(state, { payload }: PayloadAction<string>) {
      const idx = state.items.findIndex(({ id }) => id === payload);
      if (idx !== -1) {
        state.items.splice(idx, 1);
      }
    },
    updateSearchForm(state, { payload }: PayloadAction<Partial<TSearchForm>>) {
      for (const key in payload) {
        if (key === "dateRange") {
          const value = (payload[key] as unknown) as [Moment, Moment];
          state.searchForm[key][0] = value?.[0]?.toISOString() ?? null;
          state.searchForm[key][1] = value?.[1]?.toISOString() ?? null;
        } else {
          const val: string = payload[key];
          state.searchForm[key] = val && val.trim();
        }
      }
    },
  },
});
export const extractItem = createAction(`${DOMAIN}/extractItem`);
export const restoreItem = createAction<THistoryItem>(`${DOMAIN}/restoreItem`);

export const {
  changeSearch,
  addItem,
  removeItem,
  updateSearchForm,
} = slice.actions;

export default slice.reducer;
