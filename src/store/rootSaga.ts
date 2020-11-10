import { all } from "redux-saga/effects";
import httpRequestSaga from "@/domains/http-request/store/sagas";

export default function* rootSaga() {
  yield all([httpRequestSaga()]);
}
