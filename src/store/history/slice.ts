import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TState, THistoryItem, TSearchForm } from "@/typings/store/history";

const DOMAIN = "history";

const slice = createSlice({
  name: DOMAIN,
  initialState: {
    search: "",
    items: [
      {
        id: "1",
        url: "http:url.com?key=value",
        date: "2020-04-29T09:17:49.084Z",
        method: "POST",
        status: 200,
      },
      {
        id: "2",
        url: "http:url.com?key=value",
        date: "2020-04-29T09:17:49.084Z",
        method: "POST",
        status: 400,
      },
      {
        id: "3",
        url: "http:url.com?key=value",
        date: "2020-04-29T09:17:49.084Z",
        method: "POST",
        status: 500,
      },
      {
        id: "4",
        url: "http:url.com?key=value",
        date: "2020-04-29T09:17:49.084Z",
        method: "POST",
        status: 500,
      },
    ],
    searchForm: {
      method: undefined,
      url: undefined,
      status: undefined,
      sort: undefined,
    },
  } as TState,
  reducers: {
    changeSearch(state, { payload }: PayloadAction<string>) {
      state.search = payload;
    },
    addItem(state, { payload }: PayloadAction<THistoryItem>) {
      state.items.push(payload);
    },
    removeItem(state, { payload }: PayloadAction<string>) {
      const idx = state.items.findIndex(({ id }) => id === payload);
      if (idx !== -1) {
        state.items.splice(idx, 1);
      }
    },
    updateSearchForm(state, { payload }: PayloadAction<Partial<TSearchForm>>) {
      for (const key in payload) {
        const val: string = payload[key];
        state.searchForm[key] = val && val.trim();
      }
    },
  },
});

export const {
  changeSearch,
  addItem,
  removeItem,
  updateSearchForm,
} = slice.actions;

export default slice.reducer;
