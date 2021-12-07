import { SagaIterator } from "redux-saga";
import { call, put, select, take } from "typed-redux-saga";
import { WsRawActions as Actions } from "../slice";
import { WsRawSelectors } from "../selectors";
import { message } from "antd";

function* connectedSaga(): SagaIterator {
  yield* put(Actions.changeConnectStatus(true));
  message.success("Connected");
}
function* disconnectedSaga(): SagaIterator {
  yield* put(Actions.changeConnectStatus(false));
  message.error("Disconnected");
}
export default function* wsRawEventsSaga(): SagaIterator {
  const client = yield* select(WsRawSelectors.getClient);
  const chan = yield* call(client.creataSagaChannel);
  while (true) {
    const payload = yield* take(chan);
    yield* put(Actions.log(payload));
    if (payload.ev === "connected") {
      yield* call(connectedSaga);
    } else if (payload.ev === "disconnected") {
      yield* call(disconnectedSaga);
    }
  }
}
