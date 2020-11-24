import { PhoenixClient } from "@/domains/ws/clients/Phoenix";
import { SagaIterator } from "redux-saga";
import { call, select, takeLatest } from "redux-saga/effects";
import { PhoenixSelectors as Selectors } from "../selectors";
import { PhoenixActions } from "../slice";

function* connectSaga(): SagaIterator {
  console.log("connect saga");
  const client: PhoenixClient = yield select(Selectors.getClient);
  yield call(client.connect, {
    url: "some url here",
  });
}
function* disconnectSaga(): SagaIterator {
  const client: PhoenixClient = yield select(Selectors.getClient);
  yield call(client.disconnect);
}

export default function* watchPhoenixConnect() {
  yield takeLatest(PhoenixActions.connect.type, connectSaga);
  yield takeLatest(PhoenixActions.disconnect.type, disconnectSaga);
}
