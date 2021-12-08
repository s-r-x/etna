import { EWsConnStatus } from "@/domains/ws/shared/typings";
import { SagaIterator } from "redux-saga";
import { takeLatest, call, select, put } from "typed-redux-saga";
import { WsRawSelectors as Selectors } from "../selectors";
import { WsRawActions as Actions } from "../slice";

function* connectSaga(): SagaIterator {
  const url = yield* select(Selectors.getUrl);
  const protocols = yield* select(Selectors.getNormalizedProtocols);
  const client = yield* select(Selectors.getClient);
  yield* call(client.connect, {
    url,
    protocols,
  });
  yield* put(Actions.changeConnStatus(EWsConnStatus.CONNECTING));
}
function* disconnectSaga(): SagaIterator {
  const client = yield* select(Selectors.getClient);
  yield* call(client.disconnect);
}
export default function* watchWsRawConnect() {
  yield* takeLatest(Actions.connect.type, connectSaga);
  yield* takeLatest(Actions.disconnect.type, disconnectSaga);
}
