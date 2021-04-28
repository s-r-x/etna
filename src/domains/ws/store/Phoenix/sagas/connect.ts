import { PhoenixClient } from "@/domains/ws/clients/Phoenix";
import { TStorePhoenixChannel } from "@/domains/ws/typings/store";
import { SagaIterator } from "redux-saga";
import { call, select, takeLatest } from "redux-saga/effects";
import { PhoenixSelectors as Selectors } from "../selectors";
import { PhoenixActions } from "../slice";

function* connectSaga(): SagaIterator {
  const url: string = yield select(Selectors.getUrl);
  const query: TStringDict = yield select(Selectors.getNormalizedQuery);
  const client: PhoenixClient = yield select(Selectors.getClient);
  const channels: TStorePhoenixChannel[] = yield select(Selectors.getChannels);
  yield call(client.connect, {
    url,
    query,
    channels,
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
