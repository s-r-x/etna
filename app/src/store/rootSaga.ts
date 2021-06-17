import { all } from "redux-saga/effects";
import httpRequestSaga from "@/domains/http-req/root/store/sagas";
import historySaga from "@/domains/http-req-history/store/sagas";
import httpReqBodySaga from "@/domains/http-req/body/store/sagas";
import phoenixSaga from "@/domains/ws/phoenix/store/sagas";
import socketIoSaga from "@/domains/ws/socket-io/store/sagas";
import shortcutsSaga from "@/domains/shortcuts/store/sagas";

export default function* rootSaga() {
  yield all([
    httpRequestSaga(),
    historySaga(),
    httpReqBodySaga(),
    phoenixSaga(),
    socketIoSaga(),
    shortcutsSaga(),
  ]);
}
