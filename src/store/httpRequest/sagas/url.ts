import { put, debounce } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { DOMAIN, setQuery } from "../slice";
import { SagaIterator } from "redux-saga";
import _ from "lodash";
import { URLUtils } from "@/utils/url";

function* urlSaga(action: PayloadAction<string>): SagaIterator {
  const search = URLUtils.extractSearch(action.payload);
  if (_.isUndefined(search)) {
    yield put(setQuery([]));
  } else {
    const newQuery = URLUtils.parseSearchAsArray(search);
    yield put(setQuery(newQuery));
  }
}
export default function* watchUrl() {
  yield debounce(200, `${DOMAIN}/changeUrl`, urlSaga);
}
