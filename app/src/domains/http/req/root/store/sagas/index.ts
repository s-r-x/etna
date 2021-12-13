import { spawn } from "redux-saga/effects";
import requestSaga from "./request";
import querySaga from "./query";
import urlSaga from "./url";

export default function* () {
  yield spawn(querySaga);
  yield spawn(requestSaga);
  yield spawn(urlSaga);
}
