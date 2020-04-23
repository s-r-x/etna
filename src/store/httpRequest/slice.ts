import { createSlice, createAction, PayloadAction } from "@reduxjs/toolkit";
import { THTTPMethod } from "@/typings/http";
import { UUID } from "@/utils/uuid";

const DOMAIN = "httpRequest";

type THeaderMeta = {
  key: string;
  value: string;
  active: boolean;
  desc: string;
};
type TBody = {
  type: string;
  raw: boolean;
  content: string;
};
type State = {
  method: THTTPMethod;
  url: string;
  headers: {
    [key: string]: THeaderMeta;
  };
  body: TBody;
};
const slice = createSlice({
  name: DOMAIN,
  initialState: {
    url: "",
    method: "GET",
    headers: {},
    body: {
      type: "application/json",
      raw: true,
      content: "",
    },
  } as State,
  reducers: {
    addHeader(state) {
      const id = UUID.gen();
      state.headers[id] = {
        active: true,
        key: "",
        value: "",
        desc: "",
      };
    },
    changeHeader(
      state,
      { payload }: PayloadAction<{ id: string; data: THeaderMeta }>
    ) {
      state.headers[payload.id] = payload.data;
    },
    removeHeader(state, { payload }: PayloadAction<string>) {
      delete state.headers[payload];
    },
    changeMethod(state, { payload }: PayloadAction<THTTPMethod>) {
      state.method = payload;
    },
    changeUrl(state, { payload }: PayloadAction<string>) {
      state.url = payload;
    },
    changeBodyContent(state, { payload }: PayloadAction<string>) {
      state.body.content = payload;
    },
    changeBodyType(state, { payload }: PayloadAction<string>) {
      state.body.type = payload;
    },
    toggleBodyInputStrategy(state) {
      state.body.raw = !state.body.raw;
    },
  },
});

export const { changeMethod, changeUrl } = slice.actions;

export default slice.reducer;
