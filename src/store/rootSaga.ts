import { all } from "redux-saga/effects";
import httpRequestSaga from "@/domains/http-req/Root/store/sagas";
import historySaga from "@/domains/http-req-history/store/sagas";
import httpReqBodySaga from "@/domains/http-req/Body/store/sagas";
import wsSaga from "@/domains/ws/store/sagas";

export default function* rootSaga() {
  yield all([httpRequestSaga(), historySaga(), httpReqBodySaga(), wsSaga()]);
}
