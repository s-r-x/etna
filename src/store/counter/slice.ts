import {createSlice, createAction} from '@reduxjs/toolkit';

const DOMAIN = 'counter';

const counterSlice = createSlice({
  name: DOMAIN,
  initialState: 0,
  reducers: {
    inc(state) {
      return state + 1;
    },
    dec(state) {
      return Math.max(0, state - 1);
    },
  },
});

export const delayInc = createAction(`${DOMAIN}/delayInc`);
export const delayDec = createAction(`${DOMAIN}/delayDec`);

export const {inc, dec} = counterSlice.actions;

export default counterSlice.reducer;
