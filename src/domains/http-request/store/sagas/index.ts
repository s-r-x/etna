import { all } from "redux-saga/effects";
import requestSaga from "./request";
import querySaga from "./query";
import urlSaga from "./url";
import bodyMimeSaga from "./bodyMime";

export default function* () {
  yield all([querySaga(), requestSaga(), urlSaga(), bodyMimeSaga()]);
}
