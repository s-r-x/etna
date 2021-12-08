import { spawn } from "redux-saga/effects";
import httpRequestSaga from "@/domains/http-req/root/store/sagas";
import historySaga from "@/domains/http-history/store/sagas";
import httpReqBodySaga from "@/domains/http-req/body/store/sagas";
import phoenixSaga from "@/domains/ws/phoenix/store/sagas";
import socketIoSaga from "@/domains/ws/socket-io/store/sagas";
import shortcutsSaga from "@/domains/shortcuts/store/sagas";
import wsRawSaga from "@/domains/ws/raw/store/sagas";

export default function* rootSaga() {
  yield spawn(wsRawSaga);
  yield spawn(phoenixSaga);
  yield spawn(httpRequestSaga);
  yield spawn(historySaga);
  yield spawn(httpReqBodySaga);
  yield spawn(socketIoSaga);
  yield spawn(shortcutsSaga);
}
