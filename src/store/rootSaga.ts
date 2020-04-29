import { all } from "redux-saga/effects";
import httpRequestSaga from "./httpRequest/sagas";

export default function* rootSaga() {
  yield all([httpRequestSaga()]);
}
