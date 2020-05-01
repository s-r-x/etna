import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TState, THistoryItem, TSearchForm } from "@/typings/store/history";
import { UUID } from "@/utils/uuid";

const DOMAIN = "history";

const slice = createSlice({
  name: DOMAIN,
  initialState: {
    search: "",
    items: [],
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
    addItem(state, { payload }: PayloadAction<Omit<THistoryItem, "id">>) {
      state.items.unshift({
        ...payload,
        id: UUID.gen(),
      });
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
