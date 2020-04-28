import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { THistoryItem } from "@/typings/history";

const DOMAIN = "history";

type State = {
  search: string;
  items: THistoryItem[];
};
const slice = createSlice({
  name: DOMAIN,
  initialState: {
    search: "",
    items: [],
  } as State,
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
  },
});

export const { changeSearch, addItem, removeItem } = slice.actions;

export default slice.reducer;
